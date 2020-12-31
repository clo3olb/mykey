import * as vscode from "vscode";

export default class Editor {
  static editor: vscode.TextEditor | undefined;
  static updateEditor = () => {
    Editor.editor = vscode.window.activeTextEditor;
  };
}
