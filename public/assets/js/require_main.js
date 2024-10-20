requirejs.config({
  baseUrl: "assets/js",
  paths: {
    lfe: "./",
    backbone: "vendor/backbone",
    jquery: "vendor/jquery",
    json2: "vendor/json2",
    marionette: "vendor/backbone.marionette",
    mock: "vendor/jquery.mockjax",
    i18n: "vendor/i18n",
    text: "vendor/text",
    tpl: "vendor/underscore-tpl",
    underscore: "vendor/underscore"
    //"ui-ext": "utils/load-extensions/load-extensions"
  },
  shim: {
    underscore: {
      exports: "_"
    },
    backbone: {
      deps: ["jquery", "underscore", "json2"],
      exports: "Backbone"
    },
    marionette: {
      deps: ["backbone"],
      exports: "Marionette"
    },
    tpl: ["text"]
  },
  config: {
    // "utils/contexts/page/page.context": {
    //   extensions: {
    //     ui: ["entities/sample.model"]
    //   }
    // },
    "lfe/utils/contexts/factories/connector": {
      connection: {
        url: "//localhost:8080/otcs/cs/api/v1",
        session: {
          ticket:
            "lwwcvHZOgQdgw6A37q2i1LqrySJ19UCHaSFOyWvwKlUPCx/7EG79pkaQqQWFR7YnDhkG1y9UXbhiQ6SZW1UAeuVe9ftXEQT0aKteuK9DzvRpW66Ght9Psg=="
        }
      }
    },
    i18n: {
      locale: "en"
    }
  }
});

require(["lfe/app", "lfe/apps/header/header.app.router"], function (
  AppManager,
  HARouter
) {
  AppManager.start({ title: "hello world" });
});
