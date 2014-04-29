

function Pawn() {
	this.health = 1000;
	this.damage = 200;
	this.maxHealth = this.health;
	
	
	this.updateMoves = function() {
		
		var yDirection = -1; // possible values are 1, -1
		if (SELECTEDTILE.boardPiece.color == "red") {
			yDirection = -1;
		} else {
			yDirection = 1;
		}
		var possibleTile = TILES.get(SELECTEDTILE.displayX + (SELECTEDTILE.displayY-yDirection));
		if (possibleTile.boardPiece == null) {
			SELECTEDTILE_POSSIBLE_TILES.push(possibleTile);
		}
		if ((SELECTEDTILE.boardPiece.color == "red" && SELECTEDTILE.displayY == 2) 
			|| (SELECTEDTILE.boardPiece.color == "blue" && SELECTEDTILE.displayY == 7) )
		{
			possibleTile = TILES.get(SELECTEDTILE.displayX + (SELECTEDTILE.displayY - 2*yDirection));
			if (possibleTile.boardPiece == null) {
				SELECTEDTILE_POSSIBLE_TILES.push(possibleTile);
			}
		}
		
	}
	
	this.updateAttacks = function() {
		var yDirection = -1; // possible values are 1, -1
		if (SELECTEDTILE.boardPiece.color == "red") {
			yDirection = -1;
		} else {
			yDirection = 1;
		}
		var possibleTiles = [];
		var possibleTile = TILES.get((SELECTEDTILE.getDisplayX(1)) + (SELECTEDTILE.displayY-yDirection));
		possibleTiles.push(possibleTile);
		possibleTile = TILES.get((SELECTEDTILE.getDisplayX(-1)) + (SELECTEDTILE.displayY-yDirection));
		possibleTiles.push(possibleTile);
		
		
		for (var i = 0; i < possibleTiles.length; i++) {
			var possibleTile = possibleTiles[i];
			if (possibleTile != null &&
					!possibleTile.isEmpty()
					&& 	possibleTile.isEnemy()
			) {			
				SELECTEDTILE_POSSIBLE_TILES.push(possibleTile);
			}
		}
		
	}
	
	
	this.getSkillNames = function() {
		return ["sacrifice"];
	}
	
	
	
}