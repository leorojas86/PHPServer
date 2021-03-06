module.exports = (grunt) => {

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  const target = grunt.option('target');
  console.log('target', target);

  // Define the configuration for all the tasks
  grunt.initConfig({
    clean: ["output"],
    copy: {
      output: {
        expand: true,
        cwd: '../build/output',
        src: '**',
        dest: 'output',
      },
    },
    replace: {
      dist: {
        options: {
          patterns: [ {
            match: /CURRENT_ENVIRONMENT:/g,
            replacement: `CURRENT_ENVIRONMENT:'${target}',//`
          }]
        },
        files: [
          { expand: true, flatten: true, src: ['output/index.js'], dest: 'output/' }
        ]
      }
    },
    minified : {
      files: {
        src: [ 'output/index.js' ],
        dest: 'output/'
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
              'output/index.js': ['output/index.js']
          }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-replace');
  grunt.loadNpmTasks('grunt-minified');
  grunt.loadNpmTasks('grunt-contrib-obfuscator');

  grunt.registerTask('prepare', [
    'clean',      //Deletes output folder
    'copy',       //Copies copies all the build ouput folder
    'replace',    //Replaces selected environment
    //'minified',   //Minifies the output/index.js
    //'obfuscator', //Obfuscate the output/index.js
  ]);
};
