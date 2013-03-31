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
            "" : "tvFinderMain",
            "product/:id": "getProduct",
            "cart": "loadCart"
        },

        tvFinderMain: function(){
            console.log("loading TV Finder");
            tvFinder().render();
        },

        getProduct: function(id){

            var pop = function(){
                $('#screen').css({ "display": "block", opacity: 0.7, top: "83px", "width":$(document).width(),"height":$(document).height()});
                productPage(id).render();
            }
            pop();

        },

        loadCart: function(){
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
            $('.header-cart-container').css({ 'top': o.top + 54,
                'left': o.left - 158
            });
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
        console.log("CartItemCollection");
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
        console.log(this.model.toJSON());
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
        "Emerson", "Proscan", "JVC", "LG", "Mitsubishi"]}

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
            console.log(filtered);
            this.reset(filtered);
        },

        filterOnRange: function(range) {
            console.log(this);
            filtered = this.filter(function (item) {
                return item.get("size") >= range.low
                    && item.get("size") <= range.high;
            });
            this.reset(filtered);
        }
    });
    var productCollection = new ProductCollection();

    var ShelfContainerView = Backbone.View.extend({

        initialize: function () {
            console.log("i'm here");
            this.listenTo(this.model, 'reset', this.render);

        },

        events: {
            'click .see-more-button': 'click'
        },

        click: function () {
            console.log("you clicked see more button");
            productCollection.bySizeAndHigher(50);
        },

        render: function () {
            var data = this.model.toJSON();
            this.$el.html(this.options.template({items: data}));
            $('.shelf-view-container').html(this.el);
        }

    });

    var ProductFinderFilterView = Backbone.View.extend({
        initialize: function () {
            console.log("i'm here");

        },

        events: {
            'click .product-finder-filter-clear-btn': 'resetFinderCollection'
        },

        resetFinderCollection: function(){
            productCollection.reset(productCollection.original);
            this.render();
        },

        render: function () {
            var data = this.model.toJSON();
            //var items = data[0].item;
            this.$el.html(this.options.template());
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
            mainHeaderView.render();

            var productFinderFilterView = new ProductFinderFilterView({
                template: Handlebars.templates['product-finder-filters'],
                model: productCollection
            });
            productFinderFilterView.render();


        }

    });

    var tvFinderMainView = new TVFinderMainView({});
    return tvFinderMainView;

};
