(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['about'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


  buffer += "\n<section class=\"about\">\n    <header class=\"about-header\">\n        About\n    </header>\n    <div class=\"clear\"></div>\n    <div class=\"about-data\">\n        ";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.rawText),stack1 ? stack1.call(depth0, depth0.about, options) : helperMissing.call(depth0, "rawText", depth0.about, options)))
    + "...<a href=\"#\">Continue Reading</a>\n    </div>\n</section>";
  return buffer;
  });
templates['buying-options'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<section class=\"buying-options\">\n    <ul>\n        <li>\n            <img src=\""
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.listValues),stack1 == null || stack1 === false ? stack1 : stack1.listEntry1)),stack1 == null || stack1 === false ? stack1 : stack1.img)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"/>"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.listValues),stack1 == null || stack1 === false ? stack1 : stack1.listEntry1)),stack1 == null || stack1 === false ? stack1 : stack1.label)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n        </li>\n        <li>\n            <img src=\""
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.listValues),stack1 == null || stack1 === false ? stack1 : stack1.listEntry2)),stack1 == null || stack1 === false ? stack1 : stack1.img)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"/>"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.listValues),stack1 == null || stack1 === false ? stack1 : stack1.listEntry2)),stack1 == null || stack1 === false ? stack1 : stack1.label)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n        </li>\n        <li>\n            <img src=\""
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.listValues),stack1 == null || stack1 === false ? stack1 : stack1.listEntry3)),stack1 == null || stack1 === false ? stack1 : stack1.img)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"/>"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.listValues),stack1 == null || stack1 === false ? stack1 : stack1.listEntry2)),stack1 == null || stack1 === false ? stack1 : stack1.label)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n        </li>\n    </ul>\n</section>";
  return buffer;
  });
