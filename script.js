/*
    MON HUB

    DONNÉES CENTRALISÉES
    GitHub → hub-data.json
*/


const URL_HUB_DATA =
    "https://minviellesebastien-ctrl.github.io/Hub_Pwa/hub-data.json";


/* =========================
   CHARGEMENT DES DONNÉES
========================= */

async function chargerHubData() {

    document.querySelector(".destination").textContent = "TEST HUB";
    try {

        const reponse = await fetch(
            URL_HUB_DATA + "?t=" + Date.now()
        );

        if (!reponse.ok) {
            throw new Error(
                "Impossible de charger hub-data.json"
            );
        }

        const hubData =
            await reponse.json();

        console.log(
            "HUB : ✅ données GitHub chargées",
            hubData
        );

        afficherPatrimoine(
            hubData.patrimoine
        );

        afficherSortie(
            hubData.sortie
        );

        afficherVoyage(
            hubData.voyage
        );

    } catch (erreur) {

        console.error(
            "HUB : ❌ erreur de chargement",
            erreur
        );

    }

}


/* =========================
   AFFICHAGE PATRIMOINE
========================= */

function afficherPatrimoine(patrimoine) {

    const valeur =
        document.querySelector(".total-value");

    const evolution =
        document.querySelector(".evolution");


    if (!patrimoine) return;


    if (valeur) {

        valeur.textContent =
            patrimoine.valeur || "";

    }


    if (evolution) {

        evolution.textContent =
            "↗ " +
            (patrimoine.evolution || "");

    }

}


/* =========================
   AFFICHAGE SORTIE
========================= */

function afficherSortie(sortie) {

    const cartes =
        document.querySelectorAll(".card-small");


    if (cartes.length < 1) return;


    const carteSortie =
        cartes[0];


    const date =
        carteSortie.querySelector(".date");


    if (date && sortie) {

        date.textContent =
            sortie.date || "";

    }

}


/* =========================
   AFFICHAGE VOYAGE
========================= */

function afficherVoyage(voyage) {

    const cartes =
        document.querySelectorAll(".card-small");


    if (cartes.length < 2) return;


    const carteVoyage =
        cartes[1];


    const date =
        carteVoyage.querySelector(".date");

    const destination =
        carteVoyage.querySelector(".destination");


    if (!voyage) return;


    if (date) {

        date.textContent =
            voyage.date || "";

    }


    if (destination) {

        destination.textContent =
            voyage.destination || "";

    }

}


/* =========================
   INITIALISATION
========================= */

chargerHubData();
