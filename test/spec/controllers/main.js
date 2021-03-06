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
    scope.board = [];
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
  }));

  it('i == 2', function () {
    expect(scope.i).toBe(2);
  });
  it('i*j == 4', function () {
    expect(scope.i*scope.j).toBe(4);
    // board not yet initialized
    expect(scope.totalMoves()).toBe(0);
  });
  it('board initialization', function () {
    // board initialization
    scope.initBoard();

    // total moves
    expect(scope.totalMoves()).toBe(4);
    expect(scope.board.length).toBe(2);

    // board coords
    expect(scope.board[0].length).toBe(2);
    expect(scope.board[0][0].i).toBe(0);
    expect(scope.board[0][0].j).toBe(0);
    expect(scope.board[0][1].i).toBe(0);
    expect(scope.board[0][1].j).toBe(1);
    expect(scope.board[1][0].i).toBe(1);
    expect(scope.board[1][0].j).toBe(0);
    expect(scope.board[1][1].i).toBe(1);
    expect(scope.board[1][1].j).toBe(1);

    // values
    expect(scope.board[0][0].value).toBe(0);
    expect(scope.board[0][1].value).toBe(0);

  });
  it('board initialization and euristics values init', function () {
    // board initialization
    scope.i = 8;
    scope.j = 8;
    scope.initBoard();
    // values
    expect(scope.board[0][0].value).toBe(2);
    expect(scope.board[0][4].value).toBe(4);
    expect(scope.board[4][4].value).toBe(8);
  });
  it('board click elems', function () {
    // board initialization
    scope.i = 8;
    scope.j = 8;
    scope.initBoard();
    // values
    expect(scope.board[0][0].value).toBe(2);
    expect(scope.board[1][2].value).toBe(6);
    expect(scope.doneMoves.length).toBe(0);

    // click on 1-2
    scope.clickElem(1, 2);
    expect(scope.board[0][0].value).toBe(1);
    expect(scope.board[1][2].value).toBe(-1);
    expect(scope.board[1][2].clickable).toBe(true);
    expect(scope.doneMoves.length).toBe(1);

    // undo click on 1-2
    scope.clickElem(1, 2);
    expect(scope.board[0][0].value).toBe(2);
    expect(scope.board[1][2].value).toBe(6);
    expect(scope.doneMoves.length).toBe(0);

  });
  it('board values matrix', function () {
    // board initialization
    scope.i = 8;
    scope.j = 8;
    scope.initBoard();

    expect(scope.board[7][7].clickable).toBe(true);
    expect(scope.board[0][0].value).toBe(2);

    // click on 1-2
    scope.clickElem(1, 2);
    expect(scope.board[0][0].value).toBe(1);
    expect(scope.board[1][2].value).toBe(-1);
    expect(scope.board[1][2].clickable).toBe(true);
    expect(scope.board[7][7].clickable).toBe(false);
    expect(scope.doneMoves.length).toBe(1);
    
    // click on 2-1 (not clickable, nothing has changed)
    scope.clickElem(2, 1);
    expect(scope.board[0][0].value).toBe(1);
    expect(scope.board[1][2].value).toBe(-1);
    expect(scope.board[1][2].clickable).toBe(true);
    expect(scope.board[7][7].clickable).toBe(false);
    expect(scope.doneMoves.length).toBe(1);
  });
  it('board values matrix (current)', function () {
    // board initialization
    scope.i = 8;
    scope.j = 8;
    scope.initBoard();

    // click on 1-2
    scope.clickElem(1, 2);
    expect(scope.board[1][2].current).toBe(true);
    expect(scope.board[0][0].current).toBe(false);
    
    // click on 0-0
    scope.clickElem(0, 0);
    expect(scope.board[0][0].current).toBe(true);
    expect(scope.board[1][2].current).toBe(false);

    // click on 0-0
    scope.clickElem(0, 0);
    expect(scope.board[1][2].current).toBe(true);
    expect(scope.board[0][0].current).toBe(false);
  });
  it('board loose', function () {
    // board initialization
    scope.i = 8;
    scope.j = 8;
    scope.initBoard();
    expect(scope.board[0][0].value).toBe(2);

    // click on 1-2
    scope.clickElem(1, 2);
    expect(scope.board[0][0].value).toBe(1);
    
    // click on 3-3
    scope.clickElem(3, 3);
    expect(scope.board[0][0].value).toBe(1);
    
    // click on 2-1
    scope.clickElem(2, 1);
    expect(scope.board[0][0].value).toBe(0);

    // click on 0-0 (last click)
    scope.clickElem(0, 0);
    expect(scope.board[2][1].value).toBe(-1);
    expect(scope.board[1][2].value).toBe(-1);
    expect(scope.board[0][0].value).toBe(-1);
    expect(scope.doneMoves.length).toBe(4)

    // you loose, you need to come back
    scope.clickElem(0, 0);
    scope.clickElem(2, 1);
    scope.clickElem(3, 3);
    expect(scope.doneMoves.length).toBe(1)
    expect(scope.board[1][2].current).toBe(true);
    expect(scope.board[3][3].current).toBe(false);
    expect(scope.board[2][1].current).toBe(false);
    expect(scope.board[0][0].current).toBe(false);

  });
  it('board win', function () {
    // board initialization
    scope.i = 5;
    scope.j = 5;
    scope.initBoard();

    var moves = [[0, 0],
      [2, 1],
      [4, 0],
      [3, 2],
      [4, 4],
      [2, 3],
      [0, 4],
      [1, 2],
      [2, 0],
      [4, 1],
      [3, 3],
      [1, 4],
      [0, 2],
      [1, 0],
      [3, 1],
      [4, 3],
      [2, 4],
      [0, 3],
      [1, 1],
      [3, 0],
      [4, 2],
      [3, 4],
      [2, 2],
      [0, 1],
      [1, 3]
    ]

    for(var i=0; i<moves.length-1; i++) {
      scope.clickElem(moves[i][0], moves[i][1]);
    }

    expect(scope.doneMoves.length).toBe(24);
    expect(scope.win()).toBe(false);

    // last move before win
    scope.clickElem(moves[moves.length-1][0], moves[moves.length-1][1]);
    expect(scope.doneMoves.length).toBe(25);
    expect(scope.win()).toBe(true);

  });
  it('board reset', function () {
    // board initialization
    scope.i = 5;
    scope.j = 5;
    scope.initBoard();

    scope.clickElem(1, 2);
    scope.clickElem(3, 3);
    expect(scope.doneMoves.length).toBe(2);

    // re-init board
    scope.initBoard();
    expect(scope.doneMoves.length).toBe(0);
  });
  it('board fail and back', function () {
    // board initialization
    scope.i = 5;
    scope.j = 5;
    scope.initBoard();

    var moves = [
      [0, 0],
      [1, 2],
      [2, 0],
      [0, 1],
      [2, 2],
      [1, 0],
      [0, 2],
      [1, 4],
      [3, 3],
      [2, 1],
      [1, 3],
      [3, 2],
      [2, 4],
      [0, 3],
      [1, 1],
      [2, 3],
      [0, 4]
    ]

    for(var i=0; i<moves.length; i++) {
      scope.clickElem(moves[i][0], moves[i][1]);
    }

    expect(scope.doneMoves.length).toBe(17);
    expect(scope.win()).toBe(false);

    // no more moves
    expect(scope.board[0][4].clickable).toBe(true);
    expect(scope.board[0][4].current).toBe(true);
    expect(scope.board[1][2].clickable).toBe(false);
    expect(scope.board[2][3].clickable).toBe(false);

    // we can just come back and uncheck the last move
    scope.clickElem(0,4)
    expect(scope.board[2][3].current).toBe(true);
    expect(scope.board[0][4].current).toBe(false);

    expect(scope.board[1][2].clickable).toBe(false);
    expect(scope.board[0][4].clickable).toBe(true);
    expect(scope.board[3][1].clickable).toBe(true);
    expect(scope.board[4][2].clickable).toBe(true);
    expect(scope.board[4][4].clickable).toBe(true);


  });
  it('board fail and back 2', function () {
    // board initialization
    scope.i = 5;
    scope.j = 5;
    scope.initBoard();

    var moves = [
        [0, 0],
        [1, 2],
        [2, 0],
        [0, 1],
        [2, 2],
        [1, 0],
        [3, 1],
        [2, 3],
        [1, 1],
        [3, 0],
        [4, 2],
        [2, 1],
        [0, 2],
        [1, 4],
        [3, 3],
        [4, 1]
    ]

    for(var i=0; i<moves.length; i++) {
      scope.clickElem(moves[i][0], moves[i][1]);
    }

    expect(scope.doneMoves.length).toBe(16);
    expect(scope.win()).toBe(false);

    // no more moves
    expect(scope.board[2][0].clickable).toBe(false);
    expect(scope.board[2][2].clickable).toBe(false);
    expect(scope.board[3][3].clickable).toBe(false);

    // we can just come back and uncheck the last move
    scope.clickElem(4,1)
    expect(scope.board[3][3].current).toBe(true);
    expect(scope.board[4][1].current).toBe(false);

    expect(scope.board[4][1].clickable).toBe(true);
    expect(scope.board[2][0].clickable).toBe(false);
    expect(scope.board[2][2].clickable).toBe(false);
    expect(scope.board[1][4].clickable).toBe(false);

  });
  it('board reset', function () {
    // board initialization
    scope.i = 5;
    scope.j = 5;
    scope.initBoard();

    scope.clickElem(1, 2);
    scope.clickElem(3, 3);
    expect(scope.doneMoves.length).toBe(2);

    // re-init board
    scope.initBoard();
    expect(scope.doneMoves.length).toBe(0);
  });
  /*
  it('board autosolve', function () {
    // board initialization
    scope.i = 5;
    scope.j = 5;
    scope.initBoard();

    scope.clickElem(1, 2);
    scope.clickElem(3, 3);
    expect(scope.doneMoves.length).toBe(2);
    expect(scope.win()).toBe(false);

    scope.solve();
    expect(scope.doneMoves.length).toBe(25);
    expect(scope.win()).toBe(true);
  });
  */
});
