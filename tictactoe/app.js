angular.module('app', ['ngMaterial'])

	.controller('AppCtrl', ['$scope', function($scope){
		
		// INITIALZING GAME
		$scope.game = [['','',''],['','',''],['','','']];
		
		// FIRST LINE
		$scope.game[0][0] = ''; 
		$scope.game[0][1] = '';
		$scope.game[0][2] = '';

		// SECOND LINE
		$scope.game[1][0] = '';
		$scope.game[1][1] = '';
		$scope.game[1][2] = '';
		
		// THIRD LINE
		$scope.game[2][0] = '';
		$scope.game[2][1] = '';
		$scope.game[2][2] = '';
			
		function createChildren(node, char){
			var children = [];
			// LINES
			for(var i=0; i<3; i++){
				// COLUMNS
				for(var j=0; j<3; j++){
					// EMPTY SLOT
					if(node.game[i][j] == ''){
						var chield = {
							root: false,
							game: angular.copy(node.game),
							score: 0,
							parent: node,
							children: []
						}
					 	chield.game[i][j] = char;
					 	if(char == 'O') createChildren(chield, 'X');	
					 	if(char == 'X') createChildren(chield, 'O');	
					 	children.push(chield);
					}
				}
			}
			node.children = children;
			if(node.children.length == 0) setParentScore(node);
		}

		function setParentScore(node){
			if(node.parent){
				if(!node.parent.root && getWinner(node) == 'computer') node.parent.score += (node.score + 1);
				if(!node.parent.root && getWinner(node) == 'player') node.parent.score += (node.score - 1);
				if(!node.parent.root && getWinner(node) == 'no_winner') node.parent.score += node.score;
				setParentScore(node.parent);				
			}
		}

		function getWinner(node){
			var game = node.game;

			// LINE 1
			if( (game[0][0] == 'X') && (game[0][1] == 'X') && (game[0][2] == 'X') ) return 'player';
			if( (game[0][0] == 'O') && (game[0][1] == 'O') && (game[0][2] == 'O') ) return 'computer';

			// LINE 2
			if( (game[1][0] == 'X') && (game[1][1] == 'X') && (game[1][2] == 'X') ) return 'player';
			if( (game[1][0] == 'O') && (game[1][1] == 'O') && (game[1][2] == 'O') ) return 'computer';

			// LINE 3
			if( (game[2][0] == 'X') && (game[2][1] == 'X') && (game[2][2] == 'X') ) return 'player';
			if( (game[2][0] == 'O') && (game[2][1] == 'O') && (game[2][2] == 'O') ) return 'computer';

			// COMLUMN 1
			if( (game[0][0] == 'X') && (game[1][0] == 'X') && (game[2][0] == 'X') ) return 'player';
			if( (game[0][0] == 'O') && (game[1][0] == 'O') && (game[2][0] == 'O') ) return 'computer';

			// COLUMN 2
			if( (game[0][1] == 'X') && (game[1][1] == 'X') && (game[2][1] == 'X') ) return 'player';
			if( (game[0][1] == 'O') && (game[1][1] == 'O') && (game[2][1] == 'O') ) return 'computer';

			// COMLUMN 3
			if( (game[0][2] == 'X') && (game[1][2] == 'X') && (game[2][2] == 'X') ) return 'player';
			if( (game[0][2] == 'O') && (game[1][2] == 'O') && (game[2][2] == 'O') ) return 'computer';

			// DIAGONAL 1
			if( (game[0][0] == 'X') && (game[1][1] == 'X') && (game[2][2] == 'X') ) return 'player';
			if( (game[0][0] == 'O') && (game[1][1] == 'O') && (game[2][2] == 'O') ) return 'computer';

			// DIAGONAL 2
			if( (game[0][2] == 'X') && (game[1][1] == 'X') && (game[2][0] == 'X') ) return 'player';
			if( (game[0][2] == 'O') && (game[1][1] == 'O') && (game[2][0] == 'O') ) return 'computer';

			// NO WINNER
			return 'no_winner';
		}

		function getMinMaxComputerGame(node){
			createChildren(node, 'O');
			var bestChield = node.children[0];

			for(var i=0; i<node.children.length; i++){
				if(node.children[i].score > bestChield.score) bestChield = node.children[i];
			}
			return bestChield.game;
		}	

		$scope.updateGame = function(i, j, char){
			// NODE 
			var node = {
				root: true,
				game: undefined,
				children: []
			}

			// USERS GAME
			$scope.game[i][j] = char;
			node.game = $scope.game;
			$scope.winner = getWinner(node);
			
			// COMPUTERS GAME
			setTimeout(function(){
				$scope.game = getMinMaxComputerGame(node);
				node.game = $scope.game;
				$scope.winner = getWinner(node);
				$scope.$apply();
			}, 500);
		}

		$scope.resetGame = function(){
			// WINNER ALERT
			$scope.winner = 'no_winner';

			// FIRST LINE
			$scope.game[0][0] = ''; 
			$scope.game[0][1] = '';
			$scope.game[0][2] = '';

			// SECOND LINE
			$scope.game[1][0] = '';
			$scope.game[1][1] = '';
			$scope.game[1][2] = '';
			
			// THIRD LINE
			$scope.game[2][0] = '';
			$scope.game[2][1] = '';
			$scope.game[2][2] = '';

			$scope.$apply();
		}


	}]);