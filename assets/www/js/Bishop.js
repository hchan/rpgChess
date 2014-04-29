

function Bishop() {
	this.health = 1000;
	this.damage = 0;
	this.heal = 150;
	this.maxHealth = this.health;


	this.updateMoves = function() {
		var possibleTiles = [];
		var possibleTile = null;
		for (var i = 1; i < SQUARESIZE; i++) {
			possibleTile = TILES.get(SELECTEDTILE.getDisplayX(i) + (SELECTEDTILE.displayY + i));
			if (possibleTile != null && possibleTile.boardPiece == null) {
				SELECTEDTILE_POSSIBLE_TILES.push(possibleTile);
			} else {
				break;
			}			
		}
		for (var i = 1; i < SQUARESIZE; i++) {
			possibleTile = TILES.get(SELECTEDTILE.getDisplayX(i) + (SELECTEDTILE.displayY - i));
			if (possibleTile != null && possibleTile.boardPiece == null) {
				SELECTEDTILE_POSSIBLE_TILES.push(possibleTile);
			} else {
				break;
			}			
		}
		for (var i = 1; i < SQUARESIZE; i++) {
			possibleTile = TILES.get(SELECTEDTILE.getDisplayX(-i) + (SELECTEDTILE.displayY+i));
			if (possibleTile != null && possibleTile.boardPiece == null) {
				SELECTEDTILE_POSSIBLE_TILES.push(possibleTile);
			} else {
				break;
			}			
		}
		for (var i = 1; i < SQUARESIZE; i++) {
			possibleTile = TILES.get(SELECTEDTILE.getDisplayX(-i) + (SELECTEDTILE.displayY-i));
			if (possibleTile != null && possibleTile.boardPiece == null) {
				SELECTEDTILE_POSSIBLE_TILES.push(possibleTile);
			} else {
				break;
			}			
		}	
	}
	
	this.updateAttacks = function() {
	
	}
	
	this.getSkillNames = function() {
		return ["firstAid", "restoreLife", "sacrifice"]; 	
	}
	
}