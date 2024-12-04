const btn = document.querySelector(".btn")
const nom = document.querySelector(".nom")
const qui = document.querySelector(".qui")
const btn1 = document.querySelector(".btn1")
const connexion = document.querySelector(".connexion")


btn.addEventListener("click",function(){

    btn.style.animation = " Apparition-btn 0.8s ease-in-out 1 forwards";

    nom.style.animation = " Apparition-input 0.8s 1s ease-in-out 1 forwards";

    qui.style.animation = " Apparition-input 0.8s 2s ease-in-out 1 forwards";

    btn1.style.animation = " Apparition-btn1 0.8s 3s ease-in-out 1 forwards";

    connexion.classList.toggle("prio");
})
