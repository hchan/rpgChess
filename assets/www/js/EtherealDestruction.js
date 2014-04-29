function EtherealDestruction() {
	this.skillName = "etherealDestruction";
	this.resourceHash = new Hashtable();
	this.resourceHash.put("fire", 50);
	this.resourceHash.put("earth", 50);
	this.resourceHash.put("wind", 50);
	this.resourceHash.put("water", 50);
	
	this.select = function() {
		$("#PERFORM_SKILL").attr("disabled", false);
		$("#PERFORM_SKILL").attr("onclick", "performSkill('" + this.skillName + "')");
		$("#PERFORM_SKILL").attr("value", "Perform " + getSkillFullname(this.skillName));
		paintAll();
		this.updatePossibleTiles();
		highlightSelectedUnitForSkills();
		SELECTEDTILE.drawSkills();
	}
	
	this.updatePossibleTiles = function () {
		var tileKeys = TILES.keys();
		var enemyKing = null;
		for (var i = 0; i < tileKeys.length; i++) {
			var tileKey = tileKeys[i];
			var tile = TILES.get(tileKey);
			if (tile.boardPiece != null) {
				if (tile.boardPiece.rank == "king") {
					if (tile.boardPiece.color != TURN) {
						enemyKing = tile;
						break;
					}
				}
			}
		}	
		SELECTEDTILE_POSSIBLE_TILES = [];
		SELECTEDTILE_POSSIBLE_TILES.push(enemyKing);
	}
	
	this.updateWeightedTurn = function(weightedTurn, tile) {		
		weightedTurn.selectedTile = tile;
		weightedTurn.weight = Number.MAX_VALUE;
	}
	
	this.perform = function() {
		
		if (!getCurrentPlayer().hasEnoughResourceToPerformSkill(this.skillName)) {
			$.alert("", "You do not have enough resources to perform this skill");
			return;
		}
		
		
		for (var i = 0; i < SELECTEDTILE_POSSIBLE_TILES.length; i++) {
			var possibleTile = SELECTEDTILE_POSSIBLE_TILES[i];
			
			// deduct hitpoints
		
			DMG_AMOUNT = Number.MAX_VALUE;
			
			possibleTile.boardPiece.doDamage(DMG_AMOUNT);
			
			var controlPanel = new ControlPanel();
			controlPanel.clearSelectedUnit();
			controlPanel.logAttack(SELECTEDTILE, possibleTile);
			if (possibleTile.boardPiece.health < 0) {
				processDeath(possibleTile);
			}
		}
	
		var controlPanel = new ControlPanel();
		controlPanel.clearSelectedUnit();	
		
		getCurrentPlayer().deductResourceToPerformSkill(this.skillName);
		changeTurn();
		SELECTEDTILE = null;
		paintAll();
	}
}
