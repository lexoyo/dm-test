
module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-closure-tools');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-run');

  grunt.registerTask('default', ['build']);
  grunt.registerTask('build', ['closureCompiler:release']);
  grunt.registerTask('debug', ['closureCompiler:debug']);

  grunt.initConfig({
    closureCompiler: {
      release: {
        options: {
          compilerFile: 'build/closure-compiler.jar',
          checkModified: false,
          namespaces: 'rsz',
          compilerOpts: {
            compilation_level: 'ADVANCED_OPTIMIZATIONS',
            jscomp_error: ['accessControls', 'ambiguousFunctionDecl', 'checkRegExp', 'checkTypes', 'checkVars', 'const', 'constantProperty', 'deprecated', 'duplicateMessage', 'es5Strict', 'externsValidation', 'fileoverviewTags', 'globalThis', 'internetExplorerChecks', 'invalidCasts', 'missingProperties', 'nonStandardJsDocs', 'strictModuleDepCheck', 'typeInvalidation', 'undefinedNames', 'undefinedVars', 'unknownDefines', 'uselessCode', 'visibility'],
            warning_level: 'VERBOSE',
            language_in: 'ECMASCRIPT6_STRICT',
            language_out: 'ECMASCRIPT3',
            externs: ['src/externs/**/*.js'],
            debug: false,
          },
        },
        src: ['src/*.js'],
        dest: 'dist/dm-test.js',
      },
      debug: {
        options: {
          compilerFile: 'build/closure-compiler.jar',
          checkModified: false,
          namespaces: 'rsz',
          compilerOpts: {
            compilation_level: 'ADVANCED_OPTIMIZATIONS',
            jscomp_error: ['accessControls', 'ambiguousFunctionDecl', 'checkRegExp', 'checkTypes', 'checkVars', 'const', 'constantProperty', 'deprecated', 'duplicateMessage', 'es5Strict', 'externsValidation', 'fileoverviewTags', 'globalThis', 'internetExplorerChecks', 'invalidCasts', 'missingProperties', 'nonStandardJsDocs', 'strictModuleDepCheck', 'typeInvalidation', 'undefinedNames', 'undefinedVars', 'unknownDefines', 'uselessCode', 'visibility'],
            warning_level: 'VERBOSE',
            language_in: 'ECMASCRIPT6_STRICT',
            language_out: 'ECMASCRIPT3',
            externs: ['src/externs/**/*.js'],
            create_source_map: 'dist/dm-test.js.map',
            source_map_format: 'V3',
            formatting: 'pretty_print',
            debug: true,
          },
        },
        src: ['src/*.js'],
        dest: 'dist/dm-test.js',
      },
    },
    watch: {
      scripts: {
        files: ['src/**/*.js', 'Gruntfile.js', 'dist/index.html'],
        tasks: ['debug', 'run'],
        options: {
          spawn: false,
          debounceDelay: 250,
          livereload: true,
        },
      },
    },
   run: {
      options: {
      },
      'dm-test': {
        cmd: 'node',
        args: [
          'dist/dm-test.js',
        ],
      },
    },
  });
}
