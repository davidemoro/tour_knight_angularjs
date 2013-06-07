'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('tourKnightAngularjsApp'));

  var MainCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    scope.i = 2;
    scope.j = 2;
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
  }));

  it('i == 2', function () {
    expect(scope.i).toBe(2);
  });
  it('i*j == 4', function () {
    expect(scope.i*scope.j).toBe(4);
    expect(scope.total_moves()).toBe(4);
  });
  it('board initialization', function () {
    scope.init_board();
    expect(scope.board.length).toBe(2);
    expect(scope.board[0].length).toBe(2);
    expect(scope.board[0][0].i).toBe(0);
    expect(scope.board[0][0].j).toBe(0);
    expect(scope.board[0][1].i).toBe(0);
    expect(scope.board[0][1].j).toBe(1);
    expect(scope.board[1][0].i).toBe(1);
    expect(scope.board[1][0].j).toBe(0);
    expect(scope.board[1][1].i).toBe(1);
    expect(scope.board[1][1].j).toBe(1);

  });
});
