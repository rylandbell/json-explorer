module.exports = function (grunt) {
  //load plugins
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-postcss');

  //configure plugins
  grunt.initConfig({
    sass: {
      dist: {
        options: {
          sourcemap: 'none'
        },
        files: [{
          expand: true,
          cwd: 'src/scss/',
          src: ['*.scss'],
          dest: 'build/css',
          ext: '.css'
      }]
      }
    },
    postcss: {
      options: {
        map: true,
        processors: [
          require('autoprefixer')
        ]
      },
      dist: {
        src: 'build/css/*.css'
      }
    },
    cssmin: { 
      target: {
        files: [{
          expand: true,
          cwd: 'build/css',
          src: ['*.css', '!*.min.css'],
          dest: 'build/css',
          ext: '.min.css'
        }]
      }
    },
    watch: {
      scss: {
        files: 'src/**/*.scss',
        tasks: ['sass', 'postcss', 'cssmin']
      }
    }
  });

  //register tasks:
  grunt.registerTask('default', ['sass','postcss','cssmin','watch']);
};
