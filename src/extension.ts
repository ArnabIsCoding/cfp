import * as vscode from 'vscode';
import * as path from 'path';

export function activate(context: vscode.ExtensionContext) {

    let disposable = vscode.commands.registerCommand('cfp.start', async () => {
        const pathInput = await vscode.window.showInputBox({
            prompt: "Enter two file paths (separated by a space or \n)",
            placeHolder: "C:\\My Files\\file.txt C:\\Other Files\\file.txt",
            ignoreFocusOut: true
        });
        if (!pathInput) {
            return;
        }
        let path1: string;
        let path2: string;
        const regex = /(\.[a-zA-Z0-9_]{1,10}\b)(\s+)/;
        const match = pathInput.match(regex);

        if (!match || match.index === undefined) {
            const paths = pathInput.split(/\s+/).filter(p => p.length > 0);
            if (paths.length !== 2) {
                vscode.window.showErrorMessage(
                    'are they separated or uses \n?'
                );
                return;
            }
            [path1, path2] = paths;

        } else {
            const splitIndex = match.index + match[1].length;

            path1 = pathInput.substring(0, splitIndex).trim();
            path2 = pathInput.substring(splitIndex).trim();
        }
        if (!path1 || !path2) {
             vscode.window.showErrorMessage(
                'are both paths present?'
            );
            return;
        }

        try {
            const file1Uri = vscode.Uri.file(path1);
            const file2Uri = vscode.Uri.file(path2);
            const fileName1 = path.basename(file1Uri.fsPath);
            const fileName2 = path.basename(file2Uri.fsPath);
            const diffTitle = `${fileName1} ↔ ${fileName2}`;
            await vscode.commands.executeCommand('vscode.diff', file1Uri, file2Uri, diffTitle);

        } catch (err) {
            if (err instanceof Error) {
                vscode.window.showErrorMessage(`Error opening diff: ${err.message}`);
            } else {
                vscode.window.showErrorMessage(`An unknown error occurred: ${String(err)}`);
            }
        }
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {}
