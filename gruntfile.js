module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['client/js/template-engine.js', 'client/js/**/*.js'],
        dest: 'public/main.js'
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          'public/main.min.js': ['<%= concat.dist.dest %>']
        }
      }
    },
   	compass: {
      base: {
        options: {
          sassDir: 'client/scss',
          cssDir: 'public',
          noLineComments: true,
          outputStyle: 'compressed'
        }
      }
    },
    watch: {
      compass: {
        files: '**/*.scss',
        tasks: ['compass']
      },
      js: {
        files: 'client/js/**/*.js',
        tasks: ['concat', 'uglify']
      }
    }
  });

  // Load the plugin
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default task(s).
  grunt.registerTask('default', ['compass:base', 'watch', 'concat', 'uglify']);

}
