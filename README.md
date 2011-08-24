AutoResize v1.0.0
=================
Tuesday, August 23rd 2011

AutoResize is a jQuery Plugin that matches a textarea to the height of its text content.
It is intended to be used with the latest version of jQuery: <http://code.jquery.com/jquery-latest.js>

Homepage: <http://azoffdesign.com/autoresize>
 
License
-------
Copyright 2011, Jonathan Azoff

Dual licensed under the MIT or GPL Version 2 licenses.

<http://jquery.org/license>

Usage
-----
`jQuery(selector).autoResize();`

+ `selector`
    The jQuery selector, targeting a `<textarea>` element to apply the auto resize to

Events
------
Apart from regular DOM events, an auto-resized textarea emits events to inform the listeners of its state. To listen to these events, simply listen for one of the following events on an overscrolled element:

+ `autoresize:resize`
	* Called after re-sizing happens. This event is only called when the size actually changes.

Here is an example using jQuery's [bind()](http://api.jquery.com/bind/) method, listening for resize:

<pre>$('selector').autoresize().bind('autoresize:resize', function(e, height){ console.log(this, 'is at', height) });</pre>

Notes
-----
AutoResize only works with textareas, so please don't complain if your `contenteditable` elements aren't resizing when you apply this plug-in to them. This plug-in was designed to solve what should be a very simple problem, but seemingly fell short of a complete solution in many past attempts. Each auto-resizing plug-in I've tested has failed in situations where the textarea is hidden, or messes with selector logic by inserting a cloned element of the same class. AutoResize attempts to be as unobtrusive as possible, while still maintaining resilience in the face of DHTML. Use it at your own risk, please submit bug reports on the [Issue Tracker](/issues);

**Note** AutoResize will _always_ resize your textareas to be the size of their textual content. Hence, it is good practice to set a min height (probably via CSS) on the textarea to ensure that it does not shrink beyond an acceptable size.

Change Log
----------
 * __1.0.0__
  - Out of the gate, hurrah!