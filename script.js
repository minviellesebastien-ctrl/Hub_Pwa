/*
    MON HUB
    Données provisoires

    Plus tard :
    - récupérer le patrimoine depuis la PWA patrimoine
    - récupérer la prochaine sortie depuis la PWA sorties
    - récupérer le prochain voyage depuis la PWA voyages
*/


// =========================
// DONNÉES DE DÉMONSTRATION
// =========================

const hubData = {

    patrimoine: {
        valeur: "93,4 k€",
        evolution: "+4,8 %"
    },

    sortie: {
        date: "04 septembre"
    },

    voyage: {
        date: "18 septembre"
    }

};


// =========================
// CALCUL DU COMPTEUR
// =========================

function calculerJours(date) {

    const maintenant = new Date();

    const difference = date - maintenant;

    const jours = Math.ceil(
        difference / (1000 * 60 * 60 * 24)
    );

    return Math.max(0, jours);
}


// =========================
// INITIALISATION
// =========================

function initialiserHub() {

    document.querySelector(".total-value").textContent =
        hubData.patrimoine.valeur;

    document.querySelector(".evolution").textContent =
        "↗ " + hubData.patrimoine.evolution;

    console.log("Hub initialisé");
}


initialiserHub();
