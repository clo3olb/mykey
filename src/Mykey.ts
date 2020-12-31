import * as vscode from "vscode";

export default class MyKey {
  private mode: "Insert" | "Mykey";

  constructor() {
    this.mode = "Insert";
  }
  public setContext = async (key: string, value: boolean | string) => {
    await vscode.commands.executeCommand("setContext", key, value);
  };
  public updateMode = async () => {
    await this.setContext("mykey.mode", this.mode);
  };

  public toggleMode = () => {
    console.log(this.mode);
    this.mode = this.mode === "Insert" ? "Mykey" : "Insert";
    this.updateMode();
  };

  public getMode = () => {
    return this.mode;
  };
}
