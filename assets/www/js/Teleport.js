function Teleport() {
	this.skillName = "teleport";
	this.multiplier = 0;
	this.resourceHash = new Hashtable();
	this.resourceHash.put("fire", 0);
	this.resourceHash.put("earth", 0);
	this.resourceHash.put("wind", 10);
	this.resourceHash.put("water", 0);
	
	this.select = function() {
		$("#PERFORM_SKILL").attr("disabled", false);
		$("#PERFORM_SKILL").attr("onclick", "performSkill('" + this.skillName + "')");
		$("#PERFORM_SKILL").attr("value", SELECT_EMPTY_TILE_TEXT);
		paintAll();
		this.updatePossibleTiles();
		highlightSelectedUnitForSkills();
		SELECTEDTILE.drawSkillsSelectionRequired();
	}
	
	this.updatePossibleTiles = function() {
		SELECTEDTILE_POSSIBLE_TILES = getEmptyTiles();
	}
	
	this.updateWeightedTurn = function(weightedTurn, tile) {
		weightedTurn.prevTile = tile;
	
		var chosenTile = SELECTEDTILE_POSSIBLE_TILES[0];
	
		for ( var k = 0; k < SELECTEDTILE_POSSIBLE_TILES.length; k++) {
	
			var possibleTile = SELECTEDTILE_POSSIBLE_TILES[k];
			if (!tile.isResourceTile()) { // don't teleport out
				if (possibleTile.isResourceTile()) {
					chosenTile = possibleTile;
					weightedTurn.weight = 900;
					break;
				}
			}
		}
	
		weightedTurn.selectedTile = chosenTile;
	}
	
	this.perform = function() {
		if (!getCurrentPlayer().hasEnoughResourceToPerformSkill(this.skillName)) {
			$.alert("", "You do not have enough resources to perform this skill");
			return;
		}
	
		SELECTEDTILE.boardPiece = PREV_SELECTEDTILE.boardPiece;
		PREV_SELECTEDTILE.boardPiece = null;
		var controlPanel = new ControlPanel();
		controlPanel.clearSelectedUnit();
		controlPanel.logMove();
		changeTurn();
		SELECTEDTILE = null;
		paintAll();
	}
}
