// JavaScript should be written in ECMAScript 5.1.

const karabiner = require('../lib/karabiner')

const vscode = {
  type: 'frontmost_application_if',
  bundle_identifiers: karabiner.bundleIdentifiers.visualStudioCode,
}

const sym = {
  'left_shift': 'LShift',
  'spacebar': 'Space',
  'delete_or_backspace': '⌫',
  'slash': '/',
  'up_arrow': '↑',
  'down_arrow': '↓',
  'left_arrow': '←',
  'right_arrow': '→',
  'period': '.',
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
    description: 'VSCode: ' + title + ' (Ctrl+' + extra.slice().concat([key_code]).map(toSym).join('+') + ')',
    manipulators: [
      {
        type: 'basic',
        from: { key_code, modifiers: { mandatory: ['left_control'].concat(extra) } },
        to: [{ key_code, modifiers: [anchor].concat(extra) }],
        conditions: [vscode],
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
    description: 'VSCode: ' + title + ' (Ctrl+' + extra.slice().concat([from]).map(toSym).join('+') + ')',
    manipulators: [
      {
        type: 'basic',
        from: { key_code: from, modifiers: { mandatory: ['left_control'].concat(extra) } },
        to: [{ key_code: to, modifiers: [anchor].concat(extra) }],
        conditions: [vscode],
      }
    ]
  }
}

function reanchor(title, key_code, from, to, extra) {
  if (extra == undefined) {
    extra = []
  }

  return {
    description: 'VSCode: ' + title + ' (' + [from].concat(extra).map(toSym).join('+') + ')',
    manipulators: [
      {
        type: 'basic',
        from: { key_code, modifiers: { mandatory: [from].concat(extra) } },
        to: [{ key_code, modifiers: [to].concat(extra) }],
        conditions: [vscode],
      }
    ]
  }
}

function main() {
  console.log(
    JSON.stringify(
      {
        title: 'VSCode from Windows',
        rules: [
          {
            description: 'VSCode: #: Copy (Ctrl+c)',
            manipulators: [
              {
                type: 'basic',
                from: { key_code: 'c', modifiers: { mandatory: ['left_control'] } },
                to: [
                  { key_code: 'c', modifiers: ['left_command'] },
                  { key_code: 'c', modifiers: ['left_control'] }
                ],
                conditions: [vscode],
              }
            ]
          },
          forward('#: Paste', 'v'),
          forward('#: Save', 's'),
          forward('#: Close', 'w'),
          forward('#: Find', 'f'),
          forward('#: New File', 'n'),
          forward('#: Find', 'f'),
          forward('#: Toggle Bold Text', 'b'),
          forward('#: Toggle Italic Text', 'i'),
          forward('#: Toggle Underline Text', 'u'),
          forward('#: Undo', 'z'),
          forward('#: Redo', 'z', ['left_shift']),
          forward('#: Cut', 'x'),
          forward('#: Cursor: Move Word Begin', 'left_arrow', [], 'left_option'),
          forward('#: Cursor: Select Word Begin', 'left_arrow', ['left_shift'], 'left_option'),
          forward('#: Cursor: Move Word End', 'right_arrow', [], 'left_option'),
          forward('#: Cursor: Select to Word End', 'right_arrow', ['left_shift'], 'left_option'),
          reanchor('#: Delete Word Left', 'delete_or_backspace', 'left_control', 'left_option'),
          forward('Quick Fix', 'period'),
          forward('Command Palette', 'p', ['left_shift']),
          forward('Edit: Add Next Occurrence', 'd'),
          forward('Edit: Toggle Line Comment', 'slash'),
          forward('Select: Select All', 'a'),
          forward('Select: Add Cursor Above', 'up_arrow', ['left_command'], 'left_option'),
          forward('Select: Add Cursor Below', 'down_arrow', ['left_command'], 'left_option'),
          forward('View: Split Editor', 'backslash'),
          forward('View: Appearance: Primary Side Bar', 'b'),
          forward('View: Appearance: Panner', 'j'),
          forward('Open Settings', 'comma'),
          remap('Trigger Suggest', 'spacebar', 'i'),
        ],
      },
      null,
      '  '
    )
  )
}

main()
