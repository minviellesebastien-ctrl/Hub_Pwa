/*
    MON HUB

    DONNÉES LOCALES
    SAISIE MANUELLE
*/


/* =========================
   STOCKAGE
========================= */

const STORAGE_KEY = "hub-donnees";


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
   CHARGEMENT
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
   SAUVEGARDE
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


    if (valeur >= 1000) {

        return (
            (valeur / 1000)
                .toFixed(1)
                .replace(".", ",")
            + " k"
        );

    }


    return valeur.toLocaleString(
        "fr-FR"
    );

}


/* =========================
   AFFICHER PATRIMOINE
========================= */

function afficherPatrimoine(patrimoine) {

    if (!patrimoine) return;


    const valeurElement =
        document.querySelector(
            ".total-value"
        );

    const evolutionElement =
        document.querySelector(
            ".evolution"
        );


    const actuelle =
        Number(
            patrimoine.valeur
        );

    const reference =
        Number(
            patrimoine.reference
        );


    if (valeurElement) {

        valeurElement.textContent =
            formaterPatrimoine(
                actuelle
            );

    }


    if (!evolutionElement) {
        return;
    }


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
            evolution
                .toFixed(1)
                .replace(".", ",") +
            " %";

    } else if (evolution < 0) {

        evolutionElement.textContent =
            "↘ " +
            evolution
                .toFixed(1)
                .replace(".", ",") +
            " %";

    } else {

        evolutionElement.textContent =
            "0 %";

    }

}


/* =========================
   CONVERSION SORTIE
   JJMMAA
========================= */

function convertirDateSortie(texte) {

    if (!texte) return "";


    const chiffres =
        texte.replace(/\D/g, "");


    if (chiffres.length !== 6) {
        return "";
    }


    const jour =
        Number(
            chiffres.substring(0, 2)
        );

    const mois =
        Number(
            chiffres.substring(2, 4)
        );

    let annee =
        Number(
            chiffres.substring(4, 6)
        );


    /* 26 → 2026 */

    annee += 2000;


    const date =
        new Date(
            annee,
            mois - 1,
            jour
        );


    /* Vérification de la date */

    if (
        date.getFullYear() !== annee ||
        date.getMonth() !== mois - 1 ||
        date.getDate() !== jour
    ) {

        return "";
    }


    return (
        annee +
        "-" +
        String(mois).padStart(2, "0") +
        "-" +
        String(jour).padStart(2, "0")
    );

}


/* =========================
   CONVERSION VOYAGE
   MMAAAA
========================= */

function convertirDateVoyage(texte) {

    if (!texte) return "";


    const chiffres =
        texte.replace(/\D/g, "");


    if (chiffres.length !== 6) {
        return "";
    }


    const mois =
        Number(
            chiffres.substring(0, 2)
        );

    const annee =
        Number(
            chiffres.substring(2, 6)
        );


    if (
        mois < 1 ||
        mois > 12
    ) {

        return "";
    }


    return (
        annee +
        "-" +
        String(mois).padStart(2, "0")
    );

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


    carte.querySelector(".date")
        .textContent =
            formaterDate(
                sortie.date
            );


    carte.querySelector(".destination")
        .textContent =
            sortie.evenement || "";


    carte.querySelector(".countdown")
        .textContent =
            calculerJours(
                sortie.date
            );

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


    carte.querySelector(".date")
        .textContent =
            formaterMois(
                voyage.date
            );


    carte.querySelector(".destination")
        .textContent =
            voyage.destination || "";


    carte.querySelector(".countdown")
        .textContent =
            calculerMois(
                voyage.date
            );

}


/* =========================
   REMPLIR FORMULAIRE
========================= */

function remplirFormulaire(donnees) {

    inputPatrimoine.value =
        donnees.patrimoine.valeur || "";


    /*
       On reconvertit les dates
       stockées en format interne
       vers le format de saisie.
    */

    if (donnees.sortie.date) {

        const morceaux =
            donnees.sortie.date.split("-");

        inputSortieDate.value =
            morceaux[2] +
            morceaux[1] +
            morceaux[0].substring(2);

    } else {

        inputSortieDate.value = "";

    }


    inputSortieEvenement.value =
        donnees.sortie.evenement || "";


    if (donnees.voyage.date) {

        const morceaux =
            donnees.voyage.date.split("-");

        inputVoyageDate.value =
            morceaux[1] +
            morceaux[0];

    } else {

        inputVoyageDate.value = "";

    }


    inputVoyageDestination.value =
        donnees.voyage.destination || "";

}


/* =========================
   OUVRIR
========================= */

btnEdition.addEventListener(
    "click",
    () => {

        remplirFormulaire(
            chargerDonnees()
        );

        edition.classList.add(
            "active"
        );

    }
);


/* =========================
   FERMER
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
   FERMER DEHORS
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
           Si le patrimoine change,
           l'ancienne valeur devient
           la nouvelle référence.
        */

        if (
            Number.isFinite(nouvelleValeur) &&
            nouvelleValeur !== ancienneValeur
        ) {

            reference =
                ancienneValeur;

        }


        /* =========================
           DATES
        ========================= */

        const dateSortie =
            convertirDateSortie(
                inputSortieDate.value
            );


        const dateVoyage =
            convertirDateVoyage(
                inputVoyageDate.value
            );


        /* =========================
           DONNÉES
        ========================= */

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
                    dateSortie,

                evenement:
                    inputSortieEvenement.value
                        .trim()

            },


            voyage: {

                date:
                    dateVoyage,

                destination:
                    inputVoyageDestination.value
                        .trim()

            }

        };


        /* =========================
           SAUVEGARDE
        ========================= */

        sauvegarderDonnees(
            donnees
        );


        /* =========================
           AFFICHAGE
        ========================= */

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
