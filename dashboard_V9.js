//do these on page load
//hide verification on load
$('.vertfication').css("display","none");
$('.trash-embed').css("display","none");
$('.delete-blog').css("display","none");
$('input[cond]').parent().css("display","none");
$('.description-text[cond]').css("display","none");

var changes = false;
var clientName = $('[var="name"]').val();
var techNameArr = $('[var="tech"]').val().split('-');
var techName = techNameArr.slice(0,1)+"@"+techNameArr.slice(1,2)+"."+techNameArr.slice(2,3);
var clicker = 0;

var link_src = "https://drive.google.com/drive/folders/"+$('[var="link"]').val()+"?usp=sharing";
var file_src = "https://drive.google.com/embeddedfolderview?id="+$('[var="link"]').val()+"#grid";












$('.ticket-form-block [type="email"]').change(function () { 
        link_src = "https://drive.google.com/drive/folders/"+$('[var="link"]').val()+"?usp=sharing";
        techNameArr = $('[var="tech"]').val().split('-');
        techName = techNameArr.slice(0,1)+"@"+techNameArr.slice(1,2)+"."+techNameArr.slice(2,3);
        $('[ticket="tech"]').val(techName);
        $('[ticket="link"]').val(link_src);
        $('.upload').attr('href',link_src);
    });

$('[ticket="tech"]').change(function () { 
        techNameArr = $('[var="tech"]').val().split('-');
        techName = techNameArr.slice(0,1)+"@"+techNameArr.slice(1,2)+"."+techNameArr.slice(2,3);
        $('[ticket="tech"]').val(techName);
    });

$('[ticket="link"]').change(function () { 
        link_src = "https://drive.google.com/drive/folders/"+$('[var="link"]').val()+"?usp=sharing";
        $('[ticket="link"]').val(link_src);
        $('.upload').attr('href',link_src);
    });

$('body').on('click', '.start-button', function(event) {
    clicker = 1;
loader();
});

$('body').on('click', '[builder="web"]', function(event) {
    if (clicker == 0)
    {
        $('.start-box').css("display","flex");
    }
    $('.form-container').css("display","flex");
    $('.ticket-box').css("display","none");
    $('[builder="ticket"]').removeClass("curr");
    $('[builder="web"]').addClass("curr");
});

$('body').on('click', '[builder="ticket"]', function(event) {
    $('.start-box').css("display","none");
    $('.form-container').css("display","none");
    $('.ticket-box').css("display","flex");
    $('[builder="ticket"]').addClass("curr");
    $('[builder="web"]').removeClass("curr");
    link_src = "https://drive.google.com/drive/folders/"+$('[var="link"]').val()+"?usp=sharing";
    techNameArr = $('[var="tech"]').val().split('-');
    techName = techNameArr.slice(0,1)+"@"+techNameArr.slice(1,2)+"."+techNameArr.slice(2,3);
    $('[ticket="link"]').val(techName);
    $('[ticket="link"]').val(link_src);
    $('.upload').attr('href',link_src);
});

function loader()
{
    $('.content-wrapper').css("overflow","auto");
    $('.start-box').css("display","none");
    link_src = "https://drive.google.com/drive/folders/"+$('[var="link"]').val()+"?usp=sharing";
    file_src = "https://drive.google.com/embeddedfolderview?id="+$('[var="link"]').val()+"#grid";
        $('<iframe>')
        .attr('src',file_src)
        .attr('height','500px')
        .attr('width','100%')
        .attr('frameborder','0')
        .appendTo('.iframeembed');
        $('.upload-btn').attr('href',link_src);
        clientName = $('[var="name"]').val();
        getData(clientName);
}

$('body').on('click', '#prop', function(event) {
   window.location.href = $('[var="prop"]').val();
});



//these are functions for the editor
//when delete page button is clicked
$('body').on('click', '.delete', function(event) {
$(this).parent().siblings('.vertfication').css("display","flex");
});

//when no to delete page is selected
$('body').on('click', '.verify-no', function(event) {
$(this).parent().parent().css("display","none");
});

//when yes to delete page is selected
$('body').on('click', '.verify-yes', function(event) {
$(this).closest('.content-div').remove();
if($('.add-p').length == 1)
    {
        $('.delete').css("display","none");
    }
    getPercentage();
    changes = true;
});

