const alphabet = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
const lowerCaserAlphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
const alphabetLength = alphabet.length

const isLowerCase = (str) => {
  return str == str.toLowerCase() && str != str.toUpperCase();
}

const caesarCipher = (str, shift) => {
  const charsArr = str.split('')
  const resultArr = charsArr.map((char) => {
    const indexOfChar = isLowerCase(char) ? lowerCaserAlphabet.indexOf(char) : alphabet.indexOf(char)
    if (indexOfChar !== -1) {
      const newPosition = indexOfChar + shift
      if (isLowerCase(char)) return lowerCaserAlphabet[(newPosition % alphabetLength + alphabetLength) % alphabetLength];
      return alphabet[(newPosition % alphabetLength + alphabetLength) % alphabetLength];
    }
    return char
  })
  return resultArr.join('')
}

const { Transform } = require('stream');

class CaesarCipherTransform extends Transform {
  constructor(options) {
    super(options)
    this.decipher = options.decipher
    this.shift = 1
  }

  _transform(chunk, encoding, callback) {
    const shift = this.decipher ? -this.shift : this.shift
    const result = caesarCipher(chunk.toString(), shift)
    callback(null, result)
  }
}

module.exports = CaesarCipherTransform;
