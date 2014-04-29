// The AI of the game (applicable if GAME_MODE = "COMP")
// pronounced as AI-Zero (AI 0)
function Aizero() {
	this.doTurn = function() {
		var friendTiles = getFriendTiles();
		var weightedTurns = [];

		this.addWeightTurnsForMoves(friendTiles, weightedTurns);
		this.addWeightTurnsForAttacks(friendTiles, weightedTurns);
		this.addWeightTurnsForSkills(friendTiles, weightedTurns);

		weightedTurns.sort(this.sortWeightedTurns);

		/*
		for ( var i = 0; i < weightedTurns.length; i++) {
			var weightedTurn = weightedTurns[i];
			console.debug(weightedTurn.weight + ":" + weightedTurn.action);
		}
		*/

		var maxWeightedTurn = weightedTurns[0];
		SELECTEDTILE = maxWeightedTurn.selectedTile;
		PREV_SELECTEDTILE = maxWeightedTurn.prevTile;
		if (maxWeightedTurn.action == "move") {
			processMove();
		} else if (maxWeightedTurn.action == "attack") {
			processAttack();
		} else if (maxWeightedTurn.action == "skill") {
			var skill = createSkillFromSkillName(maxWeightedTurn.skillName);
			skill.updatePossibleTiles();
			performSkill(maxWeightedTurn.skillName);
		}
		//changeTurn();
	}

	// compute weights for moves
	this.addWeightTurnsForMoves = function(friendTiles, weightedTurns) {
		for ( var i = 0; i < friendTiles.length; i++) {
			var tile = friendTiles[i];
			SELECTEDTILE = tile;
			SELECTEDTILE_POSSIBLE_TILES = [];
			tile.boardPiece.updateMoves();

			for ( var j = 0; j < SELECTEDTILE_POSSIBLE_TILES.length; j++) {
				var possibleTile = SELECTEDTILE_POSSIBLE_TILES[j];
				var weightedTurn = new WeightedTurn();
				weightedTurn.prevTile = tile;
				weightedTurn.selectedTile = possibleTile;
				weightedTurn.action = "move";
				var weight = 0;
				if (possibleTile.isResourceTile()) {
					weight = 1000;
				} else {
					weight = 0;
				}
				if (tile.isResourceTile()) {
					weight = -1; // bad move to move this
				}

				weightedTurn.weight = weight;
				weightedTurns.push(weightedTurn);
			}
		}
	}

	// compute weights for attacks
	this.addWeightTurnsForAttacks = function(friendTiles, weightedTurns) {
		for ( var i = 0; i < friendTiles.length; i++) {
			var tile = friendTiles[i];
			SELECTEDTILE = tile;
			SELECTEDTILE_POSSIBLE_TILES = [];
			tile.boardPiece.updateAttacks();

			for ( var j = 0; j < SELECTEDTILE_POSSIBLE_TILES.length; j++) {
				var possibleTile = SELECTEDTILE_POSSIBLE_TILES[j];
				var weightedTurn = new WeightedTurn();
				weightedTurn.prevTile = tile;
				weightedTurn.selectedTile = possibleTile;
				weightedTurn.action = "attack";
				var weight = 0;
				if (possibleTile.isResourceTile()) {
					weight = tile.boardPiece.damage * 2;
				} else {
					weight = tile.boardPiece.damage;
				}

				weightedTurn.weight = weight;
				weightedTurns.push(weightedTurn);
			}

		}
	}
	
	// compute weights for skills
	this.addWeightTurnsForSkills = function(friendTiles, weightedTurns) {
		for ( var i = 0; i < friendTiles.length; i++) {
			var tile = friendTiles[i];
			SELECTEDTILE = tile;
			SELECTEDTILE_POSSIBLE_TILES = [];
			var skillNames = tile.boardPiece.getSkillNames();

			for ( var j = 0; j < skillNames.length; j++) {
				var skillName = skillNames[j];
			
				
				if (getCurrentPlayer().hasEnoughResourceToPerformSkill(skillName)) {
					
					var weightedTurn = new WeightedTurn();
			
					weightedTurn.action = "skill";
					weightedTurn.skillName = skillName;
					weightedTurn.selectedTile = tile;
					var skill = createSkillFromSkillName(skillName);
				
					skill.updatePossibleTiles();
					skill.updateWeightedTurn(weightedTurn, tile);
						
				
					weightedTurns.push(weightedTurn);
				}
			}
		}
	}
		
	
	

	this.sortWeightedTurns = function(weightedTurn1, weightedTurn2) {
		if (weightedTurn1.weight > weightedTurn2.weight) {
			return -1;
		} else if (weightedTurn1.weight < weightedTurn2.weight) {
			return 1;
		} else {
			return 0;
		}
	}

}
