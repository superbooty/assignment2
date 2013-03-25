window.Application = {};

Application.View = Backbone.View.extend({
    render:function () {
        var context = this.model ? this.model.attributes : {},
            output = this.options.template(context);
            console.log(output);
        this.$el.html(output);
    }
});


$(function () {

    var myCart = new com.wm.Cart();
    var cartData = null;
    var storage = null;

    if (typeof(sessionStorage) == 'undefined' ) {
        alert('Your browser does not support HTML5 localStorage. Try upgrading.');
    } else {
        storage = window['sessionStorage'];
        cartData = storage.getItem('jsonCart');
        var parsedData = JSON.parse(cartData);
        myCart.setCartItems(parsedData.cartItems);
        myCart.setSavedItems(parsedData.savedItems);
    }

    var productId = 21311919;
    // Router for loading a different item
    var ProductRouter = Backbone.Router.extend({
        routes: {
            ":id": "getProduct"
        },

        getProduct: function(id){
            productId = id;

        }

    });
    var productRouter = new ProductRouter;
    Backbone.history.start();

    // The model
    var ProductModel = Backbone.Model.extend({

        initialize: function() {
            console.log(this.options);
        },

        id: 21311919,

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

    var headerView = new HeaderView({
        template:Handlebars.templates['header']
    });

    // The main header
    var MainHeaderView = Backbone.View.extend({

        events:{
            'click .cart': 'goToCart'
        },

        goToCart: function(){
            console.log("going to the cart");
            window.location.href = '/pages/cart/cart.html'
        },

        render:function () {
            console.log("mainHeaderView is rendering");
            this.$el.html(this.options.template({cartSize:myCart.getCartSize()}));
            $('.main-header').html(this.el);
            //return this;
        }
    });

    var mainHeaderView = new MainHeaderView({
        template:Handlebars.templates['main-header']
    });
    mainHeaderView.render();

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

    var carouselView = new CarouselView({
        template:Handlebars.templates['carousel']
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

    var productDetails = new ProductDetails({
        template:Handlebars.templates['product-details']
    });

    // cart options (qty and add to cart buttons)
    var CartOptionsView = Backbone.View.extend({
        events:{
            'click .add-to-cart': 'click'
        },

        click: function(){
            console.log("you clicked add to cart button");
            cartData = storage.getItem('jsonCart');
            var toStorage = new Array();
            // do we have cart data
            if(cartData != null){
                toStorage = JSON.parse(cartData);
                myCart.setCartItems(toStorage.cartItems);
                myCart.setSavedItems(toStorage.savedItems);
            }
            console.log(myCart);
            myCart.addItem(this.model.getCartItem() );
            storage.setItem('jsonCart', JSON.stringify(myCart ) );
            mainHeaderView.render();
        },

        render:function () {
            this.$el.html(this.options.template());
            $('.cart-options-container').html(this.el);
            return this;
        }
    });

    var cartOptionsView = new CartOptionsView({
        template:Handlebars.templates['cart-options'],
        model: productModel
    });
    cartOptionsView.render();

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

    var buyingOptionsView = new BuyingOptionsView({
        template:Handlebars.templates['buying-options'],
        model: buyingOptionsModel
    });
    buyingOptionsView.render();

    // People who viewed
    var PeopleViewedModel= Backbone.Model.extend({
        url: "json/products.json",
        parse: function(response) {
            return response;
        }
    });
    var peopleViewedModel = new PeopleViewedModel();

    var peopleViewedListView = Backbone.View.extend({
        render:function(){
            var data = this.model.toJSON();
            console.log(data);
            this.$el.html(this.options.template(data));
            $('.people-who').append(this.el);
        }

    });

    var peopleViewedView = new peopleViewedListView({
        template: Handlebars.templates['people-who-viewed'],
        model: peopleViewedModel
    });

    peopleViewedModel.fetch({success:function(data){
        peopleViewedView.render();
    }});

});