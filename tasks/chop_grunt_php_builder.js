/*
 * chop-grunt-php-builder
 * https://github.com/designedbyscience/chop-grunt-php-builder
 *
 * Copyright (c) 2013 Eric Haseltine
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks
  function compile(args, cb) {
    var child = grunt.util.spawn({
      cmd: args.shift(),
      args: args
    }, function (err, result, code) {
      var success = code === 0;

      if (code === 127) {
        return grunt.warn(
          'You need to have Ruby and Chop RB Builder installed ' +
          'and in your system PATH for this task to work. '          
        );
      }

      if (code === 1 && /Nothing to compile/g.test(result.stderr)) {
        success = true;
      }

      cb(success);
    });
    child.stdout.pipe(process.stdout);
    child.stderr.pipe(process.stderr);
  }


  grunt.registerMultiTask('php_builder', 'Statically build PHP Builder.', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options();
    var cb = this.async();

      
    var args = ["php", options.path, "--output", options.output, "--basepath", options.base_path];

	args = args.concat(options.input);

	compile(args, cb);


  });

};
