// var send_button = document.getElementById("send_button");
var Peer_Client = (() => {

  var peer = new Peer({ host: "localhost", port: 9000, path: "/myapp" });
  let client_id;
  let connections = {};

  console.log(peer);
  peer.on("open", function(id) {
    console.log("My peer ID is: " + id);
    $('#my_peer_ip').text()
    client_id = id;
  });

  peer.on("connection", function(conn) {
    const { _peerBrowser, peer } = conn;
    console.log(`CONNECTION EVENT!!!! FROM ${conn.peer}`);
    console.log(conn);
    connections[peer] = conn;
    console.log(`Connected to ${Object.keys(connections).length} clients`)
    console.log(connections);
    
  });

  function connect(peer_id) {
    var conn = peer.connect(peer_id, {
      reliable: true
    });

    conn.on("open", function() {
      console.log("Connected to: " + conn.peer);
      // Check URL params for comamnds that should be sent immediately
    });

    
    // Handle incoming data (messages only since this is the signal sender)
    conn.on("data", function(data) {
      console.log(data);
      add_message("<span class=\"peerMsg\">Peer:</span> " + data);
    });
    conn.on("close", function() {
      status.innerHTML = "Connection closed";
    });
  }

  $('#send_button').on('click', ()=>{
    console.log('SEND AMESSAGE?@??!!?')
    const connection_ids = Object.keys(connections)
    if(!connection_ids.length) return console.log('NO CONNECTIONS FOUND')
    const peer_id = connection_ids[0]
    /* Need to get value of who your sending tooooooooo */
    send_msg_to(peer_id)
  }) 
  function send_msg_to (peer_id) {
    console.log(`Get the conn obj to to my peer @ ${peer_id}`)
    const conn = connections[peer_id]
    if (conn.open) {
        var msg = sendMessageBox.value;
        sendMessageBox.value = "";
        conn.send(msg);
        console.log("Sent: " + msg);
        add_message("<span class=\"selfMsg\">Self: </span> " + msg);
    }
  };



  return {
    peer,
    client_id,
    connect, connections
  };
})();

function add_message(msg) {
  var now = new Date();
  var h = now.getHours();
  var m = addZero(now.getMinutes());
  var s = addZero(now.getSeconds());
  if (h > 12) h -= 12;
  else if (h === 0) h = 12;
  function addZero(t) {
    if (t < 10) t = "0" + t;
    return t;
  }
  message.innerHTML =
    '<br><span class="msg-time">' +
    h +
    ":" +
    m +
    ":" +
    s +
    "</span>  -  " +
    msg +
    message.innerHTML;
}