//delete paragraph function
$('body').on('click', '.trash-embed', function(event) {
var parsLeft = $(this).closest('.content-div').children('.written-container').length;
if (parsLeft == 2)
    {
        $(this).closest('.content-div').find('.trash-embed').css("display","none");
    }
$(this).parent().parent().remove();
getPercentage();
changes = true;
});

//add paragraph function
$('body').on('click', '.add-p', function(event) {
var cloned = $(this).parent().parent().siblings('.written-container').last('.content-container');
cloned.clone().insertAfter(cloned);
$(this).parent().parent().siblings('.written-container').last('.content-container').find("textarea").val('');
$(this).parent().parent().siblings('.written-container').last('.content-container').find("textarea").attr("done","no");
var parsLeft = $(this).closest('.content-div').children('.written-container').length;
if (parsLeft == 2)
    {
        $(this).closest('.content-div').find('.trash-embed').css("display","block");
    }
    //change to DONE if textfield is changed
    $('textarea').change(function () { 
        if ($(this).val() == "")
        {
            $(this).attr("done","no");
        }
        else
        {
            $(this).attr("done","yes");
        }
        getPercentage();
    });
    //change to DONE if input is changed
    $('input').change(function () { 
        if ($(this).val() == "")
        {
            $(this).attr("done","no");
        }
        else
        {
            $(this).attr("done","yes");
        }
        getPercentage();
    });
getPercentage();
changes = true;
});

//add page button function
$('body').on('click', '.create-page-btn', function(event) {
var pageTextVal = $(this).siblings('.page-name-embed').find("input").val();
if (pageTextVal == "")
    {
        console.log("there is NOTHING here");
    }
else
    { //written-container
        var clonepage = $(this).parent().parent().parent().prev('.content-div');
        clonepage.clone().insertAfter(clonepage);
        var numOfPars = $(this).parent().parent().parent().prev('.content-div').find('.written-container').length;
        if (numOfPars > 1)
        {
            var parClone = $(this).parent().parent().parent().prev('.content-div').find('.written-container').first().clone();
            $(this).parent().parent().parent().prev('.content-div').find('.written-container').remove();
            parClone.insertBefore($(this).parent().parent().parent().prev('.content-div').find('.verification-div'));
            $(this).parent().parent().parent().prev('.content-div').find('.trash-embed').css("display","none");
        }
        $(this).parent().parent().parent().prev('.content-div').find(".sub-heading").text(pageTextVal+" Page");
        $(this).parent().parent().parent().prev('.content-div').find("textarea").val('');
        $(this).parent().parent().parent().prev('.content-div').find("textarea").attr("done","no");

    }
$(this).siblings('.page-name-embed').find("input").val("");
if($('.add-p').length == 2)
    {
        $('.delete').css("display","block");
    }
    //change to DONE if textfield is changed
    $('textarea').change(function () { 
        if ($(this).val() == "")
        {
            $(this).attr("done","no");
        }
        else
        {
            $(this).attr("done","yes");
        }
        getPercentage();
    });
    //change to DONE if input is changed
    $('input').change(function () { 
        if ($(this).val() == "")
        {
            $(this).attr("done","no");
        }
        else
        {
            $(this).attr("done","yes");
        }
        getPercentage();
    });
    getPercentage();
    changes = true;
});

//add cms item button function
$('body').on('click', '.cms-add-btn', function(event) {
        var cloneCMS = $(this).parent().prev('.cms-div');
        cloneCMS.clone().insertAfter(cloneCMS);
        $(this).parent().prev('.cms-div').find("textarea").val('');
        $(this).parent().prev('.cms-div').find("input").val('');
        $(this).parent().parent().find('.delete-blog').css("display","block");
        changes = true;
});

//delete cms item button function
$('body').on('click', '.delete-blog', function(event) {
var cmsNum = $(this).closest('.cms-item-grid').children('.cms-div').length;
if (cmsNum == 2)
    {
        $(this).closest('.cms-item-grid').find('.delete-blog').css("display","none");
    }
    $(this).closest('.cms-div').remove();
    changes = true;
});

