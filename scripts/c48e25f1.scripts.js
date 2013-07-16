"use strict";angular.module("tourKnightAngularjsApp",[]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl"}).otherwise({redirectTo:"/"})}]),angular.module("tourKnightAngularjsApp").controller("MainCtrl",["$scope",function(a){var b=[[1,2],[-1,2],[1,-2],[-1,-2],[2,1],[2,-1],[-2,1],[-2,-1]],c=function(c,d,e){var f,g,h,i=a.maxI,j=a.maxJ,k=0;h=b.length;for(var l=0;h>l;l++)f=c+b[l][0],g=d+b[l][1],i>f&&f>=0&&j>g&&g>=0&&(e?k++:a.board[f][g].value>=0&&k++);return k},d=function(b){var c,d,e,f;for(e=a.board.length,c=0;e>c;c++)for(f=a.board[c].length,d=0;f>d;d++)b(c,d)},e=function(b,c){a.board[b][c].clickable=!1};a.maxI=0,a.maxJ=0,a.totalMoves=function(){return"object"==typeof a.board&&a.board.length>0?a.board.length*a.board[0].length:0},a.lenDoneMoves=function(){var b=0;return angular.forEach(a.board,function(a){angular.forEach(a,function(a){a.checked&&b++})}),b},a.win=function(){var b=a.lenDoneMoves(),c=a.totalMoves();return b&&c?b===c:!1},a.doneMoves=[],a.board=[],a.initBoard=function(){var b,d,e=[],f=parseInt(a.i,10),g=parseInt(a.j,10),h=[];for(a.maxI=f,a.maxJ=g,b=0;f>b;b++){for(h=[],d=0;g>d;d++)h.push({i:b,j:d,checked:"",value:c(b,d,!0),clickable:!0,current:!1});e.push(h)}a.board=e,a.doneMoves=[]},a.clickElem=function(f,g){var h,i,j=a.board[f][g].checked,k=a.doneMoves.length,l=0,m=k?a.doneMoves[k-1]:void 0,n=b.length;if(j)if(m){if(m[0]!==f&&m[1]!==g)return;if(a.board[f][g].current=!1,a.board[f][g].checked=!1,a.board[f][g].clickable=!0,a.board[f][g].value=c(f,g,!1),a.doneMoves.pop(),k=a.doneMoves.length,m=k?a.doneMoves[k-1]:void 0){for(l=0;n>l;l++)h=f+b[l][0],i=g+b[l][1],h<a.maxI&&h>=0&&i<a.maxJ&&i>=0&&-1!==a.board[h][i].value&&(a.board[h][i].value+=1,a.board[h][i].clickable=!1);for(f=m[0],g=m[1],a.board[f][g].current=!0,a.board[f][g].value=-1,a.board[f][g].checked=!0,a.board[f][g].clickable=!0,l=0;n>l;l++)h=f+b[l][0],i=g+b[l][1],h<a.maxI&&h>=0&&i<a.maxJ&&i>=0&&a.board[h][i].value>=0&&(a.board[h][i].clickable=!0)}else a.initBoard()}else a.initBoard();else{if(!a.board[f][g].clickable)return;for(d(e),a.board[f][g].current=!0,a.board[f][g].value=-1,a.board[f][g].checked=j?!1:!0,a.board[f][g].clickable=!0,l=0;n>l;l++)h=f+b[l][0],i=g+b[l][1],h<a.maxI&&h>=0&&i<a.maxJ&&i>=0&&(a.board[h][i].value>=0&&(a.board[h][i].clickable=!0,a.board[h][i].value>=1&&(a.board[h][i].value-=1)),a.board[h][i].current=!1);a.doneMoves.push([f,g])}}}]);