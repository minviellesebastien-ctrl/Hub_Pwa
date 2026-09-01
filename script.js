/*
    MON HUB

    DONNÉES LOCALES
    Saisie manuelle
*/


/* =========================
   STOCKAGE
========================= */

const STORAGE_KEY =
    "hub-donnees";


/* =========================
   ÉLÉMENTS
========================= */

const btnEdition =
    document.getElementById("btnEdition");

const btnFermer =
    document.getElementById("btnFermer");

const edition =
    document.getElementById("edition");

const btnEnregistrer =
    document.getElementById("btnEnregistrer");


const inputPatrimoine =
    document.getElementById("inputPatrimoine");

const inputSortieDate =
    document.getElementById("inputSortieDate");

const inputSortieEvenement =
    document.getElementById("inputSortieEvenement");

const inputVoyageDate =
    document.getElementById("inputVoyageDate");

const inputVoyageDestination =
    document.getElementById("inputVoyageDestination");


/* =========================
   DONNÉES PAR DÉFAUT
========================= */

const donneesParDefaut = {

    patrimoine: {
        valeur: 93400,
        reference: 93400
    },

    sortie: {
        date: "",
        evenement: ""
    },

    voyage: {
        date: "",
        destination: ""
    }

};


/* =========================
   CHARGER LES DONNÉES
========================= */

function chargerDonnees() {

    const donnees =
        localStorage.getItem(
            STORAGE_KEY
        );


    if (!donnees) {

        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(
                donneesParDefaut
            )
        );

        return donneesParDefaut;
    }


    try {

        return JSON.parse(donnees);

    } catch (erreur) {

        console.error(
            "HUB : données invalides",
            erreur
        );

        return donneesParDefaut;
    }

}


/* =========================
   SAUVEGARDER
========================= */

function sauvegarderDonnees(donnees) {

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(donnees)
    );

}


/* =========================
   FORMAT PATRIMOINE
========================= */

function formaterPatrimoine(valeur) {

    if (!Number.isFinite(valeur)) {
        return "";
    }


    if (valeur >= 100000) {

        return (
            (valeur / 1000)
                .toFixed(1)
                .replace(".", ",")
            + " k"
        );

    }


    return (
        valeur
            .toLocaleString("fr-FR")
    );

}


/* =========================
   AFFICHER PATRIMOINE
========================= */

function afficherPatrimoine(patrimoine) {

    const valeurElement =
        document.querySelector(
            ".total-value"
        );

    const evolutionElement =
        document.querySelector(
            ".evolution"
        );


    if (!patrimoine) return;


    if (valeurElement) {

        valeurElement.textContent =
            formaterPatrimoine(
                patrimoine.valeur
            );

    }


    if (evolutionElement) {

        const actuelle =
            Number(
                patrimoine.valeur
            );

        const reference =
            Number(
                patrimoine.reference
            );


        if (
            !reference ||
            !Number.isFinite(actuelle)
        ) {

            evolutionElement.textContent =
                "0 %";

            return;
        }


        const evolution =
            (
                (actuelle - reference)
                / reference
            ) * 100;


        if (evolution > 0) {

            evolutionElement.textContent =
                "↗ +" +
                evolution.toFixed(1)
                    .replace(".", ",") +
                " %";

        } else if (evolution < 0) {

            evolutionElement.textContent =
                "↘ " +
                evolution.toFixed(1)
                    .replace(".", ",") +
                " %";

        } else {

            evolutionElement.textContent =
                "0 %";

        }

    }

}


/* =========================
   FORMAT DATE SORTIE
========================= */

function formaterDate(date) {

    if (!date) return "";


    const d =
        new Date(
            date + "T00:00:00"
        );


    if (isNaN(d.getTime())) {
        return "";
    }


    return d.toLocaleDateString(
        "fr-FR",
        {
            day: "2-digit",
            month: "long"
        }
    );

}


/* =========================
   COUNTDOWN JOURS
========================= */

function calculerJours(date) {

    if (!date) return "";


    const aujourdHui =
        new Date();

    aujourdHui.setHours(
        0,
        0,
        0,
        0
    );


    const evenement =
        new Date(
            date + "T00:00:00"
        );


    if (isNaN(evenement.getTime())) {
        return "";
    }


    const difference =
        evenement - aujourdHui;


    const jours =
        Math.ceil(
            difference /
            (1000 * 60 * 60 * 24)
        );


    if (jours < 0) {
        return "passé";
    }


    if (jours === 0) {
        return "aujourd'hui";
    }


    if (jours === 1) {
        return "dans 1 jour";
    }


    return "dans " +
        jours +
        " jours";

}


/* =========================
   AFFICHER SORTIE
========================= */

function afficherSortie(sortie) {

    const carte =
        document.querySelectorAll(
            ".card-small"
        )[0];


    if (!carte || !sortie) return;


    const dateElement =
        carte.querySelector(
            ".date"
        );

    const evenementElement =
        carte.querySelector(
            ".destination"
        );

    const countdownElement =
        carte.querySelector(
            ".countdown"
        );


    if (dateElement) {

        dateElement.textContent =
            formaterDate(
                sortie.date
            );

    }


    if (evenementElement) {

        evenementElement.textContent =
            sortie.evenement || "";

    }


    if (countdownElement) {

        countdownElement.textContent =
            calculerJours(
                sortie.date
            );

    }

}


