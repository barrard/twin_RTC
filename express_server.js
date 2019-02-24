colors = require('colors');
logger = require('tracer').colorConsole({
  format: "{{timestamp.green}} <{{title.yellow}}> {{message.cyan}} (in {{file.red}}:{{line}})",
  dateformat: "HH:MM:ss.L"
})
const express = require('express')
const app = express()

var ExpressPeerServer = require('peer').ExpressPeerServer;
var server = require('http').createServer(app);



var favicon = require('serve-favicon');
/* Peerjs options */
var options = {
  debug: true
}
/* PeerJS server using express */
var peerserver = ExpressPeerServer(server, options);

/* Middleware */
app.use(express.static('public'))

app.use(favicon(__dirname + '/public/images/favicon.ico'));
app.use('/myapp', peerserver);

peerserver.on('connection', (id)=>{
  logger.log(`Got Id = ${id
  }`)
})


app.get('/', (req, res)=>{
  res.sendFile(__dirname+'/index.html')
})


app.get('/send', (req, res)=>{
  res.sendFile(__dirname+'/send.html')
})


app.get('/receive', (req, res)=>{
  res.sendFile(__dirname+'/receive.html')
})


server.listen(9000)

