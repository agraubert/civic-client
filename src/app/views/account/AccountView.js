(function() {
  'use strict';
  angular.module('civic.activity')
    .config(ActivityView);

  // @ngInject
  function ActivityView($stateProvider) {
    $stateProvider
      .state('account', {
        abstract: true,
        url: '/account',
        templateUrl: 'app/views/account/account.tpl.html'
      })
      .state('account.main', {
        url: '/main',
        controller: 'AccountController',
        templateUrl: 'app/views/account/mentions.tpl.html',
        data: {
          titleExp: '"My Account"',
          navMode: 'sub'
        },
        resolve: {
          mentions: /* @ngInject */ function(CurrentUser) {
            CurrentUser.getMentions().then(function(response) {
              return response;
            });
          }
        }
      })
      .state('account.mentions', {
        url: '/mentions',
        controller: 'AccountController',
        templateUrl: 'app/views/account/mentions.tpl.html',
        data: {
          titleExp: '"My Mentions"',
          navMode: 'sub'
        },
        resolve: {
          mentions: /* @ngInject */ function(CurrentUser) {
            CurrentUser.getMentions().then(function(response) {
              return response;
            });
          }
        }
      });
  }

})();
