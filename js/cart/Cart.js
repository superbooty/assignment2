
Namespace.Register("com.wm.cart");

com.wm.CartItem = function(cartItem){ return {
    
    id: cartItem.id,
    qty: cartItem.qty,
    name: cartItem.name,
    seller : cartItem.seller,
    price : cartItem.price,
    hasWarranty : cartItem.hasWarranty,
    linkedWarrantyId : cartItem.linkedWarrantyId,
    isPUT : cartItem.isPUT,
    pickupStore : cartItem.pickupStore,
    image: cartItem.image,
    isSavedItem: false,

    getId: function(){
        return this.id;
    },

    getQty: function(){
        return this.qty;
    },

    getName: function(){
        return this.name;
    }
};};

com.wm.Cart = function(){ return {

    size: 0,
    cartItems: [],
    savedItems: [],

    getSize: function(){
        return this.size;
    },

    getCartItems: function(){
        return this.cartItems;
    },

    getCartItemIds: function(){
        var ret = "";
        for(var index = 0; index < this.cartItems.length; index++){
            var postfix = "";
            if(index+1 != this.cartItems.length)
                postfix = ",";
            ret += this.cartItems[index].id+postfix;
        }
        return ret;
    },

    setCartItems: function(cartItems){
        this.cartItems = cartItems;
    },

    setSavedItems: function(cartItems){
        this.savedItems = cartItems;
    },
    
    addItem: function(cartItem){
        var item = $.grep(this.cartItems, function(e){ return e.id == cartItem.id; });
        if(item.length < 1){
            // the item is not in the cart so add it.
            this.cartItems.push(cartItem);
        }else{
            // item is already in the map update it
            console.log(item[0]);
            this.cartItems.forEach(function(e){
                console.log(e);
                if(e.id === cartItem.id ){
                    e.qty += cartItem.qty;
                }
            });
        }
    },

    setSavedItem: function(id){
        var item = $.grep(this.cartItems, function(e){ return e.id == id; });
        if(item.length > 0){
            for(var counter = 0 ; counter < this.cartItems.length ; counter++){
                if(this.cartItems[counter].id ==id ){
                    this.savedItems.push(this.cartItems[counter]);
                    this.cartItems.splice(counter--, 1);
                    break;
                }
            }
        }
    },

    moveToCart: function(id){
        var item = $.grep(this.savedItems, function(e){ return e.id == id; });
        if(item.length > 0){
            for(var counter = 0 ; counter < this.savedItems.length ; counter++){
                if(this.savedItems[counter].id ==id ){
                    //this.cartItems.push(this.savedItems[counter]);
                    this.addItem(this.savedItems[counter]);
                    this.savedItems.splice(counter--, 1);
                    break;
                }
            }
        }
    },

    removeItem: function(id, cartType){
        var item = $.grep(cartType, function(e){ return e.id == id; });
        if(item.length > 0){
            for(var counter = 0 ; counter < cartType.length ; counter++){
                if(cartType[counter].id ==id ){
                    cartType.splice(counter--, 1);
                    break;
                }
            }
        }
    },


    getSubtotals: function(){
        var runningTotal = 0.00;
        this.cartItems.forEach(function(e){
            var qty = e.qty;
            var price = e.price;
            runningTotal += (price * qty);
        });
        return runningTotal;
    },

    getCartSize: function(){
        var ret = 0;
        if(this.cartItems.length > 0){
            this.cartItems.forEach(function(e){
                var qty = e.qty;
                ret += qty;
            });
        }
        if(this.savedItems.length > 0){
            this.savedItems.forEach(function(e){
                var qty = e.qty;
                ret += qty;
            });
        }
        return ret;
    },

    getCalculatedTaxes: function(){
        return this.getSubtotals() * .0925;
    }

};}

