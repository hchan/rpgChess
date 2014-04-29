
function Knight() {
	this.health = 1000;
	this.damage = 250;
	this.maxHealth = this.health;

	this.updateMoves = function() {

		var possibleTiles = [];
		addToPossibleTiles(SELECTEDTILE.getDisplayX(1) + (SELECTEDTILE.displayY - 2),
				possibleTiles)
		addToPossibleTiles(SELECTEDTILE.getDisplayX(2) + (SELECTEDTILE.displayY - 1),
				possibleTiles)
		addToPossibleTiles(SELECTEDTILE.getDisplayX(2) + (SELECTEDTILE.displayY + 1),
				possibleTiles)
		addToPossibleTiles(SELECTEDTILE.getDisplayX(1) + (SELECTEDTILE.displayY + 2),
				possibleTiles)
		addToPossibleTiles(SELECTEDTILE.getDisplayX(-1) + (SELECTEDTILE.displayY + 2),
				possibleTiles)
		addToPossibleTiles(SELECTEDTILE.getDisplayX(-2) + (SELECTEDTILE.displayY + 1),
				possibleTiles)
		addToPossibleTiles(SELECTEDTILE.getDisplayX(-2) + (SELECTEDTILE.displayY - 1),
				possibleTiles)
		addToPossibleTiles(SELECTEDTILE.getDisplayX(-1) + (SELECTEDTILE.displayY - 2),
				possibleTiles)
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
		addToPossibleTiles(SELECTEDTILE.getDisplayX(1) + (SELECTEDTILE.displayY - 2),
				possibleTiles);
		addToPossibleTiles(SELECTEDTILE.getDisplayX(2) + (SELECTEDTILE.displayY - 1),
				possibleTiles);
		addToPossibleTiles(SELECTEDTILE.getDisplayX(2) + (SELECTEDTILE.displayY + 1),
				possibleTiles);
		addToPossibleTiles(SELECTEDTILE.getDisplayX(1) + (SELECTEDTILE.displayY + 2),
				possibleTiles);
		addToPossibleTiles(SELECTEDTILE.getDisplayX(-1) + (SELECTEDTILE.displayY + 2),
				possibleTiles);
		addToPossibleTiles(SELECTEDTILE.getDisplayX(-2) + (SELECTEDTILE.displayY + 1),
				possibleTiles);
		addToPossibleTiles(SELECTEDTILE.getDisplayX(-2) + (SELECTEDTILE.displayY - 1),
				possibleTiles);
		addToPossibleTiles(SELECTEDTILE.getDisplayX(-1) + (SELECTEDTILE.displayY - 2),
				possibleTiles);
		
		for ( var i = 0; i < possibleTiles.length; i++) {
			var possibleTile = possibleTiles[i];
			if (possibleTile.isEnemy()) {
				SELECTEDTILE_POSSIBLE_TILES.push(possibleTile);
			}
		}
	}

	this.getSkillNames = function() {
		return ["teleport", "sacrifice"];
	}

}