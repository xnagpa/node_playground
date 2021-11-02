#! /usr/bin/env node
const { stdout, stdin, stderr, exit } = process;
const path = require('path');
const fs = require('fs');
const { pipeline } = require('stream');

const AtBashCipherTransform = require('./atbash-transform')
const CaesarCipherTransform = require('./caesar-transform')
const RotEightTransform = require('./rot-eight-transform')
const parseArguments = require('./utils')


const mapReadAndWriteStreams = (parsedArguments) => {
  const readPath = path.join(__dirname, parsedArguments.inputFile || '');
  const writePath = path.join(__dirname, parsedArguments.outputFile || '');

  const rstream = parsedArguments.inputFile !== null ? fs.createReadStream(readPath, { encoding: 'utf8' }) : stdin
  const wstream = parsedArguments.outputFile !== null ? fs.createWriteStream(writePath, { encoding: 'utf8', flags:'a' }) : stdout

  return { ...parsedArguments, inputFile: rstream, outputFile: wstream }
}

const mapOtherStreamsToConfig = (string) => {
  const optionsArr = string.split('-')
  return optionsArr.map((option) => {
    if (/A/.test(option)) return new AtBashCipherTransform()
    if (/R\d/.test(option)) return new RotEightTransform({ decipher: !(option.split('')[1] === '1') })
    if (/C\d/.test(option)) return new CaesarCipherTransform({ decipher: !(option.split('')[1] === '1') })
  })
}

try {
  const result = mapReadAndWriteStreams(parseArguments(process.argv.slice(2)))
  const encodingStreams = mapOtherStreamsToConfig(result.config)
  const streamsArray = [result.inputFile, ...encodingStreams, result.outputFile]

  pipeline(
    ...streamsArray,
    (err) => {
      if (err) {
        stderr.write(`${err.toString()}\n`)
        exit(1)
      } else {
        stderr.write(`Pipeline succeeded.\n`);
        exit()
      }
    }
  );
} catch(err) {
  stderr.write(`${err.toString()}\n`)
  exit(1)
}


