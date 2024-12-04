btn = document.querySelector(".btn");

btn.addEventListener('click', function () {
    if (navigator.mediaDevices && navigator.mediaDevices.getDisplayMedia) {
        navigator.mediaDevices.getDisplayMedia({ video: true })
            .then((stream) => {
                const video = document.querySelector("video");
                video.srcObject = stream;
                video.play();
            })
            .catch((error) => {
                console.error("Erreur lors de la capture d'écran :", error);
            });
    } else {
        console.error("La fonction getDisplayMedia n'est pas prise en charge dans ce navigateur.");
    }
});
