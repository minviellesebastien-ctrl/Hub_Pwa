document.addEventListener("DOMContentLoaded", () => {

    const introVideo = document.getElementById("intro-video");

    const showMenu = () => {
        document.body.classList.add("menu-visible");
    };

    if (introVideo) {
        introVideo.addEventListener("ended", showMenu);
        // Sécurité : Ouvre le menu au bout de 5,5 sec si la vidéo ne se lance pas
        setTimeout(showMenu, 5500);
    } else {
        showMenu();
    }

    /*
     * Redirections PWA
     */
    const pwaRoutes = {
        vinyl: "https://minviellesebastien-ctrl.github.io/Vinyl_Collection/",
        evenements: "https://minviellesebastien-ctrl.github.io/Agenda/",
        voyages: "https://minviellesebastien-ctrl.github.io/Mes_Voyages/",
        avenir: "https://minviellesebastien-ctrl.github.io/Avenir/",
        voiture: "https://minviellesebastien-ctrl.github.io/Voiture/"
    };

    Object.keys(pwaRoutes).forEach((id) => {
        const card = document.getElementById(id);
        if (card) {
            card.addEventListener("click", () => {
                window.open(pwaRoutes[id], "_blank");
            });
        }
    });

});

if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker.register("./sw.js");
    });
          }
                          
