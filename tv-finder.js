window.Application = {};

Application.View = Backbone.View.extend({
    render:function () {
        var context = this.model ? this.model.attributes : {},
            output = this.options.template(context);
        console.log(output);
        this.$el.html(output);
    }
});

$(function(){

    // Router for loading a different item
    var ProductRouter = Backbone.Router.extend({
        routes: {
            "" : "loadTVFinderMain",
            "product/:id": "loadProduct",
            "cart": "loadCart"
        },

        loadTVFinderMain: function(){
            console.log("loading TV Finder");
            $('#screen').css({ "display": "none", opacity: 0.7, top: "83px", "width":$(document).width(),"height":$(document).height()});
            tvFinder().render();
        },

        loadProduct: function(id){
            console.log("loading Product");
            var pop = function(){
                $('#screen').css({ "display": "block", opacity: 0.7, top: "83px", "width":$(document).width(),"height":$(document).height()});
                productPage(id).render();
            }
            pop();

        },

        loadCart: function(){
            console.log("loading Cart");
            var pop = function(){
                $('#screen').css({ "display": "block", opacity: 0.7, top: "83px", "width":$(document).width(),"height":$(document).height()});
                cartPage();
            }
            pop();
        }

    });
    var productRouter = new ProductRouter();

    Backbone.history.start();

});

var HeaderCartView = Backbone.View.extend({
    render:function () {
        this.$el.html(this.options.template({cartItem:this.model.getCartItem()}));
        $('.header-cart-container').html(this.el);
        $("html, body").animate({ scrollTop: 0 }, 0);

        var pCart = function () {
            var o = $('.cart').offset();
            $('.header-cart-container').css({ 'top': o.top + 52,
                'left': o.left - 110 });
            $(".cart").addClass('cart-blink');
            $('.header-cart-container').slideDown(500);
            setTimeout(function() {
                $('.header-cart-container').slideUp(500);
                $(".cart").removeClass('cart-blink');
            }, 3500);

        }
        pCart();

        return this;
    }
});

var CartItemCollection = Backbone.Collection.extend({

    getCartSize: function(){
        var ret = 0;
        var items = this.toJSON();
        items.forEach(function(e){
            var qty = e.qty;
            ret += qty;
        });
        return ret;
    }
});

// The main header
var MainHeaderView = Backbone.View.extend({

    initialize: function(cart){
        this.listenTo(this.model, 'reset', this.render())
    },

    events:{
        'click .cart': 'goToCart',
        'click .gh-logo': 'tvFinder'
    },

    goToCart: function(){
        console.log("going to the cart");
        window.location.href = '#/cart';
    },

    tvFinder: function(){
        console.log("going to main");
        window.location.href = '/';
    },

    render:function () {
        console.log("mainHeaderView is rendering");
        this.$el.html(this.options.template({cartSize:this.model.getCartSize()}));
        $('.main-header').html(this.el);

        this.delegateEvents(this.events);
    }
});

