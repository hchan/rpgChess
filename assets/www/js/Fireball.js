function Fireball() {
	this.skillName = "fireball";
	this.multiplier = 3;
	this.resourceHash = new Hashtable();
	this.resourceHash.put("fire", 10);
	this.resourceHash.put("earth", 0);
	this.resourceHash.put("wind", 0);
	this.resourceHash.put("water", 0);
	
	this.select = function() {
		$("#PERFORM_SKILL").attr("disabled", true);
		//$("#PERFORM_SKILL").attr("onclick", "performFireball()");
		$("#PERFORM_SKILL").attr("value", SELECT_ENEMY_UNIT_TEXT);
		paintAll();
		this.updatePossibleTiles();
		highlightSelectedUnitForSkills();
		SELECTEDTILE.drawSkillsSelectionRequired();
	}
	
	this.updatePossibleTiles = function() {
		SELECTEDTILE_POSSIBLE_TILES = getEnemyTiles();
	}
	
	this.updateWeightedTurn = function(weightedTurn, tile) {
		weightedTurn.prevTile = tile;
		for (var i = 0; i < SELECTEDTILE_POSSIBLE_TILES.length; i++) {
			var possibleTile = SELECTEDTILE_POSSIBLE_TILES[i];
			
			if (possibleTile.boardPiece.rank == "king") {
				weightedTurn.selectedTile = possibleTile;
				weightedTurn.weight = 1700;
				break;
			}
			
		}
	}
	
	this.perform = function() {
		if (!getCurrentPlayer().hasEnoughResourceToPerformSkill(this.skillName)) {
			$.alert("", "You do not have enough resources to perform this skill");
			return;
		}
		// deduct hitpoints
		var dmgRand = PREV_SELECTEDTILE.boardPiece.damage
				* (Math.floor((Math.random() * DMG_RAND_PERCENT) + 1)) / 100;
		if (Math.random() > 0.5) {
			dmgRand *= -1;
		}
		DMG_AMOUNT = (PREV_SELECTEDTILE.boardPiece.damage + dmgRand) * this.multiplier;
	
		SELECTEDTILE.boardPiece.doDamage(DMG_AMOUNT);
		getCurrentPlayer().deductResourceToPerformSkill(this.skillName);
	
		var controlPanel = new ControlPanel();
		controlPanel.clearSelectedUnit();
		controlPanel.logAttack(PREV_SELECTEDTILE, SELECTEDTILE);
		if (SELECTEDTILE.boardPiece.health < 0) {
			processDeath(SELECTEDTILE);
		}
		changeTurn();
		SELECTEDTILE = null;
		paintAll();
	}
}
