<template>
  <div>
    <v-alert type="info" :value="true" v-if="!connected && !isFin">
      You are not connected to the websocket server! To send and receive inter-runtime messages, please run `node server.js`.
    </v-alert>
    <div class="page">
      <section>
        <h1 class="display-1 mt-5 mb-1">Window Manager/Chat</h1>
        <p class="body-1 mt-3">
          In laoreet convallis porttitor. Donec vel lacus magna. Suspendisse eu elementum orci. Ut felis ante, lacinia vel placerat eu, cursus ut ante. Aenean eleifend dolor vulputate, interdum lectus a, tristique lorem. Nullam ut felis finibus, consequat sapien nec, consequat quam. In auctor neque felis, at interdum nulla efficitur ut. Integer ultrices ligula at augue sollicitudin, id sollicitudin ligula laoreet. Nullam id massa id arcu venenatis bibendum.
        </p>
      </section>
    </div>
    <v-container class="text-xs-center">
      <div class="display-1">{{numberOfWindows | numberStrings}}</div>

      <v-btn @click="createNewWindow" v-if="isBrowser" class="primary mt-3">Add More Tiles</v-btn>
      <span v-else>
        <v-btn v-if="buttonReady" @click="createAChild(altWindowState)">Add More Windows</v-btn>
        <v-btn v-if="buttonReady" @click="createHelloWorld">Hello World</v-btn>
      </span>

      <div id="layout-example" class="mt-5"></div>
    </v-container>
  </div>
</template>

<script>

  export default {
    sockets: {
      connect: function(){
        console.log('connected')
        this.connected = true
      },
      broadcast: function(msg){
        if (msg.chat !== true) {
          return
        } else {
          windowmanager.messagebus.send('external-message', msg)
        }
      }
    },
    data: function() {
      return {
        connected: null,
      	thisLayout: null,
// using any .html file or route that is webpack bundled (not in scripts folder) gives it the header and footer
        iframeState: {
// state for browser children i.e. iframes
          width: 400,
          height: 400,
          url: '../../../windowmanager/WindowManagerChild.html',
          frame: false
        },
  	    altWindowState: {
// state for non-browser children i.e. fin and electron
// (keep separate even when the same in case one needs to be changed, separate concerns)
  		    width: 400,
  		    height: 400,
  		    url: '../../../windowmanager/WindowManagerChild.html',
  		    frame: false
        },
        helloWorldState: {
// state for demonstration of vue-router component popups
          width: 650,
          height: 660,
          url: '/helloworld',
          title: "Hello World",
          frame: true,
          draggable: true
        },
        isBrowser: windowmanager.runtime.isBrowser,
        isFin: windowmanager.runtime.isOpenFin,
        nonBrowserChildren: 0,
        browserChildren: 0,
        buttonReady: false
      }
    },
    beforeCreate: function(){
    },
    created: function(){
      let localThis = this

      windowmanager.onReady(function(){
// makes sure the "add a window" buttons don't appear before OpenFin/WM is ready to add a window
        localThis.buttonReady = true
        windowmanager.messagebus.on('internal-message', function(msg){
// listens for messages to send elsewhere   // did not work in mounted, only created.
          localThis.emitMessage(msg)
        })
      })
    },
    mounted: function(){
// starts the page with a layout or one child
      if (this.isBrowser) {
    	   this.createNewLayout()
      } else {
// HTK note hack because child-windows don't like to work without a reload
        let localThis = this
        windowmanager.on('window-close', function(){
          console.log('window-close')
          localThis.subAChild("nonBrowserChildren")
        })
        // this.createAChild(this.altWindowState)

      }
    },
    filters: {
    	numberStrings: function(value) {
 // playing with filters, which format text, to avoid "one windows"
    		let stringNums = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']
    		if (value === 1){
          return stringNums[value] + " child window"
        } else if (value < 10 && value !== 1) {
    			return stringNums[value] + " child windows"
    		} else {
    			return value + " child windows"
    		}
    	}
    },
    computed: {
    	numberOfWindows: function(){
// shows how a computed property will stay updated based on changes in a windowmanager object even nested very deep
// i.e. windowmanager.Layout.getAll()[0]._windows.length
    		if (this.isBrowser && this.thisLayout) {
    			return this.thisLayout._windows.length
    		} else {
// for fin or electron runtime, need to manually keep track of # of children and return here
    			return this.nonBrowserChildren
    		}
    	}
    },
    methods: {
      emitMessage: function(msg){
// if socket.io server, broadcast message to all instances
        if (this.$socket.connected) {
          this.$socket.emit('externalMessage', msg)
        } else {
// else, just send the message
          windowmanager.messagebus.send('external-message', msg)
        }
      },
      createNewLayout: function(){
// creates initial tiled layout includes 5 identical windows/iframes
        this.iframeState.title = "Window " + (this.browserChildren + 1)
        new windowmanager.Layout('tiled', 'layout-example', [this.iframeState])
        this.addAChild("browserChildren")
        this.thisLayout = windowmanager.Layout.getAll()[0]

        for (var i of new Array(4)) {
          this.addLayoutWindow()
        }
// keeps track of our layout for future reference (in below method, or numberOfWindows computed)
      },
      createNewWindow: function(){
        if (windowmanager.Layout.getAll().length < 1) {
// if there is no Layout (somehow mounted didn't run? or we removed it in the console?) it creates a new one
          this.createNewLayout()
        } else {
// adds another window with the same config properties as above
          this.addLayoutWindow()
        }
      },
      addLayoutWindow: function(){
        this.iframeState.title = "Window " + (this.browserChildren + 1)
        this.thisLayout.addWindow(this.iframeState)
        this.addAChild("browserChildren")
        // Array.from(document.getElementsByTagName('iframe')).forEach(item=>{item.setAttribute("scrolling", "no")})
      },
      createAChild: function(state){
        let numberOfWindows, newNumberOfWindows

// creates a non-layout window, for openfin or electron instances
        state.title = "Window " + (this.nonBrowserChildren + 1)
        new windowmanager.Window(state)
        this.addAChild("nonBrowserChildren")

      },
      addAChild: function(arg){
        this[arg] += 1
      },
      subAChild: function(arg){
        this[arg] -= 1
      },
      createHelloWorld: function(){
// demonstrates that one of our other routes can be opened by windowmanager
        new windowmanager.Window(this.helloWorldState)
      }
    },
    beforeDestroy(){
// closes child chat windows when you leave the chat page
      windowmanager.Window.getAll().slice(1).forEach(subWindow=>{subWindow.close()})
      // this.$socket.emit('disconnect')
    }

  }
</script>

<style lang="stylus" scoped>
  .page > section
    grid-column 1 / 13
</style>
