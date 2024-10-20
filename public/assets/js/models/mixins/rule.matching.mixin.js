define(["module"], function (module) {
  var RulesMatchingMixin = {
    mixin: function (prototype) {
      return _.extend(prototype, {
        makeRulesMatching: function (options) {
          return this;
        },
        rulesToMatch: ["equals", "and", "or"],
        matchRules: function (model, operations, combine) {
          var results = _.chain(this.rulesToMatch)
            .map(function (operation) {
              var operands = operations[operation];
              return operands === undefined
                ? undefined
                : this["_evaluate-" + operation](model, operands);
            }, this)
            .filter(function (results) {
              return results !== undefined;
            })
            .value();

          return (
            !results.length ||
            _[combine || "any"](results, function (result) {
              return result === true;
            })
          );
        },
        "_evaluate-or": function (model, operations) {
          if (_.isArray(operations)) {
            return _.any(
              operations,
              function (operation) {
                return this.matchRules(model, operation);
              },
              this
            );
          }
          return this.matchRules(model, operations, "any");
        }
      });
    }
  };

  return RulesMatchingMixin;
});