/* =========================
   FORMAT MOIS VOYAGE
========================= */

function formaterMois(date) {

    if (!date) return "";


    const morceaux =
        date.split("-");


    if (morceaux.length !== 2) {
        return "";
    }


    const annee =
        Number(
            morceaux[0]
        );

    const mois =
        Number(
            morceaux[1]
        );


    const d =
        new Date(
            annee,
            mois - 1,
            1
        );


    if (isNaN(d.getTime())) {
        return "";
    }


    return d.toLocaleDateString(
        "fr-FR",
        {
            month: "long",
            year: "numeric"
        }
    );

}


/* =========================
   COUNTDOWN MOIS
========================= */

function calculerMois(date) {

    if (!date) return "";


    const morceaux =
        date.split("-");


    if (morceaux.length !== 2) {
        return "";
    }


    const annee =
        Number(
            morceaux[0]
        );

    const mois =
        Number(
            morceaux[1]
        );


    const maintenant =
        new Date();


    const moisActuel =
        maintenant.getFullYear() * 12 +
        maintenant.getMonth();


    const moisVoyage =
        annee * 12 +
        (mois - 1);


    const difference =
        moisVoyage -
        moisActuel;


    if (difference < 0) {
        return "passé";
    }


    if (difference === 0) {
        return "ce mois-ci";
    }


    if (difference === 1) {
        return "dans 1 mois";
    }


    return "dans " +
        difference +
        " mois";

}


/* =========================
   AFFICHER VOYAGE
========================= */

function afficherVoyage(voyage) {

    const carte =
        document.querySelectorAll(
            ".card-small"
        )[1];


    if (!carte || !voyage) return;


    const dateElement =
        carte.querySelector(
            ".date"
        );

    const destinationElement =
        carte.querySelector(
            ".destination"
        );

    const countdownElement =
        carte.querySelector(
            ".countdown"
        );


    if (dateElement) {

        dateElement.textContent =
            formaterMois(
                voyage.date
            );

    }


    if (destinationElement) {

        destinationElement.textContent =
            voyage.destination || "";

    }


    if (countdownElement) {

        countdownElement.textContent =
            calculerMois(
                voyage.date
            );

    }

}


/* =========================
   REMPLIR LE FORMULAIRE
========================= */

function remplirFormulaire(donnees) {

    inputPatrimoine.value =
        donnees.patrimoine.valeur || "";


    inputSortieDate.value =
        donnees.sortie.date || "";


    inputSortieEvenement.value =
        donnees.sortie.evenement || "";


    inputVoyageDate.value =
        donnees.voyage.date || "";


    inputVoyageDestination.value =
        donnees.voyage.destination || "";

}


/* =========================
   OUVRIR ÉDITION
========================= */

btnEdition.addEventListener(
    "click",
    () => {

        const donnees =
            chargerDonnees();

        remplirFormulaire(
            donnees
        );

        edition.classList.add(
            "active"
        );

    }
);


/* =========================
   FERMER ÉDITION
========================= */

btnFermer.addEventListener(
    "click",
    () => {

        edition.classList.remove(
            "active"
        );

    }
);


/* =========================
   FERMER EN CLIQUANT DEHORS
========================= */

edition.addEventListener(
    "click",
    (e) => {

        if (e.target === edition) {

            edition.classList.remove(
                "active"
            );

        }

    }
);


/* =========================
   ENREGISTRER
========================= */

btnEnregistrer.addEventListener(
    "click",
    () => {

        const anciennesDonnees =
            chargerDonnees();


        const ancienneValeur =
            Number(
                anciennesDonnees
                    .patrimoine
                    .valeur
            );


        const nouvelleValeur =
            Number(
                inputPatrimoine.value
            );


        /* =========================
           PATRIMOINE
        ========================= */

        let reference =
            anciennesDonnees
                .patrimoine
                .reference;


        /*
           Si la valeur change,
           l'ancienne valeur devient
           la référence.
        */

        if (
            Number.isFinite(nouvelleValeur) &&
            nouvelleValeur !== ancienneValeur
        ) {

            reference =
                ancienneValeur;

        }


        const donnees = {

            patrimoine: {

                valeur:
                    Number.isFinite(
                        nouvelleValeur
                    )
                        ? nouvelleValeur
                        : ancienneValeur,

                reference:
                    Number.isFinite(
                        nouvelleValeur
                    )
                        ? reference
                        : ancienneValeur

            },


            sortie: {

                date:
                    inputSortieDate.value,

                evenement:
                    inputSortieEvenement.value
                        .trim()

            },


            voyage: {

                date:
                    inputVoyageDate.value,

                destination:
                    inputVoyageDestination.value
                        .trim()

            }

        };


        sauvegarderDonnees(
            donnees
        );


        /* Affichage immédiat */

        afficherPatrimoine(
            donnees.patrimoine
        );

        afficherSortie(
            donnees.sortie
        );

        afficherVoyage(
            donnees.voyage
        );


        edition.classList.remove(
            "active"
        );

    }
);


/* =========================
   INITIALISATION
========================= */

const donnees =
    chargerDonnees();


afficherPatrimoine(
    donnees.patrimoine
);

afficherSortie(
    donnees.sortie
);

afficherVoyage(
    donnees.voyage
);
