function mouseDownBOARDCANVAS(e) {

		var element = BOARDCANVAS, offsetX = 0, offsetY = 0, mx, my;

		// Compute the total offset. It's possible to cache this if you want
		if (element.offsetParent !== undefined) {
			do {
				offsetX += element.offsetLeft;
				offsetY += element.offsetTop;
			} while ((element = element.offsetParent));
		}

		// Add padding and border style widths to offset
		// Also add the <html> offsets in case there's a position:fixed bar
		// (like the stumbleupon bar)
		// This part is not strictly necessary, it depends on your styling
		// offsetX += stylePaddingLeft + styleBorderLeft + htmlLeft;
		// offsetY += stylePaddingTop + styleBorderTop + htmlTop;

		mx = e.pageX - offsetX;
		my = e.pageY - offsetY;

		var tileKeys = TILES.keys();

		var foundTile = null;
		for ( var i = 0; i < tileKeys.length; i++) {
			var tileKey = tileKeys[i];
			var tile = TILES.get(tileKey);
			// console.debug(TILE.getXBegin());
			if (mx >= tile.getXBegin() && mx <= tile.getXEnd()
					&& my >= tile.getYBegin() && my <= tile.getYEnd()) {
				foundTile = tile;
				break;
			}
		}
		if (foundTile != null) { // if Tile is not found, it could be because
									// we clicked on the axis
			PREV_SELECTEDTILE = SELECTEDTILE;
			SELECTEDTILE = foundTile;
			if (!SELECTEDTILE.isEmpty()) {
				if (($("#PERFORM_SKILL").attr("value") == SELECT_ENEMY_UNIT_TEXT || $(
						"#PERFORM_SKILL").attr("value") == SELECT_FRIEND_UNIT_TEXT)
						&& PREV_SELECTEDTILE.boardPiece.unitMode == "skill"
						&& jQuery.inArray(SELECTEDTILE,
								SELECTEDTILE_POSSIBLE_TILES) != -1
						&& GAME_WINNER == null) {
					// process skill on enemy or friend
					processSkill();
				} else if (PREV_SELECTEDTILE != null
						&& !PREV_SELECTEDTILE.isEmpty()
						&& PREV_SELECTEDTILE.boardPiece.unitMode == "move"
						&& SELECTEDTILE.isEnemy()
						&& jQuery.inArray(SELECTEDTILE,
								SELECTEDTILE_POSSIBLE_TILES) != -1
						&& GAME_WINNER == null) {
					// attack
					processAttack();
					/*
					 * } else if (PREV_SELECTEDTILE != null &&
					 * !PREV_SELECTEDTILE.isEmpty() &&
					 * PREV_SELECTEDTILE.boardPiece.unitMode == "skill" &&
					 * jQuery.inArray(SELECTEDTILE, SELECTEDTILE_POSSIBLE_TILES) !=
					 * -1 && GAME_WINNER == null) { console.debug("is this ever
					 * called?"); processSkill();
					 */
				} else if (PREV_SELECTEDTILE == SELECTEDTILE) {
					// toggle to next unitMode

					if (SELECTEDTILE.boardPiece.unitMode == "move") {
						SELECTEDTILE.boardPiece.unitMode = "skill";
						setUnitMode("skill");
					} else if (SELECTEDTILE.boardPiece.unitMode == "skill") {
						SELECTEDTILE.boardPiece.unitMode = "move";
						setUnitMode("move");
					}
				} else {
					// select unit to show moves
					var controlPanel = new ControlPanel();
					controlPanel.populate(SELECTEDTILE);
					if (SELECTEDTILE.isFriend()) {
						SELECTEDTILE.showMoves();
					} else {
						paintAll();
					}
				}
			} else {
				// empty tile
				if (PREV_SELECTEDTILE != null
						&& PREV_SELECTEDTILE.isFriend()
						&& PREV_SELECTEDTILE.boardPiece.unitMode == "move"
						&& jQuery.inArray(SELECTEDTILE,
								SELECTEDTILE_POSSIBLE_TILES) != -1
						&& GAME_WINNER == null) {
					// move
					processMove();
				} else if (PREV_SELECTEDTILE != null
						&& PREV_SELECTEDTILE.isFriend()
						&& PREV_SELECTEDTILE.boardPiece.unitMode == "skill"
						&& jQuery.inArray(SELECTEDTILE,
								SELECTEDTILE_POSSIBLE_TILES) != -1
						&& GAME_WINNER == null) {
					processSkill();
				} else {
					// click on an empty tile to clear selection
					SELECTEDTILE_POSSIBLE_TILES = [];
					paintAll();
					var controlPanel = new ControlPanel();
					controlPanel.populateEmptyTile();
				}
			}
		}
	}

	function processSkill() {

		var skillName = $("input[name='skillName']:checked").val();
		performSkill(skillName);
	}

	function processMove() {
		SELECTEDTILE.boardPiece = PREV_SELECTEDTILE.boardPiece;
		PREV_SELECTEDTILE.boardPiece = null;
		var controlPanel = new ControlPanel();
		controlPanel.clearSelectedUnit();
		controlPanel.logMove();
		playMoveSound(SELECTEDTILE);
		changeTurn();
		SELECTEDTILE = null;
		paintAll();
	}

	function processAttack() {
		// deduct hitpoints
		var dmgRand = PREV_SELECTEDTILE.boardPiece.damage
				* (Math.floor((Math.random() * DMG_RAND_PERCENT) + 1)) / 100;
		if (Math.random() > 0.5) {
			dmgRand *= -1;
		}
		DMG_AMOUNT = PREV_SELECTEDTILE.boardPiece.damage + dmgRand;

		SELECTEDTILE.boardPiece.doDamage(DMG_AMOUNT);

		var controlPanel = new ControlPanel();
		controlPanel.clearSelectedUnit();
		controlPanel.logAttack(PREV_SELECTEDTILE, SELECTEDTILE);
		playAttackSound(PREV_SELECTEDTILE);
		if (SELECTEDTILE.boardPiece.health < 0) {
			processDeath(SELECTEDTILE);
		}
		changeTurn();
		SELECTEDTILE = null;
		paintAll();
	}

	function processDeath(tile) {
		tile.fadeOut();
		var controlPanel = new ControlPanel();
		controlPanel.logDeath(tile);
		tile.boardPiece = null;
	}

	function changeTurn() {
		updateGameWinner();
		if (GAME_WINNER == null) {
			var controlPanel = new ControlPanel();
			PLAYER_HASH.get("red").initResourceGainedOnLastTurnHash();
			PLAYER_HASH.get("blue").initResourceGainedOnLastTurnHash();
			for ( var i = 0; i < RESOURCE_TILES.length; i++) {
				
				var resourceTile = RESOURCE_TILES[i];
				if (resourceTile.boardPiece != null) {
					var player = PLAYER_HASH.get(resourceTile.boardPiece.color);
					player.addResource(resourceTile.resource);
				}
			}
			controlPanel.logResourceGathering();

			if (TURN == "red") {
				TURN = "blue";
			} else {
				TURN = "red";
			}
			TURNCOUNT++;
			paintBoardOutline();

			
			
			if (GAME_MODE == "COMP" && TURN == "blue") {
				notify({
					text: "Computer: thinking...", 	
					timeout: 500,
					modal: false,
					callback: {
						afterClose: function() {
								var aizero = new Aizero();
								aizero.doTurn();
							}
						}
					});
				
			}
			if (GAME_MODE == "COMP") {
				if (TURN == "red") {
					notify({
						text: "It is now your turn"						
						});
				}
			} else {
				notify({
					text: "It is now " + TURN + "'s turn"					
					});
			}
			
		} else {
			TURN = null;
		}
	}
	
	
	

	function setUnitMode(unitMode) {
		// SELECTEDTILE.boardPiece.unitMode = unitMode;
		if (SELECTEDTILE.boardPiece.unitMode == "move") {
			setActiveSelectedUnit();
			setActiveSelectedUnitAccordion("STATS");
		} else if (SELECTEDTILE.boardPiece.unitMode == "skill") {
			setActiveSelectedUnit();
			setActiveSelectedUnitAccordion("SKILLS");
		}
	}