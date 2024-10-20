define(["lfe/app"], function (AppManager) {
  AppManager.module("Routers.HeaderApp", function (HeaderAppRouter) {
    HeaderAppRouter.Router = Marionette.AppRouter.extend({
      appRoutes: {
        header: "showHeader",
        "header/profile": "showProfile"
      }
    });

    let executeAction = function (action, args) {
      AppManager.startSubApp(args.appName);
      action(args);
    };

    let API = {
      showHeader: function (options) {
        require(["apps/header/show/show.controller"], function (
          ShowController
        ) {
          let sc = new ShowController();
          let args = {
            appName: "HeaderApp"
          };
          options = options || {};
          if (typeof options === "object") {
            _.extend(args, options);
          }

          options.appName = executeAction(sc.showHeader, args);
        });
      },
      showProfile: function (options) {
        options = options || {};
        options.appName = "ProfileApp";
        executeAction("", options);
      }
    };

    AppManager.on("show:header", function (options) {
      AppManager.navigate("header");
      API.showHeader(options);
    });

    AppManager.Routers.on("start", function () {
      console.log("HeaderAppRouter called");
      new HeaderAppRouter.Router({
        controller: API
      });
    });
  });
  return AppManager.HeaderAppRouter;
});
