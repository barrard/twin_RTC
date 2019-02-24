/* Peer connect UI stuff */
const peer_connect_btn = $('#peer_connect_btn')
const peer_connect_input = $('#peer_connect_input')

peer_connect_btn.on('click', ()=>{
  connect_to_peer($(peer_connect_input).val())
})

function connect_to_peer(peer){
  // console.log({peer})
  // console.log('click');
  Peer_Client.connect(peer)
  
  

}



