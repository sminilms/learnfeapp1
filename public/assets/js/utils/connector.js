define(["module", "backbone"], function (module, Backbone) {
  let config = _.extend(
    {
      connectionTimeout: undefined
    },
    module.config()
  );

  function Connector(options) {
    this.connection = options.connection;
    this.testConnector = "one two three";
  }

  _.extend(Connector.prototype, Backbone.Events, {
    constructor: Connector
  });

  return Connector;
});
