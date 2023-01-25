//do these on page load
//hide verification on load
$('.vertfication').css("display","none");
$('.trash-embed').css("display","none");
$('.delete-blog').css("display","none");
$('input[cond]').parent().css("display","none");
$('.description-text[cond]').css("display","none");


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
});

//add cms item button function
$('body').on('click', '.cms-add-btn', function(event) {
        var cloneCMS = $(this).parent().prev('.cms-div');
        cloneCMS.clone().insertAfter(cloneCMS);
        $(this).parent().prev('.cms-div').find("textarea").val('');
        $(this).parent().prev('.cms-div').find("input").val('');
        $(this).parent().parent().find('.delete-blog').css("display","block");
});

//delete cms item button function
$('body').on('click', '.delete-blog', function(event) {
var cmsNum = $(this).closest('.cms-item-grid').children('.cms-div').length;
if (cmsNum == 2)
    {
        $(this).closest('.cms-item-grid').find('.delete-blog').css("display","none");
    }
    $(this).closest('.cms-div').remove();
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

    //$('.percentage').text(perc);


    $('.percentage').easy_number_animate({
        start_value: initPerc,
        end_value: perc,
        duration: 800
    });





}

var website = 'testsite1.com'
var currentProg = [];
//save the progress of the user in a variable
function saveProgress() {
    let tempProg = 
        {
            name: website,
            percentage: ((($('[done="yes"]').length/$('[done]').length)*100).toFixed(2)+" %"),
            quantity: 1,
            generalInfo: [],
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
            tempProg.generalInfo.push(item);
    });
    $('.checkbox-btn.ck').each(function(){
            let item = 
                {
                    type: 'option',
                    name: $(this).text()
                };
            tempProg.generalInfo.push(item);
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
}








"use strict";!function(e){e.fn.easy_number_animate=function(t){var n=e.extend({start_value:0,end_value:100,duration:1e3,delimiter:",",round:!0,before:null,after:null},t),r={DOWN:0,UP:1},a=1e3,u=e(this),l=Math.ceil(n.duration/(1e3/60)),i=n.start_value,o=(n.end_value-n.start_value)/l,f=n.start_value<n.end_value?r.UP:r.DOWN;"function"==typeof n.before&&n.before(u),function e(){if(i!==n.end_value){var t=i+o;i=f===r.UP?t>n.end_value?n.end_value:t:t<n.end_value?n.end_value:t,n.round&&(t=Math.round(i)),n.delimiter&&t>=a&&(t=function(e){var t=e.toString();if(t.length>3){for(var r=t.length%3,a=r||3,u=t.slice(0,a);a<t.length;a+=3)u+=n.delimiter+t.slice(a,a+3);return u}return e}(t)),u.text(t),requestAnimationFrame(e)}else"function"==typeof n.after&&n.after(u,i)}()}}(jQuery);



