
const {
    ipcRenderer,
    contextBridge
} = require('electron');


let indexBridge = {
    ipcRenderer: { ...ipcRenderer, on: ipcRenderer.on },
    func1: (callback) => ipcRenderer.on("maintorender", (callback))

}
contextBridge.exposeInMainWorld("api", indexBridge);