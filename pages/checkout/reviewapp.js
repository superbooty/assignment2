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
    }

    var ReviewHeader = Backbone.View.extend({
        initialize:function () {
        },

        events:{

        },

        render:function(){
            this.$el.html(this.options.template() );
            $('.review-header-container').html(this.el);
            this.delegateEvents(this.events);
        }
    });

    var reviewHeader = new ReviewHeader({
        template:Handlebars.templates['review-header']
    });
    reviewHeader.render();

    var ReviewSubtotals = Backbone.View.extend({
        initialize:function () {
            this.listenTo(cartModel, 'change', this.render);
        },

        render:function(){
            this.$el.html(this.options.template({"subtotals": myCart.getSubtotals()}) );
            $('.review-subtotal-container').html(this.el);
        }
    });

    var reviewSubtotals = new ReviewSubtotals({
        template:Handlebars.templates['review-subtotal']
    });
    reviewSubtotals.render();

});