module.exports = function(grunt) {
  // Project configuration
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      dist: {
        src: ['client/js/template-engine.js', 'client/js/**/*.js'],
        dest: 'public/main.js',
      },
    },
    babel: {
      options: {
        sourceMap: false,
        presets: ['es2015'],
      },
      dist: {
        files: {
          'public/main.cmp.js': ['<%= concat.dist.dest %>'],
        },
      },
    },
    uglify: {
      dist: {
        files: {
          'public/main.min.js': 'public/main.cmp.js',
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
        tasks: ['concat', 'babel', 'uglify'],
      },
    },
  });

  // Load plugins
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-babel');
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default tasks
  grunt.registerTask(
    'default',
    ['sass', 'postcss', 'watch', 'concat', 'babel', 'uglify']
  );
};
