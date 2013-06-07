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
});
