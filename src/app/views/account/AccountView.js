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
      .state('account.mentions', {
        url: '/mentions',
        reloadOnSearch: false,
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
