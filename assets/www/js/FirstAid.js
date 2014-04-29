function FirstAid() {
	this.skillName = "firstAid";
	this.multiplier = 2;
	this.resourceHash = new Hashtable();
	this.resourceHash.put("fire", 0);
	this.resourceHash.put("earth", 0);
	this.resourceHash.put("wind", 0);
	this.resourceHash.put("water", 0);

	this.select = function() {
		$("#PERFORM_SKILL").attr("disabled", true);
		//$("#PERFORM_SKILL").attr("onclick", "performFirstAid()");
		$("#PERFORM_SKILL").attr("value", SELECT_FRIEND_UNIT_TEXT);
		paintAll();
		this.updatePossibleTiles();
		highlightSelectedUnitForSkills();
		SELECTEDTILE.drawSkillsSelectionRequired();
	}
	
	this.updateWeightedTurn = function(weightedTurn, tile) {
		weightedTurn.prevTile = tile;
		var chosenTile = SELECTEDTILE_POSSIBLE_TILES[0];
		
		for ( var k = 0; k < SELECTEDTILE_POSSIBLE_TILES.length; k++) {
			var possibleTile = SELECTEDTILE_POSSIBLE_TILES[k];
			
			if (possibleTile.boardPiece.health < possibleTile.boardPiece.maxHealth) {
				
				weightedTurn.weight = 200;
				weightedTurn.selectedTile = possibleTile;
				if (possibleTile.boardPiece.rank == "king") {
					weightedTurn.weight = 2000;
					break;				
				}
			}
		}
		
	}
	

	this.updatePossibleTiles = function() {
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
			if (possibleTile.isFriend()) {
				SELECTEDTILE_POSSIBLE_TILES.push(possibleTile);
			}
		}
	}
	
	
	this.perform = function() {
		
		if (!getCurrentPlayer().hasEnoughResourceToPerformSkill(this.skillName)) {
			$.alert("", "You do not have enough resources to perform this skill");
			return;
		}
		
		
			// deduct hitpoints
		var healRand = PREV_SELECTEDTILE.boardPiece.heal
				* (Math.floor((Math.random() * HEAL_RAND_PERCENT) + 1)) / 100;
		if (Math.random() > 0.5) {
			healRand *= -1;
		}
		HEAL_AMOUNT = (PREV_SELECTEDTILE.boardPiece.heal + healRand) * this.multiplier;
	
		SELECTEDTILE.boardPiece.doHeal(HEAL_AMOUNT);
		getCurrentPlayer().deductResourceToPerformSkill(this.skillName);
	
		var controlPanel = new ControlPanel();
		controlPanel.clearSelectedUnit();
		controlPanel.logHeal(PREV_SELECTEDTILE, SELECTEDTILE);
		
		changeTurn();
		SELECTEDTILE = null;
		paintAll();
	}
}
