//run on order confirmation page
$( document ).ready(function() {
  varietyPacks = [];
	localStorage.setItem('varietyPacks', JSON.stringify(varietyPacks));  
});

// for all pages

var counter = 0;
var addedCounter = 0;
var itemTotal = 0;
var percentage = 0;
var varietyPacks;

$( document ).ready(function() {
    if ((localStorage.getItem('varietyPacks')) == null)
    {
    	varietyPacks = [];
    }
    else if ((JSON.parse(localStorage.getItem('varietyPacks')).length) > 0)
    {
    	varietyPacks = (JSON.parse(localStorage.getItem('varietyPacks')));
    }
    else
    {
    	varietyPacks = [];
    }
    localStorage.setItem('varietyPacks', JSON.stringify(varietyPacks));
    pushCheckout();
    fillForm();
});

$('body').on('click', '[cms-item="view-items"]', function(event) {
	pushCart();
	pushCheckout();
	fillForm();
});

function pushCart()
{
	var listClass = $('[cms-item="list-details"]').attr("class");
	$('[cms-item="item-breakdown"]').empty();
	for (let i = 0; i < JSON.parse(localStorage.getItem('varietyPacks')).length; i++) 
				{
					$('[cms-item="cart-item"]').each(function() 
						{
							$(this).find('[cms-item="item-breakdown"]').css("display", "flex");
							if ($(this).find('[cms-item="item-title"]').text() === JSON.parse(localStorage.getItem('varietyPacks'))[i]["name"])
							{
								var cartItem = `<div cms-item="list-details" class="${listClass}" index="${i}">`; 
								for (p = 0; p < JSON.parse(localStorage.getItem('varietyPacks'))[i]["items"].length; p++)
									{
										var quantity = (JSON.parse(localStorage.getItem('varietyPacks'))[i]["items"][p]["quantity"]);
										var item = (JSON.parse(localStorage.getItem('varietyPacks'))[i]["items"][p]["name"]);
										cartItem += `${quantity} x ${item}<br/>`;
									}
								cartItem += `</div>`;
								$(this).find('[cms-item="item-breakdown"]').append(cartItem);
							}
						});
				}
}

$('body').on('click', '[cms-item="remove-cart"]', function(event) {
	var ident = $(this).parents('[cms-item="cart-item"]').find('[cms-item="item-title"]').text();
	var tempJson = JSON.parse(localStorage.getItem('varietyPacks'));
	for (let i = tempJson.length - 1; i >= 0; i--)
		{
			if (tempJson[i]["name"] === ident)
			{
				tempJson.splice(i, 1);
			}
		}
	localStorage.removeItem('varietyPacks');
	if (tempJson.length > 0)
	{
		varietyPacks = tempJson;
		localStorage.setItem('varietyPacks', JSON.stringify(tempJson));
	}
	else if (tempJson.length == 0)
	{
		tempJson = [];
		varietyPacks = tempJson;
		localStorage.setItem('varietyPacks', JSON.stringify(tempJson));
	}
	pushCheckout();
	fillForm();
});

function pushCheckout()
{
setTimeout(
  function() 
  {
    
  	var listClass = $('[cms-item="checkout-details"]').attr("class");
		$('[cms-item="checkout-container"]').empty();
		for (let i = 0; i < JSON.parse(localStorage.getItem('varietyPacks')).length; i++) 
					{
						$('[cms-item="checkout-item"]').each(function() 
							{
								if ($(this).find('[cms-item="checkout-name"]').text() === JSON.parse(localStorage.getItem('varietyPacks'))[i]["name"])
								{
									var cartItem = `<div cms-item="lcheckout-details" class="${listClass}" index="${i}">`; 
									for (p = 0; p < JSON.parse(localStorage.getItem('varietyPacks'))[i]["items"].length; p++)
										{
											var quantity = (JSON.parse(localStorage.getItem('varietyPacks'))[i]["items"][p]["quantity"]);
											var item = (JSON.parse(localStorage.getItem('varietyPacks'))[i]["items"][p]["name"]);
											cartItem += `${quantity} x ${item}<br/>`;
										}
									cartItem += `</div>`;
									$(this).find('[cms-item="checkout-container"]').append(cartItem);
								}
							});
					}

  }, 2000);
	}

