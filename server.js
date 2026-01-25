const express = require('express');
const fs = require('fs');
const https = require('https');
const { Server } = require('socket.io');
const { ExpressPeerServer } = require('peer');

const app = express();

/* =========================
   HTTPS
========================= */
const options = {
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem')
};

const server = https.createServer(options, app);

/* =========================
   SOCKET.IO
========================= */
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});

/* =========================
   CORS HTTP (IMPORTANT)
========================= */
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

/* =========================
   PEERJS SERVER
========================= */
const peerServer = ExpressPeerServer(server, {
    path: '/',
    allow_discovery: false
});

// 👉 MONTE UNE SEULE FOIS
app.use('/peerjs', peerServer);

/* =========================
   STATIC FILES & ROUTES
========================= */
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

/* =========================
   SOCKET LOGIC
========================= */
io.on('connection', (socket) => {

    console.log('Utilisateur connecté :', socket.id);

    socket.on('Demande', (data) => {
        socket.broadcast.emit('Request', data);
        console.log("demande distribuer:", data)
    });

    socket.on('Reponse', (peerId) => {
        io.emit('RpAdmis', peerId);
    });

    socket.on('disconnect', () => {
        console.log('Utilisateur déconnecté :', socket.id);
    });
});

/* =========================
   START SERVER
========================= */
server.listen(3001, '0.0.0.0', () => {
    console.log('✅ Serveur HTTPS en marche sur https://localhost:3000');
});
