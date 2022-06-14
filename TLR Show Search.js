//Pigeon Forge
var storeId = "73177391";
var key = "secret_bQZqubGJryLCVhPgf6yEEjvnasrQqz7u"

//Nashville
//var storeId = "73175160";
//var key = "secret_N8VmHUJgBESRMA2ihnJUawPVkLRjdgM1"

var productSearchResults;
var searchCustomers;
var searchCounter;
var searchResults;
var funcMonth;
var funcDate;
var funcYear;
var product;
var checked = 0;
var search;

const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const d = new Date();
let todayMonth = months[d.getMonth()];

$("#select-month").change(function () {
    if(["January","March","May","July","August","October","December"].includes($('#select-month').val())) {
    $('#select-day').empty();
    $("#custom-search").removeClass("grey");
    for (let i = 0; i < 31; i++)
        {
            var option = `<option value="${i+1}">${i+1}</option>`
            $('#select-day').append(option);
        }
    }
    else if(["April","June","September","November"].includes($('#select-month').val())) {
    $('#select-day').empty();
    $("#custom-search").removeClass("grey");
    for (let i = 0; i < 30; i++)
        {
            var option = `<option value="${i+1}">${i+1}</option>`
            $('#select-day').append(option);
        }
    }
    else if(["February"].includes($('#select-month').val())) {
    $('#select-day').empty();
    $("#custom-search").removeClass("grey");
    for (let i = 0; i < 29; i++)
        {
            var option = `<option value="${i+1}">${i+1}</option>`
            $('#select-day').append(option);
        }
    }
    else {
        $("#custom-search").addClass("grey");
        $('#select-day').empty();
        var option = 
        `
        <option value="Select Day">Select Day</option>
        `
        $('#select-day').append(option);
    }
});

$("#custom-search").click(function() {
  if ($('#select-day').val() === "Select Day")
  {
    console.log("No proper date");
  }
  else
  {
    var sMonth = $("#select-month").val().toUpperCase();
    var sDate = $("#select-day").val().toString();
    $("#select-month").val("");
    $("#select-month").trigger("change");
    $('[show="list"]').empty();
    $('[party="list"]').empty();
    $('[show="heading"]').text("Searching...");
    $('[party="heading"]').text("Searching...");
    setTimeout(
      function() 
          {
            searchProducts(sMonth);
            showSearch(productSearchResults, sMonth, sDate, d.getFullYear().toString());
          }, 100);
  }
});

$(function() {
    $('[show="list"]').empty();
    $('[party="list"]').empty();
    $('[show="heading"]').text("Searching...");
    $('[party="heading"]').text("");
    setTimeout(
      function() 
          {
            searchProducts(todayMonth);
            showSearch(productSearchResults, todayMonth.toUpperCase(), d.getDate().toString(), d.getFullYear().toString());
          }, 100);
});

function showSearch(searchArray, searchMonth, searchDate, SearchYear)
{
    $('[show="heading"]').text("Searching...");
    $('[party="heading"]').text("Searching...");
    var results = [];
    var testingChecker = (searchMonth + "/" + searchDate + "/" + SearchYear).toUpperCase();
    for (let i = 0; i < searchArray['items'].length; i++)
    {
        var date = searchArray['items'][i]['sku'].replace(/\s/g, '');
        var day = date.split(',')[0].replace(/\D/g, "");
        var month = date.split(',')[0].replace(/[0-9]/g,'').toUpperCase();
        var year = date.split('-')[0].split(',')[1];
        var itemChecker = (month + "/" + day + "/" + year).toUpperCase();
        if (testingChecker === itemChecker)
        {
            results.push(searchArray['items'][i]);
        }
    }
    var simpArray = [];
    $('[show="list"]').empty();
    $('[party="list"]').empty();
    if (results.length === 0)
    {
        $('[show="heading"]').text("No Shows On "+searchMonth+" "+searchDate+", "+SearchYear);
        $('[party="heading"]').text("Make New Search");
    }

    else if (results.length > 0)
    {
        for (let i = 0; i < results.length; i++)
        {
            searchOrders(results[i]['id']);
            let show = 
                {
                    name: results[i]['name'],
                    id: results[i]['id'],
                    month: results[i]['sku'].replace(/\s/g, '').split(',')[0].replace(/[0-9]/g,'').toUpperCase(),
                    day: results[i]['sku'].replace(/\s/g, '').split(',')[0].replace(/\D/g, ""),
                    year: results[i]['sku'].replace(/\s/g, '').split('-')[0].split(',')[1],
                    time: results[i]['sku'].replace(/\s/g,'').split('-')[1].toUpperCase(),
                    remaining: results[i]['quantity'],
                    purchased: searchCounter,
                    customers: searchCustomers
                }
            simpArray.push(show);
        }
        for (let i = 0; i < simpArray.length; i++)
        {
            var showHTML = 
            `
            <div id="show-div" ct="${i}" class="show-div">
                <h2 show="title" class="show-heading">${simpArray[i]['name']}</h2>
                <div class="show-time-div">
                    <div class="date-container">
                        <div show="month" class="show-date">${simpArray[i]['month']}</div>
                        <div show="day" class="show-date">${simpArray[i]['day']}</div>
                        <div class="show-date">,</div>
                        <div show="year" class="show-date">${simpArray[i]['year']}</div>
                    </div>
                    <div class="show-time">${simpArray[i]['time']}</div>
                </div>
                <div class="show-time-info-div"></div>
                <div class="info-wrapper">
                    <div class="info-div">
                        <div class="info-container">
                            <div class="info-text">Tickets Available: </div>
                            <div show="available" class="info-text">${simpArray[i]['remaining']}</div>
                        </div>
                        <div class="info-container">
                            <div class="info-text">Tickets Purchased:</div>
                            <div show="purchased" class="info-text">${simpArray[i]['purchased']}</div>
                        </div>
                        <div class="info-container">
                            <div class="info-text">Initial Total:</div>
                            <div show="first-stock" class="info-text">${parseInt(simpArray[i]['purchased'])+parseInt(simpArray[i]['remaining'])}</div>
                        </div>
                    </div>
                    <div class="btn-div">
                        <div class="info-container">
                            <div class="info-text"># of Parties:</div>
                            <div show="parties" class="info-text">${simpArray[i]['customers'].length}</div>
                        </div>
                        <a show="button" ct="${i}" href="#" class="show-btn w-button">View Parties</a>
                    </div>
                </div>
            </div>
            `
            $('[show="list"]').append(showHTML);
        }
        searchResults = simpArray;
        $('[show="heading"]').text("Shows On "+searchMonth+" "+searchDate+", "+SearchYear);
        $('[party="heading"]').text("Select A Show");
    }
    else
    {
        console.log("Unknown Error")
    }
}

