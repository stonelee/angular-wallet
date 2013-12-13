(function() {
  'use strict';

  angular.module('wallet.filters', []).filter('time', function() {
    return function(s) {
      var d = new Date(s);

      function clean(a) {
        return a < 10 ? '0' + a : a;
      }

      var month = clean(d.getMonth() + 1);
      var day = clean(d.getDate());
      var h = clean(d.getHours());
      var m = clean(d.getMinutes());

      return month + '-' + day + ' ' + h + ':' + m;
    };
  });

})();
