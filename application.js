window.Application = {};

Application.View = Backbone.View.extend({
  render: function() {
    var context = this.model ? this.model.attributes : {},
        output = this.options.template(context);
    this.$el.html(output);
  }
});


$(function() {
  var model = new Backbone.Model({
    greeting: 'Hello'
  });
  var indexView = new Application.View({
    template: Handlebars.templates['index'],
    model: model
  });
  indexView.render();
  $('body').append(indexView.$el);
});

$(function() {
    var userModel = new Backbone.Model({
        id: '12345',
        name: '@sshole',
        phone: '555 555 5555'
    });

    var userCollection = Backbone.Collection.extend({
        model: userModel,
        url: '/some/ajax/url',

        parse: function(data) {
            this.page=data.page;
            return data.items;
        }
    });

    var userView = new Application.View({
        template: Handlebars.templates['user'],
        model: userModel
    });
    userView.render();
    $('.test-user').append(userView.el);
});

$(function() {
    var headerModel = new Backbone.Model({
        first: "firstNav",
        second: "secondNav"
    });


    var headerView = new Application.View({
        template: Handlebars.templates['header'],
        model: headerModel
    });
    headerView.render();
    $('.header').append(headerView.el);
});