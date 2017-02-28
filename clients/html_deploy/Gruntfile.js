module.exports = function (grunt) {

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Define the configuration for all the tasks
  grunt.initConfig({
    clean: ["deploy"],
    concat: {
      generated: {
        files: [{
          src: [
            '../html_client/utils/*.js',
            '../html_client/js/**/*.js'
          ],
          dest: 'deploy/index.js'
        }]
      }
    },
    concat_css: {
      all: {
        src: ['../html_client/css/**/*.css'],
        dest: 'deploy/index.css'
      },
    },
    copy: {
      main: {
        expand: false,
        src: '../html_client/index.html',
        dest: 'deploy/index.html',
      },
    },
    usemin: {
      html: 'deploy/index.html'
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-concat-css');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-usemin');

  grunt.registerTask('build', [
    'clean',      //Deletes deploy folder
    'concat',     //Concats all js and generates 'deploy/index.js'
    'concat_css', //Concats all js and generates 'deploy/index.css'
    'copy',       //Copies index.html to 'deploy/index.html'
    'usemin'      //Parses the index.html and replaces js,css references
  ]);
};
