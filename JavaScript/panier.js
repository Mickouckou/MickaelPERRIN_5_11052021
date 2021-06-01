let indice, firstName, lastName, address, city, email, contact;
let products = [];

//On affiche les éléments du panier
indice = localStorage.length;
const nouvelleDiv = document.createElement("div");
let elementMain = document.getElementById("contenuPanier");
elementMain.appendChild(nouvelleDiv);
let articlePanier = "<table>";
let total = 0;
//on teste si le panier est vide
if (indice == 0){
    articlePanier += "Votre panier est vide";
    //on désactive les boutons vider le panier et passer commande
    desactiver("videPanier");
    desactiver("commande");
    }
else{
    let affichagePanier = JSON.parse(localStorage.getItem('panier'));
    for (let i=0; i<affichagePanier.length; i++){
        products.push(affichagePanier[i]);
        i++;
        articlePanier+="<tr><td>" + affichagePanier[i] + "</td><td>";
        i++;
        articlePanier+= new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(affichagePanier[i]/100) +"</td></tr>";
        total += parseInt(affichagePanier[i]);
    }
}
articlePanier += "<tr><td colspan=\"2\"><strong>Total : " + new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(total/100) + "</strong></td></table>";
nouvelleDiv.innerHTML= articlePanier;

//Bouton pour vider le panier
let videPanier = document.getElementById("videPanier");
videPanier.addEventListener('click', function(event) {
    localStorage.clear();
    document.location.replace("panier.html");
});

//On écoute le clic sur le bouton passer commande
let clicCommande = document.getElementById("commande");
clicCommande.addEventListener('click', event => confirmationCommande(event), {
});

/*--------FONCTIONS----------*/
//Désactive les boutons
function desactiver(element){
    let boutonDesactive = document.getElementById(element);
    boutonDesactive.setAttribute('disabled', 'true');
}

//Validation des données
function validation(inputId, regex, inputName, message){
    let inputMessage = document.getElementById(inputId);
    //On teste si la donnée est vide ou si le regex est respecté
    if (inputName === "" || regex.test(inputName) === false) {
        inputMessage.innerHTML = message;
        return false;
    //Si la donnée est remplie et respecte le regex    
    } else {
        inputMessage.innerHTML = "ok";
    }
}

//Confirmation de commande
function confirmationCommande(event) {     
    event.preventDefault();     
    let donneeValide = true;         
    //Création de l'objet contact
    contact = {         
        firstName: document.getElementById('firstName').value,        
        lastName: document.getElementById('lastName').value,        
        address: document.getElementById('address').value,        
        city: document.getElementById('city').value,        
        email: document.getElementById('email').value    
        }   
    if (validation("prenomPasConforme", /^[A-Z][A-Za-z' -]{3,30}/, contact.firstName, "Une majuscule puis majuscule ou minuscule (sans accent) avec espace, tiret ou apostrophe.") === false) {
        donneeValide = false;     
        };     
    if (validation("nomPasConforme", /^[A-Z][A-Za-z' -]{3,30}/, contact.lastName, "Une majuscule puis majuscule ou minuscule (sans accent) avec espace, tiret ou apostrophe.") === false) {
        donneeValide = false;
        };     
    if (validation("adressePasConforme", /^[A-Za-z0-9-'-\s]{2,100}$/, contact.address, "Veuillez renseigner votre adresse et respecter le format requis") === false) {
        donneeValide = false;
        };     
    if (validation("villePasConforme", /^[A-Z][A-Za-z' -]{3,30}/, contact.city, "Une majuscule puis majuscule ou minuscule (sans accent) avec espace, tiret ou apostrophe.") === false) {
        donneeValide = false;
        }; 
    if (validation("emailPasConforme", /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/, contact.email, "Veuillez renseigner votre email et respecter le format requis") === false) {
        donneeValide = false;
        };
    if (donneeValide === true) {         
        // Si toutes les donnÃ©es sont valides, stockage de l'objet "contact" dans le localStorage;         
        localStorage.setItem("Contact", JSON.stringify(contact));
        localStorage.setItem("Produits", JSON.stringify(products));               
        contact = JSON.parse(localStorage.getItem("Contact"));
        console.log(contact);
        products = JSON.parse(localStorage.getItem("Produits"));
        console.log(products);      
        //Création d'un objet commande         
        let commande = {
            contact, 
            products
            }        
        //Appel de la fonction qui permet l'envoi de la commande        
        envoiDonnees(commande);     
    }}

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
         /* document
            .getElementById("result")
            .innerText = value.postData.text;*/
        for (let i in resultat) {
            console.log(resultat[i]);
            }
    })
    .catch(error => alert("Erreur : " + error));
}