var PROJECTNAME = "RPGCHESS_BATTLE_FOR_ELEMENTAL_MAGIC";
var ANIMATELOADINGINTERVAL;
var PLEASEWAITTEXT;
var ANIMATELOADINGLOOPCOUNT = 0;
var TURN = "red"; 

var PLAYER_HASH = new Hashtable();
var GAME_WINNER = null;
var GAME_MODE = "COMP";

var SELECTEDTILE = null;
var PREV_SELECTEDTILE = null;
var JUSTKILLED_BOARDPIECE = null;
var SELECTEDTILE_POSSIBLE_TILES = [];

var BOARDCANVAS = null; 
var BOARDCANVASCTX = null; 

var TILES = new Hashtable();
var RESOURCE_TILES = [];

var OFFSET = 2;
var AXISSIZE = 10;
var BOTTOMMARGIN = 10;
var RIGHTMARGIN = 10;
var SCREENSIZE = null;
var BOARDSIZE = 8;
var SQUARESIZE = null;

var ALPHA = ['a','b','c','d','e','f','g','h'];
var ALPHATONUMBER = new Hashtable();
var IMAGES = new Hashtable();
var IMAGELOCATIONS = [];

var TURNCOUNT = 1;

var BOARDCANVASGRAY = "#aaaaaa";
var BOARDCANVASWHITE = "#ffffff"
	
var POSSIBLE_MOVE_STYLE = "#00ff00";
var POSSIBLE_ATTACK_STYLE = "#ff8c00";
var POSSIBLE_SKILL_STYLE = "#8a2be2";
var SKILL_STYLE = "#8a2be2";	

var DMG_AMOUNT = 0;
var HEAL_AMOUNT = 0;
var DMG_RAND_PERCENT = 10;
var HEAL_RAND_PERCENT = 100;

var SELECT_ENEMY_UNIT_TEXT = "Select Enemy Unit";
var SELECT_FRIEND_UNIT_TEXT = "Select Friend Unit";
var SELECT_EMPTY_TILE_TEXT = "Select Empty Tile";