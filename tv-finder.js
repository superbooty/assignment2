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
                $('#screen').css({ "display": "block", opacity: 0.7, "width":$(document).width(),"height":$(document).height()});
                productPage(id).render();
            }
            pop();

        },

        loadCart: function(){
            var pop = function(){
                $('#screen').css({ "display": "block", opacity: 0.7, "width":$(document).width(),"height":$(document).height()});
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

        parse: function (response) {
            return response;
        },

        filterBySize: function (minSize) {
            filtered = this.filter(function (item) {
                return item.get("size") >= minSize;
            });
            console.log(filtered);
            this.reset(filtered);
            return new PeopleViewedCollection(filtered);
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
            console.log(data);
            this.$el.html(this.options.template({items: data[0].item}));
            $('.shelf-view-container').html(this.el);
        }

    });

    var ProductFinderFilterView = Backbone.View.extend({
        initialize: function () {
            console.log("i'm here");
            this.listenTo(this.model, 'reset', this.render);

        },

        render: function () {
            var data = this.model.toJSON();
            console.log( data[0]);
            //var items = data[0].item;
            this.$el.html(this.options.template({items: data[0].item}));
            $('.product-finder-filter-container').html(this.el);

            $("#slider-range").slider({
                range:true,
                min:1,
                max:100,
                values:[ data[0].minsize, data[0].maxsize ],
                slide:function (event, ui) {
                    $("#range-value1").html(ui.values[0]+"\"");
                    $("#range-value2").html(ui.values[1]+"\"");
                }
            });

            $("#slider-range").find('a:last').append($("#range-value2"))
                .hover(function()
                { $("#range-value2").css({left:"-27px", top:"-55px"}).show()}
            ).css({outline:"0 none"});

            $("#slider-range").find('a:first').append($("#range-value1"))
                .hover(function()
                { $("#range-value1").css({left:"-27px", top:"-55px"}).show()}
            ).css({outline:"0 none"});




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


        }

    });

    var tvFinderMainView = new TVFinderMainView({});
    return tvFinderMainView;

};

