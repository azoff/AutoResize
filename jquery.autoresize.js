/*
 * AutoResize v1.0.0
 *  A jQuery Plugin that matches a textarea to the height of its text content
 *  http://azoffdesign.com/autoresize
 *
 * Intended for use with the latest jQuery
 *  http://code.jquery.com/jquery-latest.js
 *
 * Copyright 2011, Jonathan Azoff
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *  http://jquery.org/license
 *
 * For API documentation, see the README file
 *  https://github.com/azoff/AutoResize/blob/master/README.md
 *
 * Date: Tuesday, August 23rd 2011
 */

/*jslint onevar: true, strict: true */

/*global window, document, jQuery */

"use strict";

 (function(global, doc, $, plugins) {
    var

    ALLOWED_NODES = 'textarea',

    CLONE_STYLES = ['font-family', 'font-size', 'font-weight', 'font-style',
    'text-transform', 'text-decoration', 'letter-spacing', 'word-spacing',
    'line-height', 'text-align', 'vertical-align', 'direction', 'width',
    'margin-top', 'margin-right', 'margin-bottom', 'margin-left', 'padding-top',
    'padding-right', 'padding-bottom', 'padding-left', 'border-top-width',
    'border-right-width', 'border-bottom-width', 'border-left-width',
    'border-top-style', 'border-right-style', 'border-bottom-style',
    'border-left-style', 'visibility', 'z-index', 'min-height',
    'overflow-x', 'overflow-y', 'white-space', 'clip', 'float', 'clear', 'cursor',
    'list-style-position', 'list-style-type', 'marker-offset'],

    EVENTS = 'keyup change paste input',

    CLONE_STYLE_OVERRIDES = {
        'word-wrap': 'break-word',
        overflow: 'visible',
        height: 'auto',
        display: 'block'
        ,
        position: 'absolute',
        left: '-99999px',
        top: '-99999px'
    },

    TARGET_STYLE_OVERRIDES = {
        overflow: 'hidden',
        resize: 'none',
        display: 'block'
    };

    function escapeText(text) {
        text = text.replace(/[\f\n\r]/g, '<br/>');
        return text;
    }

    function extractStyles(target) {
        var styles = {},
        node = target.get(0);
        $.each(CLONE_STYLES,
        function(i, style) {
            styles[style] = target.css(style);
        });
        // line-height CSS value messed up in jQuery for IE < 9
        if (styles['line-height'] === '1px' && node.currentStyle) {
            styles['line-height'] = node.currentStyle['lineHeight'];
        }
        return styles;
    }

    function cloneTarget(target) {
        var
        clone = $(doc.createElement('div')),
        styles = extractStyles(target);
        styles = $.extend(styles, CLONE_STYLE_OVERRIDES);
        return clone.css(styles).insertAfter(target);
    }

    function getTarget(textarea) {
        return $(textarea).css(TARGET_STYLE_OVERRIDES);
    }

    function syncText(target, clone) {
        var text = escapeText(target.val());
        clone.html(text);
    }

    function syncHeight(target, clone) {
        var
        cloneHeight = clone.height(),
        targetHeight = target.height();
        if (cloneHeight !== targetHeight) {
            target.height(cloneHeight);
            target.trigger('autoresize:resize', cloneHeight);
        }
    }

    function resizeTarget(event) {
        var
        target = event.data.target,
        clone = event.data.clone;
        syncText(target, clone);
        syncHeight(target, clone);
    }

    function autoResize(textarea) {
        var
        target = getTarget(textarea),
        clone = cloneTarget(target);
        target.bind(EVENTS, {
            target: target,
            clone: clone
        },
        resizeTarget);
        syncText(target, clone);
        syncHeight(target, clone);
    }

    plugins.autoResize = function() {
        return this.filter(ALLOWED_NODES).each(function() {
            autoResize(this);
        });
    };

})(window, document, jQuery, jQuery.fn);