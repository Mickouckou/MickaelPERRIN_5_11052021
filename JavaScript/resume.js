let contact = JSON.parse(localStorage.getItem("Contact"));
let products = JSON.parse(localStorage.getItem("Produits"));
let total = JSON.parse(localStorage.getItem("Total"));

//Création d'un objet commande         
let commande = {
    contact, 
    products
    }

//Appel de la fonction qui permet l'envoi de la commande seulsement si des données sont dans le localStorage     
if (contact != null && products != null){
    envoiDonnees(commande);
}else{
    document.location.replace("index.html");
}

/*--------FONCTIONS----------*/
//Envoi de la requête POST
function envoiDonnees(commande){
    commande = JSON.stringify(commande);
    fetch("http://localhost:3000/api/teddies/order", {
	    method: "POST",
	    headers: { 
            'Accept': 'application/json', 
            'Content-Type': 'application/json' 
        },
	    body: commande  
    })
    .then(function(res) {
        if (res.ok) {
          return res.json();
        }
      })
    .then(function(resultat) {  
        affichageReponse(resultat);
    })
    .catch(error => alert("Erreur : " + error));  
}

//On affiche le retour aux clients et on vide le localStorage
function affichageReponse (resultat){
    document
        .getElementById("h1")
        .innerHTML = "Merci " + resultat.contact.firstName + " " + resultat.contact.lastName;

    let affichageResultat = "<p>Votre commande de <strong>";
    if (resultat.products.length === 1){
        affichageResultat += resultat.products.length + " article";
    }else{
        affichageResultat += resultat.products.length + " articles";
    }
    affichageResultat += "</strong> a bien été prise en compte sous le numéro : <strong>" + resultat.orderId + "</strong> pour un montant total de <strong>" + new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(total/100) +"</strong>.";
    affichageResultat += "<br>Elle vous sera livrée rapidement à l'adresse <strong>" + resultat.contact.address + ", " + resultat.contact.city + "</strong>.</p>";
    document
        .getElementById("resume")
        .innerHTML = affichageResultat;
    console.log(resultat.contact.firstName);
    localStorage.clear();
}