templates['carousel'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n            <li><img src=\"";
  if (stack1 = helpers.lgImageSrc) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.lgImageSrc; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" width=\"400\" height=\"325\" /></li>\n            ";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                    <li><a rel=\""
    + escapeExpression(((stack1 = data.index),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" class=\"pagenum\" href=\"#\"></a></li>\n                ";
  return buffer;
  }

  buffer += "<script type=\"text/javascript\">\n    $(document).ready(function(){\n        $('#slider-code').tinycarousel({pager:true, controls:true});\n    });\n</script>\n<div id=\"slider-code\">\n    <a class=\"buttons prev\" href=\"#\">left</a>\n    <div class=\"viewport\">\n        <ul class=\"overview\">\n            ";
  stack1 = helpers.each.call(depth0, depth0.images, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n        </ul>\n    </div>\n    <a class=\"buttons next\" href=\"#\">right</a>\n    <div class=\"carousel-separator\">\n        <ul class=\"pager\">\n            <ul class=\"poverview\">\n                ";
  stack1 = helpers.each.call(depth0, depth0.images, {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n            </ul>\n        </ul>\n    </div>\n</div>";
  return buffer;
  });
templates['cart-options'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  


  return "<div class=\"filter\">\n    <div class=\"qty-button\">\n        <span class=\"text\">Qty</span><b class=\"qty-button-arrow\"></b>\n        <div class=\"options\">\n            <ul>\n                <li class=\"opt\">1</li>\n                <li class=\"opt\">2</li>\n                <li class=\"opt\">3</li>\n            </ul>\n\n        </div>\n    </div>\n</div>\n<input class=\"add-to-cart\" type=\"button\" value=\"Add to Cart\">\n<div class=\"add-to-cart-confirm\" style=\"position:absolute; display:none; width:300px; height:300px; border-style:solid; border-width:1px; border-color:#F3F3F3\">\n       Adding item to Cart\n</div>";
  });
templates['header-cart'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, options, functionType="function", escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing;


  buffer += "<div class=\"header-cart-item\">\n    <br class=\"clear\" />\n    <span class=\"item-name\">"
    + escapeExpression(((stack1 = ((stack1 = depth0.cartItem),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n    <div class=\"item-image\"><img src=\""
    + escapeExpression(((stack1 = ((stack1 = depth0.cartItem),stack1 == null || stack1 === false ? stack1 : stack1.image)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" width=\"150\" height=\"150\"/></div>\n    <span class=\"item-qty\">Quantity: "
    + escapeExpression(((stack1 = ((stack1 = depth0.cartItem),stack1 == null || stack1 === false ? stack1 : stack1.qty)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n    <span class=\"item-price\">Price: $";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers['number-format']),stack1 ? stack1.call(depth0, ((stack1 = depth0.cartItem),stack1 == null || stack1 === false ? stack1 : stack1.price), options) : helperMissing.call(depth0, "number-format", ((stack1 = depth0.cartItem),stack1 == null || stack1 === false ? stack1 : stack1.price), options)))
    + "</span>\n</div>";
  return buffer;
  });
templates['header'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, stack2, options, functionType="function", escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n            <p class=\"product-name\">";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</p>\n        ";
  return buffer;
  }

  buffer += "\n<section class=\"product-header\">\n    <section class=\"product-name\">\n        ";
  stack1 = helpers['if'].call(depth0, depth0.name, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        <a href=\"/\"><img src=\"/img/close-panel.png\" alt=\"close\" /></a>\n        <div class=\"clear\"></div>\n    </section>\n    <section class=\"product-rating-container\">\n        <div class=\"product-rating\" >\n            <span class=\"gray\">\n                <span class=\"gold\" style=\"width:";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.crr),stack1 ? stack1.call(depth0, ((stack1 = depth0.crr),stack1 == null || stack1 === false ? stack1 : stack1.rating), options) : helperMissing.call(depth0, "crr", ((stack1 = depth0.crr),stack1 == null || stack1 === false ? stack1 : stack1.rating), options)))
    + "\">\n                </span>\n            </span>\n        </div>\n        <span class=\"product-review-links\" id=\"review-links\">&nbsp;&nbsp;"
    + escapeExpression(((stack1 = ((stack1 = depth0.crr),stack1 == null || stack1 === false ? stack1 : stack1.count)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " Reviews  |  <a href=\"#\">Write a Review</a>  | <a href=\"#\">Ask a Question</a></span>\n        <div class=\"clear\"></div>\n    </section>\n    <section class=\"product-price-container\">\n        <section class=\"product-price\">\n            <span>$";
  if (stack2 = helpers.price) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.price; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "</span>\n        </section>\n    </section>\n</section>";
  return buffer;
  });
templates['index'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  if (stack1 = helpers.greeting) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.greeting; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + " world!";
  return buffer;
  });
templates['main-header'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<header class=\"gh-head clearfix\">\n    <div class=\"gh-logo\"><span class=\"text\">Walmart</span><img class=\"spark\" src=\"img/spark.png\"/></div>\n    <div class=\"gh-srch\"></div>\n    <div class=\"gh-links\">\n        <div class=\"gh-link bd\"><span class=\"create\">Create</span><br/><span class=\"text\">a new wish list</span></div>\n        <div class=\"gh-link bd\"><span class=\"signin\">Sign In</span><br/><span class=\"text\">to your account</span></div>\n        <div class=\"gh-link\"><span class=\"cart\">";
  if (stack1 = helpers.cartSize) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.cartSize; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + " Items</span><br/><span class=\"text\">in your cart</span></div>\n    </div>\n</header>";
  return buffer;
  });
templates['people-who-viewed'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, stack2, options;
  buffer += "\n                ";
  options = {hash:{
    'compare': (20)
  },inverse:self.noop,fn:self.program(2, program2, data),data:data};
  stack2 = ((stack1 = helpers.if_lt),stack1 ? stack1.call(depth0, data.index, options) : helperMissing.call(depth0, "if_lt", data.index, options));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n                ";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1, options;
  buffer += "\n                <div class=\"people-viewed-item\">\n                    <a href=\"/#product/";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\"><img src=\"";
  if (stack1 = helpers.image) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.image; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\"/></a>\n                    <a class=\"people-viewed-item-name\" href=\"/#product/";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">\n                        <div class=\"\">";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</div>\n                    </a>\n                    <div class=\"clear\"></div>\n                    <span class=\"people-viewed-item-specs text-gray\">";
  if (stack1 = helpers.description) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.description; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</span>\n                    <span class=\"people-viewed-item-price people-viewed-item-specs\">$";
  if (stack1 = helpers.price) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.price; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "<span class=\"cents\"></span></span>\n                    <div class=\"people-viewed-item-specs product-rating\" >\n                    <span class=\"gray\">\n                        <span class=\"gold\" style=\"width:";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.crr),stack1 ? stack1.call(depth0, depth0.rating, options) : helperMissing.call(depth0, "crr", depth0.rating, options)))
    + "\">\n                        </span>\n                    </span>\n                    </div>\n                </div>\n                ";
  return buffer;
  }

  buffer += "<script type=\"text/javascript\">\n    $(document).ready(function(){\n        $('#slider-code-pwv').tinycarousel({controls:true, display:3});\n    });\n</script>\n<div class=\"horizBorder\"><p class=\"inset\"></p></div>\n<div id=\"people-viewed-title\">\n    People Who Viewed This Item Also Viewed<a href=\"#\" class=\"see-more-button\">see more</a>\n</div>\n<div id=\"people-viewed-container\">\n\n\n    <div id=\"slider-code-pwv\">\n        <a class=\"buttons prev\" href=\"javascript:void(0)\">left</a>\n        <div class=\"viewport-pwv\">\n            <ul class=\"overview\">\n                ";
  stack1 = helpers.each.call(depth0, depth0.items, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n            </ul>\n        </div>\n        <a class=\"buttons next\" href=\"javascript:void(0)\">right</a>\n    </div>\n    <br class=\"clear\" />\n</div>\n<div class=\"people-viewed-bottom-gradient\"></div>\n\n\n";
  return buffer;
  });
templates['product-details'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, stack2, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                <tr>\n                    <td class=\"LightRowHead\">\n                        ";
  if (stack1 = helpers.attributeName) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.attributeName; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\n                    </td>\n                    <td class=\"LightRow\">\n                        ";
  if (stack1 = helpers.attributeValue) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.attributeValue; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\n                    </td>\n                </tr>\n                ";
  return buffer;
  }

  buffer += "<script src=\"../js/tab.js\"></script>\n<div class=\"product-details\">\n\n    <div class=\"wrapper\">\n        <h2>\n            Product Details\n        </h2>\n        <div id=\"v-nav\" >\n            <ul>\n                <li tab=\"tab1\" class=\"first current\"><span class=\"product-detail-tab-name\">Description</span></li>\n                <li tab=\"tab2\"><span class=\"product-detail-tab-name\">Specifications</span></li>\n                <li tab=\"tab3\"><span class=\"product-detail-tab-name\">Warranty</span></li>\n                <li tab=\"tab4\"><span class=\"product-detail-tab-name\">Financing</span></li>\n                <li tab=\"tab5\" class=\"last\"><span class=\"product-detail-tab-name\">Gifting</span></li>\n            </ul>\n\n            <div class=\"tab-content\" style=\"display:block\">\n                ";
  stack2 = ((stack1 = ((stack1 = depth0.details),stack1 == null || stack1 === false ? stack1 : stack1.description)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1);
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n            </div>\n\n            <div class=\"tab-content\">\n                <table class=\"spec-table\">\n                    <colgroup><col width=\"40%\">\n                        <col width=\"60%\">\n                    </colgroup><tbody>\n                ";
  stack2 = helpers.each.call(depth0, ((stack1 = depth0.details),stack1 == null || stack1 === false ? stack1 : stack1.specifications), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n                </tbody></table>\n            </div>\n\n            <div class=\"tab-content\">\n                <div class=\"ItemSectionContent\">\n                    <div class=\"WarrantyService BodyXL\">\n                        <div>\n                            <strong>Product warranty:</strong>\n                            <a onclick=\"s_objectID=&quot;javascript:void(0);_15&quot;;return this.s_oc?this.s_oc(e):true\" href=\"javascript:void(0);\">See details</a>\n                        </div>\n                        <!-- Start: if service plans available -->\n                        <!-- End: if service plans available -->\n                    </div>\n                    <!--start of modify-->\n                    <div class=\"WarrantyServiceMain BodyL\">\n                        <div class=\"multiCol greybar-box\">\n                            <div class=\"greybar-noheader\">\n                                <div class=\"tl mainSpriteBKG\">\n                                    <div class=\"tr mainSpriteBKG\">\n                                        <div class=\"tc mainSpriteBKG\"></div>\n                                    </div>\n                                </div>\n                            </div>\n                            <div class=\"greybar-body clearfix\">\n                                <img width=\"110px\" height=\"105px\" border=\"0\" src=\"http://i.walmartimages.com/i/p/00/02/95/15/40/0002951540080_100X100.jpg\" class=\"picleft\" alt=\"Protect it\">\n                                <div class=\"Summary\"><strong>Walmart Product Care Plans</strong>\n                                    <p>A limited product warranty is included free for most items. With an optional Walmart Care Plan you can extend coverage up to 3 additional years. Walmart Care Plan Extended Warranties cover 100% of the cost for repair or replacement, including shipping charges for the exchange. <a onclick=\"s_objectID=&quot;javascript:void(0);_16&quot;;return this.s_oc?this.s_oc(e):true\" href=\"javascript:void(0);\">See Details</a></p>\n                                    <p class=\"mt20\">We'll show you extended warranty options and pricing at checkout if applicable.</p>\n                                </div>\n                            </div>\n                            <div class=\"greybar-footer\">\n                                <div class=\"bl mainSpriteBKG\"><div class=\"br mainSpriteBKG\"><div class=\"bc\"></div></div></div>\n                            </div>\n                        </div>\n                        <span>If you made your purchase in a Walmart store and would like to purchase a warranty <a title=\"Warranty &amp; Installation Plans\" href=\"http://see.walmart.com/walmart/protection-plans/\" onclick=\"s_objectID=&quot;http://see.walmart.com/walmart/protection-plans/_1&quot;;return this.s_oc?this.s_oc(e):true\">Click Here</a></span>\n                    </div>\n                    <!--start of modify-->\n                </div>\n            </div>\n\n            <div class=\"tab-content\">\n                <div class=\"BodyXL ItemSectionContent PaymentOptions\">\n                    <!-- Start: if Bill Me Later applies -->\n                    <h4 style=\"font-family:Verdana,sans-serif;\" class=\"BodyXLBold\">Enjoy Great Financing!</h4>\n                    <img width=\"91\" height=\"51\" src=\"http://i2.walmartimages.com/i/spacer.gif\" class=\"CreditCardImg mainSpriteICN sprite-a111_WMCC_91x51\" alt=\"\">\n                    <div class=\"CreditOffer\">Make the most of your shopping experience with the Walmart Discover<sup>&reg;</sup> or Walmart Credit Card.</div>\n                    <!-- Commented for the new instant credit card offers :19/Dec Svenkataraman-->\n                    <p>Open a Walmart Credit Card, Spend $100 Today and Get $20 Back*</p>\n                    <p>*Offer subject to credit approval</p>\n                    <p><a onclick=\"s_objectID=&quot;http://www.walmart.com/cservice/contextual_help_popup.gsp?modId=447772_1&quot;;return this.s_oc?this.s_oc(e):true\" href=\"/cservice/contextual_help_popup.gsp?modId=447772\">Learn More</a> or <a href=\"/instantcredit\" onclick=\"s_objectID=&quot;http://www.walmart.com/instantcredit_1&quot;;return this.s_oc?this.s_oc(e):true\">Apply Now</a></p>\n                    <div class=\"BodyXLBold NoPayOffer\">No Payments + No Interest <span class=\"BodyXL\">if Paid in Full in 6 Months!</span></div>\n                    <img width=\"100\" height=\"25\" src=\"http://i2.walmartimages.com/i/spacer.gif\" class=\"mainSpriteICN sprite-a112_BMLR\" alt=\"\">\n                    <div class=\"BuyNow\">Enjoy no payments for 6 months. You'll have 6 months with no payments, and no interest if paid in full within 6 months on orders over $250. Otherwise, interest will be charged from the original date of purchase. Bill Me Later is the quick, easy, secure way to buy online without using your credit card. Simply select Bill Me Later at checkout. Subject to credit approval.</div>\n                    <p class=\"clear\"><!-- --></p>\n                    <p><a onclick=\"s_objectID=&quot;https://www.securecheckout.billmelater.com/paycapture-content/fetch?hash=28A27SUA&amp;content=/bmlweb_1&quot;;return this.s_oc?this.s_oc(e):true\" href=\"https://www.securecheckout.billmelater.com/paycapture-content/fetch?hash=28A27SUA&amp;content=/bmlweb/np90drollingiw.html\">See Terms</a></p>\n                </div>\n            </div>\n            <div class=\"tab-content\">\n\n            </div>\n\n        </div>\n    </div>\n\n</div>";
  return buffer;
  });
templates['product-finder-filters'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  


  return "<section class=\"product-finder-filter-selectors\">\n    <div class=\"product-finder-filter-img\">\n        <div class=\"finder\"><div class=\"spark\"></div><div class=\"text\"><b>TV</b>Finder</div></div>\n    </div>\n    <section class=\"product-finder-filter-slider\">\n        <div id=\"range-value1\" class=\"bubble\">19\"</div>\n        <div id=\"range-value2\" class=\"bubble\">73\"</div>\n        <div id=\"slider-range\"></div>\n    </section>\n</section>\n<section class=\"product-finder-filter-break\" >\n    <h2></h2>\n</section>\n";
  });
