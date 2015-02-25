(function() {
  'use strict';
  angular.module('civic.common')
    .directive('quickSearch', quickSearch)
    .controller('quickSearchCtrl', quickSearchCtrl);

  // @ngInject
  function quickSearchCtrl($scope, $log, TypeAheadResults, $state, _) {
    $scope.getVariants = function (val) {
      return TypeAheadResults.query({ query: val }).$promise
        .then(function (response) {
          return _.map(response.data.result, function (event) {
            var label = event.entrez_gene + ' / ' + event.variant;

            return {
              /*jshint camelcase: false */
              gene: event.entrez_id,
              label: event.entrez_gene + ' / ' + event.variant,
              variant: event.variant,
              variant_id: event.variant_id
            };
          });
        });
    };

    /*jshint camelcase: false */
    $scope.onSelect = function($item) {
      $state.go('events.genes.summary.variants.summary', {geneId: $item.gene, variantId: $item.variant_id});
    };

  }
  // @ngInject
  function quickSearch() {
    var directive = {
      templateUrl: 'components/directives/quickSearch.tpl.html',
      restrict: 'E',
      scope: true,
      controller: quickSearchCtrl
    };

    return directive;
  }
})();
