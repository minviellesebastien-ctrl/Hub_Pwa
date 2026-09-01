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
            "HUB : erreur de chargement",
            erreur
        );

    }

}


/* =========================
   PATRIMOINE
========================= */

function afficherPatrimoine(patrimoine) {

    if (!patrimoine) return;


    const valeur =
        document.querySelector(".total-value");

    const evolution =
        document.querySelector(".evolution");


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
   SORTIE
========================= */

function afficherSortie(sortie) {

    const cartes =
        document.querySelectorAll(".card-small");


    if (cartes.length < 1 || !sortie) return;


    const carte =
        cartes[0];


    const dateElement =
        carte.querySelector(".date");

    const destinationElement =
        carte.querySelector(".destination");

    const countdownElement =
        carte.querySelector(".countdown");


    /* DATE */

    if (dateElement) {

        dateElement.textContent =
            formaterDate(sortie.date);

    }


    /* ÉVÉNEMENT */

    if (destinationElement) {

        destinationElement.textContent =
            sortie.evenement || "";

    }


    /* COUNTDOWN */

    if (countdownElement) {

        countdownElement.textContent =
            calculerJours(sortie.date);

    }

}


/* =========================
   VOYAGE
========================= */

function afficherVoyage(voyage) {

    const cartes =
        document.querySelectorAll(".card-small");


    if (cartes.length < 2 || !voyage) return;


    const carte =
        cartes[1];


    const dateElement =
        carte.querySelector(".date");

    const destinationElement =
        carte.querySelector(".destination");

    const countdownElement =
        carte.querySelector(".countdown");


    /* DATE */

    if (dateElement) {

        dateElement.textContent =
            formaterMois(voyage.date);

    }


    /* DESTINATION */

    if (destinationElement) {

        destinationElement.textContent =
            voyage.destination || "";

    }


    /* COUNTDOWN */

    if (countdownElement) {

        countdownElement.textContent =
            calculerMois(voyage.date);

    }

}


/* =========================
   FORMAT DATE SORTIE
========================= */

function formaterDate(date) {

    if (!date) return "";


    const d =
        new Date(date + "T00:00:00");


    if (isNaN(d)) return "";


    return d.toLocaleDateString(
        "fr-FR",
        {
            day: "2-digit",
            month: "long"
        }
    );

}


/* =========================
   FORMAT MOIS VOYAGE
========================= */

function formaterMois(date) {

    if (!date) return "";


    const morceaux =
        date.split("-");


    if (morceaux.length !== 2) return "";


    const annee =
        Number(morceaux[0]);

    const mois =
        Number(morceaux[1]);


    const d =
        new Date(
            annee,
            mois - 1,
            1
        );


    return d.toLocaleDateString(
        "fr-FR",
        {
            month: "long",
            year: "numeric"
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
        0, 0, 0, 0
    );


    const evenement =
        new Date(
            date + "T00:00:00"
        );


    if (isNaN(evenement)) return "";


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


    return "dans " + jours + " jours";

}


/* =========================
   COUNTDOWN MOIS
========================= */

function calculerMois(date) {

    if (!date) return "";


    const morceaux =
        date.split("-");


    if (morceaux.length !== 2) return "";


    const annee =
        Number(morceaux[0]);

    const mois =
        Number(morceaux[1]);


    const maintenant =
        new Date();


    const moisActuel =
        maintenant.getFullYear() * 12 +
        maintenant.getMonth();


    const moisVoyage =
        annee * 12 +
        (mois - 1);


    const difference =
        moisVoyage - moisActuel;


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
   INITIALISATION
========================= */

chargerHubData();