templates['shelf-view'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, self=this, helperMissing=helpers.helperMissing, functionType="function", escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  var buffer = "", stack1, stack2, options;
  buffer += "\n";
  options = {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data};
  stack2 = ((stack1 = helpers.everyNth),stack1 ? stack1.call(depth0, data.index, 4, options) : helperMissing.call(depth0, "everyNth", data.index, 4, options));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n<section class=\"shelf_item\">\n    <a href=\"#/product/";
  if (stack2 = helpers.id) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.id; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "\"><img class=\"lazy\" src=\"";
  if (stack2 = helpers.image) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.image; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "\"/></a>\n\n    <div class=\"shelf-item-name\">\n        ";
  if (stack2 = helpers.name) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.name; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "\n    </div>\n    <div class=\"shelf-item-desc\">\n        ";
  options = {hash:{},data:data};
  stack2 = ((stack1 = helpers.desc),stack1 ? stack1.call(depth0, depth0.description, options) : helperMissing.call(depth0, "desc", depth0.description, options));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n    </div>\n    <div class=\"shelf-item-price\">\n        $";
  if (stack2 = helpers.price) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.price; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "\n    </div>\n    <div class=\"shelf-item-ratings\" style=\"background-position:-";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.ratingsHelper),stack1 ? stack1.call(depth0, depth0.rating, options) : helperMissing.call(depth0, "ratingsHelper", depth0.rating, options)))
    + "px\" >\n        <div title=\"\"></div>\n    </div>\n</section>\n";
  return buffer;
  }
