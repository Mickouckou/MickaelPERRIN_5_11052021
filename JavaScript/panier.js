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

//On écoute le clic sur le bouton "poursuivre les achats"
let continueAchat = document.getElementById("poursuivreAchat");
continueAchat.addEventListener('click', event => poursuivreAchat());

//On écoute le clic sur le bouton pour vider le panier
let videPanier = document.getElementById("videPanier");
videPanier.addEventListener('click', event => viderPanier());

//On écoute le clic sur le bouton "passer commande"
let clicCommande = document.getElementById("commande");
clicCommande.addEventListener('click', event => confirmationCommande(event));

/*--------FONCTIONS----------*/
//Poursuivre les achats
function poursuivreAchat(){
    document.location.replace("index.html");
}

//Vide le panier et recharge la page
function viderPanier(){
    localStorage.clear();
    document.location.replace("panier.html");
}

//Désactive les boutons
function desactiver(element){
    let boutonDesactive = document.getElementById(element);
    boutonDesactive.setAttribute('disabled', 'true');
}

//Validation des données
function validation(idValeur, regex, contenuValeur, message){
    let valeurMessage = document.getElementById(idValeur);
    //On teste si la donnée est vide ou si le regex est respecté
    if (contenuValeur === "" || regex.test(contenuValeur) === false) {
        valeurMessage.innerHTML = message;
        return false;
    //Si la donnée est remplie et respecte le regex    
    } else {
        valeurMessage.innerHTML = "ok";
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
    if (validation("prenomPasConforme", /^[A-Z][A-Za-z' -]{2,30}$/, contact.firstName, "Une majuscule puis majuscule ou minuscule (sans accent) avec espace, tiret ou apostrophe.") === false) {
        donneeValide = false;     
        };     
    if (validation("nomPasConforme", /^[A-Z][A-Za-z' -]{2,30}$/, contact.lastName, "Une majuscule puis majuscule ou minuscule (sans accent) avec espace, tiret ou apostrophe.") === false) {
        donneeValide = false;
        };     
    if (validation("adressePasConforme", /^[A-Za-z0-9-'-\s]{2,100}$/, contact.address, "Veuillez renseigner votre adresse et respecter le format requis (aucune ponctuation)") === false) {
        donneeValide = false;
        };     
    if (validation("villePasConforme", /^[A-Z][A-Za-z' -]{2,30}$/, contact.city, "Une majuscule puis majuscule ou minuscule (sans accent) avec espace, tiret ou apostrophe.") === false) {
        donneeValide = false;
        }; 
    if (validation("emailPasConforme", /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/, contact.email, "Veuillez renseigner votre email et respecter le format requis") === false) {
        donneeValide = false;
        };
    if (donneeValide === true) {         
        // Si toutes les données sont valides, stockage des objets "contact" et "produits" dans le localStorage;         
        localStorage.setItem("Total", JSON.stringify(total));
        localStorage.setItem("Contact", JSON.stringify(contact));
        localStorage.setItem("Produits", JSON.stringify(products));               
        //On lance la page de confirmation de commande
        document.location.replace("resume.html");       
    }}