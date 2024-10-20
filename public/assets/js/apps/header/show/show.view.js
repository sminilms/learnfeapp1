define([
  "lfe/app",
  "lfe/utils/contexts/factories/user",
  "tpl!lfe/apps/header/show/impl/header.info.tpl",
  "i18n!lfe/apps/header/show/impl/nls/lang"
], function (AppManager, UserModelFactory, templateTpl, lang) {
  let View = Marionette.ItemView.extend({
    template: templateTpl,
    tagName: "div",
    constructor: function View(options) {
      Marionette.ItemView.prototype.constructor.call(this, options);

      // window.requirejs.s.contexts._.config.config.i18n.locale = "fr";
      //let i18nConfig = window.requirejs.s.contexts._.config.config;

      let currentUserId = options.context.getModel(UserModelFactory);
    },
    templateHelpers: function () {
      return {
        title: lang.title
      };
    }
  });
  return View;
});