function fillForm()
{
	var tempJson = JSON.parse(localStorage.getItem('varietyPacks'));
	var nameArr = [];
	for (let i = 0; i < tempJson.length; i++)
	{
		tempName = tempJson[i]["name"];
		nameArr.push(tempName);
		
	}
	var count = {};
	nameArr.forEach(function(i) { count[i] = (count[i]||0) + 1;});
	var names = Object.keys(count);
	$('[cms-item="item-notes"]').val(``);
	var orderNotes = ``;
	for (let i = 0; i < names.length; i++)
	{
		orderNotes += `=========================\n`;
		typeName = names[i];
		orderNotes += `- ${typeName} -\n`;
		orderNotes += `=========================\n`;
		for (let n = 0; n < tempJson.length; n++)
		{
			if (tempJson[n]["name"] === names[i])
			{
				for (let r = 0; r < tempJson[n]["items"].length; r++)
				{
					var cartQuant = tempJson[n]["items"][r]["quantity"];
					var cartName = tempJson[n]["items"][r]["name"];
					orderNotes += `- ${cartQuant} x ${cartName}\n`;
					orderNotes += `............................................................\n`;
				}
				orderNotes += `_____________________________________\n`;
			}
		}
	}
	if (orderNotes === ``)
	{
		orderNotes += `No Variety Packs`;
	}
	$('[cms-item="item-notes"]').val(orderNotes);
}

//for builder pages

var packTotal = limit;
var greyButton = "grey";
var boxDivHidden = "hidden";
var showAddCart = "ready";

$("#percentage").css("width", ""+((itemTotal / packTotal) * 100)+"%");
$('[cms-item="minus"]').each(function()
	{
		if (itemTotal == 0)
  			{
    
    			$(this).addClass(greyButton);
    
  			}
	});

$('[cms-item="parent"]').each(function() 
	{
			$(this).find('[cms-item="name"]').attr('ct', counter);
	    $(this).find('[cms-item="quant"]').attr('ct', counter);
	    $(this).find('[cms-item="plus"]').attr('ct', counter);
	    $(this).find('[cms-item="minus"]').attr('ct', counter);
	    counter += 1;
	});

$('[cms-item="parent-added"]').each(function()
	{
		$(this).attr('ct', addedCounter);
		$(this).addClass(boxDivHidden);
		$(this).find('[cms-item="remove"]').attr('ct', addedCounter);
		$(this).find('[cms-item="quant-added"]').attr('ct', addedCounter);
		$(this).find('[cms-item="sku"]').attr('ct', addedCounter);
		addedCounter += 1;
	});

function removeOne(indexNumber)
{
	if (parseInt($('[cms-item="quant"][ct="'+indexNumber+'"]').text()) > 0)
    	{
			itemTotal -= 1;
			var num = parseInt($('[cms-item="quant"][ct="'+indexNumber+'"]').text()) - 1;
			$('[cms-item="quant"][ct="'+indexNumber+'"]').text(num);
			$('[cms-item="quant-added"][ct="'+indexNumber+'"]').text(num);
			changePercentage();
			if (parseInt($('[cms-item="quant"][ct="'+indexNumber+'"]').text()) == 0)
		      {
			      addMinusGrey(indexNumber);

		      }
		    if (itemTotal < packTotal)
			  {
			    removePlusGrey();
			    disallowCart();
			  }
		}
	else{}
}

