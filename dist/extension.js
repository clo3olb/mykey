module.exports =
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.deactivate = exports.activate = void 0;
const vscode = __webpack_require__(1);
const Mykey_1 = __webpack_require__(2);
const Cursor_1 = __webpack_require__(3);
const Logger_1 = __webpack_require__(5);
const Editor_1 = __webpack_require__(4);
const Clipboard_1 = __webpack_require__(6);
const extensionName = "mykey";
function activate(context) {
    console.log(`${extensionName} has been started!`);
    const MyKey = new Mykey_1.default();
    MyKey.updateMode();
    Editor_1.default.updateEditor();
    let toggle = vscode.commands.registerCommand(`${extensionName}.toggle`, () => {
        MyKey.toggleMode();
        const editor = Editor_1.default.editor;
        if (editor) {
            if (MyKey.getMode() === "Mykey") {
                editor.options.cursorStyle = vscode.TextEditorCursorStyle.Block;
            }
            else {
                editor.options.cursorStyle = vscode.TextEditorCursorStyle.Line;
            }
        }
        Logger_1.default.message(`${extensionName} has been toggled. STATUS = ${MyKey.getMode() === "Mykey" ? "ON" : "OFF"}`);
    });
    let moveLeft = vscode.commands.registerCommand(`${extensionName}.moveLeft`, () => {
        Cursor_1.default.move("left", "character", 1);
        Logger_1.default.message(`Move Left`);
    });
    let moveRight = vscode.commands.registerCommand(`${extensionName}.moveRight`, () => {
        Cursor_1.default.move("right", "character", 1);
        Logger_1.default.message(`Move Right`);
    });
    let moveUp = vscode.commands.registerCommand(`${extensionName}.moveUp`, () => {
        Cursor_1.default.move("up", "line", 1);
        Logger_1.default.message(`Move Up`);
    });
    let moveDown = vscode.commands.registerCommand(`${extensionName}.moveDown`, () => {
        Cursor_1.default.move("down", "line", 1);
        Logger_1.default.message(`Move Down`);
    });
    let moveLeftWithSelection = vscode.commands.registerCommand(`${extensionName}.moveLeftWithSelection`, () => {
        Cursor_1.default.move("left", "character", 1, true);
        Logger_1.default.message(`Move Left with selection`);
    });
    let moveRightWithSelection = vscode.commands.registerCommand(`${extensionName}.moveRightWithSelection`, () => {
        Cursor_1.default.move("right", "character", 1, true);
        Logger_1.default.message(`Move Right with selection`);
    });
    let moveUpWithSelection = vscode.commands.registerCommand(`${extensionName}.moveUpWithSelection`, () => {
        Cursor_1.default.move("up", "line", 1, true);
        Logger_1.default.message(`Move Up with selection`);
    });
    let moveDownWithSelection = vscode.commands.registerCommand(`${extensionName}.moveDownWithSelection`, () => {
        Cursor_1.default.move("down", "line", 1, true);
        Logger_1.default.message(`Move Down with selection`);
    });
    let copy = vscode.commands.registerCommand(`${extensionName}.copy`, () => __awaiter(this, void 0, void 0, function* () {
        var _a;
        if (!((_a = Editor_1.default.editor) === null || _a === void 0 ? void 0 : _a.selection.isEmpty)) {
            let selection = Cursor_1.default.getSelection();
            if (selection) {
                yield Clipboard_1.default.write(selection);
            }
            Logger_1.default.message(`copy`);
        }
    }));
    let paste = vscode.commands.registerCommand(`${extensionName}.paste`, () => __awaiter(this, void 0, void 0, function* () {
        const editor = Editor_1.default.editor;
        const text = yield Clipboard_1.default.read();
        if (editor) {
            if (editor.selection.isEmpty) {
                editor.edit((editBuilder) => {
                    let at = editor.selection.active;
                    if (at) {
                        editBuilder.insert(at, text);
                    }
                });
            }
            else {
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
            Logger_1.default.message(`paste`);
        }
        else {
            console.error("no editor from paste");
        }
    }));
    let cut = vscode.commands.registerCommand(`${extensionName}.cut`, () => __awaiter(this, void 0, void 0, function* () {
        const editor = Editor_1.default.editor;
        if (editor) {
            if (!editor.selection.isEmpty) {
                let selection = Cursor_1.default.getSelection();
                if (selection) {
                    yield Clipboard_1.default.write(selection);
                }
                editor.edit((editBuilder) => {
                    let range = editor.selection;
                    editBuilder.delete(range);
                    // set cursor to end
                    // const cursorEnd = editor.selection.end;
                    // editor.selection = new vscode.Selection(cursorEnd, cursorEnd);
                });
            }
            Logger_1.default.message(`cut`);
        }
        else {
            console.error("no editor from cut");
        }
    }));
    vscode.window.onDidChangeActiveTextEditor((e) => {
        Editor_1.default.updateEditor();
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
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
// let toggle = vscode.commands.registerCommand("mykey.toggle", () => {
//   mode = !mode;
//   vscode.window.showInformationMessage(
//     `MyKey has been toggled. STATUS = ${mode ? "ON" : "OFF"}`
//   );
// });


/***/ }),
/* 1 */
/***/ ((module) => {

module.exports = require("vscode");;

/***/ }),
/* 2 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const vscode = __webpack_require__(1);
class MyKey {
    constructor() {
        this.setContext = (key, value) => __awaiter(this, void 0, void 0, function* () {
            yield vscode.commands.executeCommand("setContext", key, value);
        });
        this.updateMode = () => __awaiter(this, void 0, void 0, function* () {
            yield this.setContext("mykey.mode", this.mode);
        });
        this.toggleMode = () => {
            console.log(this.mode);
            this.mode = this.mode === "Insert" ? "Mykey" : "Insert";
            this.updateMode();
        };
        this.getMode = () => {
            return this.mode;
        };
        this.mode = "Insert";
    }
}
exports.default = MyKey;


/***/ }),
/* 3 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const vscode = __webpack_require__(1);
const Editor_1 = __webpack_require__(4);
class Cursor {
}
exports.default = Cursor;
Cursor.move = (to, by, value, select = false) => __awaiter(void 0, void 0, void 0, function* () {
    yield vscode.commands.executeCommand("cursorMove", { to, by, value, select });
});
Cursor.getPosition = () => {
    const editor = Editor_1.default.editor;
    if (editor === null || editor === void 0 ? void 0 : editor.selection.isEmpty) {
        return editor.selection.active;
    }
    return undefined;
};
Cursor.getSelection = () => {
    const editor = Editor_1.default.editor;
    if (editor) {
        return editor.document.getText(editor.selection);
    }
};


/***/ }),
/* 4 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const vscode = __webpack_require__(1);
class Editor {
}
exports.default = Editor;
Editor.updateEditor = () => {
    Editor.editor = vscode.window.activeTextEditor;
};


/***/ }),
/* 5 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const vscode = __webpack_require__(1);
class Logger {
}
exports.default = Logger;
Logger.message = (message) => {
    vscode.window.showInformationMessage(message);
};


/***/ }),
/* 6 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const vscode = __webpack_require__(1);
class Clipboard {
}
exports.default = Clipboard;
Clipboard.read = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield vscode.env.clipboard.readText();
});
Clipboard.write = (text) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield vscode.env.clipboard.writeText(text);
    }
    catch (e) {
        console.error(`Error copying to clipboard. err=${e}`);
    }
});


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	// module exports must be returned from runtime so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })()
;
//# sourceMappingURL=extension.js.map