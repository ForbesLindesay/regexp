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
            start: 'a',
            end: 'z'
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
  }]
]