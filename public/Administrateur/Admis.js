/* ======================
   SOCKET.IO
====================== */
const Socket = io();

/* ======================
   PEERJS
====================== */
const myPeer = new Peer({
    host: location.hostname,   // 🔥 important pour réseau
    port: location.port || 3000,
    path: '/peerjs',
    secure: location.protocol === 'https:'
});

/* ======================
   PEER CONNECTED
====================== */
myPeer.on('open', (id) => {
    console.log('Peer connecté avec ID :', id);

    /* ======================
       RÉCEPTION DES DEMANDES
    ====================== */
    Socket.on('Request', (data) => {
        console.log("i'm here ")
        const li = document.createElement('li');

        li.innerHTML = `
            <p>
              <strong>${data.name}</strong> souhaite partager son écran
              <br>Peer ID : ${data.PeerId}
            </p>
            <button class="accept">Accepter</button>
            <button class="reject">Refuser</button>
        `;

        document.querySelector('#list-Etud').appendChild(li);

        /* ======================
           ACCEPTATION
        ====================== */
        li.querySelector('.accept').addEventListener('click', () => {
            Socket.emit('Reponse', id); // ⚠️ envoyer TON peer ID
            console.log('Demande acceptée → Peer ID envoyé:', id);
        });

        /* ======================
           REFUS (OPTIONNEL)
        ====================== */
        li.querySelector('.reject').addEventListener('click', () => {
            li.remove();
            console.log('Demande refusée');
        });
    });
});

/* ======================
   RÉCEPTION DU STREAM
====================== */
myPeer.on('call', (call) => {

    console.log('📞 Appel entrant de :', call.peer);

    // L'admin ne partage rien
    call.answer();

    call.on('stream', (remoteStream) => {

        const video = document.getElementById('remoteVideo');

        if (!video) {
            console.error('❌ <video id="remoteVideo"> manquant');
            return;
        }

        video.srcObject = remoteStream;
        video.playsInline = true;
        video.autoplay = true;
    });

    call.on('error', (err) => {
        console.error('❌ Erreur PeerJS :', err);
    });
});

const peerStatus = document.getElementById('peer-status');

/* ======================
   PEERJS STATUS
====================== */

// Connexion OK
myPeer.on('open', (id) => {
    console.log('✅ Peer connecté :', id);
    peerStatus.textContent = 'Connecté';
    peerStatus.style.color = 'green';
});

// Erreur PeerJS
myPeer.on('error', (err) => {
    console.error('❌ Erreur PeerJS :', err);
    peerStatus.textContent = 'Erreur';
    peerStatus.style.color = 'red';
});

// Connexion fermée
myPeer.on('close', () => {
    console.warn('⚠️ Connexion Peer fermée');
    peerStatus.textContent = 'Déconnecté';
    peerStatus.style.color = 'gray';
});

// Tentative de reconnexion
myPeer.on('disconnected', () => {
    console.warn('🔁 Peer déconnecté, tentative de reconnexion...');
    peerStatus.textContent = 'Reconnexion...';
    peerStatus.style.color = 'orange';
    myPeer.reconnect();
});

