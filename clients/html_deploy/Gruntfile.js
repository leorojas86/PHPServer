module.exports = function (grunt) {

  // Load grunt tasks automatically
  //"load-grunt-tasks": "3.5.2",
  //require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Define the configuration for all the tasks
  grunt.initConfig({
    concat: {
      generated: {
        files: [{
          dest: 'deploy/app.js',
          src: [
            '../html_client/utils/*.js',
          ]
        }]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.registerTask('build', [
    'concat'
  ]);
};
