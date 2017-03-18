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
            '../../clients/html_client/utils/*.js',
            '../../clients/html_client/js/**/*.js'
          ],
          dest: 'deploy/index.js'
        }]
      }
    },
    minified : {
      files: {
        src: [ 'deploy/index.js' ],
        dest: 'deploy/'
      },
      options : {
        sourcemap: false,
        allinone: false
      }
    },
    obfuscator: {
      options: {
          // global options for the obfuscator
      },
      task1: {
          options: {
              // options for each sub task
          },
          files: {
              'deploy/index.js': ['deploy/index.js']
          }
      }
    },
    concat_css: {
      csss: {
        src: ['../../clients/html_client/css/**/*.css'],
        dest: 'deploy/index.css'
      },
    },
    copy: {
      index: {
        expand: false,
        src: '../../clients/html_client/index.html',
        dest: 'deploy/index.html',
      },
      spritesheet: {
        expand: false,
        src: '../../clients/html_client/images/texture/spritesheet.png',
        dest: 'deploy/images/texture/spritesheet.png',
      },
      jsons: {
        expand: false,
        src: '../../clients/html_client/jsons/english.json',
        dest: 'deploy/jsons/english.json',
      },
    },
    usemin: {
      html: 'deploy/index.html'
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-minified');
  grunt.loadNpmTasks('grunt-contrib-obfuscator');
  grunt.loadNpmTasks('grunt-concat-css');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-usemin');

  grunt.registerTask('build', [
    'clean',      //Deletes deploy folder
    'concat',     //Concats all js and generates 'deploy/index.js'
    'minified',   //Minifies the deploy/index.js
    'obfuscator', //Obfuscate the deploy/index.js
    'concat_css', //Concats all js and generates 'deploy/index.css'
    'copy',       //Copies index.html, spritesheet.png and jsons to deploy folder
    'usemin'      //Parses the index.html and replaces js,css references
  ]);
};
