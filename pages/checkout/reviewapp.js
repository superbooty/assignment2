window.Application = {};

Application.View = Backbone.View.extend({
    render:function () {
        var context = this.model ? this.model.attributes : {},
            output = this.options.template(context);
        console.log(output);
        this.$el.html(output);
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
    },

    getSubtotals: function(){
        var runningTotal = 0.00;
        this.toJSON().forEach(function(e){
            var qty = e.qty;
            var price = e.price;
            runningTotal += (price * qty);
        });
        return runningTotal;
    }

});


var reviewsPage = function () {

    var myCart = new com.wm.Cart();
    var cartData = null;
    var storage = null;

    if (typeof(sessionStorage) == 'undefined' ) {
        alert('Your browser does not support HTML5 localStorage. Try upgrading.');
    } else {
        storage = window['sessionStorage'];
        cartData = storage.getItem('jsonCart');
        var parsedData = JSON.parse(cartData);
        console.log(parsedData);
        if(parsedData != null ){
            myCart.setCartItems(parsedData.cartItems);
            myCart.setSavedItems(parsedData.savedItems);
        }
    }

    var CustomerModel = Backbone.Model.extend({
        url: "../../json/customer.json",

        parse: function(response){
            return response
        },

        getSelected: function(){
            var cust = this.toJSON();
            var retCard = null;
            console.log(cust);
            cust.wallet.cards.forEach(function(card){
                if(card.selected){
                    console.log(card);
                    retCard = card;
                }
            });
            return retCard;
        }

    });

    var customerModel = new CustomerModel();
    customerModel.fetch();

    var cartItemCollection = new CartItemCollection();
    cartItemCollection.reset(myCart.getCartItems());

    var ReviewHeader = Backbone.View.extend({
        initialize:function () {
            this.listenTo(this.model, 'change', this.render);
            this.listenTo(cartItemCollection, 'reset', this.render);
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

        render:function(){
            this.$el.html(this.options.template({cartSize: cartItemCollection.getCartSize(), customer:this.model.toJSON()}) );
            $('.review-header-container').html(this.el);
            this.delegateEvents(this.events);
        }
    });

    var reviewHeader = new ReviewHeader({
        template:Handlebars.templates['review-header'],
        model:customerModel
    });
    reviewHeader.render();

    var ReviewFulfilmentView = Backbone.View.extend({
        initialize:function () {
            this.listenTo(this.model, 'change', this.render);
        },

        events:{
            'click .selected-credit-card': 'click',
            'click .opt' : 'select',
            'mouseleave .options' : 'mouseleave'
        },

        click : function(event) {
            this.$el.find('.options').css({visibility:'visible'});
        },

        select : function(event) {
            this.$el.find('.options').css({visibility:'hidden'});
            this.$el.find('.selected-credit-card .text').text($(event.target).text());
            var cardId = $(event.target)[0].attributes['cardid'].value;
            this.model.toJSON().wallet.cards.forEach(function(card){
                if(card.lastFourDigits == cardId){
                    card.selected = true;
                }else{
                    card.selected = false;
                }
            });
            this.model.trigger('change');
            event.stopPropagation();

        },

        mouseleave : function(event) {
            this.$el.find('.options').css({visibility:'hidden'});
            event.stopPropagation();
        },

        render:function(){
            this.$el.html(this.options.template({"customer": this.model.toJSON(), "selected":this.model.getSelected()}) );
            $('.review-fulfilment-details-container').html(this.el);
            this.delegateEvents(this.events);
        }
    });

    var reviewFulfilment = new ReviewFulfilmentView({
        template:Handlebars.templates['review-fulfilment-details'],
        model: customerModel
    });


    var ReviewCartView = Backbone.View.extend({
        initialize:function () {
        },

        events:{

        },

        render:function(){
            this.$el.html(this.options.template({checkoutCart: myCart.getCartItems()}) );
            $('.review-cart-container').html(this.el);
            this.delegateEvents(this.events);
        }
    });

    var reviewCartView = new ReviewCartView({
        template:Handlebars.templates['review-cart']
    });
    reviewCartView.render();

    var ReviewPricingView = Backbone.View.extend({
        initialize: function(){
            this.listenTo(this.model, 'change', this.render)    ;
        },

        events:{

        },

        render:function(){
            this.$el.html(this.options.template({cartSize:this.model.getCartSize(),
                 totals:this.model.getSubtotals()}) );
            $('.review-pricing-container').html(this.el);
            this.delegateEvents(this.events);
        }
    });

    var reviewPricingView = new ReviewPricingView({
        template:Handlebars.templates['review-pricing'],
        model: cartItemCollection
    });
    reviewPricingView.render();

    var ReviewSubtotalView = Backbone.View.extend({

        initialize: function(){
            this.listenTo(this.model, 'change', this.render)    ;
        },

        render:function(){
            var shippingCosts = 68.33;
            var totals = this.model.getSubtotals() + shippingCosts + myCart.getCalculatedTaxes();
            this.$el.html(this.options.template(
                {cartSize:this.model.getCartSize(),
                    subtotal:this.model.getSubtotals(),
                    taxes:myCart.getCalculatedTaxes(), shippingCosts: shippingCosts, totals:totals}) );
            $('.review-subtotal-container').html(this.el);
        }

    });

    var reviewSubtotalView = new ReviewSubtotalView({
        template:Handlebars.templates['review-subtotal'],
        model: cartItemCollection
    });
    reviewSubtotalView.render();

};

$(function(){
    reviewsPage();
});
