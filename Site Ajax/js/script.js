$(function () { // Same as document.addEventListener("DOMContentLoaded"...

  // Same as document.querySelector("#navbarToggle").addEventListener("blur",...
  $("#navbarToggle").blur(function (event) {
    var screenWidth = window.innerWidth;
    if (screenWidth < 768) {
      $("#collapsable-nav").collapse('hide');
    }
  });

  // In Firefox and Safari, the click event doesn't retain the focus
  // on the clicked button. Therefore, the blur event will not fire on
  // user clicking somewhere else in the page and the blur event handler
  // which is set up above will not be called.
  // Refer to issue #28 in the repo.
  // Solution: force focus on the element that the click event fired on
  $("#navbarToggle").click(function (event) {
    $(event.target).focus();
  });
});

(function (global) {

var dc = {};

var homeHtml = "snippets/home-snippet.html";

var allCategoriesUrl="https://davids-restaurant.herokuapp.com/categories.json";
var categoriesTitleHtml= "snippets/categories-title-snippet.html";
var categoryHtml="snippets/category-snippet.html";

var menuItemsUrl="https://davids-restaurant.herokuapp.com/menu_items.json?category=";
var menuItemsTitleHtml="snippets/menu-items-title.html";
var menuItemHtml="snippets/menu-item.html";

// Convenience function for inserting innerHTML for 'select'
var insertHtml = function (selector, html) {
  var targetElem = document.querySelector(selector);
  targetElem.innerHTML = html;
};

// Show loading icon inside element identified by 'selector'.
var showLoading = function (selector) {
  var html = "<div class='text-center'>";
  html += "<img src='images/ajax-loader.gif'></div>";
  insertHtml(selector, html);
};


var insertProperty=function(string,propName,propValue){
  var propToReplace="{{"+propName+"}}";
  string=string.replace(new RegExp(propToReplace,"g"),propValue);
  return string;
}

// Remove the class 'active' from home and switch to Menu button
var switchMenuToActive = function () {
  // Remove 'active' from home button
  var classes = document.querySelector("#navHomeButton").className;
  classes = classes.replace(new RegExp("active", "g"), "");
  document.querySelector("#navHomeButton").className = classes;

  // Add 'active' to menu button if not already there
  classes = document.querySelector("#navMenuButton").className;
  if (classes.indexOf("active") == -1) {
    classes += " active";
    document.querySelector("#navMenuButton").className = classes;
  }
};

// On page load (before images or CSS)
document.addEventListener("DOMContentLoaded", function (event) {

// On first load, show home view
showLoading("#main-content");
$ajaxUtils.sendGetRequest(
  homeHtml,
  function (responseText) {
    document.querySelector("#main-content")
      .innerHTML = responseText;
  },
  false);
});

  //load menu categories view
dc.loadMenuCategories=function(){
  showLoading("#main-content");
  $ajaxUtils.sendGetRequest(allCategoriesUrl,buildAndShowCategoriesHTML);
};

buildAndShowCategoriesHTML=function(categories){
  $ajaxUtils.sendGetRequest(categoriesTitleHtml,
    function(categoriesTitleHtml){
      $ajaxUtils.sendGetRequest(categoryHtml,
        function(categoryHtml){
          var categoriesViewHtml=buildCategoriesHtml(categories,categoriesTitleHtml,categoryHtml);
          
          insertHtml("#main-content",categoriesViewHtml);
          switchMenuToActive();
        },false)
    },false)
}

buildCategoriesHtml=function(categories,categoriesTitleHtml,categoryHtml){
  var finalHtml=categoriesTitleHtml;
  finalHtml+="<section class='row'>";
  //loop over categories
  for (i=0;i<categories.length;i++){
    var html=categoryHtml;
    name=""+categories[i].name;
    short_name=categories[i].short_name;
    html=insertProperty(html,"name",name);
    html=insertProperty(html,"short_name",short_name);
    
    finalHtml+=html;
    
  }
  finalHtml+="</section>";
  return finalHtml
}
dc.loadMenuItems=function(categoryShort){
  showLoading("#main-content");
  $ajaxUtils.sendGetRequest(menuItemsUrl+categoryShort,buildAndShowMenuItemsHTML)
}

var buildAndShowMenuItemsHTML=function(categoryMenuItems){
  $ajaxUtils.sendGetRequest(menuItemsTitleHtml,function(menuItemsTitleHtml){
    $ajaxUtils.sendGetRequest(menuItemHtml,function(menuItemHtml){
      var menuItemsViewHtml=buildMenuItemsViewHtml(categoryMenuItems,menuItemsTitleHtml,menuItemHtml);
      insertHtml("#main-content",menuItemsViewHtml);
    },false)
  },false)
  
}

buildMenuItemsViewHtml=function(categoryMenuItems,menuItemsTitleHtml,menuItemHtml){
  menuItemsTitleHtml=insertProperty(menuItemsTitleHtml,"name",categoryMenuItems.category.name);
  menuItemsTitleHtml=insertProperty(menuItemsTitleHtml,"special_instructions",categoryMenuItems.category.special_instructions);
  var finalHtml=menuItemsTitleHtml;
  finalHtml+="<section class='row'>";
  var catShortName=categoryMenuItems.category.short_name;
  var menuItems=categoryMenuItems.menu_items;
  for (i=0;i<menuItems.length;i++){
    var html=menuItemHtml;
    html=insertProperty(html,"short_name",menuItems[i].short_name);
    html=insertProperty(html,"catShortName",catShortName);
    html=insertItemPrice(html,"price_small",menuItems[i].price_small);
    html=insertItemPortionName(html,"small_portion_name",menuItems[i].small_portion_name);
    html=insertItemPrice(html,"price_large",menuItems[i].price_large);
    html=insertItemPortionName(html,"large_portion_name",menuItems[i].large_portion_name);
    html=insertProperty(html,"name",menuItems[i].name);
    html=insertProperty(html,"description",menuItems[i].description);
    if (i%2!=0){
      html+="<div class='clearfix visible-lg-block visible-md-block'></div>"
    }
    finalHtml+=html;
  }
  finalHtml+="</section>";
  return finalHtml;
}

insertItemPrice=function(html,pricePropName,priceValue){
  if (!priceValue){
    return insertProperty(html,pricePropName,"");
  }else{
    priceValue="$"+priceValue.toFixed(2);
    html=insertProperty(html,pricePropName,priceValue);
    return html;
  }
}
insertItemPortionName=function(html,portionPropName,portionValue){
  if (!portionValue){
    return insertProperty(html,portionPropName,"");
  }else{
    html=insertProperty(html,portionPropName,portionValue);
    return html;
  }
}



global.$dc = dc;

})(window);
