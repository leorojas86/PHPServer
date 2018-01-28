module.exports = function (grunt) {

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Define the configuration for all the tasks
  grunt.initConfig({
    clean: ["deploy"],
    copy: {
      output: {
        expand: true,
        cwd: '../build/output',
        src: '**',
        dest: 'deploy',
      },
    },
    /*replace: {
      dist: {
        options: {
          patterns: [ {
            match: /SELECTED_ENVIRONMENT:/g,
            replacement: 'SELECTED_ENVIRONMENT: \'PUBLIC\',//' // replaces "CURRENT" to "CURRENT: 'PUBLIC',//"
          }]
        },
        files: [
          { expand: true, flatten: true, src: ['deploy/index.js'], dest: 'deploy/' }
        ]
      }
    },*/
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
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-minified');
  grunt.loadNpmTasks('grunt-contrib-obfuscator');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-replace');
  grunt.loadNpmTasks('grunt-usemin');

  grunt.registerTask('obfuscate', [
    'clean',      //Deletes deploy folder
    'copy',       //Copies index.html, spritesheet.png and jsons to deploy folder
    //'replace',    //Replaces selected environment
    'minified',   //Minifies the deploy/index.js
    'obfuscator', //Obfuscate the deploy/index.js
  ]);
};
