const fs = require('fs');
const path = require('path');

const parseArguments = function(arguments) {
  checkForDuplicates(arguments)

  const result = {
    inputFile: getValue('-i') || getValue('--input'),
    outputFile: getValue('-o') || getValue('--output'),
    config: getValue('-c') || getValue('--config'),
  }

  if (!result.config) throw 'Error: `-c` or `--config` option is mandatory'
  if (!validateConfig(result.config)) throw 'Error: Config validation failed!'

  if (isAString(result.inputFile)) {
    checkIfFileExists(result.inputFile)
    checkIfUserHasAccess(result.inputFile)
  }

  if (isAString(result.outputFile)) {
    checkIfFileExists(result.outputFile)
    checkIfUserHasAccess(result.outputFile)
  }

  return result;
};

const validateConfig = (string) => {
  const optionsArr = string.split('-')
  const validationResult = optionsArr.every((option) => option.match(/A$|R[0-1]|C[0-1]/g))
  return validationResult
}

const checkIfFileExists = (localPath) => {
  if (!fs.existsSync(path.join(__dirname, localPath))) throw `Error: this file doesn't exist ${localPath}`
  return true
}

const checkIfUserHasAccess = (localPath) => {
  try {
    fs.accessSync(path.join(__dirname, localPath))
  } catch(error) {
    throw `Error: You don't have enough permissions to access this file ${localPath}`
  }
}

const isAString = (arg) => typeof(arg) === 'string' || arg instanceof String

const checkForDuplicates = (arguments) => {
  if ([...new Set(arguments)].length < arguments.length) throw 'Error: Duplicated arguments are prohibited'
}

const getValue = (flag) => {
  const flagIndex = process.argv.indexOf(flag);
  return flagIndex !== -1 ? process.argv[flagIndex + 1] : null;
}

module.exports = parseArguments;
