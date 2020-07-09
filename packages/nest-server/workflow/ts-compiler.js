const ts = require('typescript');
const plugin = require('@nestjs/swagger/plugin');
const { rollup } = require('rollup');
const resolve = require('@rollup/plugin-node-resolve').default;
const cjs = require('@rollup/plugin-commonjs');
const swaggerPlugin = require('@nestjs/swagger/plugin');
const {join} = require("path")

const formatHost = {
  getCanonicalFileName: (path) => path,
  getCurrentDirectory: ts.sys.getCurrentDirectory,
  getNewLine: () => ts.sys.newLine,
};

function getTSConfig() {
  const configPath = ts.findConfigFile(
    __dirname,
    ts.sys.fileExists,
    'tsconfig.json',
  );
  console.log("tsconfig path: ", configPath);
  const readConfigFileResult = ts.readConfigFile(configPath, ts.sys.readFile);
  if (readConfigFileResult.error) {
    throw new Error(
      ts.formatDiagnostic(readConfigFileResult.error, formatHost),
    );
  }
  const jsonConfig = readConfigFileResult.config;
  const convertResult = ts.convertCompilerOptionsFromJson(
    jsonConfig.compilerOptions,
    __dirname,
  );
  if (convertResult.errors && convertResult.errors.length > 0) {
    throw new Error(ts.formatDiagnostics(convertResult.errors, formatHost));
  }
  const compilerOptions = convertResult.options;
  return compilerOptions;
}

function displayFilename(originalFunc, operationName) {
  let displayEnabled = false;
  let counter = 0;
  function displayFunction() {
    const fileName = arguments[0];
    if (displayEnabled) {
      process.stdout.clearLine();
      process.stdout.cursorTo(0);
      process.stdout.write(`${operationName}: ${fileName}`);
    }
    counter++;
    return originalFunc(...arguments);
  }
  displayFunction.originalFunc = originalFunc;
  displayFunction.enableDisplay = () => {
    counter = 0;
    if (process.stdout.isTTY) {
      displayEnabled = true;
    }
  };
  displayFunction.disableDisplay = () => {
    if (displayEnabled) {
      displayEnabled = false;
      process.stdout.clearLine();
      process.stdout.cursorTo(0);
    }
    console.log(`${counter} times function was called`);
  };
  return displayFunction;
}

function compile() {
  console.time('Time to compile');
  const compilerOptions = getTSConfig();
  const compilerHost = ts.createCompilerHost(compilerOptions);
  compilerHost.readFile = displayFilename(compilerHost.readFile, 'Reading');
  compilerHost.readFile.enableDisplay();
  const program = ts.createProgram(
    [join(__dirname, '../src/main.ts')],
    compilerOptions,
    compilerHost,
  );
  compilerHost.readFile.disableDisplay();

  console.log(
    ts.formatDiagnosticsWithColorAndContext(
      ts.getPreEmitDiagnostics(program),
      formatHost,
    ),
  );

  require('rimraf').sync(join(__dirname,".."));
  compilerHost.writeFile = displayFilename(compilerHost.writeFile, 'Emitting');
  compilerHost.writeFile.enableDisplay();
  const emitResult = program.emit();
  compilerHost.writeFile.disableDisplay();
  console.log(
    ts.formatDiagnosticsWithColorAndContext(emitResult.diagnostics, formatHost),
  );
  console.timeEnd('Time to compile');
  return emitResult.diagnostics.length === 0;
}

compile() && require('../dist/main');

// console.log('Start rollup');
// rollup({
//   input: './dist/main.js',
//   plugins: [
//     resolve({ modulesOnly: true})
//   ],
// })
//   .then((bundle) => {
//     console.log('Strart writing...');
//     Promise.all([
//       bundle.write({
//         file: './dist/bundle.js',
//         format: 'cjs',
//       }),
//       bundle.write({
//         file: './dist/bundle.min.js',
//         format: 'cjs',
//         plugins: [
//           require('rollup-plugin-terser').terser({
//             ecma: 2015,
//             keep_classnames: true,
//             keep_fnames: true,
//             output: { comments: false },
//           }),
//         ],
//       }),
//     ])
//       .then(() => {
//         console.log('Rollup completed!!');
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   })
//   .catch((err) => {
//     console.log(err);
//   });

//
