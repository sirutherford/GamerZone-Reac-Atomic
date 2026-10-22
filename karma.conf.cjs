const fs = require('fs');
const { createInstrumenter } = require('istanbul-lib-instrument');

function customGamerZoneInstrumenter() {
  return {
    name: 'gz-instrumenter',
    setup(build) {
      const instrumenter = createInstrumenter({
        esModules: true,
        parserPlugins: [
          'jsx',
          'asyncGenerators',
          'bigInt',
          'classProperties',
          'classPrivateProperties',
          'dynamicImport',
          'importMeta',
          'objectRestSpread',
          'optionalCatchBinding',
          'optionalChaining'
        ]
      });

      build.onLoad({ filter: /\.jsx?$/ }, async (args) => {
        const normalizedPath = args.path.replace(/\\/g, '/');
        
        if (normalizedPath.includes('/src/') && !normalizedPath.includes('.spec.')) {
          console.log('\n[GZ-DEBUG] Detectado:', normalizedPath);
          
          const source = await fs.promises.readFile(args.path, 'utf8');
          
          try {
            const instrumentedCode = instrumenter.instrumentSync(source, args.path);
            console.log('[GZ-DEBUG] Instrumentación: ¡EXITOSA!');
            
            return {
              contents: instrumentedCode,
              loader: 'jsx'
            };
          } catch (error) {
            console.log('[GZ-DEBUG] Instrumentación: FALLÓ ->', error.message);
            return { contents: source, loader: 'jsx' };
          }
        }
        
        return null;
      });
    }
  };
}

module.exports = function (config) {
  config.set({
    frameworks: ['jasmine'],
    files: [
      { pattern: 'src/**/*.spec.js', watched: false }
    ],
    client: { captureConsole: true },
    plugins: [
      'karma-jasmine',
      'karma-chrome-launcher',
      'karma-esbuild',
      'karma-coverage',
      'karma-sourcemap-loader'
    ],
    preprocessors: {
      'src/**/*.spec.js': ['esbuild', 'sourcemap'] 
    },
    esbuild: {
      jsx: 'automatic',
      loader: { '.js': 'jsx', '.jsx': 'jsx' },
      target: 'es2020',
      sourcemap: 'both',
      plugins: [customGamerZoneInstrumenter()]
    },
    reporters: ['progress', 'coverage'],
    coverageReporter: {
      dir: 'coverage/',
      reporters: [{ type: 'html' }, { type: 'text-summary' }]
    },
    browsers: ['Chrome'],
    singleRun: true
  });
};