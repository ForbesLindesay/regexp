var parser = import './grammer.pegjs'

var index = 1
exports = (module.exports = parse)

function parse(str) {
  if (typeof str != 'string') {
    var ex = new TypeError('The regexp to parse must be represented as a string.')
    throw ex
  }
  //capture group index
  index = 1
  return parser.parse(str)
}

exports.Token = Token
function Token(type, obj) {
  this.type = type
  this.offset = Token.offset()
  this.text = Token.text()
}

exports.Alternate = Alternate
function Alternate(left, right) {
  Token.call(this, 'alternate')
  this.left = left
  this.right = right
}
Alternate.prototype = Object.create(Token.prototype)
Alternate.prototype.constructor = Alternate

exports.Match = Match
function Match(body) {
  Token.call(this, 'match')
  this.body = body.filter(Boolean)
}
Match.prototype = Object.create(Token.prototype)
Match.prototype.constructor = Match

exports.Group = Group
function Group(type, body) {
  Token.call(this, type)
  this.body = body
}
Group.prototype = Object.create(Token.prototype)
Group.prototype.constructor = Group

exports.CaptureGroup = CaptureGroup
function CaptureGroup(index, body) {
  Group.call(this, 'capture-group')
  this.index = index
  this.body = body
}
CaptureGroup.prototype = Object.create(Group.prototype)
CaptureGroup.prototype.constructor = CaptureGroup

exports.Quantified = Quantified
function Quantified(body, quantifier) {
  Token.call(this, 'quantified')
  this.body = body
  this.quantifier = quantifier
}
Quantified.prototype = Object.create(Token.prototype)
Quantified.prototype.constructor = Quantified

exports.Quantifier = Quantifier
function Quantifier(min, max) {
  Token.call(this, 'quantifier')
  this.min = min
  this.max = max
  this.greedy = true //initial setting
}
Quantifier.prototype = Object.create(Token.prototype)
Quantifier.prototype.constructor = Quantifier

exports.CharSet = CharSet
function CharSet(invert, body) {
  Token.call(this, 'charset')
  this.invert = invert
  this.body = body
}
CharSet.prototype = Object.create(Token.prototype)
CharSet.prototype.constructor = CharSet

exports.CharacterRange = CharacterRange
function CharacterRange(start, end) {
  Token.call(this, 'range')
  this.start = start
  this.end = end
}
CharacterRange.prototype = Object.create(Token.prototype)
CharacterRange.prototype.constructor = CharacterRange


exports.Literal = Literal
function Literal(body) {
  Token.call(this, 'literal')
  this.body = body
  this.escaped = this.body != this.text
}
Literal.prototype = Object.create(Token.prototype)
Literal.prototype.constructor = Literal

exports.Unicode = Unicode
function Unicode(code) {
  Token.call(this, 'unicode')
  this.code = code.toUpperCase()
}
Unicode.prototype = Object.create(Token.prototype)
Unicode.prototype.constructor = Unicode