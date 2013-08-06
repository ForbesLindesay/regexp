module.exports = [
  [/[a-z]+/, {
    type: 'match',
    offset: 0,
    text: '[a-z]+',
    body: [
      {
        type: 'quantified',
        offset: 0,
        text: '[a-z]+',
        body: {
          type: 'charset',
          offset: 0,
          text: '[a-z]',
          invert: false,
          body: [{
            type: 'range',
            offset: 1,
            text: 'a-z',
            start: {
              type: 'literal',
              offset: 1,
              text: 'a',
              body: 'a',
              escaped: false
            },
            end: {
              type: 'literal',
              offset: 3,
              text: 'z',
              body: 'z',
              escaped: false
            }
          }]
        },
        quantifier: {
          type: 'quantifier',
          offset: 5,
          text: '+',
          min: 1,
          max: Infinity,
          greedy: true
        }
      }
    ]
  }],
  [/a|bc*/, {
    type: 'alternate',
    offset: 0,
    text: 'a|bc*',
    left: {
      type: 'match',
      offset: 0,
      text: 'a',
      body:[{
        type: 'literal',
        offset: 0,
        text: 'a',
        body: 'a',
        escaped: false
      }]
    },
    right: {
      type: 'match',
      offset: 2,
      text: 'bc*',
      body: [
        {
          type: 'literal',
          offset: 2,
          text: 'b',
          body: 'b',
          escaped: false
        },
        {
          type: 'quantified',
          offset: 3,
          text: 'c*',
          body: {
            type: 'literal',
            offset: 3,
            text: 'c',
            body: 'c',
            escaped: false
          },
          quantifier: {
            type: 'quantifier',
            offset: 4,
            text: '*',
            min: 0,
            max: Infinity,
            greedy: true
          }
        }
      ]
    }
  }],
  [/\n\b[\-]/, {
    type: 'match',
    offset: 0,
    text: '\\n\\b[\\-]',
    body: [
      {
        type: 'line-feed',
        offset: 0,
        text: '\\n'
      },
      {
        type: 'word-boundary',
        offset: 2,
        text: '\\b'
      },
      {
        type: 'charset',
        offset: 4,
        text: '[\\-]',
        invert: false,
        body: [{
          type: 'literal',
          offset: 5,
          text: '\\-',
          body: '-',
          escaped: true
        }]
      }
    ]
  }],
  [/\u1Af/, {
    type: 'match',
    offset: 0,
    text: '\\u1Af',
    body: [{
      type: 'unicode',
      offset: 0,
      text: '\\u1Af',
      code: '1AF'
    }]
  }],
  [/again and again/,{ type: 'match',
    offset: 0,
    text: 'again and again',
    body:
     [ { type: 'literal',
         offset: 0,
         text: 'a',
         body: 'a',
         escaped: false },
       { type: 'literal',
         offset: 1,
         text: 'g',
         body: 'g',
         escaped: false },
       { type: 'literal',
         offset: 2,
         text: 'a',
         body: 'a',
         escaped: false },
       { type: 'literal',
         offset: 3,
         text: 'i',
         body: 'i',
         escaped: false },
       { type: 'literal',
         offset: 4,
         text: 'n',
         body: 'n',
         escaped: false },
       { type: 'literal',
         offset: 5,
         text: ' ',
         body: ' ',
         escaped: false },
       { type: 'literal',
         offset: 6,
         text: 'a',
         body: 'a',
         escaped: false },
       { type: 'literal',
         offset: 7,
         text: 'n',
         body: 'n',
         escaped: false },
       { type: 'literal',
         offset: 8,
         text: 'd',
         body: 'd',
         escaped: false },
       { type: 'literal',
         offset: 9,
         text: ' ',
         body: ' ',
         escaped: false },
       { type: 'literal',
         offset: 10,
         text: 'a',
         body: 'a',
         escaped: false },
       { type: 'literal',
         offset: 11,
         text: 'g',
         body: 'g',
         escaped: false },
       { type: 'literal',
         offset: 12,
         text: 'a',
         body: 'a',
         escaped: false },
       { type: 'literal',
         offset: 13,
         text: 'i',
         body: 'i',
         escaped: false },
       { type: 'literal',
         offset: 14,
         text: 'n',
         body: 'n',
         escaped: false } ] }],
  [/(a)(b)(?:c)(d)/, { type: 'match',
    offset: 0,
    text: '(a)(b)(?:c)(d)',
    body:
     [ { type: 'capture-group',
         offset: 1,
         text: 'a',
         body:
          { type: 'match',
            offset: 1,
            text: 'a',
            body:
             [ { type: 'literal',
                 offset: 1,
                 text: 'a',
                 body: 'a',
                 escaped: false } ] },
         index: 1 },
       { type: 'capture-group',
         offset: 4,
         text: 'b',
         body:
          { type: 'match',
            offset: 4,
            text: 'b',
            body:
             [ { type: 'literal',
                 offset: 4,
                 text: 'b',
                 body: 'b',
                 escaped: false } ] },
         index: 2 },
       { type: 'non-capture-group',
         offset: 7,
         text: '?:c',
         body:
          { type: 'match',
            offset: 9,
            text: 'c',
            body:
             [ { type: 'literal',
                 offset: 9,
                 text: 'c',
                 body: 'c',
                 escaped: false } ] } },
       { type: 'capture-group',
         offset: 12,
         text: 'd',
         body:
          { type: 'match',
            offset: 12,
            text: 'd',
            body:
             [ { type: 'literal',
                 offset: 12,
                 text: 'd',
                 body: 'd',
                 escaped: false } ] },
         index: 3 } ] }],
  [/\cm/, {
    type: 'match',
    offset: 0,
    text: '\\cm',
    body: [{
      type: 'control-character',
      offset: 0,
      text: '\\cm',
      code: 'M'
    }]
  }]
]