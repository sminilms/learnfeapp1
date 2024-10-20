define(["marionette", "module"], function (Marionette, module) {
  let AppManager = new Marionette.Application();

  AppManager.navigate = function (route, options) {
    options || (options = {});

    //route = AppManager.i18n.currentLanguage + "/" + route;
    Backbone.history.navigate(route, options);
  };

  AppManager.getCurrentRoute = function () {
    return Backbone.history.fragment;
  };

  AppManager.startSubApp = function (appName, args) {
    let currentApp = AppManager.module(appName);
    if (AppManager.currentApp === currentApp) {
      return;
    }

    if (AppManager.currentApp) {
      AppManager.currentApp.stop();
    }

    AppManager.currentApp = currentApp;
    currentApp.start(args);
  };

  AppManager.on("before:start", function (options) {
    options || (options = {});

    AppManager.i18n = {
      acceptedLanguages: options.acceptedLanguages || [],
      currentLanguage: options.lang || "en"
    };

    _.templateSettings = {
      interpolate: /\{\{=(.+?)\}\}/g,
      escape: /\{\{-(.+?)\}\}/g,
      evaluate: /\{\{(.+?)\}\}/g
    };

    var RegionContainer = Marionette.LayoutView.extend({
      el: "#app-container",
      regions: {
        main: "#main-region"
      }
    });
    AppManager.regions = new RegionContainer();
  });

  AppManager.on("start", function (options) {
    options || (options = {});

    if (Backbone.history) {
      require(["lfe/apps/header/header.app"], function () {
        Backbone.history.start();

        if (AppManager.getCurrentRoute() === "") {
          AppManager.trigger("show:header", options);
        }
      });
    }

    console.log("AppManager", AppManager);
  });

  return AppManager;
});
