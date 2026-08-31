/*
    MON HUB

    TEST DE SYNCHRONISATION
    Mes_Voyages → Hub
*/


const hubData = {

    patrimoine: {
        valeur: "93,4 k",
        evolution: "+4,8 %"
    },

    sortie: {
        date: "04 septembre"
    },

    voyage: {
        date: "",
        destination: ""
    }

};


/* =========================
   AFFICHAGE PATRIMOINE
========================= */

function afficherPatrimoine() {

    const valeur =
        document.querySelector(".total-value");

    const evolution =
        document.querySelector(".evolution");

    if (valeur) {
        valeur.textContent =
            hubData.patrimoine.valeur;
    }

    if (evolution) {
        evolution.textContent =
            "↗ " + hubData.patrimoine.evolution;
    }
}


/* =========================
   AFFICHAGE SORTIE
========================= */

function afficherSortie() {

    const cartes =
        document.querySelectorAll(".card-small");

    if (cartes.length < 1) return;

    const carteSortie = cartes[0];

    const date =
        carteSortie.querySelector(".date");

    if (date) {
        date.textContent =
            hubData.sortie.date;
    }
}


/* =========================
   TEST MES_VOYAGES
========================= */

function testerMesVoyages() {

    const cartes =
        document.querySelectorAll(".card-small");

    if (cartes.length < 2) {

        console.log(
            "TEST HUB : carte Voyage introuvable."
        );

        return;

    }

    const carteVoyage = cartes[1];

    const date =
        carteVoyage.querySelector(".date");

    const destination =
        carteVoyage.querySelector(".destination");


    /* =========================
       LECTURE LOCALSTORAGE
    ========================= */

    let donnees = null;

    try {

        donnees =
            localStorage.getItem("mes-voyages");

    } catch (erreur) {

        console.error(
            "TEST HUB : erreur localStorage",
            erreur
        );

    }


    /* =========================
       AUCUNE DONNÉE
    ========================= */

    if (!donnees) {

        console.log(
            "TEST HUB : ❌ aucune donnée trouvée avec la clé mes-voyages."
        );

        if (date) {
            date.textContent = "TEST : aucune donnée";
        }

        if (destination) {
            destination.textContent =
                "Hub ne voit pas Mes_Voyages";
        }

        return;
    }


    /* =========================
       DONNÉES TROUVÉES
    ========================= */

    console.log(
        "TEST HUB : ✅ données mes-voyages trouvées :",
        donnees
    );


    let voyages;

    try {

        voyages =
            JSON.parse(donnees);

    } catch (erreur) {

        console.error(
            "TEST HUB : ❌ impossible de lire le JSON.",
            erreur
        );

        if (date) {
            date.textContent = "TEST : erreur";
        }

        if (destination) {
            destination.textContent =
                "JSON invalide";
        }

        return;
    }


    /* =========================
       VÉRIFIER LE TABLEAU
    ========================= */

    if (!Array.isArray(voyages)) {

        console.error(
            "TEST HUB : ❌ mes-voyages n'est pas un tableau.",
            voyages
        );

        if (date) {
            date.textContent = "TEST : erreur";
        }

        if (destination) {
            destination.textContent =
                "Format incorrect";
        }

        return;
    }


    console.log(
        "TEST HUB : ✅ nombre de voyages :",
        voyages.length
    );


    /* =========================
       AFFICHER LE PREMIER VOYAGE
       UNIQUEMENT POUR LE TEST
    ========================= */

    if (voyages.length === 0) {

        if (date) {
            date.textContent = "Aucun voyage";
        }

        if (destination) {
            destination.textContent =
                "Liste vide";
        }

        return;
    }


    const voyage = voyages[0];


    console.log(
        "TEST HUB : premier voyage :",
        voyage
    );


    if (date) {

        date.textContent =
            voyage.date || "";

    }


    if (destination) {

        destination.textContent =
            voyage.ville ||
            voyage.pays ||
            "";

    }

}


/* =========================
   INITIALISATION
========================= */

function initialiserHub() {

    afficherPatrimoine();

    afficherSortie();

    testerMesVoyages();

}


initialiserHub();
