let nomOurs = obtenirParametre("ours");
let prixOurs = obtenirParametre("prix");
let idOurs = obtenirParametre("id");
let indice;
let product_id = [];

//Récupération des données en paramètre
function obtenirParametre (sVar) {
  return unescape(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + escape(sVar).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
}

indice = localStorage.length/3;

//On stocke dans le localStorage les valeurs nomOurs, prixOurs et idOurs
if (nomOurs != "" && prixOurs != ""){
    localStorage.setItem('article'+indice, nomOurs);
    localStorage.setItem('prix'+indice, prixOurs);
    localStorage.setItem('id'+indice, idOurs);
    //console.log("Ajout de l'article : " + nomOurs + " indice : " + indice);
}


//On affiche les éléments du panier
indice = localStorage.length/3;
const nouvelleDiv = document.createElement("div");
let elementMain = document.getElementById("contenuPanier");
elementMain.appendChild(nouvelleDiv);
let articlePanier = "<table>";
let total = 0;
//on teste si le panier est vide
if (indice == 0){
    articlePanier += "Votre panier est vide";
    //on désactive le bouton vider le panier
    let videPanier = document.getElementById("videPanier");
    videPanier.setAttribute('disabled', 'true');
    }
else{
    for (let i=0; i<indice; i++) {
        let nomArticle = localStorage.getItem('article'+i);
        let prixArticle = localStorage.getItem('prix'+i);
        product_id.push(localStorage.getItem('id'+i));
        articlePanier+="<tr><td>" + nomArticle + "</td><td>" + new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(prixArticle/100) +"</td></tr>";
        total += parseInt(prixArticle);
    }
}
articlePanier += "<tr><td colspan=\"2\"><strong>Total : " + new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(total/100) + "</strong></td></table>";
nouvelleDiv.innerHTML= articlePanier;


//Bouton pour vider le panier
let videPanier = document.getElementById("videPanier");
videPanier.addEventListener('click', function(event) {
    event.stopPropagation();
    localStorage.clear();
    document.location.replace("panier.html");
});

console.log("longueur tableau id : " + product_id.length);