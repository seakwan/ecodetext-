// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
var vscode = require('vscode');

var base64 = require('./code/encodebase64');
var html = require('./code/encodehtml');
var url = require('./code/encodeurl');
var store = require('./code/resultStore');
var textProvider = require('./code/resultTextDocumentContentProvider');

const WarningMessage = 'empty text';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {

    initTextDocument();

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    //console.log('Congratulations, your extension "encodetxt" is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json

    var urlEncode = vscode.commands.registerCommand('extension.urlEncode', function () {
        show(doUrlEncode);
    });

    var urlDecode = vscode.commands.registerCommand('extension.urlDecode', function () {
        show(doUrlDecode);
    });

    var htmlEncode = vscode.commands.registerCommand('extension.htmlEncode', function () {
        show(doHtmlEncode);
    });

    var htmlDecode = vscode.commands.registerCommand('extension.htmlDecode', function () {
        show(doHtmlDecode);
    });

    var toBase64 = vscode.commands.registerCommand('extension.toBase64', function () {
        show(doToBase64);
    });

    var fromBase64 = vscode.commands.registerCommand('extension.fromBase64', function () {
        show(doFromBase64);
    });

    context.subscriptions.push(urlEncode);
    context.subscriptions.push(urlDecode);
    context.subscriptions.push(htmlEncode);
    context.subscriptions.push(htmlDecode);
    context.subscriptions.push(toBase64);
    context.subscriptions.push(fromBase64);
}

exports.activate = activate;

function initTextDocument() {
    this.previewUri = 'encodetext://authority/result-preview';
    this.provider = new textProvider.ResultTextDocumentContentProvider();
    this.registration = vscode.workspace.registerTextDocumentContentProvider('encodetext', provider);
}

function show(callback) {
    var editor = vscode.window.activeTextEditor;
    if (!editor) {
        return;
    }

    var selection = editor.selection;
    var text = editor.document.getText(selection);

    if (text.length == 0) {
        vscode.window.showWarningMessage(WarningMessage);
    } else {
        if (callback) {
            var newtext = callback(text);
            store.ResultStore.add(newtext);
            this.provider.update(this.previewUri);
            vscode.commands.executeCommand('vscode.previewHtml', previewUri, vscode.ViewColumn.Two, `${callback.name.replace(/do/,'')}`);
        } else {
            vscode.window.showWarningMessage(text);
        }
    }
}

function doUrlEncode(text) {
    return url.encode(text);
}

function doUrlDecode(text) {
    return url.decode(text);
}

function doHtmlEncode(text) {
    return html.encode(text);
}

function doHtmlDecode(text) {
    return html.decode(text);
}

function doToBase64(text) {
    return base64.toBase64(text, false);
}

function doFromBase64(text) {
    return base64.fromBase64(text);
}

// this method is called when your extension is deactivated
function deactivate() {}

exports.deactivate = deactivate;