function addOne(indexNumber)
{
	if (itemTotal < packTotal)
	     {
	     	itemTotal += 1;
	     	var num = parseInt($('[cms-item="quant"][ct="'+indexNumber+'"]').text()) + 1;
	        $('[cms-item="parent-added"][ct="'+indexNumber+'"]').removeClass(boxDivHidden);
	        $('[cms-item="quant"][ct="'+indexNumber+'"]').text(num);
	        $('[cms-item="quant-added"][ct="'+indexNumber+'"]').text(num);
	        if (parseInt($('[cms-item="quant"][ct="'+indexNumber+'"]').text()) == 1)
	          {
	            removeMinusGrey(indexNumber);
	          }
	        if (itemTotal == packTotal)
	          {
	            greyAllPlus();
	            allowCart();
	          }
	        changePercentage();
	     }
    else
    	{
    	}
}

function removeMinusGrey(indexNumber)
{
	$('[cms-item="minus"][ct="'+indexNumber+'"]').removeClass(greyButton);
}

function addMinusGrey(indexNumber)
{
	$('[cms-item="minus"][ct="'+indexNumber+'"]').addClass(greyButton);
    $('[cms-item="parent-added"][ct="'+indexNumber+'"]').addClass(boxDivHidden);
}

function greyAllPlus()
{
	$('[cms-item="plus"]').addClass(greyButton);
}

function removePlusGrey()
{
	$('[cms-item="plus"]').removeClass(greyButton);
}

function removeItem(indexNumber, numItems)
  {
    $('[cms-item="quant"][ct="'+indexNumber+'"]').text(0);
    $('[cms-item="quant-added"][ct="'+indexNumber+'"]').text(0);
    addMinusGrey(indexNumber);
    itemTotal -= numItems;
    if (itemTotal < packTotal)
      {
        removePlusGrey();
        disallowCart();
      }
    changePercentage();
  }

function changePercentage()
{
	$('[cms-item="percentage"]').css("width", ""+((itemTotal / packTotal) * 100)+"%");
	$('[cms-item="percentage-text"]').text(itemTotal);
}

function allowCart()
{
	$('[cms-item="cart-cover"]').addClass(showAddCart);
}

function disallowCart()
{
	$('[cms-item="cart-cover"]').removeClass(showAddCart);
}

$('[cms-item="remove"]').click(function()
  {
    var indexNumber = $(this).attr("ct");
    var sub = parseInt($('[cms-item="quant-added"][ct="'+indexNumber+'"]').text());
    removeItem(indexNumber, sub);
  });

$('[cms-item="minus"]').click(function()
{
    var series = $(this).attr("ct");
    removeOne(series);
});

$('[cms-item="plus"]').click(function(){
	var series = $(this).attr("ct");
    addOne(series);
});

$('[cms-item="cart-cover"]').click(function(){
	if (itemTotal == packTotal)
		{
			addItemsToCart();
		}
});

function addItemsToCart()
{
	let varietyPack = 
		{
			name: $('[cms-item="pack-name"]').text(),
			quantity: 1,
			items: []
		};
	$('[cms-item="parent-added"]').each(function(){
		var indexNumber = parseInt($(this).attr("ct"));
		if (parseInt($('[cms-item="quant-added"][ct="'+indexNumber+'"]').text()) > 0)
			{
				let item = 
					{
						name: $('[cms-item="name"][ct="'+indexNumber+'"]').text(),
						quantity: parseInt($('[cms-item="quant-added"][ct="'+indexNumber+'"]').text()),
						sku: $('[cms-item="sku"][ct="'+indexNumber+'"]').text()
					};
				varietyPack.items.push(item);
			}
	});
	varietyPacks.push(varietyPack);
	localStorage.setItem('varietyPacks', JSON.stringify(varietyPacks));
	resetBuilder();
	$('[cms-item="add-cart"]').click();
}

function resetBuilder()
{
	$('[cms-item="parent-added"]').each(function(){
		var indexNumber = parseInt($(this).attr("ct"));
		var sub = parseInt($('[cms-item="quant-added"][ct="'+indexNumber+'"]').text());
		if (sub > 0)
			{
				removeItem(indexNumber, sub);
			}
	});
}
