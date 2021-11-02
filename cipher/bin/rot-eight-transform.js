
const CaesarCipherTransform = require('./caesar-transform')

class RotEightTransform extends CaesarCipherTransform {
  constructor(options) {
    super(options)
    this.decipher = options.decipher
    this.shift = 8
  }
}

module.exports = RotEightTransform;
