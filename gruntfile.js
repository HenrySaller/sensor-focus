module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      dist: {
        src: ['client/js/template-engine.js', 'client/js/**/*.js'],
        dest: 'public/main.js',
      },
    },
    uglify: {
      dist: {
        files: {
          'public/main.min.js': ['<%= concat.dist.dest %>'],
        },
      },
    },
    sass: {
      options: {
        outputStyle: 'compressed',
      },
      dist: {
        files: {
          'public/main.css': 'client/scss/main.scss',
        },
      },
    },
    postcss: {
      options: {
        map: false,
        processors: [
          require('autoprefixer'),
        ],
      },
      dist: {
        src: 'public/main.css',
      },
    },
    watch: {
      compass: {
        files: '**/*.scss',
        tasks: ['sass'],
      },
      js: {
        files: 'client/js/**/*.js',
        tasks: ['concat', 'uglify'],
      },
    },
  });

  // Load the plugin
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default task(s).
  grunt.registerTask(
    'default',
    ['sass', 'postcss', 'watch', 'concat', 'uglify']
  );
};
