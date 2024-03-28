module.exports = function (grunt) {
  grunt.initConfig({
    connect: {
      server: {
        options: {
          port: 9001, // Choose any available port
          base: 'dist', // Directory to serve
          livereload: true,
          open: true, // Automatically open the browser
        }
      }
    },
    open: {
      dev: {
        path: 'http://localhost:9001' // Change port if necessary
      }
    },
    sass: {
      options: {
        implementation: require('sass'),
        sourceMap: true,
        outputStyle: 'compressed',
      },
      dist: {
        files: {
          'dist/styles/main.css': 'src/scss/main.scss'
        }
      }
    },
    babel: {
      options: {
        sourceMap: true,
        presets: ['@babel/preset-env']
      },
      dist: {
        files: {
          'dist/scripts/main.js': 'src/js/main.js'
        }
      }
    },
    copy: {
      dist: {
        files: [
          { src: 'src/index.html', dest: 'dist/index.html' },
          { src: 'src/index-css-only.html', dest: 'dist/index-css-only.html' }
        ]
      }
    },
    watch: {
      options: {
        livereload: true
      },
      css: {
        files: 'src/scss/**/*.scss',
        tasks: ['sass']
      },
      js: {
        files: 'src/js/**/*.js',
        tasks: ['babel']
      },
      html: {
        files: 'src/index.html',
        tasks: ['copy']
      }
    }
  });

  // Load plugins
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-babel');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-open');

  // Register tasks
  grunt.registerTask('default', ['connect', 'open', 'sass', 'babel', 'copy', 'watch']);
};