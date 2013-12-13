(function() {
  'use strict';

  var app = angular.module('wallet.services', []);

  app.factory('Bill', function(localStorageService) {
    function S4() {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }

    function guid() {
      return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
    }

    return {
      query: function() {
        var keys = localStorageService.keys();
        var bills = _.map(keys, function(key) {
          var bill = localStorageService.get(key);
          return _.extend(bill, {
            id: key
          });
        });
        bills = _.sortBy(bills, function(bill) {
          return -new Date(bill.created);
        });
        return bills;
      },

      save: function(options, data) {
        if (!data) {
          data = options;
          options = {};
        }

        var id = guid();
        var bill = this.get(options);
        if (!bill) {
          bill = {
            created: new Date()
          };
        } else {
          id = options.id;
          bill.updated = new Date();
        }
        _.extend(bill, data);
        localStorageService.set(id, bill);

        return _.extend(bill, {
          id: id
        });
      },

      get: function(options) {
        var id = options.id;
        return localStorageService.get(id);
      },

      remove: function(options) {
        var id = options.id;
        localStorageService.remove(id);
      },

      clearAll: function() {
        localStorageService.clearAll();
      }
    };
  });

  app.factory('BillTest', function() {
    var bills = [{
        id: 1,
        created: new Date(),
        money: 2
      }, {
        id: 2,
        created: new Date(),
        money: -1
      }
    ];
    var maxId = 3;

    return {
      query: function() {
        return bills;
      },

      save: function(options, data) {
        if (!data) {
          data = options;
          options = {};
        }

        var bill = this.get(options);
        if (!bill) {
          bill = {
            id: maxId++
          };
          bills.unshift(bill);
        }
        return _.extend(bill, {
          updated: new Date()
        }, data);
      },

      get: function(options) {
        return _.findWhere(bills, options);
      },

      remove: function(options) {
        var id = options.id;
        bills = _(bills).reject(function(bill) {
          return bill.id === id;
        });
      }
    };
  });

})();