//change to DONE if textfield is changed
$('textarea').change(function () { 
    if ($(this).val() == "")
    {
        $(this).attr("done","no");
    }
    else
    {
        $(this).attr("done","yes");
    }
    getPercentage();
    changes = true;
});

//change to DONE if input is changed
$('input').change(function () { 
    if ($(this).val() == "")
    {
        $(this).attr("done","no");
    }
    else
    {
        $(this).attr("done","yes");
    }
    getPercentage();
    changes = true;
});

//conditional buttons - yes clicked
$('body').on('click', '.yes-no-yes', function(event) {
var type = $(this).attr("cond");
$(this).siblings().addClass("off");
$(this).removeClass("off");
$('input[cond="'+type+'"]').removeAttr("included");
$('input[cond="'+type+'"]').attr("done","no");
$('input[cond="'+type+'"]').parent().css("display","block");
$('.description-text[cond="'+type+'"]').css("display","block");
getPercentage();
changes = true;
});

//conditional buttons - no clicked
$('body').on('click', '.yes-no-no', function(event) {
var type = $(this).attr("cond");
$(this).siblings().addClass("off");
$(this).removeClass("off");
$('input[cond="'+type+'"]').val("");
$('input[cond="'+type+'"]').attr("done","no");
$('input[cond="'+type+'"]').attr("included","false");
$('input[cond="'+type+'"]').parent().css("display","none");
$('.description-text[cond="'+type+'"]').css("display","none");
getPercentage();
changes = true;
});

//checkbox clicked
$('body').on('click', '.check', function(event) {
if ($(this).hasClass("ck"))
    {
        $(this).removeClass("ck");
    }
else
    {
        $(this).addClass("ck");
    }
changes = true;
});

//single option checkbox clicked
$('body').on('click', '.checkbox-btn', function(event) {
if ($(this).hasClass("ck"))
    {}
else
    {
        $('.checkbox-btn').removeClass("ck");
        $(this).addClass("ck");
    }
changes = true;
});

//save progress button clicked
$('body').on('click', '.save', function(event) {
    saveProgress();
});

//get the percentage from all completed fields
function getPercentage()
{
    $('[included="false"]').removeAttr("done");
    var perc = parseInt((($('[done="yes"]').length/$('[done]').length)*100).toFixed(0));
    var initPerc = parseInt($('.percentage').text());
    $('.percent-bar').css("height", perc.toString()+"%");
    $('.percentage').easy_number_animate({
        start_value: initPerc,
        end_value: perc,
        duration: 800
    });
}

