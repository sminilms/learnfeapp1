define(["lfe/app"], function (AppManager) {
  AppManager.module(
    "HeaderApp",
    function (HeaderApp, AppManager, Backbone, Marionette, $, _) {
      HeaderApp.startWithParent = false;

      HeaderApp.onStart = function () {
        console.log("starting HeaderApp");
      };

      HeaderApp.onStop = function () {
        console.log("stopping HeaderApp");
      };
    }
  );
  return AppManager.HeaderApp;
});
