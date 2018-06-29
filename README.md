# JS Automator

Automator helps to reduce typing. It is configured with scripts. 
You can use it **without** learning the programming language JavaScript. 
If you understand JavaScript you can use Automator for more use cases. 
There are two basic concepts in Automator: **expandables** and **shortcuts**. 
Both can trigger **actions**. An action may be the automated typing of a string, 
a sequence or the execution of an executable.   

**Expandables** are short words that are expanded to long words, sentences or paragraphs. 
**Shortcuts** are combinations of keys that trigger an action. Actions may be the execution of a program or 
a batch script or the typing of any text.

See more on (Tumblr)[https://jsautomator.tumblr.com/]


## Concepts
### Expandables

To use expandables you have to define them. The definition consists of two parts: the abbreviation and the resulting text.

Example: the line
```javascript
expandables.add( "xe ", "jsautomator@online.de" );
```
adds an expandable: when you type the keys 'x' + 'e' + ' ' (space) Automator will type my email in any text window, e.g. text editor, email, IDE, etc.

I often use 'x' as a start of an expandable, because 'x' is a rare character in German language. You may use any combination of characters.

### Shortcuts
Shortcuts are keystrokes of combination of keystrokes, e.g. a keystroke of the "CAPSLOCK" key, or "Alt+F5", "Ctrl+Alt+#", ... These shortcuts can be used to trigger actions. 

The following example will trigger a reload of your script, when you press the keyboard shortcut "Alt+F5". 
```javascript
shortcuts.addShortcutEval( "Alt+F5", "automator.reloadScript();", true );

```
### Actions
**Keyboard** actions offer two different possibilities: 1. type a text or 2. type a key sequence (a shortcut).
To (automatically) type a text, use the keyboard.type command.

Example:
```javascript
keyboard.type( "Hello World" );

```
The expandables.add internally uses the keyboard.type command to type any text.

For more complex use cases, the clipboard can be used via simulated shortcuts.
The following example copies a selected text to the clipboard by sending "Ctrl+c".
```javascript
keyboard.typeSeq( "Ctrl+c" );

```

# Reference: Objects & Methods
## Object expandables
The object expandables handles the expansion of abbreviations. 

### Method expandables.add
expandables.add has 4 arguments
```javascript
expandables.add( "xe ", "", func, true );
```
1. a key-string to type manually
2. the expanded text
3. optional: a function to be called
4. optional: a boolean

Example:
```javascript
expandables.add( "xdat", "", function( key ) {
  var str = fullDate();
  keyboard.type( str );
} );
```
If you define a funcition as 3rd argument, it will be called when you type the key.
And if you set the 4th argument to true (false is default), the text will be inserted via clipboard (copy-paste):

Example:
```javascript
expandables.add( "xadr", fileIO.loadString( "adr.txt" ), undefined, true );
```

Here a longer text is loaded from file. We are using the copy-paste mechanism, because it is faster than typing it. The disadvantage is: you will see the text in the clipboard, and you may not like that, if it's a password.

### Method expandables.clear();
expandables.clear() clears all expandables. This should be called at the beginning of each main script. Otherwise, obsolete expandables will not be cleared at a reload.

## Module shortcuts
### Method shortcuts.addShortcutEval(shortcutstring, javascriptcode, bool_consume_event);

```javascript
shortcuts.addShortcutEval( "CAPSLOCK", "noCapslock();", true );

```
### Method shortcuts.clear();
shortcuts.clear() clears all shortcuts. This should be called at the beginning of each main script. Otherwise, obsolete shortcuts will not be cleared at a reload.

## Module connector
### Method connector.clear();
connector.clear() clears all connections. This should be called at the beginning of each main script. Otherwise, obsolete connections will not be cleared at a reload.


## Module automator
### Method automator.loadScript( filename ) - only pro-version
This function loads a script. It enables includes (as in C++) or imports (as in Python) of other JavaScript modules.

Example:
```javascript
automator.loadScript( "http.js" );
```


## Module fileIO
### Method fileIO.loadString(filename)
fileIO.loadString(filename) loads a text file an returns a string. The filename 


## Module process
### Method process.set( key, value);
Set an environment variable.

Example:
```javascript
process.set( "COUNTER", "COUNTER_" + counter );
```


### Method process.exec( command, parameter_string );
Execute an external program.
Example:
```javascript
// test.bat writes to test.log
process.exec( "cmd.exe", "/C test.bat para1 para_2 " + counter );

```

## Predefined JavaScript Functions

Automator automatically loads predefined JavaScript modules and functions.  

```javascript

// Keyboard to Clipboard
function copy() {
  keyboard.typeSeq( "Ctrl+c" );
}

function cut() {
  keyboard.typeSeq( "Ctrl+x" );
}

function paste() {
  keyboard.typeSeq( "Ctrl+v" );
}

function selectWordLeft() {
  keyboard.typeSeq( "Ctrl+Shift+Left" );
}

function selectAll() {
  keyboard.typeSeq( "Ctrl+a" );
}


// Output to log window
function log(arguments) {...}

// enclose a selected block of text
function block( before, after )  {...}


```

An exampled shows the usage of the block function:

```javascript
var jsblock = block( "```javascript\n", "\n```" );
shortcuts.addShortcutEval( "Ctrl+#", "jsblock()", true );

```
To use it, select multiple lines of code and press "Ctrl+#". The function block cuts the selected lines, adds the given text before and after the selection and pastes the result. 

## Predefined JavaScript Variables
Automator defines a few global variables: the name of the current script, the current directory and the version of automator. Additionally you may access the environment variables of the system via process.get command.

Example:
```javascript
log( "module  " + currentscript );
log( "dir     " + currentdir );
log( "version " + currentversion );

```


Version 1.1.11 (29.06.2018 (26) 14:57:37)







