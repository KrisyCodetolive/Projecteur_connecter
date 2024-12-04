const Socket = io()

const myPeer = new Peer(1230, {
    host: '/',
    port: 9000,
    path: '/peerjs'
  });

  

myPeer.on('open' , (id) => {

    //console.log(id)
    


    Socket.on('Request' , (Data) => {

    
        const Etud = document.createElement('li')
        Etud.innerHTML = `<p>${Data.name} souhaite partager son écran (Peer ID : ${Data.PeerId})</p>
                <button id= "btn1">Accepter</button>
                 <button id= "btn2">Réfuser</button>`

        document.querySelector("#list-Etud").appendChild(Etud)
        document.querySelector("#btn1").addEventListener('click', function(){

            Socket.emit('Reponse' , (myPeer.id))

            console.log('reponse envoyer:', myPeer.id ,'a: ', Data.Soso )
        })
    })


    myPeer.on('call', (call) => {

       
        //window.location.assign("test");
        //window.location.href = "test";

        console.log('Appel reçu de Peer A');
      
        // Répondre à l'appel sans envoyer de flux (juste recevoir)
        call.answer();
      
        // Écouter le flux entrant de Peer A
        call.on('stream', (remoteStream) => {
          console.log('Flux reçu de Peer A');
      
          // Afficher le flux distant dans une balise <video>
          const remoteVideo = document.getElementById('remoteVideo');
          if (remoteVideo) {
            remoteVideo.srcObject = remoteStream;
            remoteVideo.play();
          }
        });
      
        // Gérer les erreurs éventuelles
        call.on('error', (err) => {
          console.error('Erreur lors de l\'appel PeerJS :', err);
        });
      
        // Gérer la fin de l'appel
        // call.on('close', () => {
        //   console.log('Appel terminé.');
        // });
      });

      
    
})








function addEtud(tbl) {

    

    tbl.forEach(elt =>{
        const Etud = document.createElement('li')
        Etud.innerHTML = `<p>${data.name} souhaite partager son écran (Peer ID : ${data.peerId})</p>
                <button>Accepter</button>`

        listEtud.appendChild(Etud)
    })
    
}