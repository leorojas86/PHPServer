module.exports = function (grunt) {

  // Load grunt tasks automatically
require('load-grunt-tasks')(grunt);

// Time how long tasks take. Can help when optimizing build times
require('time-grunt')(grunt);

  // Define the configuration for all the tasks
  grunt.initConfig({
    concat: {
      generated: {
        files: [{
          dest: 'deploy/app.js',
          src: [
            '../html_client/utils/context_menu_utils.js',
            '../html_client/utils/cache_utils.js'
          ]
        }]
      }
    }
  });

  grunt.registerTask('build', [
    'concat:generated'
  ]);
};
