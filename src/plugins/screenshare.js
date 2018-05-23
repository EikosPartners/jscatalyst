const screensharePlugin = {
  install(Vue, options) {
    // the createSendableComponents and getStyles functions are declared outside of the pulgin mixin
    // the developer or designer should not have to use these functions directly
    function createSendableComponents(components) {
      let toSend = components.map(child=>{
        // if someone receives a dashboard all the components on the page will be actually be LoaderComponents
        // if they are LoaderComponents then we want to get the child of that component which is the actual chart
        child.$options.name === 'LoaderComponent' ? child = child.$children[0] : null;
        if (child.$options.name === 'ReceiverComponent') return {};
        let childName = child.$options.name,
          returnObj = {chartName: childName},
          height = child.$el.offsetHeight

        // If it is a button then get hte inner text so that it can be added back to it in the loader component
        returnObj.class = child.$el.parentNode.className
        returnObj.filePath = child.$options.__file
        returnObj.inlineStyles = child.$el.style.cssText
        returnObj.height = height

        // deep clone props, cannot use Object.assign()
        let adjustProps = JSON.parse(JSON.stringify(child.$props))
        returnObj.props = adjustProps

        return returnObj
      }).filter(comp => comp.chartName)
      return toSend;
    }

    function getStyles(component) {
      var currentWrapper = component.$el.className
      // get all the styles applied to the current page and select out the one that has @support queries (ie it has the conditional css grid styling for this page)
      var style = Array.from(Array.from(document.getElementsByTagName("STYLE")).map(el=>el.sheet.cssRules))
        .filter(item => { return item[0] ? item[0].conditionText : null }).filter(list => list[0].cssText.includes(`.${currentWrapper}`))

      // map over the selected style objects (for both @supports queries) and take out all of its style rules
      var CSS = window.CSS.supports('display:grid')

      if (CSS = true) {
        style = Array.from(style[0]).filter(item=> !item.conditionText.includes('not'))[0].cssText
      } else {
        style = Array.from(style[0]).filter(item=> item.conditionText.includes('not'))[0].cssText
      }

      return style
    }

    function shareAll(){
      var realThis;
      this.$el.id === 'chart-sender' ? realThis = this.$parent : realThis = this;
      let sendable = {dataSource: realThis.currentData},
       toSend = createSendableComponents(realThis.$children.filter(comp => comp.$el.id !== 'chart-sender'))
      // attach styles to the object being sent
      sendable.currentWrapper = realThis.$el.className
      sendable.styles = getStyles(realThis);
      sendable.props = toSend
      sendable.theme = realThis.$store.state.themeMod.colorTheme || 'blue';
      sendable.displayTheme = realThis.$store.state.themeMod.displayTheme;
      sendable.receiveChart = true

      realThis.$socket.emit('sendCharts', JSON.stringify(sendable))
    }

    function submit(){
      var realThis;
      this.$options.name === 'ChartSender' ? realThis = this.$parent : realThis = this;
      // If the dashboard was received all components are loader components. In order to get the correct shareableChart find the select and find the value of it's v-model
      let chartName = this.shareableChart,
        chartsToShare = realThis.$children.filter((item, index, arr)=>{return item.$options.name === 'LoaderComponent' ? item.$children[0].$options.name === `${chartName}` : item.$options.name === `${chartName}` }),
        sendable = {dataSource: realThis.currentData};
      var toSend = createSendableComponents(chartsToShare)

      // attach styles to the object being sent
      sendable.currentWrapper = ''
      sendable.styles = [[''],['']];
      sendable.props = toSend
      sendable.theme = this.$store.state.themeMod.colorTheme || 'blue';
      sendable.displayTheme = this.$store.state.themeMod.displayTheme;
      sendable.receiveChart = true
      this.$socket.emit('sendCharts', JSON.stringify(sendable))
    }

    function charts(){
      var realThis;
      this.$options.name === 'ChartSender' ? realThis = this.$parent : realThis = this;
      let initialNames;
      if (Object.keys(realThis.$options.components).includes('loader-component')) {
        initialNames = realThis.$children.slice(1).map(comp => comp.$children[0].$options.name).filter(item=>{return !item.includes('panel')})
      } else {
        initialNames = realThis.$children.map(comp => comp.$options.name).filter(name => name !== 'ChartSender')
      }
      // kebab-case to CamelCase
      //   let newNames = initialNames.map(splitFirst=>{
      //     var splitName = splitFirst.split('-')
      //     return splitName.map(splitSecond=> {
      //       return splitSecond[0].toUpperCase() + splitSecond.slice(1)
      //     }).join('')
      // })
    return initialNames;
    }

    // method for receiving charts. cannot directly use a sockets function because any component
    // connected to websockets would receive the dashboard
    function receiveCharts(msg) {
      let tempProps;
      let newMsg = JSON.parse(msg)

      // store the received themes in an object that will then be passed to the receiver component
      this.themes = {colorTheme: newMsg.theme, displayTheme: newMsg.displayTheme}
      this.wrapperClass = newMsg.currentWrapper

      // Need to get both of the styling for CSS grid suppoprt and no support so that the dashboard can get passed along
      var styles = newMsg.styles[0] + newMsg.styles[1]
      // create a new style element and add the style string as the inner text
      let style = document.createElement('style')
      style.type = "text/css"
      style.appendChild(document.createTextNode(''))
      style.innerText = styles
      // append style element to document head
      document.head.appendChild(style)
      if (newMsg.receiveChart !== true) {
        // execute only if we've flagged message to be relevant to this interface
        return
      } else {
        this.dataSource = newMsg.dataSource
        tempProps = [...newMsg.props]
        this.componentArray = tempProps
      }
    }

    // declare a global mixin that will be accessed from any Vue instance
    // by checking if a component has the screenshare custom option on the vue instance
    // we can scope the mixin to only components that need it
    Vue.mixin({
      beforeCreate() {
        if (this.$options.screenshare) {
          const role = this.$options.screenshare
          if (role === 'receiverComp') {
            this.receiveCharts = receiveCharts.bind(this)
            this.$options.sockets = {
              connect: function(){
                this.connected = true
              },
              shareCharts: function(msg){
                this.receiveCharts(msg)
              }
            }
          } else if (role) {
            this.shareableChart = null
            this.shareAll = shareAll.bind(this)
            this.submit = submit.bind(this)
            this.charts = charts.bind(this)
          }
        }
      }
    })
  }
}
export default screensharePlugin;
