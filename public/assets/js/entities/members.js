define([
  "lfe/app",
  "backbone",
  "lfe/models/mixins/rule.matching.mixin"
], function (AppManager, Backbone, RuleMatchinMixin) {
  let MemberModel = Backbone.Model.extend({
    constructor: function MemberModel(options) {
      console.log("MemberModel options", options);
      this.connector = options.connection;

      console.log("Model Options", options);
      Backbone.Model.prototype.constructor.call(this, options);
      this.makeRulesMatching(options);
    },
    url: function () {
      var url = this.connector.url;
      url = url + "/members";
      return url;
    }
  });

  _.extend(MemberModel.prototype, {
    sync: function (method, model, options) {
      var self = this,
        config = {
          beforeSend: function (xhr) {
            xhr.setRequestHeader(
              "Content-Type",
              "application/json; charset=utf-8"
            );
            xhr.setRequestHeader("Accept", "application/json");
            xhr.setRequestHeader("OTCSTicket", self.connector.session.ticket);
          }
        };
      switch (method) {
        case "read":
          config = _.extend(config, {
            method: "GET"
          });
          break;
      }

      options = _.extend(options, config);

      return Backbone.Model.prototype.sync.call(this, method, model, options);
    }
  });

  RuleMatchinMixin.mixin(MemberModel.prototype);
  return MemberModel;
});
