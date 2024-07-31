#!/usr/bin/env bash

set -o errexit
set -o pipefail
set -o nounset
# set -o xtrace

__dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)" # Directory where this script exists.
__root="$(cd "$(dirname "${__dir}")" && pwd)"         # Root directory of project.

cd "${__root}"
make
cp ./public/json/vscode_from_windows.json ~/.config/karabiner/assets/complex_modifications/.
cp ./public/json/windows.json ~/.config/karabiner/assets/complex_modifications/.
