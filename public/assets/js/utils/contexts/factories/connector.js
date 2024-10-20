define([
  "module",
  "lfe/utils/contexts/factories/factory",
  "lfe/utils/connector"
], function (module, ModelFactory, Connector) {
  let ConnectorFactory = ModelFactory.extend({
    propertyPrefix: "connector",
    constructor: function ConnectorFactory(context, options) {
      ModelFactory.prototype.constructor.apply(this, arguments);
      let connector = this.options.connector || {};

      if (!(connector instanceof Connector)) {
        let config = module.config();
        console.log("config", config);
        let connection = connector.connection || config.connection || {};
        _.defaults(connection, connector.connection, config.connection);

        connector = new Connector(
          _.defaults({
            connection: connection
          })
        );
      }

      this.property = connector;
    }
  });
  return ConnectorFactory;
});
