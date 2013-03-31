// The model
var AvailabilityModel = Backbone.Model.extend({

    initialize: function(prop) {
        console.log(this);
        this.instanceURL = prop.url;
    },

    id: 21311919,

    dynamicItemData: null,

    url: function(){
        return this.instanceURL;
    },

    parse:function (data) {
        this.dynamicItemData = data;
        return data;
    },

    what: function(){
        console.log("this is what you wanted")
    },

    getAvailability: function(){
        this.dynamicItemData;
    }


});