function program2(depth0,data) {
  
  
  return "\n<div style=\"clear:both\"></div>\n";
  }

  buffer += "<section class=\"product-finder-filter-results\">\n    <div class=\"product-finder-filter-msg\">\n        <span class=\"item-counter item-counter-bold\">";
  if (stack1 = helpers.matches) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.matches; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</span><span class=\"item-counter\"> matches for televisions fitting that criteria</span>\n    </div>\n    <input type=\"button\" value=\"Clear Filters \" class=\"product-finder-filter-clear-btn\">\n</section>\n";
  stack1 = helpers.each.call(depth0, depth0.items, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  return buffer;
  });
templates['test-helper'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, stack2, functionType="function", escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1, stack2, options;
  buffer += "\n        <div class=\"test\">\n            ";
  options = {hash:{},inverse:self.program(4, program4, data),fn:self.program(2, program2, data),data:data};
  stack2 = ((stack1 = helpers.equal),stack1 ? stack1.call(depth0, data.index, 0, options) : helperMissing.call(depth0, "equal", data.index, 0, options));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n        </div>\n        ";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n               <div >I found Nick: ";
  if (stack1 = helpers.email) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.email; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</div>\n            ";
  return buffer;
  }

function program4(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n               <div >I found ";
  if (stack1 = helpers.first_name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.first_name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</div>\n\n            ";
  return buffer;
  }

  buffer += "\n<div>\n        "
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.myData),stack1 == null || stack1 === false ? stack1 : stack1.people)),stack1 == null || stack1 === false ? stack1 : stack1.first_name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n        <p>This is the famous test helper </p>\n        ";
  stack2 = helpers.each.call(depth0, ((stack1 = depth0.myData),stack1 == null || stack1 === false ? stack1 : stack1.people), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n\n</div>";
  return buffer;
  });
templates['user'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <section>name: ";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</section>\n        <section><a href=\"#\">";
  if (stack1 = helpers.org) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.org; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</a></section>\n        <section>role: ";
  if (stack1 = helpers.role) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.role; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</section>\n        ";
  return buffer;
  }

  buffer += "<div>\n\n    <section>\n        This is how we roll...\n        ";
  stack1 = helpers.each.call(depth0, depth0.items, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </section>\n\n</div>";
  return buffer;
  });
})();