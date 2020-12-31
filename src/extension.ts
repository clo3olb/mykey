import * as vscode from "vscode";
import MyKeyClass from "./Mykey";
import Cursor from "./Cursor";
import Logger from "./Logger";
import Editor from "./Editor";
import Clipboard from "./Clipboard";

const extensionName = "mykey";

export function activate(context: vscode.ExtensionContext) {
  console.log(`${extensionName} has been started!`);
  const MyKey = new MyKeyClass();

  let toggle = vscode.commands.registerCommand(`${extensionName}.toggle`, () => {
    MyKey.toggleActive();
    Logger.message(`${extensionName} has been toggled. STATUS = ${MyKey.isActive() ? "ON" : "OFF"}`);
  });
  let moveLeft = vscode.commands.registerCommand(`${extensionName}.moveLeft`, () => {
    Cursor.move("left", "character", 1);
    Logger.message(`Move Left`);
  });
  let moveRight = vscode.commands.registerCommand(`${extensionName}.moveRight`, () => {
    Cursor.move("right", "character", 1);
    Logger.message(`Move Right`);
  });
  let moveUp = vscode.commands.registerCommand(`${extensionName}.moveUp`, () => {
    Cursor.move("up", "line", 1);
    Logger.message(`Move Up`);
  });
  let moveDown = vscode.commands.registerCommand(`${extensionName}.moveDown`, () => {
    Cursor.move("down", "line", 1);
    Logger.message(`Move Down`);
  });
  let moveLeftWithSelection = vscode.commands.registerCommand(`${extensionName}.moveLeftWithSelection`, () => {
    Cursor.move("left", "character", 1, true);
    Logger.message(`Move Left with selection`);
  });
  let moveRightWithSelection = vscode.commands.registerCommand(`${extensionName}.moveRightWithSelection`, () => {
    Cursor.move("right", "character", 1, true);
    Logger.message(`Move Right with selection`);
  });
  let moveUpWithSelection = vscode.commands.registerCommand(`${extensionName}.moveUpWithSelection`, () => {
    Cursor.move("up", "line", 1, true);
    Logger.message(`Move Up with selection`);
  });
  let moveDownWithSelection = vscode.commands.registerCommand(`${extensionName}.moveDownWithSelection`, () => {
    Cursor.move("down", "line", 1, true);
    Logger.message(`Move Down with selection`);
  });
  let copy = vscode.commands.registerCommand(`${extensionName}.copy`, async () => {
    if (!Editor.editor?.selection.isEmpty) {
      let selection = Cursor.getSelection();
      if (selection) {
        await Clipboard.write(selection);
      }
      Logger.message(`copy`);
    }
  });
  let paste = vscode.commands.registerCommand(`${extensionName}.paste`, async () => {
    const editor = Editor.editor;
    const text = await Clipboard.read();
    if (editor) {
      if (editor.selection.isEmpty) {
        editor.edit((editBuilder) => {
          let at = editor.selection.active;
          if (at) {
            editBuilder.insert(at, text);
          }
        });
      } else {
        editor.edit((editBuilder) => {
          let range = editor.selection;
          if (range) {
            editBuilder.replace(range, text);
          }

          // set cursor to end
          const cursorEnd = editor.selection.end;
          editor.selection = new vscode.Selection(cursorEnd, cursorEnd);
        });
      }
      Logger.message(`paste`);
    }
  });
  let cut = vscode.commands.registerCommand(`${extensionName}.cut`, async () => {
    const editor = Editor.editor;
    if (editor) {
      if (!editor.selection.isEmpty) {
        let selection = Cursor.getSelection();
        if (selection) {
          await Clipboard.write(selection);
        }
        editor.edit((editBuilder) => {
          let range = editor.selection;
          editBuilder.delete(range);

          // set cursor to end
          // const cursorEnd = editor.selection.end;
          // editor.selection = new vscode.Selection(cursorEnd, cursorEnd);
        });
      }
      Logger.message(`cut`);
    }
  });
  vscode.window.onDidChangeActiveTextEditor((e) => {
    Editor.updateEditor();
  });

  context.subscriptions.push(toggle);
  context.subscriptions.push(moveLeft);
  context.subscriptions.push(moveRight);
  context.subscriptions.push(moveUp);
  context.subscriptions.push(moveDown);
  context.subscriptions.push(moveLeftWithSelection);
  context.subscriptions.push(moveRightWithSelection);
  context.subscriptions.push(moveUpWithSelection);
  context.subscriptions.push(moveDownWithSelection);
  context.subscriptions.push(copy);
  context.subscriptions.push(paste);
  context.subscriptions.push(cut);
}

// this method is called when your extension is deactivated
export function deactivate() {}

// let toggle = vscode.commands.registerCommand("mykey.toggle", () => {
//   mode = !mode;
//   vscode.window.showInformationMessage(
//     `MyKey has been toggled. STATUS = ${mode ? "ON" : "OFF"}`
//   );
// });
