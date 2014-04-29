

function King() {
	this.health = 5000;
	this.damage = 500;
	this.maxHealth = this.health;


	this.updateMoves = function() {
		var possibleTiles = [];
	
		addToPossibleTiles(SELECTEDTILE.displayX + (SELECTEDTILE.displayY + 1),
				possibleTiles);
		addToPossibleTiles(SELECTEDTILE.displayX + (SELECTEDTILE.displayY - 1),
				possibleTiles);
		addToPossibleTiles(SELECTEDTILE.getDisplayX(1) + SELECTEDTILE.displayY,
				possibleTiles);
		addToPossibleTiles(SELECTEDTILE.getDisplayX(-1) + SELECTEDTILE.displayY,
				possibleTiles);
		addToPossibleTiles(SELECTEDTILE.getDisplayX(1)
				+ (SELECTEDTILE.displayY + 1), possibleTiles);
		addToPossibleTiles(SELECTEDTILE.getDisplayX(-1)
				+ (SELECTEDTILE.displayY - 1), possibleTiles);
		addToPossibleTiles(SELECTEDTILE.getDisplayX(1)
				+ (SELECTEDTILE.displayY - 1), possibleTiles);
		addToPossibleTiles(SELECTEDTILE.getDisplayX(-1)
				+ (SELECTEDTILE.displayY + 1), possibleTiles);
		SELECTEDTILE_POSSIBLE_TILES = [];
		for ( var i = 0; i < possibleTiles.length; i++) {
			var possibleTile = possibleTiles[i];
			if (possibleTile.isEmpty()) {
				SELECTEDTILE_POSSIBLE_TILES.push(possibleTile);
			}
		}
	}
	
	this.updateAttacks = function() {
		var possibleTiles = [];
				
		addToPossibleTiles(SELECTEDTILE.displayX + (SELECTEDTILE.displayY + 1),
				possibleTiles);
		addToPossibleTiles(SELECTEDTILE.displayX + (SELECTEDTILE.displayY - 1),
				possibleTiles);
		addToPossibleTiles(SELECTEDTILE.getDisplayX(1) + SELECTEDTILE.displayY,
				possibleTiles);
		addToPossibleTiles(SELECTEDTILE.getDisplayX(-1) + SELECTEDTILE.displayY,
				possibleTiles);
		addToPossibleTiles(SELECTEDTILE.getDisplayX(1)
				+ (SELECTEDTILE.displayY + 1), possibleTiles);
		addToPossibleTiles(SELECTEDTILE.getDisplayX(-1)
				+ (SELECTEDTILE.displayY - 1), possibleTiles);
		addToPossibleTiles(SELECTEDTILE.getDisplayX(1)
				+ (SELECTEDTILE.displayY - 1), possibleTiles);
		addToPossibleTiles(SELECTEDTILE.getDisplayX(-1)
				+ (SELECTEDTILE.displayY + 1), possibleTiles);
		for ( var i = 0; i < possibleTiles.length; i++) {
			var possibleTile = possibleTiles[i];
			if (possibleTile.isEnemy()) {
				SELECTEDTILE_POSSIBLE_TILES.push(possibleTile);
			}
		}
	}
	
	this.getSkillNames = function() {
		return ["etherealDestruction", "sacrifice"];	
	}
	
}