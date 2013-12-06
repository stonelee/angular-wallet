(function() {
  'use strict';

  var appModule = ['wallet.controllers', 'wallet.services', 'wallet.directives', 'wallet.filters'],
    otherModule = ['ngRoute', 'LocalStorageModule', 'ui.bootstrap'];

  angular.module('wallet', appModule.concat(otherModule)).config(function($routeProvider) {
    $routeProvider.when('/', {
      controller: 'ListCtrl',
      templateUrl: 'partials/list.html'
    }).when('/edit/:id', {
      controller: 'DetailCtrl',
      templateUrl: 'partials/detail.html'
    }).otherwise({
      redirectTo: '/'
    });
  });

})();
