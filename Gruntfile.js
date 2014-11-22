
module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-closure-tools');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-run');

  grunt.registerTask('default', ['build']);
  grunt.registerTask('build', ['closureCompiler']);

  grunt.initConfig({
    closureCompiler:{
      options: {
        compilerFile: 'build/closure-compiler.jar',
        checkModified: false,
        compilerOpts: {
          compilation_level: 'ADVANCED_OPTIMIZATIONS',
          jscomp_error: ['accessControls', 'ambiguousFunctionDecl', 'checkRegExp', 'checkTypes', 'checkVars', 'const', 'constantProperty', 'deprecated', 'duplicateMessage', 'es5Strict', 'externsValidation', 'fileoverviewTags', 'globalThis', 'internetExplorerChecks', 'invalidCasts', 'missingProperties', 'nonStandardJsDocs', 'strictModuleDepCheck', 'typeInvalidation', 'undefinedNames', 'undefinedVars', 'unknownDefines', 'uselessCode', 'visibility'],
          warning_level: 'VERBOSE',
          create_source_map: 'dist/dm-test.js.map',
          language_in: 'ECMASCRIPT6_STRICT',
          language_out: 'ECMASCRIPT3',
          externs: ['src/externs/**/*.js'],
          source_map_format: 'V3',
          debug: false
        },
        namespaces: 'rsz'
      },
      all: {
        src: ['src/record.js', 'src/index.js'],
        dest: 'dist/dm-test.js'
      }
    },
    watch: {
      scripts: {
        files: ['src/**/*.js', 'Gruntfile.js', 'dist/index.html'],
        tasks: ['build', 'run'],
        options: {
          spawn: false,
          debounceDelay: 250,
          livereload: true
        }
      }
    },
   run: {
      options: {
      },
      'dm-test': {
        cmd: 'node',
        args: [
          'dist/dm-test.js'
        ]
      }
    }
  });
}
