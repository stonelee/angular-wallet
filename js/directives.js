(function() {
  'use strict';

  angular.module('wallet.directives', []).directive('kjMoney', function() {
    return {
      restrict: 'EA',
      scope: true,
      link: function(scope, element, attrs) {
        scope.$watch(attrs.kjMoney, function(number) {
          scope.way = number < 0 ? '借帐' : '帮付';
          scope.warn = number < 0;
          scope.money = '¥' + Math.abs(number);
        });
      },
      template: '<span ng-class="{warn:warn}">[{{way}}]</span>{{money}}'
    };
  });

})();
