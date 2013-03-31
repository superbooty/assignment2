window.Application = {};

Application.View = Backbone.View.extend({
    render:function () {
        var context = this.model ? this.model.attributes : {},
            output = this.options.template(context);
            console.log(output);
        this.$el.html(output);
    }
});


var productPage = function(id){

    var myCart = new com.wm.Cart();
    var cartData = null;
    var storage = null;
    var productId = id;

    if (typeof(sessionStorage) == 'undefined' ) {
        alert('Your browser does not support HTML5 localStorage. Try upgrading.');
    } else {
        storage = window['sessionStorage'];
        cartData = storage.getItem('jsonCart');
        var parsedData = JSON.parse(cartData);
        if(parsedData != null ){
            myCart.setCartItems(parsedData.cartItems);
            myCart.setSavedItems(parsedData.savedItems);
        }
    }


    // The model
    var ProductModel = Backbone.Model.extend({

        initialize: function() {
            console.log(this.options);
        },

        id: function(){
            return this.itemId;
        },

        defaults:{
            waitImg: 'http://www.walmart.com/js/jquery/ui/theme/walmart/images/updating.gif'
        },

        url:"http://aguevara-linux.corp.walmart.com/search/catalog/itemIds.ems?itemids="+productId,

        productData: {},

        parse:function (data) {
            this.productData = data;
            return data;
        },

        getItemAttributes: function(){
            return this.productData[0].itemAttributes;
        },

        getItemPrice: function(){
            return this.productData[0].sellers[0].currentItemPrice;
        },

        getProductName: function(){
            return this.productData[0].genericContent.itemName;
        },

        getCRR: function(){
            return {rating:this.productData[0].customerRatingRaw, count:this.productData[0].crrcount};
        },

        getAlternateImages: function(){
            if(this.productData[0].alternateImageData == null){
                this.productData[0].alternateImageData = new Array();
                var mainImage = {"imageSrc":this.productData[0].productThumbnailURL,
                    "lgImageSrc": this.productData[0].productImageUrl,
                    "name":null};
                this.productData[0].alternateImageData.push(mainImage);
            }

            return this.productData[0].alternateImageData;
        },

        getProductMainData: function(){
            return this.productData[0].genericContent.shortDescription;
        },

        getProductDetails: function(){
            var productDetails = {};
            productDetails.description = this.productData[0].genericContent.longDescription;
            productDetails.specifications = this.productData[0].itemAttributes;
            return productDetails;
        },

        getCartItem: function() {
            var ret = com.wm.CartItem(
            {   qty:1,
                name:this.getProductName(),
                seller : 0,
                price : this.getItemPrice(),
                hasWarranty : false,
                linkedWarrantyId : 0,
                isPUT : false,
                pickupStore : 0,
                image: this.productData[0].productImageUrl,
                id: this.productData[0].id,
                isSavedItem: false
            })
            return ret;
        }

    });

    var productModel = new ProductModel({id:21311919});
    productModel.fetch();


    // The header
    var HeaderView = Backbone.View.extend({
        initialize:function () {
            this.listenTo(productModel, 'change', this.render);
        },

        render:function () {
            //console.log(productModel.getAlternateImages());
            this.$el.html(this.options.template({crr:productModel.getCRR(), name:productModel.getProductName(), price:productModel.getItemPrice()}));
            $('.header').html(this.el);
            //return this;
        }
    });

    // The carousel
    var CarouselView = Backbone.View.extend({

        initialize:function () {
            this.listenTo(productModel, 'change', this.render);
        },

        render:function () {
            //console.log(productModel.getAlternateImages());
            this.$el.html(this.options.template({images:productModel.getAlternateImages()}));
            $('.carousel-container').html(this.el);
            //return this;
        }
    });

    // Main
    var ProductMainView = Backbone.View.extend({

        initialize:function () {
            this.listenTo(productModel, 'change', this.render);
        },

        render:function () {
            //console.log(productModel.getProductMainData());
            this.$el.html(this.options.template({about:productModel.getProductMainData()}));
            $('.about-container').html(this.el);
            //return this;
        }
    });

    var productMainView = new ProductMainView({
        template:Handlebars.templates['about']
    });


    // Product details
    var ProductDetails = Backbone.View.extend({

        initialize:function () {
            this.listenTo(productModel, 'change', this.render);
        },

        render:function () {
            //console.log(productModel.getProductDetails());
            this.$el.html(this.options.template({details:productModel.getProductDetails()}));
            $('.product-details-container').html(this.el);
            return this;
        }
    });

    // cart options (qty and add to cart buttons)
    var CartOptionsView = Backbone.View.extend({
        events:{
            'click .add-to-cart': 'click'
        },

        click: function(){
            cartData = storage.getItem('jsonCart');
            var toStorage = new Array();
            // do we have cart data
            if(cartData != null){
                toStorage = JSON.parse(cartData);
                myCart.setCartItems(toStorage.cartItems);
                myCart.setSavedItems(toStorage.savedItems);
            }
            myCart.addItem(this.model.getCartItem() );
            storage.setItem('jsonCart', JSON.stringify(myCart ) );

            var cartItemCollection = new CartItemCollection();
            cartItemCollection.reset(myCart.getCartItems());
            var mainHeaderView = new MainHeaderView({
                template:Handlebars.templates['main-header'],
                model: cartItemCollection
            });
            mainHeaderView.render();

            var headerCartView = new HeaderCartView({
                template:Handlebars.templates['header-cart'],
                model:productModel
            });
            headerCartView.render();

        },

        render:function () {
            this.$el.html(this.options.template());
            $('.cart-options-container').html(this.el);
            return this;
            this.delegateEvents(this.events);
        }
    });

    // Buying Options
    var BuyingOptionsModel = Backbone.Model.extend({
        defaults: {
            listEntry1: {label:'Find This Product Locally', img:'../img/find-icon.png'},
            listEntry2: {label:'Calculate Arrival Date', img:'../img/arrival-icon.png'},
            listEntry3: {label:'Share With a Friend', img:'../img/share-icon.png'}
        }
    });

    var buyingOptionsModel = new BuyingOptionsModel();

    var BuyingOptionsView = Backbone.View.extend({

        render:function () {
            //console.log(this.model);
            this.$el.html(this.options.template({listValues:this.model.attributes}));
            $('.buying-options-container').html(this.el);
            return this;
        }
    });

    var PeopleViewedItem = Backbone.Model.extend({

    });

    // People who viewed
    var PeopleViewedCollection = Backbone.Collection.extend({
        url: "json/products.json",

        model: PeopleViewedItem,

        parse: function(response) {
            return response;
        },

        bySizeAndHigher: function(minSize) {
            filtered = this.filter(function(item) {
                return item.get("size") >= minSize;
            });
            console.log(filtered);
            this.reset(filtered);
            return new PeopleViewedCollection(filtered);
        }
    });
    var peopleViewedCollection = new PeopleViewedCollection();

    var peopleViewedListView = Backbone.View.extend({

        initialize:function () {
            this.listenTo(this.model, 'reset', this.render);

        },

        events:{
            'click .see-more-button': 'click'
        },

        click: function(){
            console.log("you clicked see more button");
            peopleViewedCollection.bySizeAndHigher(50);
        },

        render:function(){
            var data = this.model.toJSON();
            console.log(peopleViewedCollection);
            this.$el.html(this.options.template({items:data}));
            $('.people-who').html(this.el);
        }

    });


    var ProductPageView = Backbone.View.extend({

        render: function(){
            $('.selected-product').fadeOut(1000);
            var peopleViewedView = new peopleViewedListView({
                template: Handlebars.templates['people-who-viewed'],
                model: peopleViewedCollection
            });
            peopleViewedCollection.fetch();

            var buyingOptionsView = new BuyingOptionsView({
                template:Handlebars.templates['buying-options'],
                model: buyingOptionsModel
            });
            buyingOptionsView.render();

            var cartOptionsView = new CartOptionsView({
                template:Handlebars.templates['cart-options'],
                model: productModel
            });
            cartOptionsView.render();

            var carouselView = new CarouselView({
                template:Handlebars.templates['carousel']
            });

            var productDetails = new ProductDetails({
                template:Handlebars.templates['product-details']
            });

            var headerView = new HeaderView({
                template:Handlebars.templates['header']
            });
            $('.cart-page').hide();

            var product = function () {
                var o = $('.cart').offset();
                $('.selected-product').css({ 'top': o.top + 60,
                    'left': o.left - (750 - 120)
                });
                $('.selected-product').slideDown(1000);
            }
            product();
        }

    });

    var productPageView = new ProductPageView({});
    return productPageView;

}
