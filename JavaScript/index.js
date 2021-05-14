fetch("http://localhost:3000/api/teddies")
  .then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function(peluche) {
    /*console.log("Peluche 1 : " + peluche[0].name + " " + affichagePrix(peluche[0].price) + " " + peluche[0].description + " " + peluche[0].imageUrl);*/
    affichageCarte(peluche[0]);
    affichageCarte(peluche[1]);
    affichageCarte(peluche[2]);
    affichageCarte(peluche[3]);
    affichageCarte(peluche[4]);
    /*console.log("Peluche 2 : " + peluche[1].name + " " + affichagePrix(peluche[1].price) + " " + peluche[1].description + " " + peluche[1].imageUrl);
    console.log("Peluche 3 : " + peluche[2].name + " " + affichagePrix(peluche[2].price) + " " + peluche[2].description + " " + peluche[2].imageUrl);
    console.log("Peluche 4 : " + peluche[3].name + " " + affichagePrix(peluche[3].price) + " " + peluche[3].description + " " + peluche[3].imageUrl);
    console.log("Peluche 5 : " + peluche[4].name + " " + affichagePrix(peluche[4].price) + " " + peluche[4].description + " " + peluche[4].imageUrl);*/
  })
  .catch(error => alert("Erreur : " + error));

function affichagePrix (prix){
  /*const prixCorrect = prix / 100;
  return prixCorrect + " €";*/
  return prix /100 + " €";
  }

function affichageCarte(tableau){
  const nouvelleDiv = document.createElement("div");
  let elementMain = document.getElementById("affichage");
  elementMain.appendChild(nouvelleDiv);
  nouvelleDiv.classList.add("col-12");
  nouvelleDiv.classList.add("col-md-6");
  nouvelleDiv.classList.add("col-lg-4");

  //nouvelleDiv.innerHTML="<img class=\"card-img-top\" src=\"" + tableau.imageUrl + "\" alt=\"Ours" + tableau.name +"\"> Nom : " + tableau.name + "; Prix : " + affichagePrix(tableau.price) + "; Description : " + tableau.description;
  nouvelleDiv.innerHTML="<div class=\"card mb-4 mb-lg-0 border-info shadow\"><img class=\"card-img-top\" src=\"" + tableau.imageUrl + "\" alt=\"Ours" + tableau.name + "><div class=\"card-body\"><h5 class=\"card-title\">" + tableau.name + " " + affichagePrix(tableau.price) + "</h5><p class=\"card-text\">" + tableau.description + "</p></div></div>";
}