*{
    margin:0;
    padding:0;
    box-sizing:border-box;
    -webkit-tap-highlight-color:transparent;
}

html, body{
    width:100%;
    height:100%;
    overflow:hidden;
    font-family:"Poppins", sans-serif;
    background:#0A0D0F;
    color:#fff;
}

#app{
    width:100%;
    height:100%;
    position:relative;
    overflow:hidden;
    z-index: 2;
}

/* Introduction vidéo */
#intro{
    position:absolute;
    inset:0;
    z-index:10;
    display:flex;
    align-items:center;
    justify-content:center;
    background:#0A0D0F;
    transition: opacity .5s ease, transform .6s ease;
}

#logo-container{
    width:240px;
    height:240px;
}

#intro-video{
    width:100%;
    height:100%;
    object-fit:contain;
}

/* Grille du Menu 3x3 pour laisser la place au centre */
#menu{
    position:absolute;
    inset:0;
    display:grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 1fr);
    gap: 16px;
    padding: 16px;
    opacity: 0;
    transform: scale(.92);
    transition: opacity .3s ease, transform .3s cubic-bezier(.2,.8,.2,1);
}

/* Placement exact des cartes aux 4 coins et au centre + Arrondis spécifiques */
#vinyl { 
    grid-column: 1; 
    grid-row: 1; 
    border-color: #E5A81A;
    border-top-left-radius: 28px;
    border-top-right-radius: 28px;
    border-bottom-left-radius: 28px;
    border-bottom-right-radius: 8px; /* Coin interne adouci */
}
#vinyl svg { fill: #E5A81A; }

#evenements { 
    grid-column: 3; 
    grid-row: 1; 
    border-color: #186BE8;
    border-top-left-radius: 28px;
    border-top-right-radius: 28px;
    border-bottom-left-radius: 8px; /* Coin interne adouci */
    border-bottom-right-radius: 28px;
}
#evenements svg { fill: #186BE8; }

/* La carte Avenir bien centrée au milieu */
#avenir { 
    grid-column: 2; 
    grid-row: 2; 
    border-color: #EB6925;
    border-radius: 20px;
}
#avenir svg { fill: #EB6925; }

#voyages { 
    grid-column: 1; 
    grid-row: 3; 
    border-color: #009E96;
    border-top-left-radius: 28px;
    border-top-right-radius: 8px; /* Coin interne adouci */
    border-bottom-left-radius: 28px;
    border-bottom-right-radius: 28px;
}
#voyages svg { fill: #009E96; }

#voiture { 
    grid-column: 3; 
    grid-row: 3; 
    border-color: #C0C8D0;
    border-top-left-radius: 8px; /* Coin interne adouci */
    border-top-right-radius: 28px;
    border-bottom-left-radius: 28px;
    border-bottom-right-radius: 28px;
}
#voiture svg { fill: #C0C8D0; }

/* Cartes matérialisées avec bordures épaisses */
.pwa-card{
    position:relative;

    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;

    border-radius:28px;

    /* Effet verre dépoli */
    background: rgba(255, 255, 255, 0.08);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    
    border: 1px solid rgba(255, 255, 255, 0.18);
    box-shadow: 0 10px 30px 0 rgba(0, 0, 0, 0.3);

    overflow:hidden;
    cursor:pointer;

    transform:scale(.8);
    opacity:0;

    transition:
        transform .5s cubic-bezier(.2,.8,.2,1),
        opacity .5s ease,
        background .2s ease,
        border-color .2s ease;
}

.pwa-card svg {
    width: 52px;
    height: 52px;
}

.pwa-name {
    font-size: 16px;
    font-weight: 600;
    letter-spacing: .5px;
}

/* Transitions du menu après vidéo */
body.menu-visible #intro{
    opacity:0;
    transform:scale(1.08);
    pointer-events:none;
}

body.menu-visible #menu{
    opacity:1;
    transform:scale(1);
}

body.menu-visible .pwa-card{
    opacity:1;
    transform:scale(1);
}

/* Enchaînement des 5 cartes en cascade */
body.menu-visible .pwa-card:nth-child(1){ transition-delay:.05s; }
body.menu-visible .pwa-card:nth-child(2){ transition-delay:.10s; }
body.menu-visible .pwa-card:nth-child(3){ transition-delay:.15s; }
body.menu-visible .pwa-card:nth-child(4){ transition-delay:.20s; }
body.menu-visible .pwa-card:nth-child(5){ transition-delay:.25s; }

.pwa-card:active{
    transform:scale(.95);
    background: rgba(255, 255, 255, 0.15);
}
