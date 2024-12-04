// const { Socket } = require('dgram');
const express = require('express'); 
const fs = require('fs');
const https = require('https');
const socketIo = require('socket.io');
const { PeerServer } = require('peer');

const app = express();



// Options pour HTTPS avec les bons fichiers
const options = {
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem') // Assurez-vous que c'est bien le certificat, pas .csr
};

// Crée un serveur HTTPS sécurisé
const server = https.createServer(options, app);
const io = socketIo(server);

const peerServer = PeerServer({
    port: 9000,
    path: '/peerjs',
    ssl: options,
    allow_discovery: true, 
});

// Middleware pour les en-têtes CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Autoriser toutes les origines
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS'); // Autoriser ces méthodes
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type'); // Autoriser ces en-têtes
    next();
});


// Configuration des routes
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/Connexion/Connexion.html');
});

app.get('/Admis', (req, res) => {
    res.sendFile(__dirname + '/public/Administrateur/Espace_Admis.html');
});

app.get('/Admis/test', (req, res) => {
    res.sendFile(__dirname + '/public/Administrateur/test.html');
});

app.get('/Etudiant', (req, res) => {
    res.sendFile(__dirname + '/public/Etudiant/Espace_Etud.html');
});



// Configuration de Socket.io pour les connexions en temps réel
io.on('connection', (socket) => {

    //création de Room et transmission de l'ID en broadcast 
   
    socket.on('Demande' , (Data) => {

        io.emit('Request' , (Data))
      
    })

    socket.on('Reponse' , (id) => {

        //console.log('rp reçu par id', id)
        //io.to(Soso).emit('RpAdmis' , id)
        io.emit('RpAdmis' , (id))
       
    })


    // socket.on('Reponse' , (id , Soso) => {

    //     console.log('rp reçu par id', id, Soso)
    //     io.to(Soso).emit('RpAdmis' , id)
    //     io.emit('RpAdmis' , (id))
       
    // })
    
  

    //déconnection
    socket.on('disconnect' , () => {

        console.log('un utilisateur c\'est déconnecté');
    })
});



// Lancement du serveur HTTPS
server.listen(3000, '0.0.0.0', () => {
    console.log('serveur HTTPS en marche sur le port 3000');
});
