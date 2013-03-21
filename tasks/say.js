/*
 * grunt-say
 * https://github.com/kamiyam/grunt-say
 *
 * Copyright (c) 2013 kamiyam
 * Licensed under the MIT license.
 */

'use strict';
module.exports = function(grunt) {

    var _default = {
        voice: "Bruce",
        hook: {
            log:[{
                level: "header",
                message: ""
            },
            {
                level: "error",
                message: ""
            },
            {
                level: "warn",
                message: ""
            },
            {
                level: "ok",
                message: ""
            }]
        }
    }
    grunt.registerInitTask('say', 'Say XCommand at multi threads.', function() {

        var c = grunt.util._.defaults(grunt.config('say') || {}, _default);
        var that = this;
        var cpp = require('execSync');
        var pre = "say ";

        if (c.voice != null && typeof(c.voice) == 'string' )   pre += " -v " + c.voice + " ";

        cpp.code( pre + "'stating grunt say initialized..'");

        var say =  function( msg,  grunt ){

            console.log( msg );
            var message;

            if( typeof (msg) == 'string' ) message = msg;
            else if( typeof (msg) == 'array' ) message = msg[0];

            if ( message == null || ! typeof (message) == 'string' ) return;

            var command = pre + message
            console.log(command);
            cpp.code(command);

        }

        c.hook.log.forEach(function(conb){
            grunt.util.hooker.hook(grunt.log, conb.level, function(msg) {
                say( msg, that );
            });
        });

        grunt.util.hooker.hook(grunt,"warn", function(msg) {
            console.log("warn:"+ msg);
            say( msg, that );
        });
        grunt.util.hooker.hook(grunt,"error", function(msg) {
            console.log("warn:"+ msg);
            say( msg, that );
        });

    });
}