import * as vscode from "vscode";

export default class MyKey {
  private active: boolean;

  constructor() {
    this.active = false;
  }
  public setContext = async (key: string, value: boolean | string) => {
    await vscode.commands.executeCommand("setContext", key, value);
  };

  public toggleActive = async () => {
    this.active = !this.active;
    await this.setContext("mykey.active", this.active);
  };

  public isActive = () => {
    return this.active;
  };
}
