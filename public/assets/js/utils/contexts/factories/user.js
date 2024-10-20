define([
  "lfe/app",
  "lfe/utils/contexts/factories/factory",
  //"lfe/entities/server.adapter",
  "lfe/utils/contexts/factories/connector",
  "lfe/entities/members"
  //"lfe/entities/item.action.model"
], function (
  AppManager,
  ModelFactory,
  //ServerAdapter,
  ConnectorFactory,
  MemberModel
  //ItemActionModel
) {
  let UserModelFactory = ModelFactory.extend({
    propertyPrefix: "user",
    constructor: function UserModelFactory(context, options) {
      ModelFactory.prototype.constructor.apply(this, arguments);

      // let serverAdapterModel = new ServerAdapter.TestModel({ name: "hello" });
      // console.log("ServerAdapterModel", serverAdapterModel);

      // let serverAdapterCollection = new ServerAdapter.TestModels({
      //   prefix: "helloCollection"
      // });
      // console.log("ServerAdapterCollection", serverAdapterCollection);

      //TESTING
      //let users = this.options.users || { test: "hello world" };

      // var featchingTestCollection = AppManager.request("test:collection", {
      //   parameters: [
      //     { firstname: "sminil", lastname: "Mani", age: 40 },
      //     { firstname: "Suji", lastname: "Robinson", age: 36 }
      //   ]
      // });

      // if (featchingTestCollection) {
      //   $.when(featchingTestCollection).done(function (data) {
      //     console.log("data", data);
      //     users = data;
      //   });
      // }

      var connector = context.getObject(ConnectorFactory, options);
      _.extend(options, { connection: connector.connection });
      console.log("Options connector", options);

      var memberModel = new MemberModel(options);
      console.log("memberModel", memberModel);

      // var itemActions = new ItemActionModel([
      //   {
      //     or: {
      //       container: true
      //     },
      //     signature: "Browse"
      //   },
      //   {
      //     or: {
      //       type: [144, 749]
      //     },
      //     signature: "Open"
      //   }
      // ]);

      this.property = memberModel;
    },
    fetch: function (options) {
      return this.property.fetch(options);
    }
  });
  return UserModelFactory;
});
