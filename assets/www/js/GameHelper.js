function updateGameWinner() {
	if (GAME_WINNER == null) {
		var tileKeys = TILES.keys();
		var redKing = null;
		var blueKing = null;
		for ( var i = 0; i < tileKeys.length; i++) {
			var tileKey = tileKeys[i];
			var tile = TILES.get(tileKey);
			if (tile.boardPiece != null) {
				if (tile.boardPiece.rank == "king") {
					if (tile.boardPiece.color == "red") {
						redKing = tile;
					} else {
						blueKing = tile;
					}
				}
			}
		}
		if (redKing == null && blueKing != null) {
			GAME_WINNER = "blue";
		}
		if (redKing != null && blueKing == null) {
			GAME_WINNER = "red";
		}
		if (redKing == null && blueKing == null) {
			GAME_WINNER = "draw";
		}

		if (GAME_WINNER != null) {
			var controlPanel = new ControlPanel();
			controlPanel.logWinner();
		}
	}
}

function getCurrentPlayer() {
	return PLAYER_HASH.get(TURN);
}

function startGame() {
	GAME_MODE = $("input[name='gameMode']:checked").val();
	initBoard();
	TURN = "red";
	GAME_WINNER = null;
	TURNCOUNT = 1;
	PLAYER_HASH.put("red", new Player());
	PLAYER_HASH.put("blue", new Player());
	var controlPanel = new ControlPanel();
	controlPanel.clearLog();

	notify({
		text : "A new game has begun"
	});

	fadeIn();
}

function fadeIn() {
	paintBoardOutline();
	for ( var y = 0; y < BOARDSIZE; y++) {
		for ( var x = 0; x < BOARDSIZE; x++) {
			var tile = TILES.get(ALPHA[x] + (BOARDSIZE - y));
			tile.fadeIn();
		}
	}
	printAxis();
}

function quickSave() {
	
	window.localStorage.setItem(PROJECTNAME, JSON.stringify(
	{
	"TILES" : TILES,
	"TURN" : TURN,
	"TURNCOUNT" : TURNCOUNT,
	"GAME_MODE" : GAME_MODE,
	"GAME_WINNER" : GAME_WINNER,
	"GAMELOG" : $("#GAMELOG").html(),
	"PLAYER_HASH" : PLAYER_HASH
	}	
	));
	notify({text: "Game Saved"});
}

function quickRestore() {
	var restoredStr = window.localStorage.getItem(PROJECTNAME);

	var restoredObj = JSON.parse(restoredStr);
	reviveTILES(restoredObj.TILES);
	initResources();
	TURN = restoredObj.TURN;
	TURNCOUNT = restoredObj.TURNCOUNT;
	GAME_MODE = restoredObj.GAME_MODE;
	GAME_WINNER = restoredObj.GAME_WINNER;
	$("#GAMELOG").html(restoredObj.GAMELOG);
	revivePLAYER_HASH(restoredObj.PLAYER_HASH);
	// TEST
	// TILES.get("e8").boardPiece.health = 50;
	
	// END TEST
	paintAll();
	notify({text: "Game Restored"});
	
	
}