var currentProg = [];
//save the progress of the user in a variable
function saveProgress() {
    let tempProg = 
        {
            name: clientName,
            percentage: ((($('[done="yes"]').length/$('[done]').length)*100).toFixed(2)+" %"),
            quantity: 1,
            generalInfo: [],
            checkboxes: [],
            option: [],
            pages: [],
            blogs: [],
            team: [],
            products: [],
            services: [],
            toggles: []
        };

    $('[cont="gen"] input').each(function(){

        let done = 'yes';
        if (typeof $(this).attr("done") === 'undefined')
        {
            done = 'no';
        }
        else if ($(this).attr("done") === 'no')
        {
            done = 'no';
        }
        else
        {
            done = 'yes';
        }
        let item = 
            {
                name: $(this).attr("placeholder"),
                value: $(this).val(),
                done: done
            };
        tempProg.generalInfo.push(item);
    });
    $('[cont="gen"] textarea').each(function(){
        let item = 
            {
                name: $(this).attr("placeholder"),
                value: $(this).val(),
                done: $(this).attr("done")
            };
        tempProg.generalInfo.push(item);
    });
    $('.check.ck').each(function(){
            let item = 
                {
                    type: 'checkbox',
                    name: $(this).text()
                };
            tempProg.checkboxes.push(item);
    });
    $('.checkbox-btn.ck').each(function(){
            let item = 
                {
                    type: 'option',
                    name: $(this).text()
                };
            tempProg.option.push(item);
    });
    $('[page].content-div').each(function(){
            let page = 
                {
                    name: $(this).children('h3').text(),
                    paragraphs: []
                };
                var pnum = 1;
                $(this).find('textarea').each(function(){
                    let pgraph =
                    {
                        paragraph: pnum,
                        value: $(this).val()
                    }
                    pnum++;
                    page.paragraphs.push(pgraph);
                });
            tempProg.pages.push(page);
    });
    $('[cms="blog"]').each(function(){
            let blog = 
                {
                    name: $(this).find('input').val(),
                    paragraph: $(this).find('textarea').val()
                };
            tempProg.blogs.push(blog);
    });
    $('[cms="service"]').each(function(){
            let service = 
                {
                    name: $(this).find('input').val(),
                    paragraph: $(this).find('textarea').val()
                };
            tempProg.services.push(service);
    });
    $('[cms="team"]').each(function(){
            let member = 
                {
                    name: $(this).find('[placeholder="Name of Team Member"]').val(),
                    position: $(this).find('[placeholder="Position of Team Member"]').val(),
                    phone: $(this).find('[placeholder="Team Member Phone Number"]').val(),
                    email: $(this).find('[placeholder="Team Member Email"]').val(),
                    bio: $(this).find('[placeholder="Team Member Bio"]').val()
                };
            tempProg.team.push(member);
    });
    $('[cms="ecom"]').each(function(){
            let product = 
                {
                    name: $(this).find('[placeholder="Item Name"]').val(),
                    price: $(this).find('[placeholder="Item Price"]').val(),
                    description: $(this).find('[placeholder="Item Description"]').val()
                };
            tempProg.products.push(product);
    });
    var domainToggle;
    var websiteToggle;
    if ($('[cond="web"].yes-no-yes').hasClass('off'))
        {
            websiteToggle = {webStatus: "no"};
        }
    else if($('[cond="web"].yes-no-no').hasClass('off'))
        {
            websiteToggle = {webStatus: "yes"};
        }
    else
    {
        websiteToggle = {webStatus: "n/a"};
    }
    if ($('[cond="dom"].yes-no-yes').hasClass('off'))
        {
            domainToggle = {domStatus: "no"};
        }
    else if($('[cond="dom"].yes-no-no').hasClass('off'))
        {
            domainToggle = {domStatus: "yes"};
        }
    else
    {
        domainToggle = {domStatus: "n/a"};
    }
    tempProg.toggles.push(domainToggle);
    tempProg.toggles.push(websiteToggle);

currentProg = tempProg;
console.log(currentProg);
sendData(clientName, currentProg)
changes = false;
}

//function to send the data
function sendData(client, jason) {
var settings = {
  "url": "https://getpantry.cloud/apiv1/pantry/092f9bec-8ecf-46b2-9c94-f5dfcd7b4712/basket/"+client,
  "method": "POST",
  "timeout": 0,
  "headers": {
    "Content-Type": "application/json"
  },
  "data": JSON.stringify(jason),
};

$.ajax(settings).done(function (response) {
  savedData();
});
}

//function to let the user know they saved their data
function savedData()
{
    console.log("the user data was saved");
}

//function to retrieve the data
function getData (client)
{
    var settings = {
      "url": "https://getpantry.cloud/apiv1/pantry/092f9bec-8ecf-46b2-9c94-f5dfcd7b4712/basket/"+client,
      "method": "GET",
      "timeout": 0,
      "headers": {
        "Content-Type": "application/json"
      },
    };

    $.ajax(settings).done(function (response) 
        {
            currentProg = response;
            console.log(currentProg);
            placeData();
        });
}

