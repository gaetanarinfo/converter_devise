// L'url ou nous allons chercher le json

const requeteURL = 'currentprice.json';

// Pour créé une requete nous avons besoin d'instancier notre objet 'XMLHttpRequest'

const requete = new XMLHttpRequest();

// On ouvre la requete

requete.open('GET', requeteURL);

// On donne le type ou format de la requete

requete.responseType = 'json';

// Demande de requete autoload
requete.onload = () => {
    // Définition de la vairiable date
    var currentMonaie = requete.response;
    //On execute getMonaie et on lui donne des datas
    getMonaie(currentMonaie);
    getConvert(currentMonaie);
    // Un petit log
    console.log(currentMonaie);
}

// On propulse la requete

requete.send();

// On récupère ici les ids pour y mettre les résultats

const priceDiv = document.getElementById('prix');

// On crée les fonctions : getMonais & getConvert

function getMonaie(currentMonaie) {
    // On déclare nos variable = au prix renvoyer par l'objet currentMonaie
    let USD = currentMonaie.bpi.USD.rate,
        EUR = currentMonaie.bpi.EUR.rate,
        DINAR = currentMonaie.bpi.DINAR.rate;

    // On déclare notre variable qui est la création d'un H4
    const prix = `
    <h4 id="priceUSD">` + USD + `</h4>
    <h4 id="priceEUR">` + EUR + `</h4>
    <h4 id="priceDINAR">` + DINAR + `</h4>
    `

    priceDiv.innerHTML = prix;
}

// Récupération des valeurs pour les calculers

function getConvert(currentMonaie) {

    //Déclaration pour les récupérations des IDS
    const btc = document.getElementById('btc'),
        usd = document.getElementById('usd'),
        eur = document.getElementById('eur'),
        dinar = document.getElementById('dinar');

    // Demande d'écoute sur l'évènement input
    btc.addEventListener("input", function() {
        getResultat(this.id, this.value, currentMonaie);
    });

    usd.addEventListener("input", function() {
        getResultat(this.id, this.value, currentMonaie);
    });

    eur.addEventListener("input", function() {
        getResultat(this.id, this.value, currentMonaie);
    });

    dinar.addEventListener("input", function() {
        getResultat(this.id, this.value, currentMonaie);
    });

}

function getResultat(id, valeur, currentMonaie) {
    const ratioUsdEur = currentMonaie.bpi.USD.rate_float / currentMonaie.bpi.EUR.rate_float,
        ratioUsdDinar = currentMonaie.bpi.USD.rate_float / currentMonaie.bpi.DINAR.rate_float;


    if (id == "btc") {

        usd.value = valeur * currentMonaie.bpi.USD.rate_float;
        eur.value = valeur * currentMonaie.bpi.EUR.rate_float;
        dinar.value = valeur * currentMonaie.bpi.DINAR.rate_float;

    } else if (id == "usd") {

        btc.value = valeur / currentMonaie.bpi.USD.rate_float;
        eur.value = valeur / ratioUsdEur;
        dinar.value = valeur / ratioUsdDinar;

    } else if (id == "eur") {
        btc.value = valeur / currentMonaie.bpi.EUR.rate_float;
        usd.value = valeur * ratioUsdEur;
        dinar.value = valeur / ratioUsdDinar;
    } else if (id == "dinar") {
        btc.value = valeur / currentMonaie.bpi.EUR.rate_float;
        usd.value = valeur * ratioUsdEur;
        dinar.value = valeur / ratioUsdEur;
    }

}