{
  Token.offset = offset
  Token.text = text
}

regexp      = match:match alternate:("|" regexp)? { return alternate ? new Alternate(match, alternate[1]) : match }

match       = start:start? (!quantifier) match:(quantified / submatch)* end:end? { return new Match([start].concat(match).concat([end])) }
submatch    = subexp / charset / terminal

start       = "^" { return new Token('start') }
end         = "$" { return new Token('end') }

quantified  = submatch:submatch quantifier:quantifier { return new Quantified(submatch, quantifier)}
quantifier "Quantifier" = quantity:quantifierSpec notgreedy:greedyFlag? { if (notgreedy) { quantity.greedy = false } return quantity }

quantifierSpec  = quantifierSpecFull / quantifierSpecUpTo / quantifierSpecAtLeast / quantifierSpecExact / quantifierRequired / quantifierAny / quantifierOptional
quantifierSpecFull    = "{" min:integer "," max:integer "}" { return new Quantifier(min, max)}
quantifierSpecUpTo    = "{," max:integer "}"                { return new Quantifier(0, max)}
quantifierSpecAtLeast = "{" min:integer ",}"                { return new Quantifier(min, Infinity)}
quantifierSpecExact   = "{" value:integer "}"               { return new Quantifier(value, value)}
quantifierRequired    = "+"                                 { return new Quantifier(1, Infinity)}
quantifierAny         = "*"                                 { return new Quantifier(0, Infinity)}
quantifierOptional    = "?"                                 { return new Quantifier(0, 1)}
greedyFlag      = "?"


integer = num:([0-9]+) { return +num.join('') }


subexp = "(" body:(positiveLookahead / negativeLookahead / groupNoCapture / groupCapture) ")" { return body}
groupCapture      =      regexp:regexp   { return new CaptureGroup(index++, regexp) }
groupNoCapture    = "?:" regexp:regexp   { return new Group('non-capture-group', regexp) }
positiveLookahead = "?=" regexp:regexp   { return new Group('positive-lookahead', regexp) }
negativeLookahead = "?!" regexp:regexp   { return new Group('negative-lookahead', regexp) }


charset "CharacterSet" = "[" invert:"^"? body:(charsetRange / charsetTerminal)* "]" { return new CharSet(!!invert, body) }
charsetRange "CharacterRange" = start:charsetTerminal "-" end:charsetTerminal { return new CharacterRange(start, end) }
charsetTerminal "Character" = charsetEscapedCharacter / charsetLiteral
charsetLiteral = value:[^\\\]] { return new Literal(value) }
charsetEscapedCharacter = backspaceCharacter / controlCharacter / digitCharacter / non_digitCharacter / formFeedCharacter / lineFeedCharacter / carriageReturnCharacter / whiteSpaceCharacter / nonWhiteSpaceCharacter / tabCharacter / verticalTabCharacter / wordCharacter / nonWordCharacter / octalCharacter / hexCharacter / unicodeCharacter / nullCharacter / otherEscaped

terminal = anyCharacter / escapedCharacter / literal

anyCharacter = "." { return new Token('any-character') }

literal "Literal" = value:[^|\\/.\[\(\)\?\+\*\$\^] { return new Literal(value) }

escapedCharacter = word_boundaryCharacter /  nonWord_boundaryCharacter /  controlCharacter /  digitCharacter /  non_digitCharacter /  formFeedCharacter /  lineFeedCharacter /  carriageReturnCharacter /  whiteSpaceCharacter /  nonWhiteSpaceCharacter /  tabCharacter /  verticalTabCharacter /  wordCharacter /  nonWordCharacter /  backReference /  octalCharacter /  hexCharacter /  unicodeCharacter /  nullCharacter / otherEscaped

backspaceCharacter = "\\b" { return new Token('backspace') }
word_boundaryCharacter = "\\b" { return new Token('word-boundary') }
nonWord_boundaryCharacter = "\\B" { return new Token('non-word-boundary') }
digitCharacter = "\\d" { return new Token('digit') }
non_digitCharacter = "\\D" { return new Token('non-digit') }
formFeedCharacter = "\\f" { return new Token('form-feed') }
lineFeedCharacter = "\\n" { return new Token('line-feed') }
carriageReturnCharacter = "\\r" { return new Token('carriage-return') }
whiteSpaceCharacter = "\\s" { return new Token('white-space') }
nonWhiteSpaceCharacter = "\\S" { return new Token('non-white-space') }
tabCharacter = "\\t" { return new Token('tab') }
verticalTabCharacter = "\\v" { return new Token('vertical-tab') }
wordCharacter = "\\w" { return new Token('word') }
nonWordCharacter = "\\W" { return new Token('non-word') }

controlCharacter = "\\c" code:(.) { return new Control('control-character') }
backReference = "\\" code:[1-9] { return new BackReference(code) }
octalCharacter = "\\0" code:([0-7]+) { return new Octal(code.join('')) }
hexCharacter = "\\x" code:([0-9a-fA-F]+) { return new Hex(code.join('')) }
unicodeCharacter = "\\u" code:([0-9a-fA-F]+) { return new Unicode(code.join('')) }

nullCharacter = "\\0" { return new Token('null-character') }
otherEscaped = "\\" value:. { return new Literal(value) }