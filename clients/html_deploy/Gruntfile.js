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
          src: [
            '../html_client/js/**/*.js',
            '../html_client/utils/*.js'
          ],
          dest: 'deploy/app.js'
        }]
      }
    },
    concat_css: {
      all: {
        src: ['../html_client/css/**/*.css'],
        dest: 'deploy/app.css'
      },
    },
    useminPrepare: {
      html: '../html_client/index.html',
      dest: 'deploy/index.html'
    },
    usemin: {
      html: '../html_client/index.html'
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-concat-css');
  grunt.loadNpmTasks('grunt-usemin');

  //https://github.com/yeoman/grunt-usemin
  grunt.registerTask('build', [
    'useminPrepare', //Parses the index.html and generates 'deploy/index.html'
    'concat', //Concats all js and generates 'deploy/app.js'
    'concat_css', //Concats all js and generates 'deploy/app.css'
    'usemin'
  ]);
};