$('body').on('click', '[show="button"]', function(event) {
    $('[party="list"]').empty();
    var iNum = $(this).attr("ct");
    var parties = searchResults[iNum]['customers'];
    parties.sort(function(a, b) {
      return b.tickets - a.tickets;
    });
    for (let i = 0; i < parties.length; i++)
    {
        var partyHTML =
        `
        <div id="party-div" class="party-div w-node-_8d0f08c4-d1dd-5322-5862-e203fbf256bc-ee1bbea5">
            <div class="party-heading-container">
                <h2 class="party-heading">Party:&nbsp;</h2>
                <h2 party="name" class="party-heading">${parties[i]['party']}</h2>
            </div>
            <div class="party-info">
                <div party="quant" class="party-size">${parties[i]['tickets']}</div>
                <div class="party-order-div">
                    <div class="party-order">Order Number:&nbsp;</div>
                    <div party="order" class="party-order">${parties[i]['orderNum']}</div>
                </div>
            </div>
        </div>
        `
        $('[party="list"]').append(partyHTML);
    }
    $('[party="heading"]').text(searchResults[iNum]['name']+" Parties");
});

function searchProducts(keywords)
{
    var settings = {
      "async": false,
      "crossDomain": true,
      "url": "https://app.ecwid.com/api/v3/"+storeId+"/products?keyword="+keywords+"",
      "method": "GET",
      "headers": {
        "Accept": "application/json",
        "Authorization": "Bearer "+key+""
      }
    };
    $.ajax(settings).done(function (response) {
      productSearchResults = response;
      checkPastProducts();
    });
}

function searchOrders(productId)
{
    var settings = {
      "async": false,
      "crossDomain": true,
      "url": "https://app.ecwid.com/api/v3/"+storeId+"/orders?productId="+productId+"",
      "method": "GET",
      "headers": {
        "Accept": "application/json",
        "Authorization": "Bearer "+key+""
      }
    };
    $.ajax(settings).done(function (response) {
      var counter = 0;
      var customers = [];
      for (let i = 0; i < response['items'].length; i++)
      {
        if (typeof(response['items'][i]['shippingPerson']) != "undefined")
        {
            n = response['items'][i]['shippingPerson']['name'];
        }
        else
        {
            n = "No Name";
        }
        let customer = 
        {
            party: n,
            orderNum: response['items'][i]['id']
        }
        for (let j = 0; j < response['items'][i]['items'].length; j++)
        {
            if (parseInt(response['items'][i]['items'][j]['productId']) == parseInt(productId))
            {
                customer['tickets'] = response['items'][i]['items'][j]['quantity'];
                counter += parseInt(response['items'][i]['items'][j]['quantity']);
            }
        }
        customers.push(customer);
      }
      searchCustomers = customers;
      searchCounter = counter;
    });
}

function checkPastProducts()
{
    if(checked == 0)
    {
        var removeList = [];
        dateChecker = productSearchResults;
        for (let i = 0; i < dateChecker["items"].length; i++)
        {
            var hours;
            var minutes = parseInt(dateChecker['items'][i]['sku'].replace(/\s/g,'').split('-')[1].split(':')[1].replace(/([a-zA-Z])/g, ""));
            if (dateChecker['items'][i]['sku'].replace(/\s/g,'').split('-')[1].split(':')[1].replace(/[0-9]/g, '').toUpperCase() === "PM")
            {
                hours = (parseInt(dateChecker['items'][i]['sku'].replace(/\s/g,'').split('-')[1].split(':')[0]))+12;
            }
            else
            {
                hours = (parseInt(dateChecker['items'][i]['sku'].replace(/\s/g,'').split('-')[1].split(':')[0]));
            }

            if (parseInt(dateChecker["items"][i]['sku'].replace(/\s/g, '').split(',')[0].replace(/\D/g, "")) <= d.getDate())
            {
                if (hours < d.getHours() && minutes < d.getMinutes())
                {
                    if (dateChecker["items"][i]['enabled'] === true)
                    {
                        removeList.push(dateChecker["items"][i]['id']);
                    }
                }
            }
        }
        for (let i = 0; i < removeList.length; i++)
        {
            hideProduct(removeList[i].toString());
        }
        checked = 1;
    }
    else if (checked == 1)
    {
        console.log("check run");
    }
    else
    {
        console.log("error checking");
    }
}

function hideProduct(productNum)
{
    const settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://app.ecwid.com/api/v3/"+storeId+"/products/"+productNum+"",
        "method": "PUT",
        "data": "{enabled: false}",
        "headers": {
        "Accept": "application/json",
        "Authorization": "Bearer "+key+"",
        "Content-Type": "application/json"
        }
    };
    $.ajax(settings).done(function (response) 
    {
      console.log(response);
    });
}
