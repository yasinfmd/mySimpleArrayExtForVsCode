// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "simple-array-creator" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('simple-array-creator.helloWorld', function () {
		// The code you place here will be executed every time your command is executed
		const editor=vscode.window.activeTextEditor;
		if(!editor){
			vscode.window.showInformationMessage('Editör Açık Değil');
			return
		}

		const text=editor.document.getText(editor.selection);
		const options=[{id:1,label:'Int Array'},{id:2,label:'String Array'},{id:3,label:'User Array'}]

		const quickPick=vscode.window.createQuickPick();
		quickPick.items=options;
		const simpleIntArray='const array=[1,2,3,4,5,6,7,8,9,10]'
		const simpleStrArray='const array=["A","B","C","D","E","F","G","H","I","K"]'
		const simpleUserObjectArray='const array=[{id:1,fullName:"John Doe",age:30},{id:2,fullName:"Brad Doe",age:22},{id:3,fullName:"Ahmet Akın",age:23},{id:4,fullName:"Yasin Dalkılıç",age:25},{id:5,fullName:"Ayşe Ucar",age:26},{id:6,fullName:"Eda Gumus",age:35},{id:7,fullName:"Test User",age:44},{id:8,fullName:"Burcu Gün",age:24},{id:9,fullName:"Deniz Calısır",age:20},{id:10,fullName:"Erkan Kacar",age:28}]'
		//const simpleObjArray='const x=["A","B","C","D","E","F","G","H","I","K"]'
		const pos=new vscode.Position(		editor.selection.active.line
			,80 );
			quickPick.onDidChangeSelection(([item])=>{
				if(item){
					if(item['id']==1){
						editor.edit(edit=>{
							edit.insert(pos,simpleIntArray)
						})
					}else if(item['id']==2){
						editor.edit(edit=>{
							edit.insert(pos,simpleStrArray)
						})
					}
					else if(item['id']==3){
						editor.edit(edit=>{
							edit.insert(pos,simpleUserObjectArray)
						})
					}
				}
				quickPick.dispose();
			})
			quickPick.onDidHide(()=>quickPick.dispose());
		quickPick.show();
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from Simple Array Creator!');
	});

	context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
