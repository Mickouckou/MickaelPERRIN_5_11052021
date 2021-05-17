//import affichageCarte from './function.js';

fetch("http://localhost:3000/api/teddies")
  .then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function(peluche) {
    for (let i in peluche) {
      affichageCarte(peluche[i]);
      }
    })
  .catch(error => alert("Erreur : " + error));

//Affiche correctement le prix renvoyé par l'API
function affichagePrix (prix){
  /*const prixCorrect = prix / 100;
  return prixCorrect + " €";*/
  return prix /100 + " €";
  }

//Affichage des cartes produits sur la page Index du site
function affichageCarte(tableau){
  const nouvelleDiv = document.createElement("div");
  let elementMain = document.getElementById("affichage");
  elementMain.appendChild(nouvelleDiv);
  nouvelleDiv.classList.add("col-12");
  nouvelleDiv.classList.add("col-md-6");
  nouvelleDiv.classList.add("col-lg-4");
  nouvelleDiv.classList.add("mt-5");
  nouvelleDiv.innerHTML="<div class=\"card mb-4 mb-lg-0 border-primary shadow\"><img class=\"card-img-top\" src=\"" + tableau.imageUrl + "\" alt=\"Ours" + tableau.name + "><div class=\"card-body\"><h5 class=\"card-title\">" + tableau.name + " " + affichagePrix(tableau.price) + "</h5><p class=\"card-text\">" + tableau.description + "</p><a href=\"detail.html?name=" + tableau.name + "\" class=\"btn btn-primary stretched-link\">Détails Ours " + tableau.name + "</a></div></div>";
  }