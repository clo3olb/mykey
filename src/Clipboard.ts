import * as vscode from "vscode";

export default class Clipboard {
  public static read = async () => {
    return await vscode.env.clipboard.readText();
  };
  public static write = async (text: string) => {
    try {
      await vscode.env.clipboard.writeText(text);
    } catch (e) {
      console.error(`Error copying to clipboard. err=${e}`);
    }
  };
}
