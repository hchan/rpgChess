function Earthquake() {
	this.skillName = "earthquake";
	this.multiplier = 0.1;
	this.resourceHash = new Hashtable();
	this.resourceHash.put("fire", 0);
	this.resourceHash.put("earth", 10);
	this.resourceHash.put("wind", 0);
	this.resourceHash.put("water", 0);
	
	
	this.select = function () {
		$("#PERFORM_SKILL").attr("disabled", false);
		$("#PERFORM_SKILL").attr("onclick", "performSkill('" + this.skillName + "')");
		$("#PERFORM_SKILL").attr("value",
				"Perform " + getSkillFullname(this.skillName));
		paintAll();
		this.updatePossibleTiles();
		highlightSelectedUnitForSkills();
		SELECTEDTILE.drawSkills();
	}

	this.updatePossibleTiles = function() {
		SELECTEDTILE_POSSIBLE_TILES = getEnemyTiles();
	}

	this.updateWeightedTurn = function(weightedTurn, tile) {
		weightedTurn.selectedTile = tile;
		weightedTurn.weight = tile.boardPiece.damage * SELECTEDTILE_POSSIBLE_TILES.length * this.multiplier;
	}


	this.perform = function() {
		if (!getCurrentPlayer().hasEnoughResourceToPerformSkill(this.skillName)) {
			$.alert("", "You do not have enough resources to perform this skill");
			return;
		}
		// deduct hitpoints
		
	
		for (var i = 0; i < SELECTEDTILE_POSSIBLE_TILES.length; i++) {
			var possibleTile = SELECTEDTILE_POSSIBLE_TILES[i];
			
			// deduct hitpoints
			var dmgRand = SELECTEDTILE.boardPiece.damage * (Math.floor((Math.random() * DMG_RAND_PERCENT) + 1))/100;
			if (Math.random() > 0.5) {
				dmgRand *= -1;
			}	
			DMG_AMOUNT = (SELECTEDTILE.boardPiece.damage + dmgRand) * this.multiplier;
			
			possibleTile.boardPiece.doDamage(DMG_AMOUNT);
			
			var controlPanel = new ControlPanel();
			controlPanel.clearSelectedUnit();
			controlPanel.logAttack(SELECTEDTILE, possibleTile);
			if (possibleTile.boardPiece.health < 0) {
				processDeath(possibleTile);
			}
		}
	
	
		getCurrentPlayer().deductResourceToPerformSkill(this.skillName);
		changeTurn();
		SELECTEDTILE = null;
		paintAll();
	}
}
