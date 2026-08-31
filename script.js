/*
    MON HUB

    Données provisoires.
    Elles seront remplacées plus tard par les données
    récupérées depuis les différentes PWA.
*/


const hubData = {

    patrimoine: {
        valeur: "93,4 k€",
        evolution: "+4,8 %"
    },

    sortie: {
        date: "04 septembre"
    },

    voyage: {
        date: "18 septembre",
        destination: "Londres"
    }

};


/* =========================
   AFFICHAGE PATRIMOINE
========================= */

function afficherPatrimoine() {

    document.querySelector(".total-value").textContent =
        hubData.patrimoine.valeur;

    document.querySelector(".evolution").textContent =
        "↗ " + hubData.patrimoine.evolution;
}


/* =========================
   AFFICHAGE SORTIE
========================= */

function afficherSortie() {

    document.querySelector(".card-small:nth-of-type(2) .date").textContent =
        hubData.sortie.date;
}


/* =========================
   AFFICHAGE VOYAGE
========================= */

function afficherVoyage() {

    const voyageCard =
        document.querySelector(".card-small:nth-of-type(3)");

    voyageCard.querySelector(".date").textContent =
        hubData.voyage.date;

    voyageCard.querySelector(".destination").textContent =
        hubData.voyage.destination;
}


/* =========================
   INITIALISATION
========================= */

function initialiserHub() {

    afficherPatrimoine();
    afficherSortie();
    afficherVoyage();

}


initialiserHub();
