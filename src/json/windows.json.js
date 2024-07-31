// JavaScript should be written in ECMAScript 5.1.

const sym = {
  'left_shift': 'LShift',
  'spacebar': 'Space',
  'delete_or_backspace': '⌫',
  'slash': '/',
  'left_arrow': '←',
  'right_arrow': '→'
}

function toSym(v) {
  const s = sym[v]
  return s == undefined ? v : s
}

function forward(title, key_code, extra, anchor) {
  if (anchor == undefined) {
    anchor = 'left_command'
  }
  if (extra == undefined) {
    extra = []
  }

  return {
    description: 'Windows: ' + title + ' (Ctrl+' + extra.slice().concat([key_code]).map(toSym).join('+') + ')',
    manipulators: [
      {
        type: 'basic',
        from: { key_code, modifiers: { mandatory: ['left_control'].concat(extra) } },
        to: [{ key_code, modifiers: [anchor].concat(extra) }],
      }
    ]
  }
}

function remap(title, from, to, extra, anchor) {
  if (extra == undefined) {
    extra = []
  }
  if (anchor == undefined) {
    anchor = 'left_command'
  }

  return {
    description: 'Windows: ' + title + ' (Ctrl+' + extra.slice().concat([from]).map(toSym).join('+') + ')',
    manipulators: [
      {
        type: 'basic',
        from: { key_code: from, modifiers: { mandatory: ['left_control'].concat(extra) } },
        to: [{ key_code: to, modifiers: [anchor].concat(extra) }],
      }
    ]
  }
}

function reanchor(title, key_code, from, to, extra) {
  if (extra == undefined) {
    extra = []
  }

  return {
    description: 'Windows: ' + title + ' (' + [from].concat(extra).map(toSym).join('+') + ')',
    manipulators: [
      {
        type: 'basic',
        from: { key_code, modifiers: { mandatory: [from].concat(extra) } },
        to: [{ key_code, modifiers: [to].concat(extra) }],
      }
    ]
  }
}

function main() {
  console.log(
    JSON.stringify(
      {
        title: 'Windows',
        rules: [
          {
            description: 'Windows: Copy (Ctrl+c)',
            manipulators: [
              {
                type: 'basic',
                from: { key_code: 'c', modifiers: { mandatory: ['left_control'] } },
                to: [
                  { key_code: 'c', modifiers: ['left_command'] },
                  { key_code: 'c', modifiers: ['left_control'] }
                ],
              }
            ]
          },
          forward('Paste', 'v'),
          forward('Save', 's'),
          forward('Close', 'w'),
          forward('Find', 'f'),
          forward('New File', 'n'),
          forward('Find', 'f'),
          forward('Undo', 'z'),
          forward('Redo', 'z', ['left_shift']),
          forward('Cut', 'x'),
          forward('Cursor: Move Word Begin', 'left_arrow', [], 'left_option'),
          forward('Cursor: Select Word Begin', 'left_arrow', ['left_shift'], 'left_option'),
          forward('Cursor: Move Word End', 'right_arrow', [], 'left_option'),
          forward('Cursor: Select to Word End', 'right_arrow', ['left_shift'], 'left_option'),
          reanchor('Delete Word Left', 'delete_or_backspace', 'left_control', 'left_option'),
        ],
      },
      null,
      '  '
    )
  )
}

main()
