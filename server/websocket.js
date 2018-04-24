var http = require('http');
var fs = require('fs');
let app = require('express')();
let cors = require('cors');

app.use(cors());
var aaplData = require('../demoData/aaplData.json');
var fbData = require('../demoData/fbData.json');
var msftData = require('../demoData/msftData.json');
var tslaData = require('../demoData/tslaData.json')

var server = http.createServer(app);
server.listen(8000, '0.0.0.0');

console.log('Websocket server is running on 8000!\n');
// let getMockData;
//
// // If getData is passed as an arguement to the node server.js command then
// // the stock websocket data will be written to the corresponding file in the demoData folder
// if (getMockData) {
//   console.log('You are now saving data for the demo in the demoData folder!');
//   var ioStream = require('socket.io-client')('https://ws-api.iextrading.com/1.0/tops')
//   var fbWriteStream,
//       msftWriteStream,
//       aaplWriteStream,
//       tslaWriteStream,
//       key;
//
//   ioStream.on('connect', function() {
//     fbWriteStream = fs.createWriteStream('./demoData/fbData.json')
//     msftWriteStream = fs.createWriteStream('./demoData/msftData.json')
//     aaplWriteStream = fs.createWriteStream('./demoData/aaplData.json')
//     tslaWriteStream = fs.createWriteStream('./demoData/tslaData.json')
//     key = {
//       'FB': fbWriteStream,
//       'MSFT': msftWriteStream,
//       'AAPL': aaplWriteStream,
//       'TSLA': tslaWriteStream
//     };
//     ioStream.emit('subscribe', 'fb,aapl,msft,tsla')
//   })
//
//   ioStream.on('message', function(message) {
//     var parsed = JSON.parse(message)
//     key[parsed['symbol']].write(message)
//     //writableStream.write(message)
//   })
// }


// create the websocket server
var io = require('socket.io').listen(server);
var connectCount = 0;
// define interactions with client
io.sockets.on('connection', function(socket){
    //send data to clienzt
    console.log('Connection Established')
    connectCount++;
    // console.log(socket.request);
    // console.log(socket.handshake.headers);
    io.emit('users', socket.id)
    socket.on('externalMessage', function(msg){
      let newMsg = Object.assign(msg, {chat: true})
      io.emit('broadcast', newMsg)
    })
    socket.on('interAppDemo', function(sendValue){
      let newMsg = Object.assign(sendValue, {chart: true})
      io.emit('broadcast', newMsg)
    })
    socket.on('sendCharts', function(sendValue){
      // console.log
      // let newMsg = Object.assign(sendValue, {receiveChart: true})
      io.emit('shareCharts', sendValue)
    })

    if (connectCount === 1) {
      // Interval function will send data to demo evry 2 seconds
      // This interval is intiated as soon as the client is connected to the websocket
      var index = 0;
      var inter = setInterval(function() {
        // Emit data for each at the same time so that they all will be emitting data for roughly the same time period
        io.to('FB').emit('message', fbData[index])
        io.to('AAPL').emit('message', aaplData[index])
        io.to('MSFT').emit('message', msftData[index])
        io.to('TSLA').emit('message', tslaData[index])
        index++;
      }, 1000)
    }
    // When a stock is chosen on client side it calls subscribe
    // which will join the correct room and receive the correct stock data
    socket.on('subscribe', function(stock) {
      console.log(stock);
      socket.join(stock)
    })

    // When a stock is unsubscribed the client will leave the room and stop recieving data for that stock
    socket.on('unsubscribe', function(stock) {
      socket.leave(stock)
    })

});
