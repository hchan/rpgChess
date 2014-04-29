

function Rook() {
	this.health = 1000;
	this.damage = 300;
	this.maxHealth = this.health;


	this.updateMoves = function() {
		var possibleTiles = [];
		var possibleTile = null;
		for (var i = 1; i < SQUARESIZE; i++) {
			possibleTile = TILES.get(SELECTEDTILE.displayX + (SELECTEDTILE.displayY + i));
			if (possibleTile != null && possibleTile.boardPiece == null) {
				SELECTEDTILE_POSSIBLE_TILES.push(possibleTile);
			} else {
				break;
			}			
		}
		for (var i = 1; i < SQUARESIZE; i++) {
			possibleTile = TILES.get(SELECTEDTILE.displayX + (SELECTEDTILE.displayY - i));
			if (possibleTile != null && possibleTile.boardPiece == null) {
				SELECTEDTILE_POSSIBLE_TILES.push(possibleTile);
			} else {
				break;
			}			
		}
		for (var i = 1; i < SQUARESIZE; i++) {
			possibleTile = TILES.get(SELECTEDTILE.getDisplayX(i) + SELECTEDTILE.displayY);
			if (possibleTile != null && possibleTile.boardPiece == null) {
				SELECTEDTILE_POSSIBLE_TILES.push(possibleTile);
			} else {
				break;
			}			
		}
		for (var i = 1; i < SQUARESIZE; i++) {
			possibleTile = TILES.get(SELECTEDTILE.getDisplayX(-i) + SELECTEDTILE.displayY);
			if (possibleTile != null && possibleTile.boardPiece == null) {
				SELECTEDTILE_POSSIBLE_TILES.push(possibleTile);
			} else {
				break;
			}			
		}	
	}
	
	this.updateAttacks = function() {
		var possibleTiles = [];
		var possibleTile = null;
		for (var i = 1; i < SQUARESIZE; i++) {
			possibleTile = TILES.get(SELECTEDTILE.displayX + (SELECTEDTILE.displayY + i));
			if (possibleTile == null) {
				break;
			}			
			if (possibleTile.boardPiece != null) {
				if (possibleTile.isEnemy()) {
					SELECTEDTILE_POSSIBLE_TILES.push(possibleTile);
				}
				break;
			}			
		}
		for (var i = 1; i < SQUARESIZE; i++) {
			possibleTile = TILES.get(SELECTEDTILE.displayX + (SELECTEDTILE.displayY - i));
			if (possibleTile == null) {
				break;
			}			
			if (possibleTile.boardPiece != null) {
				if (possibleTile.isEnemy()) {
					SELECTEDTILE_POSSIBLE_TILES.push(possibleTile);
				}
				break;
			}			
		}
		for (var i = 1; i < SQUARESIZE; i++) {
			possibleTile = TILES.get(SELECTEDTILE.getDisplayX(i) + SELECTEDTILE.displayY);
			if (possibleTile == null) {
				break;
			}			
			if (possibleTile.boardPiece != null) {
				if (possibleTile.isEnemy()) {
					SELECTEDTILE_POSSIBLE_TILES.push(possibleTile);
				}
				break;
			}					
		}
		for (var i = 1; i < SQUARESIZE; i++) {
			possibleTile = TILES.get(SELECTEDTILE.getDisplayX(-i) + SELECTEDTILE.displayY);
			if (possibleTile == null) {
				break;
			}			
			if (possibleTile.boardPiece != null) {
				if (possibleTile.isEnemy()) {
					SELECTEDTILE_POSSIBLE_TILES.push(possibleTile);
				}
				break;
			}				
		}	
	}
	
	this.getSkillNames = function() {
		return ["earthquake", "sacrifice"];
	}
	
	
	
}