var tvFinder = function () {

    var myCart = new com.wm.Cart();
    var cartData = null;
    var storage = null;


    var collectionMeta ={
        "maxsize": 73,
        "minsize": 19,
        "brandName": ["Vizio", "Sanyo", "Sceptre",
        "Hannspree", "RCA", "Element",
        "Toshiba", "Westinghouse", "Samsung",
        "Philips", "Hiteker", "Sharp",
        "Emerson", "Proscan", "JVC", "LG", "Mitsubishi"]};

    if (typeof(sessionStorage) == 'undefined') {
        alert('Your browser does not support HTML5 localStorage. Try upgrading.');
    } else {
        storage = window['sessionStorage'];
        cartData = storage.getItem('jsonCart');
        var parsedData = JSON.parse(cartData);
        if (parsedData != null) {
            myCart.setCartItems(parsedData.cartItems);
            myCart.setSavedItems(parsedData.savedItems);
        }
    }

    var cartItemCollection = new CartItemCollection();
    cartItemCollection.reset(myCart.getCartItems());

    var ProductModel = Backbone.Model.extend({

    });

    // People who viewed
    var ProductCollection = Backbone.Collection.extend({
        url: "json/products-full.json",

        model: ProductModel,

        original: [],

        parse: function (response) {
            this.original = response;
            return response;
        },

        filterBySize: function (minSize) {
            filtered = this.filter(function (item) {
                return item.get("size") >= minSize;
            });
            this.reset(filtered);
        },

        filterOnRange: function(range) {
            filtered = this.filter(function (item) {
                return item.get("size") >= range.low
                    && item.get("size") <= range.high;
            });
            this.reset(filtered);
        },

        filterOnName: function(value){
            filtered = this.filter(function (item) {
                console.log(item);
                return item.get("name").match(value);
            });
            return this.reset(filtered);
        }

    });
    var productCollection = new ProductCollection();

    var ShelfContainerView = Backbone.View.extend({

        initialize: function () {
            console.log("init ShelfContainerView");
            this.listenTo(this.model, 'reset', this.render);

        },

        events: {
            'click .see-more-button': 'click',
            'click .product-finder-filter-clear-btn': 'resetFinderCollection'
        },

        resetFinderCollection: function(){
            this.model.reset(productCollection.original);
            productFinderFilterView.render();
        },

        click: function () {
            productCollection.bySizeAndHigher(50);
        },

        render: function () {
            var data = this.model.toJSON();
            this.$el.html(this.options.template({items: data, matches: data.length}));
            $('.shelf-view-container').html(this.el);
            this.delegateEvents(this.events);
        }

    });

    var ProductFinderFilterView = Backbone.View.extend({
        initialize: function () {
            console.log("init ProductFinderFilterView");

        },

        events:{
            'click .sort-button': 'click',
            'click .brand-button': 'click',
            'click .type-button': 'click',
            'click .opt' : 'select',
            'mouseleave .options' : 'mouseleave'
        },

        click : function(event) {
            console.log(event.currentTarget);
            $(event.currentTarget).find('.options').css({visibility:'visible'});
        },

        select : function(event) {
            var context = this.model.attributes;
            var filterOnValue = $(event.target).text();
            $(event.currentTarget).parent().parent().find('.text').text($(event.target).text());
            $(event.currentTarget).parent().find('.options').css({visibility:'hidden'});
            event.stopPropagation();
            productCollection.filterOnName(filterOnValue);
        },

        mouseleave : function(event) {
            this.$el.find('.options').css({visibility:'hidden'});
            event.stopPropagation();
        },

        render: function () {
            var data = this.model.toJSON();
            console.log(data);
            //var items = data[0].item;
            this.$el.html(this.options.template({brands:collectionMeta.brandName}));
            $('.product-finder-filter-container').html(this.el);

            $("#range-value2").css({left:"-27px", top:"-55px"}).show();
            $("#range-value1").css({left:"-27px", top:"-55px"}).show()

            $("#slider-range").slider({
                range:true,
                min:1,
                max:100,
                values:[ collectionMeta.minsize, collectionMeta.maxsize ],
                slide:function (event, ui) {
                    $("#range-value1").html(ui.values[0]+"\"");
                    $("#range-value2").html(ui.values[1]+"\"");
                },

                stop: function(event, ui){
                    var range = {"low":ui.values[0], "high":ui.values[1]};
                    productCollection.filterOnRange(range);
                }
            });

            $("#slider-range").find('a:last').append($("#range-value2")).css({outline:"0 none"});
            $("#slider-range").find('a:first').append($("#range-value1")).css({outline:"0 none"});

            this.delegateEvents(this.events);

        }



    });

    var productFinderFilterView = new ProductFinderFilterView({
        template: Handlebars.templates['product-finder-filters'],
        model: productCollection
    });

    var TVFinderMainView = Backbone.View.extend({

        render: function () {
            productCollection.fetch();
            var shelfContainerView = new ShelfContainerView({
                template: Handlebars.templates['shelf-view'],
                model: productCollection
            });

            var mainHeaderView = new MainHeaderView({
                template: Handlebars.templates['main-header'],
                model: cartItemCollection
            });

            $('.cart-page').hide();
            $('.selected-product').hide();
            productFinderFilterView.render();


        }

    });

    var tvFinderMainView = new TVFinderMainView({});
    return tvFinderMainView;

};

