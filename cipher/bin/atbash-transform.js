const { Transform } = require('stream');

const isLowerCase = (str) => {
  return str == str.toLowerCase() && str != str.toUpperCase();
}
const atbashMapping = {
  A: 'Z', B: 'Y', C: 'X', D: 'W', E: 'V', F: 'U', G: 'T', H: 'S', I: 'R', J: 'Q', K: 'P', L: 'O', M: 'N', N: 'M', O: 'L', P: 'K', Q: 'J', R: 'I', S: 'H', T: 'G', U: 'F', V: 'E', W: 'D', X: 'C', Y: 'B', Z: 'A'
}
const atbashMappingLowerCase = {
  a: 'z', b: 'y', c: 'x', d: 'w', e: 'v', f: 'u', g: 't', h: 's', i: 'r', j: 'q', k: 'p', l: 'o', m: 'n', n: 'm', o: 'l', p: 'k', q: 'j', r: 'i', s: 'h', t: 'g', u: 'f', v: 'e', w: 'd', x: 'c', y: 'b', z: 'a'
}

class AtBashTransform extends Transform {
  _transform(chunk, encoding, callback) {
    const charsArr = chunk.toString().split('')
    const translatedString = charsArr.map((x) => {
      const translatedLetter = isLowerCase(x) ? atbashMappingLowerCase[x] : atbashMapping[x]
      return (x.match(/[A-Za-z]/i) ? translatedLetter : x)
    }).join('')
    callback(null, translatedString)
  }
}

module.exports = AtBashTransform;
