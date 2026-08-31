/*
    MON HUB

    Les données sont récupérées directement
    depuis les différentes PWA.
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
   ANALYSER DATE VOYAGE
========================= */

function analyserDateVoyage(dateTexte) {

    if (!dateTexte) return null;

    const mois = {

        janvier: 0,
        fevrier: 1,
        février: 1,
        mars: 2,
        avril: 3,
        mai: 4,
        juin: 5,
        juillet: 6,
        aout: 7,
        août: 7,
        septembre: 8,
        octobre: 9,
        novembre: 10,
        decembre: 11,
        décembre: 11

    };

    const texte = dateTexte
        .trim()
        .toLowerCase()
        .replace(/\s+/g, " ");


    /* 10-15 août 2026 */

    let m = texte.match(
        /^(\d{1,2})\s*[-–—]\s*(\d{1,2})\s+([a-zàâäéèêëîïôöùûüÿç]+)\s+(\d{4})$/
    );

    if (m && mois[m[3]] !== undefined) {

        const debut = new Date(
            Number(m[4]),
            mois[m[3]],
            Number(m[1])
        );

        const fin = new Date(
            Number(m[4]),
            mois[m[3]],
            Number(m[2])
        );

        return {
            debut,
            fin
        };
    }


    /* 10 août 2026 */

    m = texte.match(
        /^(\d{1,2})\s+([a-zàâäéèêëîïôöùûüÿç]+)\s+(\d{4})$/
    );

    if (m && mois[m[2]] !== undefined) {

        const date = new Date(
            Number(m[3]),
            mois[m[2]],
            Number(m[1])
        );

        return {
            debut: date,
            fin: date
        };
    }


    /* août 2026 */

    m = texte.match(
        /^([a-zàâäéèêëîïôöùûüÿç]+)\s+(\d{4})$/
    );

    if (m && mois[m[1]] !== undefined) {

        const debut = new Date(
            Number(m[2]),
            mois[m[1]],
            1
        );

        const fin = new Date(
            Number(m[2]),
            mois[m[1]] + 1,
            0
        );

        return {
            debut,
            fin
        };
    }


    /* 10/08/2026 */

    m = texte.match(
        /^(\d{1,2})[\/-](\d{1,2})[\/-](\d{4})$/
    );

    if (m) {

        const date = new Date(
            Number(m[3]),
            Number(m[2]) - 1,
            Number(m[1])
        );

        return {
            debut: date,
            fin: date
        };
    }


    return null;
}


/* =========================
   TROUVER LE VOYAGE
========================= */

function trouverProchainVoyage(voyages) {

    const aujourdHui = new Date();

    const valides = voyages
        .map(voyage => ({

            voyage,

            dates:
                analyserDateVoyage(voyage.date)

        }))
        .filter(x => x.dates !== null);


    /* Voyage actuellement en cours */

    const enCours = valides
        .filter(x =>
            aujourdHui >= x.dates.debut &&
            aujourdHui <= x.dates.fin
        )
        .sort(
            (a, b) =>
                a.dates.debut - b.dates.debut
        );


    if (enCours.length) {

        return enCours[0].voyage;

    }


    /* Sinon : prochain voyage */

    const prochains = valides
        .filter(x =>
            x.dates.debut > aujourdHui
        )
        .sort(
            (a, b) =>
                a.dates.debut - b.dates.debut
        );


    if (prochains.length) {

        return prochains[0].voyage;

    }


    return null;
}


/* =========================
   RÉCUPÉRER VOYAGES
========================= */

function recupererVoyage() {

    try {

        const donnees =
            localStorage.getItem("mes-voyages");

        if (!donnees) {

            return null;

        }

        const voyages =
            JSON.parse(donnees);

        if (!Array.isArray(voyages)) {

            return null;

        }

        return trouverProchainVoyage(voyages);

    } catch (erreur) {

        console.error(
            "Impossible de récupérer les voyages :",
            erreur
        );

        return null;
    }
}


/* =========================
   AFFICHAGE VOYAGE
========================= */

function afficherVoyage() {

    const voyageCard =
        document.querySelector(
            ".card-small:nth-of-type(3)"
        );


    const voyage =
        recupererVoyage();


    if (!voyage) {

        voyageCard.querySelector(".date").textContent =
            "";

        voyageCard.querySelector(".destination").textContent =
            "Aucun voyage";

        return;
    }


    voyageCard.querySelector(".date").textContent =
        voyage.date || "";

    voyageCard.querySelector(".destination").textContent =
        voyage.ville ||
        voyage.pays ||
        "";

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
