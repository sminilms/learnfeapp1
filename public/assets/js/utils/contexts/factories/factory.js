define(["marionette"], function (Marionette) {
  let Factory = Marionette.Controller.extend({
    constructor: function Factory(context, options) {
      this.context = context;
      this.options = options || {};
    },
    propertyPrefix: null
  });

  return Factory;
});
