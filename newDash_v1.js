$(".vertfication").css("display","none"),$(".trash-embed").css("display","none"),$(".delete-blog").css("display","none"),$("input[cond]").parent().css("display","none"),$(".description-text[cond]").css("display","none"),$("textarea[cond]").parent().css("display","none");var changes=!1,clientName=$('[var="name"]').val(),techNameArr=$('[var="tech"]').val().split("-"),techName=techNameArr.slice(0,1)+"@"+techNameArr.slice(1,2)+"."+techNameArr.slice(2,3),clicker=0,clientColID=null,timeStamp=null,link_src="https://drive.google.com/drive/folders/"+$('[var="link"]').val()+"?usp=sharing",file_src="https://drive.google.com/embeddedfolderview?id="+$('[var="link"]').val()+"#grid";function loader(){$(".content-wrapper").css("overflow","auto"),$(".start-box").css("display","none"),link_src="https://drive.google.com/drive/folders/"+$('[var="link"]').val()+"?usp=sharing",file_src="https://drive.google.com/embeddedfolderview?id="+$('[var="link"]').val()+"#grid",$("<iframe>").attr("src",file_src).attr("height","500px").attr("width","100%").attr("frameborder","0").appendTo(".iframeembed"),$(".upload-btn").attr("href",link_src),clientName=$('[var="name"]').val(),newGetData()}function getPercentage(){$('[included="false"]').removeAttr("done");var e=parseInt(($('[done="yes"]').length/$("[done]").length*100).toFixed(0)),t=parseInt($(".percentage").text());$(".percent-bar").css("height",e.toString()+"%"),$(".percentage").easy_number_animate({start_value:t,end_value:e,duration:800}),changes=!0,$(".save").removeClass("saved")}$('.ticket-form-block [type="email"]').change(function(){link_src="https://drive.google.com/drive/folders/"+$('[var="link"]').val()+"?usp=sharing",techName=(techNameArr=$('[var="tech"]').val().split("-")).slice(0,1)+"@"+techNameArr.slice(1,2)+"."+techNameArr.slice(2,3),$('[ticket="tech"]').val(techName),$('[ticket="tech"]').attr("disabled","disabled"),$('[ticket="link"]').val(link_src),$('[ticket="link"]').attr("disabled","disabled"),$(".upload").attr("href",link_src),$('[var="cemail"]').each(function(){$(this).text()==$('[in="cemail"]').val()&&($('[ticket="client"]').val($(this).siblings('[var="client"]').text()),$('[ticket="clientname"]').val($(this).siblings('[var="clientname"]').text()),$('[ticket="client"]').attr("disabled","disabled"),$('[ticket="clientname"]').attr("disabled","disabled"))})}),$('[ticket="tech"]').change(function(){techName=(techNameArr=$('[var="tech"]').val().split("-")).slice(0,1)+"@"+techNameArr.slice(1,2)+"."+techNameArr.slice(2,3),$('[ticket="tech"]').val(techName),$('[ticket="tech"]').attr("disabled","disabled"),console.log("tech changed")}),$('[ticket="client"]').change(function(){$('[var="cemail"]').each(function(){$(this).text()==$('[in="cemail"]').val()&&($('[ticket="client"]').val($(this).siblings('[var="client"]').text()),$('[ticket="client"]').attr("disabled","disabled"))})}),$('[ticket="clientname"]').change(function(){$('[var="cemail"]').each(function(){$(this).text()==$('[in="cemail"]').val()&&($('[ticket="clientname"]').val($(this).siblings('[var="clientname"]').text()),$('[ticket="clientname"]').attr("disabled","disabled"))})}),$('[ticket="link"]').change(function(){link_src="https://drive.google.com/drive/folders/"+$('[var="link"]').val()+"?usp=sharing",$('[ticket="link"]').val(link_src),$('[ticket="link"]').attr("disabled","disabled"),$(".upload").attr("href",link_src),console.log("link changed")}),$("body").on("click",".start-button",function(e){clicker=1,loader()}),$("body").on("click",'[builder="web"]',function(e){0==clicker&&$(".start-box").css("display","flex"),$(".form-container").css("display","flex"),$(".ticket-box").css("display","none"),$('[builder="ticket"]').removeClass("curr"),$('[builder="web"]').addClass("curr")}),$("body").on("click",'[builder="ticket"]',function(e){$(".start-box").css("display","none"),$(".form-container").css("display","none"),$(".ticket-box").css("display","flex"),$('[builder="ticket"]').addClass("curr"),$('[builder="web"]').removeClass("curr"),link_src="https://drive.google.com/drive/folders/"+$('[var="link"]').val()+"?usp=sharing",techName=(techNameArr=$('[var="tech"]').val().split("-")).slice(0,1)+"@"+techNameArr.slice(1,2)+"."+techNameArr.slice(2,3),$('[ticket="link"]').val(techName),$('[ticket="link"]').val(link_src),$(".upload").attr("href",link_src)}),$("body").on("click","#prop",function(e){window.location.href=$('[var="prop"]').val()}),$("body").on("click",".delete",function(e){$(this).parent().siblings(".vertfication").css("display","flex")}),$("body").on("click",".verify-no",function(e){$(this).parent().parent().css("display","none")}),$("body").on("click",".verify-yes",function(e){$(this).closest(".content-div").remove(),1==$(".add-p").length&&$(".delete").css("display","none"),getPercentage(),changes=!0}),$("body").on("click",".trash-embed",function(e){2==$(this).closest(".content-div").children(".written-container").length&&$(this).closest(".content-div").find(".trash-embed").css("display","none"),$(this).parent().parent().remove(),getPercentage(),changes=!0}),$("body").on("click",".add-p",function(e){var t=$(this).parent().parent().siblings(".written-container").last(".content-container");t.clone().insertAfter(t),$(this).parent().parent().siblings(".written-container").last(".content-container").find("textarea").val(""),$(this).parent().parent().siblings(".written-container").last(".content-container").find("textarea").attr("done","no"),2==$(this).closest(".content-div").children(".written-container").length&&$(this).closest(".content-div").find(".trash-embed").css("display","block"),$("textarea").change(function(){""==$(this).val()?$(this).attr("done","no"):$(this).attr("done","yes"),getPercentage()}),$("input").change(function(){""==$(this).val()?$(this).attr("done","no"):$(this).attr("done","yes"),getPercentage()}),changes=!0,getPercentage()}),$("body").on("click",".create-page-btn",function(e){var t=$(this).siblings(".page-name-embed").find("input").val();if(""==t)console.log("there is NOTHING here");else{var n=$(this).parent().parent().parent().prev(".content-div");if(n.clone().insertAfter(n),$(this).parent().parent().parent().prev(".content-div").find(".written-container").length>1){var a=$(this).parent().parent().parent().prev(".content-div").find(".written-container").first().clone();$(this).parent().parent().parent().prev(".content-div").find(".written-container").remove(),a.insertBefore($(this).parent().parent().parent().prev(".content-div").find(".verification-div")),$(this).parent().parent().parent().prev(".content-div").find(".trash-embed").css("display","none")}$(this).parent().parent().parent().prev(".content-div").find(".sub-heading").text(t+" Page"),$(this).parent().parent().parent().prev(".content-div").find("textarea").val(""),$(this).parent().parent().parent().prev(".content-div").find("textarea").attr("done","no")}$(this).siblings(".page-name-embed").find("input").val(""),2==$(".add-p").length&&$(".delete").css("display","block"),$("textarea").change(function(){""==$(this).val()?$(this).attr("done","no"):$(this).attr("done","yes"),getPercentage()}),$("input").change(function(){""==$(this).val()?$(this).attr("done","no"):$(this).attr("done","yes"),getPercentage()}),changes=!0,getPercentage()}),$("body").on("click",".cms-add-btn",function(e){var t=$(this).parent().prev(".cms-div");t.clone().insertAfter(t),$(this).parent().prev(".cms-div").find("textarea").val(""),$(this).parent().prev(".cms-div").find("input").val(""),$(this).parent().parent().find(".delete-blog").css("display","block"),changes=!0,getPercentage()}),$("body").on("click",".delete-blog",function(e){2==$(this).closest(".cms-item-grid").children(".cms-div").length&&$(this).closest(".cms-item-grid").find(".delete-blog").css("display","none"),$(this).closest(".cms-div").remove(),changes=!0,getPercentage()}),$("textarea").change(function(){""==$(this).val()?$(this).attr("done","no"):$(this).attr("done","yes"),changes=!0,getPercentage()}),$("input").change(function(){""==$(this).val()?$(this).attr("done","no"):$(this).attr("done","yes"),changes=!0,getPercentage()}),$("body").on("click",".yes-no-yes",function(e){var t=$(this).attr("cond");$(this).siblings().addClass("off"),$(this).removeClass("off"),$('input[cond="'+t+'"]').removeAttr("included"),$('input[cond="'+t+'"]').attr("done","no"),$('input[cond="'+t+'"]').parent().css("display","block"),$('textarea[cond="'+t+'"]').removeAttr("included"),$('textarea[cond="'+t+'"]').attr("done","no"),$('textarea[cond="'+t+'"]').parent().css("display","block"),$('.description-text[cond="'+t+'"]').css("display","block"),changes=!0,getPercentage()}),$("body").on("click",".yes-no-no",function(e){var t=$(this).attr("cond");$(this).siblings().addClass("off"),$(this).removeClass("off"),$('input[cond="'+t+'"]').val(""),$('input[cond="'+t+'"]').attr("done","no"),$('input[cond="'+t+'"]').attr("included","false"),$('input[cond="'+t+'"]').parent().css("display","none"),$('textarea[cond="'+t+'"]').val(""),$('textarea[cond="'+t+'"]').attr("done","no"),$('textarea[cond="'+t+'"]').attr("included","false"),$('textarea[cond="'+t+'"]').parent().css("display","none"),$('.description-text[cond="'+t+'"]').css("display","none"),changes=!0,getPercentage()}),$("body").on("click",".check",function(e){$(this).hasClass("ck")?$(this).removeClass("ck"):$(this).addClass("ck"),changes=!0,getPercentage()}),$("body").on("click",".checkbox-btn",function(e){$(this).hasClass("ck")||($(".checkbox-btn").removeClass("ck"),$(this).addClass("ck")),changes=!0,getPercentage()}),$("body").on("click",".save",function(e){saveProgress()});var currentProg=[];function saveProgress(){var e,t,n,a,r;let o={name:clientName,percentage:($('[done="yes"]').length/$("[done]").length*100).toFixed(2)+"%",quantity:1,generalInfo:[],checkboxes:[],option:[],pages:[],blogs:[],team:[],locations:[],products:[],services:[],toggles:[]};$('[cont="gen"] input').each(function(){let e="yes";e=void 0===$(this).attr("done")?"no":"no"===$(this).attr("done")?"no":"yes";let t={name:$(this).attr("placeholder"),value:$(this).val(),done:e};o.generalInfo.push(t)}),$('[cont="gen"] textarea').each(function(){let e="yes";e=void 0===$(this).attr("done")?"no":"no"===$(this).attr("done")?"no":"yes";let t={name:$(this).attr("placeholder"),value:$(this).val(),done:e};o.generalInfo.push(t)}),$(".check.ck").each(function(){let e={type:"checkbox",name:$(this).text()};o.checkboxes.push(e)}),$(".checkbox-btn.ck").each(function(){let e={type:"option",name:$(this).text()};o.option.push(e)}),$("[page].content-div").each(function(){let e={name:$(this).children("h3").text(),paragraphs:[]};var t=1;$(this).find("textarea").each(function(){let n={paragraph:t,value:$(this).val()};t++,e.paragraphs.push(n)}),o.pages.push(e)}),$('[cms="blog"]').each(function(){let e={name:$(this).find("input").val(),paragraph:$(this).find("textarea").val()};o.blogs.push(e)}),$('[cms="service"]').each(function(){let e={name:$(this).find("input").val(),paragraph:$(this).find("textarea").val()};o.services.push(e)}),$('[cms="team"]').each(function(){let e={name:$(this).find('[placeholder="Name of the member"]').val(),position:$(this).find('[placeholder="Title of the member"]').val(),phone:$(this).find('[placeholder="Contact phone number for the member"]').val(),email:$(this).find('[placeholder="Contact email for the member"]').val(),bio:$(this).find('[placeholder="Bio for the member"]').val()};o.team.push(e)}),$('[cms="locations"]').each(function(){let e={name:$(this).find('[placeholder="Business name"]').val(),street:$(this).find('[placeholder="Street address"]').val(),city:$(this).find('[placeholder="City"]').val(),state:$(this).find('[placeholder="State"]').val(),zip:$(this).find('[placeholder="Zip code"]').val()};o.locations.push(e)}),$('[cms="ecom"]').each(function(){let e={name:$(this).find('[placeholder="Item Name"]').val(),price:$(this).find('[placeholder="Item Price"]').val(),description:$(this).find('[placeholder="Item Description"]').val(),number:$(this).find('[placeholder="Item number(s)"]').val(),size:$(this).find('[placeholder="Item size(s)"]').val()};o.products.push(e)}),t=$('[cond="web"].yes-no-yes').hasClass("off")?{webStatus:"no"}:$('[cond="web"].yes-no-no').hasClass("off")?{webStatus:"yes"}:{webStatus:"n/a"},e=$('[cond="dom"].yes-no-yes').hasClass("off")?{domStatus:"no"}:$('[cond="dom"].yes-no-no').hasClass("off")?{domStatus:"yes"}:{domStatus:"n/a"},n=$('[cond="brand"].yes-no-yes').hasClass("off")?{brandStatus:"no"}:$('[cond="brand"].yes-no-no').hasClass("off")?{brandStatus:"yes"}:{brandStatus:"n/a"},a=$('[cond="third"].yes-no-yes').hasClass("off")?{thirdStatus:"no"}:$('[cond="third"].yes-no-no').hasClass("off")?{thirdStatus:"yes"}:{thirdStatus:"n/a"},r=$('[cond="edit"].yes-no-yes').hasClass("off")?{editStatus:"no"}:$('[cond="edit"].yes-no-no').hasClass("off")?{editStatus:"yes"}:{editStatus:"n/a"},o.toggles.push(e),o.toggles.push(t),o.toggles.push(n),o.toggles.push(a),o.toggles.push(r),currentProg=o,console.log(currentProg),placeJSONdata()}function sendData(e,t){var n={url:"https://getpantry.cloud/apiv1/pantry/ef0b9f3d-c493-4fee-9175-347a61b56f84/basket/"+e,method:"POST",timeout:0,headers:{"Content-Type":"application/json"},data:JSON.stringify(t)};$.ajax(n).done(function(e){changes=!1,savedData()})}function savedData(){console.log("the user data was saved"),changes=!1}function newGetData(){clientEmail=$('[in="cemail"]').val(),currentProg=jQuery.parseJSON($('[qcol="email"]:contains('+clientEmail+")").first().siblings('[qcol="json"]').text()),placeData()}function getData(e){$.ajax({url:"https://getpantry.cloud/apiv1/pantry/ef0b9f3d-c493-4fee-9175-347a61b56f84/basket/"+e,method:"GET",timeout:0,headers:{"Content-Type":"application/json"}}).done(function(e){currentProg=e,console.log(currentProg),placeData()})}function placeJSONdata(){$('[var="cemail"]').each(function(){if($(this).text()==$('[in="cemail"]').val()){clientColID=$(this).siblings('[var="client"]').text();var e=new Date;timeStamp=$(this).siblings('[var="clientname"]').text()+" "+e}}),stringed=JSON.stringify(currentProg),$('[frm="version"]').val(timeStamp),$('[frm="client"]').val(clientColID),$('[frm="clientemail"]').val($('[in="cemail"]').val()),$('[frm="json"]').val(stringed),$('[frm="btn"]').click(),alert("Your Data was saved! Your browser will refresh momentarily.")}function placeData(){if(currentProg.toggles.length>0&&("yes"==currentProg.toggles[0].domStatus?$('[cond="dom"].yes-no-yes').click():"no"==currentProg.toggles[0].domStatus&&$('[cond="dom"].yes-no-no').click(),"yes"==currentProg.toggles[1].webStatus?$('[cond="web"].yes-no-yes').click():"no"==currentProg.toggles[1].webStatus&&$('[cond="web"].yes-no-no').click(),"yes"==currentProg.toggles[2].brandStatus?$('[cond="brand"].yes-no-yes').click():"no"==currentProg.toggles[2].brandStatus&&$('[cond="brand"].yes-no-no').click(),"yes"==currentProg.toggles[3].thirdStatus?$('[cond="third"].yes-no-yes').click():"no"==currentProg.toggles[3].thirdStatus&&$('[cond="third"].yes-no-no').click(),"yes"==currentProg.toggles[4].editStatus?$('[cond="edit"].yes-no-yes').click():"no"==currentProg.toggles[4].editStatus&&$('[cond="edit"].yes-no-no').click()),currentProg.generalInfo.length>0)for(var e=0;e<currentProg.generalInfo.length;e++)$('[placeholder="'+currentProg.generalInfo[e].name+'"]').val(currentProg.generalInfo[e].value),""!=currentProg.generalInfo[e].value&&$('[placeholder="'+currentProg.generalInfo[e].name+'"]').attr("done","yes");if(currentProg.option.length>0){$(":contains('"+currentProg.option[0].name+"')").closest(".checkbox-btn").addClass("ck");for(var e=0;e<currentProg.checkboxes.length;e++)$(":contains('"+currentProg.checkboxes[e].name+"')").closest(".check").addClass("ck")}if(currentProg.pages.length>0){$("[page].content-div").each(function(){$("[page].content-div").length>1&&$(this).find(".verify-yes").click()}),$('[heading="page"]').text("TEMP");for(var e=0;e<currentProg.pages.length;e++)if($("#page-name").val(currentProg.pages[e].name.replace(" Page","")),$(".create-page-btn").click(),$(":contains('"+currentProg.pages[e].name+"')").closest('[heading="page"]').parent().find("textarea").val(currentProg.pages[e].paragraphs[0].value),""!=currentProg.pages[e].paragraphs[0].value&&$(":contains('"+currentProg.pages[e].name+"')").closest('[heading="page"]').parent().find("textarea").attr("done","yes"),currentProg.pages[e].paragraphs.length>1)for(var t=1;t<currentProg.pages[e].paragraphs.length;t++)$(":contains('"+currentProg.pages[e].name+"')").closest('[heading="page"]').parent().find(".add-p").click(),$(":contains('"+currentProg.pages[e].name+"')").closest('[heading="page"]').parent().find("textarea").last().val(currentProg.pages[e].paragraphs[t].value),""!=currentProg.pages[e].paragraphs[t].value&&$(":contains('"+currentProg.pages[e].name+"')").closest('[heading="page"]').parent().find("textarea").last().attr("done","yes");$(":contains('TEMP')").closest('[heading="page"]').parent().find(".verify-yes").click()}if(currentProg.blogs.length>0&&($('[placeholder="Name of Blog Post"]').val(currentProg.blogs[0].name),$('[placeholder="Body of Blog Post"]').val(currentProg.blogs[0].paragraph)),currentProg.blogs.length>1)for(var e=1;e<currentProg.blogs.length;e++)$('[grid="blog"]').find(".cms-add-btn").click(),$('[grid="blog"]').find('[placeholder="Name of Blog Post"]').last().val(currentProg.blogs[e].name),$('[grid="blog"]').find('[placeholder="Body of Blog Post"]').last().val(currentProg.blogs[e].paragraph);if(currentProg.team.length>0&&($('[placeholder="Name of the member"]').val(currentProg.team[0].name),$('[placeholder="Title of the member"]').val(currentProg.team[0].position),$('[placeholder="Contact phone number for the member"]').val(currentProg.team[0].phone),$('[placeholder="Contact email for the member"]').val(currentProg.team[0].email),$('[placeholder="Bio for the member"]').val(currentProg.team[0].bio)),currentProg.team.length>1)for(var e=1;e<currentProg.team.length;e++)$('[grid="team"]').find(".cms-add-btn").click(),$('[grid="team"]').find('[placeholder="Name of the member"]').last().val(currentProg.team[e].name),$('[grid="team"]').find('[placeholder="Title of the member"]').last().val(currentProg.team[e].position),$('[grid="team"]').find('[placeholder="Contact phone number for the member"]').last().val(currentProg.team[e].phone),$('[grid="team"]').find('[placeholder="Contact email for the member"]').last().val(currentProg.team[e].email),$('[grid="team"]').find('[placeholder="Bio for the member"]').last().val(currentProg.team[e].bio);if(currentProg.services.length>0&&($('[placeholder="Service Title"]').val(currentProg.services[0].name),$('[placeholder="Service Description"]').val(currentProg.services[0].paragraph)),currentProg.services.length>1)for(var e=1;e<currentProg.services.length;e++)$('[grid="service"]').find(".cms-add-btn").click(),$('[grid="service"]').find('[placeholder="Service Title"]').last().val(currentProg.services[e].name),$('[grid="service"]').find('[placeholder="Service Description"]').last().val(currentProg.services[e].paragraph);if(currentProg.locations.length>0&&($('[placeholder="Business name"]').val(currentProg.locations[0].name),$('[placeholder="Street address"]').val(currentProg.locations[0].street),$('[placeholder="City"]').val(currentProg.locations[0].city),$('[placeholder="State"]').val(currentProg.locations[0].state),$('[placeholder="Zip code"]').val(currentProg.locations[0].zip)),currentProg.locations.length>1)for(var e=1;e<currentProg.locations.length;e++)$('[grid="locations"]').find(".cms-add-btn").click(),$('[grid="locations"]').find('[placeholder="Business name"]').last().val(currentProg.locations[e].name),$('[grid="locations"]').find('[placeholder="Street address"]').last().val(currentProg.locations[e].street),$('[grid="locations"]').find('[placeholder="City"]').last().val(currentProg.locations[e].city),$('[grid="locations"]').find('[placeholder="State"]').last().val(currentProg.locations[e].state),$('[grid="locations"]').find('[placeholder="Zip code"]').last().val(currentProg.locations[e].zip);if(currentProg.products.length>0&&($('[placeholder="Item Name"]').val(currentProg.products[0].name),$('[placeholder="Item Price"]').val(currentProg.products[0].price),$('[placeholder="Item Description"]').val(currentProg.products[0].description),$('[placeholder="Item number(s)"]').val(currentProg.products[0].number),$('[placeholder="Item size(s)"]').val(currentProg.products[0].size)),currentProg.products.length>1)for(var e=1;e<currentProg.products.length;e++)$('[grid="ecom"]').find(".cms-add-btn").click(),$('[grid="ecom"]').find('[placeholder="Item Name"]').last().val(currentProg.products[e].name),$('[grid="ecom"]').find('[placeholder="Item Price"]').last().val(currentProg.products[e].price),$('[grid="ecom"]').find('[placeholder="Item Description"]').last().val(currentProg.products[e].description),$('[grid="ecom"]').find('[placeholder="Item number(s)"]').last().val(currentProg.products[e].number),$('[grid="ecom"]').find('[placeholder="Item size(s)"]').last().val(currentProg.products[e].size);getPercentage()}"use strict";!function(e){e.fn.easy_number_animate=function(t){var n=e.extend({start_value:0,end_value:100,duration:1e3,delimiter:",",round:!0,before:null,after:null},t),a={DOWN:0,UP:1},r=e(this),o=Math.ceil(n.duration/16.666666666666668),i=n.start_value,c=(n.end_value-n.start_value)/o,s=n.start_value<n.end_value?a.UP:a.DOWN;"function"==typeof n.before&&n.before(r),function e(){if(i!==n.end_value){var t,o=i+c;i=s===a.UP?o>n.end_value?n.end_value:o:o<n.end_value?n.end_value:o,n.round&&(o=Math.round(i)),n.delimiter&&(t=o)>=1e3&&(o=function e(t){var a=3,r=t.toString();if(!(r.length>a))return t;for(var o=r.length%a,i=o||a,c=r.slice(0,i);i<r.length;i+=a)c+=n.delimiter+r.slice(i,i+a);return c}(o)),r.text(o),requestAnimationFrame(e)}else"function"==typeof n.after&&n.after(r,i)}()}}(jQuery);