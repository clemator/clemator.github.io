var pointName = "Smarties";
var points = 0;
var pps = 0;
var cursors = 0;
var cursorUpLvl = 1;
var cursorNextCost = 10;
var cursorUpNextCost = 100;
var cursorClickValue = 1;
var cursorPps = 0;
var prestige = 0;

$(document).ready(function () {
    $(".point-name").html(pointName);

    $("#increment").on("click", function () {
        incrementPoint(1);
    });

    $("#buy-cursor").on("click", function () {
        buyCursor();
    });
	
	$("#up-cursor").on("click", function () {
        upCursors();
    });

    $("#save").on("click", function () {
        save();
        _gaq.push(['_trackEvent', 'My Game', 'Save', 'Manual save']);
    });

    $("#load").on("click", function () {
        load();
    });
});

/*
***************
** MATH PART **
***************
*/

function incrementPoint(x)
{
    points += x;
    refreshPoints();
    toggleBuyable();
};

function decrementPoint(x)
{
    points -= x;
    refreshPoints();
    toggleBuyable();
};

function computePps()
{
	cursorPps = cursors * cursorClickValue;
	pps = cursorPps;
	refreshPps();
};

/*
**********************
** BUY UPGRADE PART **
**********************
*/

function buyCursor()
{
    cursorNextCost = Math.floor(10 * Math.pow(1.3, cursors));
    if (points >= cursorNextCost) {
        cursors += 1;
    	decrementPoint(cursorNextCost);
		computePps();
    };
    cursorNextCost = Math.floor(10 * Math.pow(1.3, cursors));
    refreshCursors();
    toggleBuyable();
};

function upCursors()
{
	cursorUpNextCost = Math.floor(100 * Math.pow(10.0, cursorUpLvl - 1));
	if (points >= cursorUpNextCost) {
        cursorUpLvl += 1;
		cursorClickValue *= 2;
    	decrementPoint(cursorUpNextCost);
		computePps();
    };
	cursorUpNextCost = Math.floor(100 * Math.pow(10.0, cursorUpLvl - 1));
    refreshCursors();
    toggleBuyable();
};

/*
************************
** SAVE AND LOAD PART **
************************
*/

function save()
{
    var save = {
        points: points,
        cursors: cursors,
        prestige: prestige,
        pps: pps,
        cursorNextCost: cursorNextCost,
		cursorUpLvl: cursorUpLvl,
		cursorUpNextCost: cursorUpNextCost
    }
    localStorage.setItem("save",JSON.stringify(save));
    $("#top-alert").html(
        "<div class='alert alert-success alert-dismissible fade in' role='alert'><button type='button' class='close' data-dismiss='alert'><span aria-hidden='true'>&times;</span></button>Game saved.</div>"
    );
};

function load()
{
    var savegame = JSON.parse(localStorage.getItem("save"));
    if (typeof savegame.points !== "undefined") points = savegame.points;
    if (typeof savegame.cursors !== "undefined") cursors = savegame.cursors;
    if (typeof savegame.prestige !== "undefined") prestige = savegame.prestige;
    if (typeof savegame.pps !== "undefined") pps = savegame.pps;
    if (typeof savegame.cursorNextCost !== "undefined") cursorNextCost = savegame.cursorNextCost;
	if (typeof savegame.cursorUpLvl !== "undefined") cursorUpLvl = savegame.cursorUpLvl;
	if (typeof savegame.cursorUpNextCost !== "undefined") cursorUpNextCost = savegame.cursorUpNextCost;
    refreshAll();
};

/*
******************
** REFRESH PART **
******************
*/

function refreshPoints()
{
    $("#points").html(points);
};

function refreshPps()
{
    $("#points-per-second").html(pps);
};

function refreshCursors()
{
	cursorClickValue = 2 ^ (cursorUpLvl - 1);
    $("#cursors").html(cursors);
    $("#cursorCost").html(cursorNextCost);
	$("#cursorUpCost").html(cursorUpNextCost);
	$("#cursorUpLvl").html(cursorUpLvl);
};

function refreshAll()
{
    refreshCursors();
    refreshPps();
    refreshPoints();
};

function toggleBuyable()
{
    if (cursorNextCost > points) {
        $("#buy-cursor").prop("disabled", true);
    } else {
        $("#buy-cursor").prop("disabled", false);
    }
	if (cursorUpNextCost > points) {
        $("#up-cursor").prop("disabled", true);
    } else {
        $("#up-cursor").prop("disabled", false);
    }
};

window.setInterval(function () {
    incrementPoint(pps);
    toggleBuyable();
}, 1000);

window.setInterval(function () {
    save();
    _gaq.push(['_trackEvent', 'My Game', 'Save', 'Automatic save']);
}, 60000);
