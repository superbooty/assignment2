window.Application = {};

Application.View = Backbone.View.extend({
    render:function () {
        var context = this.model ? this.model.attributes : {},
            output = this.options.template(context);
        console.log(output);
        this.$el.html(output);
    }
});


var cartPage = function () {

    var myCart = new com.wm.Cart();
    var cartData = null;
    var storage = null;

    if (typeof(sessionStorage) == 'undefined' ) {
        alert('Your browser does not support HTML5 localStorage. Try upgrading.');
    } else {
        storage = window['sessionStorage'];
        cartData = storage.getItem('jsonCart');
    }

    var CartModel = Backbone.Model.extend({

        url:"../../json/cart.json",

        myCartData: null,

        initialize: function(){
            console.log("Initializing CartModel");
        },

        parse: function(data){
            storage.setItem('jsonCart', JSON.stringify(data));
            console.log(data);
            myCart.setCartItems(data.cartItems);
            myCart.setSavedItems(data.savedItems);
            this.myCartData = data;
            return data;
        },

        getCartItems: function(dynamicItemData){
            console.log(dynamicItemData);
            var items = this.myCartData.cartItems;
            var saved = this.myCartData.savedItems;
            var forPurchaseCount = 0;
            if(items.length >0 )
                items.forEach(function(itemIter){
                    forPurchaseCount += itemIter.qty;
                    dynamicItemData.forEach(function(dynItemIter){
                        if(itemIter.id == dynItemIter.id){
                            itemIter.dynamicItemData = dynItemIter;
                        }
                    });
                });

            console.log(items);
            var savedItemsCount = 0;
            saved.forEach(function(e){
                savedItemsCount += e.qty;
            });
            var all = this.myCartData;
            return {all:all, forPurchaseCount: forPurchaseCount, items: items, savedItemsCount:savedItemsCount, savedItems:saved };
        }

    });
    var cartModel = new CartModel();

    // check to see if there is data in the
    if(cartData != null){
        var parsedData = JSON.parse(cartData);
        //build the model based on the data from sessionStorage
        cartModel.set({fromStorage: true});
        cartModel.myCartData = parsedData;
        myCart.setCartItems(parsedData.cartItems);
        myCart.setSavedItems(parsedData.savedItems);
    }

    var CartItemView = Backbone.View.extend({

        availabilityModel: null,

        initialize:function () {

            if(!this.model.attributes.fromStorage ){
                console.log("fetching...");
                this.model.fetch();
            }else{
                console.log("model has data from storage");
                this.preRender();
            }
            this.listenTo(this.model, 'change', this.preRender);
        },

        events:{
            'click .save-for-later-button': 'saveForLater',
            'click .move-to-cart-button': 'moveToCart',
            'click .remove-button': 'removeItem'
        },

        saveForLater: function(event){
            var itemToSave = $(event.target)[0].attributes['itemtosave'].value;
            myCart.setSavedItem(itemToSave);
            storage.setItem('jsonCart', JSON.stringify(myCart));
            cartModel.trigger('change');
        },

        moveToCart: function(event){
            var itemToSave = $(event.target)[0].attributes['itemtosave'].value;
            myCart.moveToCart(itemToSave);
            storage.setItem('jsonCart', JSON.stringify(myCart));
            cartModel.trigger('change');
        },

        removeItem: function(event){
            var itemToRemove = $(event.target)[0].attributes['itemtoremove'].value;
            var parentId = $(event.target)[0].offsetParent.id;
            if(parentId == "collapseBox1_1" ){
                myCart.removeItem(itemToRemove, myCart.cartItems);
            }else{
                myCart.removeItem(itemToRemove, myCart.savedItems);
            }
            storage.setItem('jsonCart', JSON.stringify(myCart));
            cartModel.trigger('change');
        },

        preRender:function() {
            var myUrl = "http://aguevara-linux.corp.walmart.com/search/inventory/itemIds.ems?itemids="+myCart.getCartItemIds()+"&useCache=true";
            console.log(myUrl);
            var that = this;
            this.availabilityModel = new AvailabilityModel({url:myUrl});
            //this.availabilityModel.listenTo(this.model, 'change', this.availabilityModel.what);
            //cartModel.trigger('change');
            this.availabilityModel.fetch({
                success: function(response){
                    that.render(response);
                }

            });

        },

        render:function(props){
            this.$el.html(this.options.template(this.model.getCartItems(props.dynamicItemData)));
            $('.cart-item-container').html(this.el);
            console.log("re-rendering");

            $('#collapseBox1_1').addClass('in');
            $('#collapseBox1_2').addClass('in');
            $('.accordionMod .accordion-toggle').find('.icon').addClass('iconActive')

            var cartItemCollection = new CartItemCollection();
            cartItemCollection.reset(myCart.getCartItems());

            var mainHeaderView = new MainHeaderView({
                template:Handlebars.templates['main-header'],
                model: cartItemCollection
            });
            mainHeaderView.render();
            this.delegateEvents(this.events);

        }

    });

    var CartHeader = Backbone.View.extend({
        initialize:function () {
            this.listenTo(this.model, 'change', this.render);
        },

        events:{
            'click .sort-button': 'click',
            'click .opt' : 'select',
            'mouseleave .options' : 'mouseleave'
        },

        click : function(event) {
            this.$el.find('.options').css({visibility:'visible'});
        },

        select : function(event) {
            var context = this.model.attributes;
            this.$el.find('.sort-button .text').text($(event.target).text());
            this.$el.find('.options').css({visibility:'hidden'});
            event.stopPropagation();
        },

        mouseleave : function(event) {
            this.$el.find('.options').css({visibility:'hidden'});
            event.stopPropagation();
        },

        render:function(){
            this.$el.html(this.options.template({"cartSize":myCart.getCartSize()}) );
            $('.cart-header-container').html(this.el);
            this.delegateEvents(this.events);
        }
    });



    var CartSubtotals = Backbone.View.extend({
        initialize:function () {
            this.listenTo(cartModel, 'change', this.render);
        },

        render:function(){
            this.$el.html(this.options.template({"subtotals": myCart.getSubtotals()}) );
            $('.cart-subtotal-container').html(this.el);
        }
    });




    var CartPageView = Backbone.View.extend({

        render: function(){

            var cartItemView = new CartItemView({
                template:Handlebars.templates['cart-item'],
                model: cartModel
            });

            var cartHeader = new CartHeader({
                template:Handlebars.templates['cart-header'],
                model: cartModel
            });
            cartHeader.render();

            var cartSubtotals = new CartSubtotals({
            template:Handlebars.templates['cart-subtotal']
            });
            cartSubtotals.render();

            var cart = function () {
                var o = $('.cart').offset();
                $('.cart-page').css({ 'top': o.top + 60,
                    'left': o.left - (750 - 120),
                    'border-radius':'5px'
                });
                $('.cart-page').slideDown(1000);
            }
            cart();

            $('.selected-product').hide();

        }

    });
    var cartPageView = new CartPageView();
    cartPageView.render();


};
