const nomOurs = obtenirParametre("name");

fetch("http://localhost:3000/api/teddies")
  .then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function(detailPeluche) {
    for (let i in detailPeluche) {
      if (nomOurs == detailPeluche[i].name){
        //Personnalisation de la balise H1
        document.getElementById("h1").textContent = "Ours en peluche : " + nomOurs;
        //Affichage du détail de l'ours en peluche
        carteDetail(detailPeluche[i]);
        }
      }
    })
  .catch(error => alert("Erreur : " + error));

//Récupération du nom de l'ours sur la page de détail
function obtenirParametre (sVar) {
  return unescape(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + escape(sVar).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
  }

//Affichage du détail de l'article dans une carte
function carteDetail(tableau){
  const nouvelleDiv = document.createElement("div");
  let elementMain = document.getElementById("detailOurs");
  elementMain.appendChild(nouvelleDiv);
  nouvelleDiv.classList.add("col-lg-6");
  nouvelleDiv.innerHTML="<div class=\"card mb-4 mb-lg-0 border-primary shadow\"><img class=\"card-img-top\" src=\"" + tableau.imageUrl + "\" alt=\"Ours" + tableau.name + "><div class=\"card-body\"><h5 class=\"card-title\">" + tableau.name + " " + affichagePrix(tableau.price) + "</h5><p class=\"card-text\">" + tableau.description + "</p><label for=\"choixCouleur\">Choix de couleur : </label><select name=\"choixCouleur\" id=\"colorChoice\"></select><a href=\"panier.html\" class=\"btn btn-primary\">Ajouter au panier</a></div></div>";
  let choixCouleur = document.getElementById("colorChoice");
  let listeCouleurs ="";
  for (let i in tableau.colors) {
    listeCouleurs+="<option value=\"" + tableau.colors[i] + "\">" + tableau.colors[i] + "</option>";
    }
    choixCouleur.innerHTML=listeCouleurs;
  }

function affichagePrix (prix){
  return prix /100 + " €";
  }