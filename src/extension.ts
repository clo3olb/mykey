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
  MyKey.updateMode();
  Editor.updateEditor();

  let toggle = vscode.commands.registerCommand(`${extensionName}.toggle`, () => {
    MyKey.toggleMode();
    const editor = Editor.editor;
    if (editor) {
      if (MyKey.getMode() === "Mykey") {
        editor.options.cursorStyle = vscode.TextEditorCursorStyle.Block;
      } else {
        editor.options.cursorStyle = vscode.TextEditorCursorStyle.Line;
      }
    }
    Logger.message(`${extensionName} has been toggled. STATUS = ${MyKey.getMode() === "Mykey" ? "ON" : "OFF"}`);
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
}

// this method is called when your extension is deactivated
export function deactivate() {}

// let toggle = vscode.commands.registerCommand("mykey.toggle", () => {
//   mode = !mode;
//   vscode.window.showInformationMessage(
//     `MyKey has been toggled. STATUS = ${mode ? "ON" : "OFF"}`
//   );
// });
