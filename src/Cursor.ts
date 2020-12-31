import * as vscode from "vscode";
import Editor from "./Editor";

export default class Cursor {
  public static move = async (to: string, by: string, value: number, select: boolean = false) => {
    await vscode.commands.executeCommand("cursorMove", { to, by, value, select });
  };
  public static getPosition = (): vscode.Position | undefined => {
    const editor = Editor.editor;
    if (editor?.selection.isEmpty) {
      return editor.selection.active;
    }
    return undefined;
  };
  public static getSelection = () => {
    const editor = Editor.editor;
    if (editor) {
      return editor.document.getText(editor.selection);
    }
  };
}
