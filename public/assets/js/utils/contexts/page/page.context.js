/* Copyright (c) 2016-2017  OpenText Corp. All Rights Reserved. */

define([
  "module",
  "lfe/utils/contexts/context",
  "ui-ext!lfe/utils/contexts/page/page.context"
], function (module, Context, contextPlugins) {
  let PageContext = Context.extend({
    constructor: function PageContext() {
      Context.prototype.constructor.apply(this, arguments);

      let Plugins = _.chain(contextPlugins)
        .flatten(true)
        .unique()
        .reverse()
        .value();
      this._plugins = _.map(
        Plugins,
        function (Plugin) {
          return new Plugin({ context: this });
        },
        this
      );

      console.log("PageContext Plugins", this._plugins);
    },

    _isFetchable: function (factory) {
      return (
        Context.prototype._isFetchable.apply(this, arguments) &&
        _.all(this._plugins, function (plugin) {
          console.log("plugin_X", plugin);
          return plugin.isFetchable(factory) !== false;
        })
      );
    }
  });

  return PageContext;
});
