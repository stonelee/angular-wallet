/* globals describe, beforeEach, it, expect, inject*/
(function() {
  'use strict';

  describe('directives', function() {
    var $compile, $rootScope;
    beforeEach(module('wallet.directives'));

    beforeEach(inject(function(_$compile_, _$rootScope_) {
      $compile = _$compile_;
      $rootScope = _$rootScope_;
    }));

    describe('kjMoney', function() {
      it('should process positive number', function() {
        $rootScope.totalMoney = 10;
        var element = $compile('<span kj-money="totalMoney"></span>')($rootScope);

        $rootScope.$digest();
        expect(element.text()).toEqual('[帮付]¥10');
        expect(element.children().hasClass('warn')).toEqual(false);
      });

      it('should process negative number', function() {
        $rootScope.totalMoney = -10;
        var element = $compile('<span kj-money="totalMoney"></span>')($rootScope);

        $rootScope.$digest();
        expect(element.text()).toEqual('[借帐]¥10');
        expect(element.children().hasClass('warn')).toEqual(true);
      });

      it('should keep origin tag name', function() {
        $rootScope.totalMoney = 10;
        var element = $compile('<span kj-money="totalMoney"></span>')($rootScope);
        expect(element[0].tagName.toLowerCase()).toEqual('span');

        element = $compile('<p kj-money="totalMoney"></p>')($rootScope);
        expect(element[0].tagName.toLowerCase()).toEqual('p');
      });
    });
  });
})();
