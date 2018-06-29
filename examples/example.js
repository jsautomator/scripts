///////////////////////////////////////////////////////////////////////////////
// 29.06.2018 (26) 10:26:58 1.1.10
///////////////////////////////////////////////////////////////////////////////
/// clear the short cuts
shortcuts.clear();
expandables.clear();
// this is useful for re-load:
// disconnect all stored connections
if ( connector ) {
	connector.clear();
}

///////////////////////////////////////////////////////////////////////////////
// Functions
var counter = 0

function execBat() {
	++counter;
	log( "launch batch: " + currentdir + "/test.bat" );

	// set environment variable; used by test.bat
	process.set( "COUNTER", "COUNTER_" + counter );

	// test.bat writes to test.log
	process.exec( "cmd.exe", "/C test.bat para1 para_2 " + counter );
}

function noCapslock( key ) {
	// show/activate the JS Automator GUI with Tab_1 (clipboard storage)
	keyboard.show2GUI( 1 );
}

function writeOnShortcut() {
	keyboard.type( "writeOn\nShortcut " );
	return false; // false: prevent the system from passing the message to the rest
}


///////////////////////////////////////////////////////////////////////////////
// load the short cuts
shortcuts.addShortcutEval( "CAPSLOCK", "noCapslock();", true );

// text is typed AFTER release of Shift/Alt/Ctrl/Meta-Key!
shortcuts.addShortcutEval( "Shift+F11", "execBat();", true );
shortcuts.addShortcutEval( "Alt+F9", "writeOnShortcut();" );

// Parameters: oldstr, newstr, func, paste
expandables.add( "xe ", "jsautomator@online.de" );
expandables.add( "xbr", "Best Regards\nJS Automator\n" );
expandables.add( "xjs", fileIO.loadString( "switchTemplate.js" ), undefined, true );
expandables.add( "xwc", "", block( "```\n", "\n```" ) );

///////////////////////////////////////////////////////////////////////////////
// Date/Time/Calendar Week
expandables.add( "xdat", "", function( key ) {
	var str = fullDate();
	keyboard.type( str );
} );

///////////////////////////////////////////////////////////////////////////////
// JS Function
//
expandables.add( "xdm", "", function( key ) {
	var template = "Dear Mr " + clipboard.get( 0 ) + "\n";
	keyboard.type( template );
} );
expandables.add( "xds", "", function( key ) {
	var template = "Dear Mrs " + clipboard.get( 0 ) + "\n";
	keyboard.type( template );
} );

expandables.add( "xgh", "", function( key ) {
	var template = "Sehr geehrter Herr " + clipboard.get( 0 ) + ", \n";
	keyboard.type( template );
	// clipboard.set( template );
	// paste();
} );
expandables.add( "xgf", "", function( key ) {
	var template = "Sehr geehrte Frau " + clipboard.get( 0 ) + ", \n";
	keyboard.type( template );
	// clipboard.set( template );
	// paste();
} );

///////////////////////////////////////////////////////////////////////////////
// Templates
var strings = {};
strings.x1 = fileIO.loadString( "t1.js" );
expandables.add( "xt1", "", function( key ) {
	var template = replaceAll( strings.x1, "{date}", fullDate() );
	clipboard.set( template );
	paste();
} );


strings.x2 = fileIO.loadString( "t2.js" );
expandables.add( "xt2", "", function( key ) {
	selectWordLeft();
	expandables.addOneTimeClipHandler( function( txt ) {
		var template = strings.x2;
		var tup = txt.toUpperCase();
		template = replaceAll( template, "{cname}", txt );
		template = replaceAll( template, "{CNAME}", tup );
		template = replaceAll( template, "{date}", fullDate() );
		clipboard.set( template );
		paste();
	} );
	cut();
} );


///////////////////////////////////////////////////////////////////////////////
// Clip board Slots
///////////////////////////////////////////////////////////////////////////////
/// get the index from the key
/// use the index to write the clipboard slot
function clipper( key ) {
	try {
		var re = /x(\d+)\s/i;
		var found = key.match( re );
		if ( found != null && found.length > 1 ) {
			var idx = parseInt( found[ 1 ] );
			var str = clipboard.get( idx - 1 );
			clipboard.set( str );
			paste();
		} else {
			log( "clipper: " + key + " not found" )
		}
	} catch ( ex ) {
		log( "clipper error:" + ex )
	}
}
for ( var i = 1; i < 21; ++i ) {
	var key = "x" + i.toString() + " ";
	// log( "add clipper to " + key );
	expandables.add( key, "", clipper );
}
log( "module  " + currentscript );
log( "dir     " + currentdir );
log( "version " + currentversion );