//function to place all of the data that the user has stored back in the form fields
function placeData()
{
    if (currentProg.toggles[0]["domStatus"] == 'yes')
    {
        $('[cond="dom"].yes-no-yes').click();
    }
    else if (currentProg.toggles[0]["domStatus"] == 'no')
    {
        $('[cond="dom"].yes-no-no').click();
    }
    else {}

    if (currentProg.toggles[1]["webStatus"] == 'yes')
    {
        $('[cond="web"].yes-no-yes').click();
    }
    else if (currentProg.toggles[1]["webStatus"] == 'no')
    {
        $('[cond="web"].yes-no-no').click();
    }
    else {}
    for (var i=0; i<currentProg.generalInfo.length; i++) {
        $('[placeholder="'+currentProg.generalInfo[i]["name"]+'"]').val(currentProg.generalInfo[i]["value"]);
        $('[placeholder="'+currentProg.generalInfo[i]["name"]+'"]').attr("done","yes");
    }
    $(":contains('"+currentProg.option[0]["name"]+"')").closest('.checkbox-btn').addClass("ck");
    for (var i=0; i<currentProg.checkboxes.length; i++) {
        $(":contains('"+currentProg.checkboxes[i]["name"]+"')").closest('.check').addClass("ck");

    }

    $('[page].content-div').each(function()
    {
        if ($('[page].content-div').length > 1)
            {
                $(this).find('.verify-yes').click();
            }
    });

    $('[heading="page"]').text("TEMP");

    for (var i=0; i<currentProg.pages.length; i++) 
    {
        $('#page-name').val(currentProg.pages[i]["name"].replace(' Page',''));
        $('.create-page-btn').click();
        $(":contains('"+currentProg.pages[i]["name"]+"')").closest('[heading="page"]').parent().find('textarea').val(currentProg.pages[i].paragraphs[0]["value"]);
        if (currentProg.pages[i].paragraphs[0]["value"] != '')
        {
            $(":contains('"+currentProg.pages[i]["name"]+"')").closest('[heading="page"]').parent().find('textarea').attr("done","yes");
        }
        if (currentProg.pages[i].paragraphs.length > 1)
        {
            for (var j=1; j<currentProg.pages[i].paragraphs.length; j++)
            {
                $(":contains('"+currentProg.pages[i]["name"]+"')").closest('[heading="page"]').parent().find('.add-p').click();
                $(":contains('"+currentProg.pages[i]["name"]+"')").closest('[heading="page"]').parent().find('textarea').last().val(currentProg.pages[i].paragraphs[j]["value"]);
                if (currentProg.pages[i].paragraphs[j]["value"] != '')
                    {
                        $(":contains('"+currentProg.pages[i]["name"]+"')").closest('[heading="page"]').parent().find('textarea').last().attr("done","yes");
                    }
            }
        }
    }
    $(":contains('TEMP')").closest('[heading="page"]').parent().find('.verify-yes').click();

    if (currentProg.blogs.length > 0)
    {
        $('[placeholder="Name of Blog Post"]').val(currentProg.blogs[0]["name"]);
        $('[placeholder="Body of Blog Post"]').val(currentProg.blogs[0]["paragraph"]);
    }
    if (currentProg.blogs.length > 1)
    {
        for (var i=1; i<currentProg.blogs.length; i++) 
        {
            $('[grid="blog"]').find('.cms-add-btn').click();
            $('[grid="blog"]').find('[placeholder="Name of Blog Post"]').last().val(currentProg.blogs[i]["name"]);
            $('[grid="blog"]').find('[placeholder="Body of Blog Post"]').last().val(currentProg.blogs[i]["paragraph"]);
        }
    }

    if (currentProg.team.length > 0)
    {
        $('[placeholder="Name of Team Member"]').val(currentProg.team[0]["name"]);
        $('[placeholder="Position of Team Member"]').val(currentProg.team[0]["position"]);
        $('[placeholder="Team Member Phone Number"]').val(currentProg.team[0]["phone"]);
        $('[placeholder="Team Member Email"]').val(currentProg.team[0]["email"]);
        $('[placeholder="Team Member Bio"]').val(currentProg.team[0]["bio"]);
    }
    if (currentProg.team.length > 1)
    {
        for (var i=1; i<currentProg.team.length; i++) 
        {
            $('[grid="team"]').find('.cms-add-btn').click();
            $('[grid="team"]').find('[placeholder="Name of Team Member"]').last().val(currentProg.team[i]["name"]);
            $('[grid="team"]').find('[placeholder="Position of Team Member"]').last().val(currentProg.team[i]["position"]);
            $('[grid="team"]').find('[placeholder="Team Member Phone Number"]').last().val(currentProg.team[i]["phone"]);
            $('[grid="team"]').find('[placeholder="Team Member Email"]').last().val(currentProg.team[i]["email"]);
            $('[grid="team"]').find('[placeholder="Team Member Bio"]').last().val(currentProg.team[i]["bio"]);
        }
    }

    if (currentProg.services.length > 0)
    {
        $('[placeholder="Service Title"]').val(currentProg.services[0]["name"]);
        $('[placeholder="Service Description"]').val(currentProg.services[0]["paragraph"]);
    }
    if (currentProg.services.length > 1)
    {
        for (var i=1; i<currentProg.services.length; i++) 
        {
            $('[grid="service"]').find('.cms-add-btn').click();
            $('[grid="service"]').find('[placeholder="Service Title"]').last().val(currentProg.services[i]["name"]);
            $('[grid="service"]').find('[placeholder="Service Description"]').last().val(currentProg.services[i]["paragraph"]);
        }
    }

    if (currentProg.products.length > 0)
    {
        $('[placeholder="Item Name"]').val(currentProg.products[0]["name"]);
        $('[placeholder="Item Price"]').val(currentProg.products[0]["price"]);
        $('[placeholder="Item Description"]').val(currentProg.products[0]["description"]);
    }
    if (currentProg.products.length > 1)
    {
        for (var i=1; i<currentProg.products.length; i++) 
        {
            $('[grid="ecom"]').find('.cms-add-btn').click();
            $('[grid="ecom"]').find('[placeholder="Item Name"]').last().val(currentProg.products[i]["name"]);
            $('[grid="ecom"]').find('[placeholder="Item Price"]').last().val(currentProg.products[i]["price"]);
            $('[grid="ecom"]').find('[placeholder="Item Description"]').last().val(currentProg.products[i]["description"]);
        }
    }
    getPercentage();
}

