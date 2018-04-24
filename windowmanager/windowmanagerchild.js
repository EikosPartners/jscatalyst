var logOutput = document.getElementById("logOutput");
var labelHeader = document.getElementById('labelHeader');
var dockButtons = document.getElementById('dockButtons');

var self;

// function minimizeWindow() {
//     self.minimize();
// }

// function maximizeWindow() {
//     if (self.isMaximized())
//         self.restore();
//     else
//         self.maximize();
// }

// function closeWindow() {
//     self.close();
// }

function sendMessage() {
    var txt = document.getElementById('textMessage');
    var msg = {type: windowmanager.runtime.name, text: txt.value, id: self._id, title: self.getTitle()};
    windowmanager.messagebus.send('internal-message', msg);
}

function logMessageServer(msg) { 
    if (msg.id !== self._id) {
        msg.text = msg.title + " from " + msg.type + ": " + msg.text
    } else {
        msg.text = "I say: " + msg.text
    }
    logOutput.textContent = msg.text + "\n" + logOutput.textContent;    
}



function dockEvent(event){    
    let id = event.target.id
    let otherWindow = windowmanager.Window.getByID(id)
    if (self._dockedGroup.includes(otherWindow)) { 
        self.undock(otherWindow)
    } else {
        self.dock(otherWindow)   
    }

}

function addDockButton(newWindow){
    var button = document.createElement('button')
    button.innerText = newWindow.getTitle()
    button.id = newWindow._id
    dockButtons.appendChild(button)
    button.onclick = dockEvent
}


windowmanager.onReady(function(){
    self = windowmanager.Window.getCurrent();
    labelHeader.innerText = self.getTitle();
    windowmanager.messagebus.on('external-message', logMessageServer);

    var allWindows = windowmanager.Window.getAll().slice(1).filter(item=>{return item._id !== self._id})
// slice removes parent window, filter removes self 
    
    if (windowmanager.runtime.isBrowser) {
        dockButtons.parentElement.removeChild(dockButtons)
    } else {
        dockButtons.innerText = "Toggle Docked Status: "
        windowmanager.on('window-create', addDockButton)
        allWindows.forEach(item=>{
            addDockButton(item)
        })
        
    }

});