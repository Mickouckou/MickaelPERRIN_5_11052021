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

//Affichage des cartes produits sur la page Index du site
function affichageCarte(tableau){
  const nouvelleDiv = document.createElement("div");
  let elementMain = document.getElementById("affichage");
  elementMain.appendChild(nouvelleDiv);
  nouvelleDiv.classList.add("col-12", "col-md-6", "col-lg-4", "mt-5");
  nouvelleDiv.innerHTML="<div class=\"card mb-4 mb-lg-0 border-primary shadow\"><img class=\"card-img-top\" src=\"" + tableau.imageUrl + "\" alt=\"Ours" + tableau.name + "><div class=\"card-body\"><h5 class=\"card-title\">" + tableau.name + " " + new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(tableau.price/100) + "</h5><p class=\"card-text\">" + tableau.description + "</p><a href=\"detail.html?id=" + tableau._id + "\" class=\"btn btn-primary stretched-link\">Détails Ours " + tableau.name + "</a></div></div>";
  }

/*//Affiche correctement le prix renvoyé par l'API
function affichagePrix (prix){
  return prix /100 + " €";
  }*/  