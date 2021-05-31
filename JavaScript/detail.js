const idOurs = obtenirParametre("id");
let contenuPanier;

fetch("http://localhost:3000/api/teddies/" + idOurs)
  .then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function(detailPeluche) {
    //Personnalisation de la balise H1
    document.getElementById("h1").textContent = "Ours en peluche : " + detailPeluche.name;
    //Affichage du détail de l'ours en peluche
    carteDetail(detailPeluche);
    })
  .catch(error => alert("Erreur : " + error));


/*--------FONCTIONS----------*/
//Récupération de l'id de l'ours sur la page de détail
function obtenirParametre (sVar) {
  return unescape(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + escape(sVar).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
  }

//Affichage du détail de l'article dans une carte
function carteDetail(tableau){
  const nouvelleDiv = document.createElement("div");
  let elementMain = document.getElementById("detailOurs");
  elementMain.appendChild(nouvelleDiv);
  nouvelleDiv.classList.add("col-lg-6");
  nouvelleDiv.innerHTML="<div class=\"card mb-4 mb-lg-0 border-primary shadow\"><img class=\"card-img-top\" src=\"" + tableau.imageUrl + "\" alt=\"Ours" + tableau.name + "><div class=\"card-body\"><h5 class=\"card-title\">" + tableau.name + " " + new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(tableau.price/100) + "</h5><p class=\"card-text\">" + tableau.description + "</p><label class=\"detailCouleur\" for=\"choixCouleur\">Choix de couleur : <select name=\"choixCouleur\" id=\"colorChoice\"></select></label><a href=\"panier.html\" id=\"ajoutPanier\" class=\"btn btn-primary\">Ajouter au panier</a></div></div>";
  let choixCouleur = document.getElementById("colorChoice");
  let listeCouleurs ="";
  for (let i in tableau.colors) {
    listeCouleurs+="<option value=\"" + tableau.colors[i] + "\">" + tableau.colors[i] + "</option>";
    }
  choixCouleur.innerHTML=listeCouleurs;
  ajouterPanier(tableau);
  }

//Stocke dans le localStorage si l'on clique sur Ajouter au panier
function ajouterPanier(detail){
  let ajoutPanier = document.getElementById("ajoutPanier");
  ajoutPanier.addEventListener('click', function(event) {
    //on teste si le panier est vide ou pas
    if (localStorage.getItem('panier') != null)
      {contenuPanier = JSON.parse(localStorage.getItem('panier'));}
    else
      {contenuPanier = [];}
    contenuPanier.push(detail._id, detail.name, detail.price);
    contenuPanier = JSON.stringify(contenuPanier);
    localStorage.setItem('panier', contenuPanier);
  });
}