window.Application = {};

Application.View = Backbone.View.extend({
    render:function () {
        var context = this.model ? this.model.attributes : {},
            output = this.options.template(context);
        console.log(output);
        this.$el.html(output);
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
        }

    });

    var customerModel = new CustomerModel();
    customerModel.fetch();

    var ReviewHeader = Backbone.View.extend({
        initialize:function () {
            this.listenTo(this.model, 'change', this.render);
        },

        events:{
        },

        render:function(){
            this.$el.html(this.options.template({cartSize: myCart.getCartSize(), customer:this.model.toJSON()}) );
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

        render:function(){
            this.$el.html(this.options.template({"customer": this.model.toJSON()}) );
            $('.review-fulfilment-details-container').html(this.el);
        }
    });

    var reviewFulfilment = new ReviewFulfilmentView({
        template:Handlebars.templates['review-fulfilment-details'],
        model: customerModel
    });
    reviewFulfilment.render();


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
        initialize:function () {
        },

        events:{

        },

        render:function(){
            this.$el.html(this.options.template() );
            $('.review-pricing-container').html(this.el);
            this.delegateEvents(this.events);
        }
    });

    var reviewPricingView = new ReviewPricingView({
        template:Handlebars.templates['review-pricing']
    });
    reviewPricingView.render();
};

$(function(){
    reviewsPage();
});