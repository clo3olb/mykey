import * as vscode from "vscode";

export default class Logger {
  public static message = (message: any) => {
    vscode.window.showInformationMessage(message);
  };
}