'use strict';

(function($)
{
  $.fn.easy_number_animate = function(_options)
  {
    var defaults = {
          start_value    : 0
          ,end_value     : 100
          ,duration      : 1000  
          ,delimiter     : ','
          ,round         : true
          ,before        : null
          ,after         : null
        }

        ,options = $.extend(defaults, _options)

        ,UPDATES_PER_SECOND     = 60
        ,ONE_SECOND             = 1000 
        ,MILLISECONDS_PER_FRAME = ONE_SECOND / UPDATES_PER_SECOND
        ,DIRECTIONS             = {DOWN: 0, UP:1}
        ,ONE_THOUSAND           = 1000

        ,$element        = $(this)
        ,interval        = Math.ceil(options.duration / MILLISECONDS_PER_FRAME)
        ,current_value   = options.start_value
        ,increment_value = (options.end_value - options.start_value) / interval
        ,direction       = options.start_value < options.end_value ? DIRECTIONS.UP : DIRECTIONS.DOWN
        ;

    function format_thousand(_value)
    {
      var _THOUSAND_GROUP_LENGTH = 3
          ,_number_string        = _value.toString();

      if(_number_string.length > _THOUSAND_GROUP_LENGTH)
      {
        var _remainder                = _number_string.length % _THOUSAND_GROUP_LENGTH
            ,_index                   = _remainder ? _remainder : _THOUSAND_GROUP_LENGTH
            ,_number_string_formatted = _number_string.slice(0, _index)
            ;

        for(;_index < _number_string.length; _index += _THOUSAND_GROUP_LENGTH)
        {
          _number_string_formatted += options.delimiter + _number_string.slice(_index, _index + _THOUSAND_GROUP_LENGTH);
        }

        return _number_string_formatted;
      } else
      {
        return _value;
      }
    }

    function needs_formatting(_value)
    {
      return _value >= ONE_THOUSAND;
    }

    function animate()
    {
      if(current_value !== options.end_value)
      {
        var new_value = current_value + increment_value;

        if(direction === DIRECTIONS.UP)
        {
          current_value = new_value > options.end_value ? options.end_value : new_value;
        } else
        {
          current_value = new_value < options.end_value ? options.end_value : new_value;
        }

        if(options.round)
        {
          new_value = Math.round(current_value);
        }

        if(options.delimiter && needs_formatting(new_value))
        {
          new_value = format_thousand(new_value);
        }

        $element.text(new_value);
        requestAnimationFrame(animate);
      } else
      {
        if(typeof options.after === 'function')
        {
          options.after($element, current_value);
        }
      }
    }

    if(typeof options.before === 'function')
    {
      options.before($element);
    }

    animate();
  };
}(jQuery));












