# Compare From Paths
Quickly open a diff (compare) view for any two files by pasting their paths into a single input box.

Have you ever had two full file paths (from a log file, a build script, or a chat message) and wanted to compare them without having to:
1.  Find the first file in the VS Code explorer
2.  Right-click -> "Select for Compare"
3.  Find the second file
4.  Right-click -> "Compare with Selected"

This extension simplifies that entire process into one command.

## How to Use

1.  Open the Command Palette (`Ctrl+Shift+P`).
2.  Type and run `cfp`.
3.  An input box will appear. Paste your two file paths.
4.  Press Enter.

The two files will instantly open in a new diff tab.

![Demo GIF](./demo.gif)

## Features

* **Flexible Input:** Accepts two file paths in a single input, separated by either a space or a newline.
* **Smart Parsing:** Correctly handles file paths that contain spaces (e.g., `C:\My Files\file.txt`). The extension identifies the file extension of the first path to know where it ends and the second path begins.
