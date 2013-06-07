'use strict';

angular.module('tourKnightAngularjsApp')
  .controller('MainCtrl', ['$scope', function ($scope) {

    $scope.totalMoves = function() {
        if (typeof $scope.board === 'object' && $scope.board.length > 0) {
          return $scope.board.length * $scope.board[0].length;
        }
        else {
          return 0;
        }
      };

    $scope.lenDoneMoves = function() {
        var lenChecked = 0;
        angular.forEach($scope.board, function(row) {
            angular.forEach(row, function (item) {
                if (item.checked) {
                  lenChecked++;
                }
              });
          });
        return lenChecked;
      };

    $scope.board = [];

    $scope.initBoard = function() {
        var results = [],
            i,
            j,
            maxI=parseInt($scope.i, 10),
            maxJ=parseInt($scope.j, 10),
            rowResults = [];

        for(i=0; i<maxI; i++) {
          rowResults = [];
          for(j=0; j<maxJ; j++) {
            rowResults.push({i:i, j:j, checked:''});
          }
          results.push(rowResults);
        }
        $scope.board = results;
      };

  }]);
