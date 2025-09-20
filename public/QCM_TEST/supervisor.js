    const video = document.getElementById('webcam');

    // Accès à la caméra frontale si possible
    navigator.mediaDevices.getUserMedia({
      video: { facingMode: "user" },
      audio: false
    }).then(stream => {
      video.srcObject = stream;
    }).catch(err => {
      console.warn("Accès à la caméra refusé ou non disponible", err);
      document.getElementById('camera-box').style.display = 'none';
    });