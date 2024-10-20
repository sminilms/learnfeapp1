define([
  "module",
  "lfe/app",
  "lfe/utils/contexts/page/page.context",
  "lfe/apps/header/show/show.view",
  "lfe/apps/header/show/test/view.mock"
], function (module, AppManager, PageContext, ShowView, mock) {
  let Controller = Marionette.Controller.extend({
    constructor: function Controller(options) {
      this.options = options;
      Marionette.Controller.prototype.constructor.apply(this, arguments);
    },
    showHeader: function (options) {
      let context = new PageContext();

      let view = new ShowView({
        //model: sampleModel,
        context: context
      });
      AppManager.regions.main.show(view);
      mock.enable();
      context.fetch();
    }
  });
  return Controller;
});
