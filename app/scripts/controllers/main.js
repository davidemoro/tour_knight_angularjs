'use strict';

angular.module('tourKnightAngularjsApp')
  .controller('MainCtrl', ['$scope', function ($scope) {

    // possible moves
    var moves = [
      [1, 2],
      [-1, 2],
      [1, -2],
      [-1, -2],
      [2, 1],
      [2, -1],
      [-2, 1],
      [-2, -1]
    ];

    var possibleMoves = function(i, j, init) {
        var maxI=$scope.maxI,
            maxJ=$scope.maxJ,
            moveI,
            moveJ,
            list_length,
            count = 0;

        list_length = moves.length;
        for(var index=0; index<list_length; index++) {
          moveI = i + moves[index][0];
          moveJ = j + moves[index][1];
          if (moveI < maxI && moveI >=0 && moveJ < maxJ && moveJ >= 0) {
            if (init) {
              count++;
            }
            else {
              if ($scope.board[moveI][moveJ].value >= 0) {
                count++;
              }
            }
          }
        }
        return count;
      };

    var iterBoard = function(func) {
        var indexI, indexJ, list_length1, list_length2;
        list_length1 = $scope.board.length;
        for(indexI=0; indexI<list_length1; indexI++) {
          list_length2 = $scope.board[indexI].length;
          for(indexJ=0; indexJ<list_length2; indexJ++) {
            func(indexI, indexJ);
          }
        }
      };

    var unsetClickable = function (i, j) {
        $scope.board[i][j].clickable = false;
      };

    $scope.maxI = 0;
    $scope.maxJ = 0;

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

    $scope.win = function() {
        var lenDoneMoves = $scope.lenDoneMoves(),
            totalMoves = $scope.totalMoves();
        if (lenDoneMoves && totalMoves) {
          return lenDoneMoves === totalMoves;
        }
        return false;
      };

    $scope.doneMoves = [];

    $scope.board = [];

    $scope.initBoard = function() {
        var results = [],
            i,
            j,
            maxI=parseInt($scope.i, 10),
            maxJ=parseInt($scope.j, 10),
            rowResults = [];

        $scope.maxI = maxI;
        $scope.maxJ = maxJ;

        for(i=0; i<maxI; i++) {
          rowResults = [];
          for(j=0; j<maxJ; j++) {
            rowResults.push({i:i, j:j, checked:'', value:possibleMoves(i, j, true), clickable:true, current:false});
          }
          results.push(rowResults);
        }
        $scope.board = results;
        $scope.doneMoves = [];
      };

    $scope.clickElem = function(i, j) {
        var checked=$scope.board[i][j].checked,
            doneMovesLength=$scope.doneMoves.length,
            index=0,
            lastMove = doneMovesLength ? $scope.doneMoves[doneMovesLength-1] : undefined,
            list_length = moves.length,
            updateValue,
            updateI,
            updateJ;

        // check or uncheck action?
        if (! checked) {
          // checked action, we should decrement the euristic value
          if (! $scope.board[i][j].clickable) {
            return;
          }
          // clear all clickable elems
          iterBoard(unsetClickable);

          $scope.board[i][j].current = true;
          // update value
          $scope.board[i][j].value = -1;
          // update checked status
          $scope.board[i][j].checked = checked ? false : true;

          // update as clickable
          $scope.board[i][j].clickable = true;

          // update euristic values of other positions
          for (index=0; index<list_length; index++) {
            updateI = i + moves[index][0];
            updateJ = j + moves[index][1];
            if (updateI < $scope.maxI && updateI >= 0 && updateJ < $scope.maxJ && updateJ >= 0) {
              if ($scope.board[updateI][updateJ].value >= 0) {
                $scope.board[updateI][updateJ].clickable = true;
                if ($scope.board[updateI][updateJ].value >= 1) {
                  $scope.board[updateI][updateJ].value -= 1;
                }
              }
              $scope.board[updateI][updateJ].current = false;
            }
          }

          // update doneMoves
          // append i,j
          $scope.doneMoves.push([i, j]);
        }
        else {
          // unchecked action, we should increment the euristic value
          if (lastMove) {
            // check unclickable (i,j in the last position of $scope.doneMoves)
            if (lastMove[0] !== i && lastMove[1] !== j) {
              return;
            }

            $scope.board[i][j].current = false;
            $scope.board[i][j].checked = false;
            $scope.board[i][j].clickable = true;
            $scope.board[i][j].value = possibleMoves(i, j, false);
            // remove i,j
            $scope.doneMoves.pop();
            doneMovesLength = $scope.doneMoves.length;
            lastMove = doneMovesLength ? $scope.doneMoves[doneMovesLength-1] : undefined;

            // increment near positions of unclicked 
            if (lastMove) {
              for (index=0; index<list_length; index++) {
                updateI = i + moves[index][0];
                updateJ = j + moves[index][1];
                if (updateI < $scope.maxI && updateI >= 0 && updateJ < $scope.maxJ && updateJ >= 0) {
                  if ($scope.board[updateI][updateJ].value !== -1) {
                    $scope.board[updateI][updateJ].value += 1;
                    $scope.board[updateI][updateJ].clickable = false;
                  }
                }
              }

              i = lastMove[0];
              j = lastMove[1];
              $scope.board[i][j].current = true;
              $scope.board[i][j].value = -1;
              $scope.board[i][j].checked = true;
              $scope.board[i][j].clickable = true;

              for (index=0; index<list_length; index++) {
                updateI = i + moves[index][0];
                updateJ = j + moves[index][1];
                if (updateI < $scope.maxI && updateI >= 0 && updateJ < $scope.maxJ && updateJ >= 0) {
                  if ($scope.board[updateI][updateJ].value >= 0) {
                    $scope.board[updateI][updateJ].clickable = true;
                  }
                }
              }
            }
            else {
              // all elems clickable
              $scope.initBoard();
            }
          }
          else {
            // all elems clickable
            $scope.initBoard();
          }
        }


      };

  }]);
