(function() {
  'use strict';

  var app = angular.module('wallet.controllers', []);

  app.controller('ListCtrl', function($scope, Bill, $modal) {
    init();

    $scope.addBill = function() {
      var money = parseFloat($scope.money);
      money = $scope.isBorrowed ? -money : money;
      Bill.save({
        money: money
      });

      init();
    };

    function init() {
      $scope.bills = Bill.query();
      $scope.money = '';
      $scope.isBorrowed = false;
      count();
    }

    function count() {
      $scope.totalMoney = _.reduce($scope.bills, function(money, bill) {
        return money + bill.money;
      }, 0);
    }

    $scope.clearAll = function() {
      modal(function() {
        Bill.clearAll();
        init();
      });
    };

    function modal(callback) {
      $modal.open({
        templateUrl: 'modal.html',
        controller: ModalInstanceCtrl
      }).result.then(callback);
    }
  });

  var ModalInstanceCtrl = function($scope, $modalInstance) {
    $scope.ok = function() {
      $modalInstance.close();
    };

    $scope.cancel = function() {
      $modalInstance.dismiss('cancel');
    };
  };

  app.controller('DetailCtrl', function($scope, $location, $routeParams, Bill, $modal) {
    var id = $routeParams.id;

    var bill = Bill.get({
      id: id
    });
    $scope.isBorrowed = bill.money < 0 ? true : false;
    $scope.money = Math.abs(bill.money);

    $scope.save = function() {
      var money = parseFloat($scope.money);
      money = $scope.isBorrowed ? -money : money;
      Bill.save({
        id: id
      }, {
        money: money
      });
      $location.path('/');
    };

    $scope.notModified = function() {
      var oldBorrowed = bill.money < 0 ? true : false;
      var nBorrowed = $scope.isBorrowed === oldBorrowed;
      var nMoney = parseFloat($scope.money) === Math.abs(bill.money);
      return nBorrowed && nMoney;
    };

    $scope.remove = function() {
      modal(function() {
        Bill.remove({
          id: id
        });
        $location.path('/');
      });
    };

    function modal(callback) {
      $modal.open({
        templateUrl: 'modal.html',
        controller: ModalInstanceCtrl
      }).result.then(callback);
    }

  });

})();
