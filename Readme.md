#  Projecteur Connecté

Application web permettant de diffuser l’écran d’un ordinateur vers une autre machine du réseau local en temps réel.

---

##  Description

Projecteur Connecté est une application web développée avec Node.js permettant le partage d’écran sur un réseau local.  
Elle permet à un utilisateur de diffuser son écran vers une machine centrale (ex: ordinateur connecté à un projecteur) après validation.

Le système utilise WebRTC pour la transmission vidéo en temps réel et Socket.IO pour la signalisation.

---

##  Technologies utilisées

- Node.js
- Express.js
- Socket.IO
- PeerJS
- WebRTC
- HTML / CSS / JavaScript

---

##  Architecture technique

- **Express** : serveur HTTP et gestion des routes
- **Socket.IO** : communication temps réel (signalisation WebRTC)
- **PeerJS** : abstraction WebRTC pour connexion peer-to-peer
- **WebRTC** : transmission du flux vidéo d’écran

Flux simplifié :

1. Connexion des clients au serveur via Socket.IO
2. Échange des identifiants Peer
3. Établissement de la connexion WebRTC
4. Diffusion du flux média vers la machine réceptrice

---

##  Fonctionnalités

- Diffusion d’écran en temps réel
- Connexion via réseau local
- Communication bidirectionnelle via WebSocket
- Interface web simple et intuitive

---

##  Aperçu
<img width="1289" height="958" alt="Capture d’écran du 2026-02-18 16-26-28" src="https://github.com/user-attachments/assets/93d17462-1087-4b30-b50d-1d457a18a3aa" />
<img width="604" height="886" alt="Capture d’écran du 2026-02-18 16-25-49" src="https://github.com/user-attachments/assets/470c4a6d-7057-4811-ab68-6fd02eba6f0d" />

<img width="616" height="459" alt="Capture d’écran du 2026-02-18 16-26-02" src="https://github.com/user-attachments/assets/37d406a1-3a51-4d5d-9b5e-989559143fcd" />




---

##  Installation

```bash
git clone https://github.com/tonusername/projecteur_connecte.git
cd projecteur_connecte
npm install
npm start
