module.exports = function (grunt) {

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Define the configuration for all the tasks
  grunt.initConfig({
    clean: ["deploy"],
    concat: {
      jss: {
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
      csss: {
        src: ['../html_client/css/**/*.css'],
        dest: 'deploy/index.css'
      },
    },
    copy: {
      index: {
        expand: false,
        src: '../html_client/index.html',
        dest: 'deploy/index.html',
      },
      spritesheet: {
        expand: false,
        src: '../html_client/images/texture/spritesheet.png',
        dest: 'deploy/images/texture/spritesheet.png',
      },
      jsons: {
        expand: false,
        src: '../html_client/jsons/english.json',
        dest: 'deploy/jsons/english.json',
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
    'copy',       //Copies index.html, spritesheet.png and jsons to deploy folder
    'usemin'      //Parses the index.html and replaces js,css references
  ]);
};
