var vscode = require('vscode');
var store = require('./resultStore');

class ResultTextDocumentContentProvider{
    constructor(){
        this._onDidChange = new vscode.EventEmitter();
    }

    get onDidChange(){
        return this._onDidChange.event;
    }

    update(uri){
        this._onDidChange.fire(uri);
    }

    provideTextDocumentContent(uri){
        if(uri){
            var text = store.ResultStore.get();
            return `
            <body>
            ${text}
            </body>
            `;
        }
    }
}

exports.ResultTextDocumentContentProvider = ResultTextDocumentContentProvider;