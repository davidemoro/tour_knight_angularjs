'use strict';

angular.module('tourKnightAngularjsApp')
  .controller('MainCtrl', ['$scope', function ($scope) {

    $scope.total_moves = function() {
        return $scope.i * $scope.j;
    };

    $scope.len_done_moves = function() {
        var len_checked = 0;
        angular.forEach($scope.board, function(row) {
            angular.forEach(row, function (item) {
                if (item.checked) {
                    len_checked++;
                }
            });
        });
        return len_checked;
    };

    $scope.board = [];

    $scope.init_board = function() {
        var results = [], 
            i, 
            j, 
            max_i=parseInt($scope.i, 10), 
            max_j=parseInt($scope.j, 10), 
            row_results = [];

        for(i=0; i<max_i; i++) {
            row_results = [];
            for(j=0; j<max_j; j++) {
                row_results.push({i:i, j:j, checked:""});
            }
        results.push(row_results);
        }
    $scope.board = results;
    };

  }]);
