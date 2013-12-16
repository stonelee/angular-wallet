/* globals describe, beforeEach, it, expect, inject*/
(function() {
  'use strict';

  describe('controllers', function() {
    beforeEach(function() {
      module('wallet');
      module('wallet.controllers');

      this.addMatchers({
        toEqualData: function(expected) {
          return angular.equals(this.actual, expected);
        }
      });
    });

    describe('ListCtrl', function() {
      var scope, ctrl, Bill;

      beforeEach(inject(function($rootScope, $controller, _Bill_) {
        scope = $rootScope.$new();
        ctrl = $controller('ListCtrl', {
          $scope: scope
        });

        Bill = _Bill_;
        Bill.clearAll();
      }));


      it('should get init data', function() {
        expect(scope.money).toBe('');
        expect(scope.isBorrowed).toBe(false);
        expect(scope.bills.length).toBe(0);
        expect(scope.totalMoney).toBe(0);
      });

      it('should pay for other', function() {
        scope.money = 1;
        scope.isBorrowed = false;
        scope.addBill();

        expect(scope.money).toBe('');
        expect(scope.isBorrowed).toBe(false);
        expect(scope.bills.length).toBe(1);
        expect(scope.totalMoney).toBe(1);
      });

      it('should borrow money', function() {
        scope.money = 1;
        scope.isBorrowed = true;
        scope.addBill();

        expect(scope.money).toBe('');
        expect(scope.isBorrowed).toBe(false);
        expect(scope.bills.length).toBe(1);
        expect(scope.totalMoney).toBe(-1);
      });

      it('should count for many steps', function() {
        scope.money = 1;
        scope.isBorrowed = false;
        scope.addBill();

        scope.money = 2;
        scope.isBorrowed = true;
        scope.addBill();

        expect(scope.money).toBe('');
        expect(scope.isBorrowed).toBe(false);
        expect(scope.bills.length).toBe(2);
        expect(scope.totalMoney).toBe(-1);
      });
    });

    describe('DetailCtrl', function() {
      var scope, ctrl, Bill;

      beforeEach(inject(function($rootScope, $controller, $routeParams, _Bill_) {
        Bill = _Bill_;
        Bill.clearAll();
      }));

      it('should pay for other', inject(function($rootScope, $controller, $routeParams) {
        var b = Bill.save({
          money: 1
        });
        $routeParams.id = b.id;

        scope = $rootScope.$new();
        ctrl = $controller('DetailCtrl', {
          $scope: scope
        });

        expect(scope.money).toBe(1);
        expect(scope.isBorrowed).toBe(false);
      }));

      it('should borrow money', inject(function($rootScope, $controller, $routeParams) {
        var b = Bill.save({
          money: -1
        });
        $routeParams.id = b.id;

        scope = $rootScope.$new();
        ctrl = $controller('DetailCtrl', {
          $scope: scope
        });

        expect(scope.money).toBe(1);
        expect(scope.isBorrowed).toBe(true);
      }));

    });


  });
})();
