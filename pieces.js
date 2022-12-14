import { ajoutListenersAvis, ajoutListenerEnvoyerAvis } from "./avis.js";
// Récupération des pièces depuis le fichier JSON
//-------------------------------------------------
//Récupération des pièces eventuellement stockées dans le localStorage
let pieces = window.localStorage.getItem('pieces');
if (pieces === null){
   // Récupération des pièces depuis l'API
   const reponse = await fetch('http://localhost:8081/pieces/');
   pieces = await reponse.json();
   // Transformation des pièces en JSON
   const valeurPieces = JSON.stringify(pieces);
   // Stockage des informations dans le localStorage
   window.localStorage.setItem("pieces", valeurPieces);
}else{
   pieces = JSON.parse(pieces);
}


ajoutListenerEnvoyerAvis()


function genererPage(pieces){

    for (let i = 0; i < pieces.length; i++) {

        const article = pieces[i];
    
        // Récupération de l'élément du DOM qui accueillera les fiches
        const sectionFiches = document.querySelector(".fiches");
      
      
        // Création d’une balise dédiée à une pièce automobile
        const pieceElement = document.createElement("article");
       
       
        // Création des balises 
        const imageElement = document.createElement("img");
        imageElement.src = article.image;
        const nomElement = document.createElement("h2");
        nomElement.innerText = article.nom;
        const prixElement = document.createElement("p");
        prixElement.innerText = `Prix: ${article.prix} € (${article.prix < 35 ? "€" : "€€€"})`;
        const categorieElement = document.createElement("p");
        categorieElement.innerText = article.categorie ?? "(aucune catégorie)";
        const descriptionElement = document.createElement("p");
        descriptionElement.innerText = article.description ?? "Pas de description pour le moment.";
        const stockElement = document.createElement("p");
        stockElement.innerText = article.disponibilite ? "En stock" : "Rupture de stock";

        //Code ajouté
        const avisBouton = document.createElement("button");
        avisBouton.dataset.id = article.id;
        avisBouton.textContent = "Afficher les avis";
        
        // On rattache la balise article a la section Fiches
        sectionFiches.appendChild(pieceElement);
       
       
        // On rattache l’image à pieceElement (la balise article)
        pieceElement.appendChild(imageElement);
        pieceElement.appendChild(nomElement);
        pieceElement.appendChild(prixElement);
        pieceElement.appendChild(categorieElement);
        
        
        //Ajout des éléments au DOM pour l'exercice
        pieceElement.appendChild(descriptionElement);
        pieceElement.appendChild(stockElement);

        pieceElement.appendChild(avisBouton);


     }
        // Ajouter les avis
        ajoutListenersAvis();

}


genererPage(pieces);
 
// Lister des éléments du dom
//---------------------------------------

 // Function pour trier les résultats de sortie par ordre croissant :

 const boutonTrier = document.querySelector(".btn-trier");
 
 boutonTrier.addEventListener('click', ()=> {

    const piecesOrdonnes = Array.from(pieces);

    piecesOrdonnes.sort((a,b) => {
        return a.prix - b.prix;
    });
    console.log(piecesOrdonnes);
    document.querySelector('.fiches').innerHTML='';
    genererPage(piecesOrdonnes);
 });



 // Function filter decroissant
 const boutonFilterDecroissant = document.querySelector('.btn-trierDecroissant');

 boutonFilterDecroissant.addEventListener('click', () => {
     // Creation d'un array à partir d'un autre array
     const piecesDecroissantes = Array.from(pieces);
 
     piecesDecroissantes.sort((a,b)=>{
         return b.prix - a.prix;
     });
     console.log(piecesDecroissantes);
     document.querySelector('.fiches').innerHTML='';
     genererPage(piecesDecroissantes);
 
 });



 // ici on récup l'input
 const inputValue = document.querySelector('.inputRange');
 inputValue.addEventListener('change', (e)=>{
 const valueI = e.target.value;
 console.log(valueI);
 const piecesFiltrees = pieces.filter((piece)=>{
    return piece.prix <= valueI;
});
console.log(piecesFiltrees);
document.querySelector('.fiches').innerHTML='';
genererPage(piecesFiltrees);
 });
 
  



// Pour filtrer les résultats en fonction du prix : 

const boutonFiltrer = document.querySelector(".btn-filtrer");

boutonFiltrer.addEventListener('click', ()=>{

    const piecesFiltrees = pieces.filter((piece)=>{
        return piece.prix <= 35;
    });
    console.log(piecesFiltrees);
    document.querySelector('.fiches').innerHTML='';
    genererPage(piecesFiltrees);
});





// function filter par avis
const bouttonFiltrerParAvis = document.querySelector('.filtrerParAvis');

bouttonFiltrerParAvis.addEventListener('click' , () => { 
   const piecesFiltresParAvis = pieces.filter( (piece) =>{
        return piece.description != null;
    } );
    console.log(piecesFiltresParAvis);
});



// Map liste :
//--------------------

const noms = pieces.map(piece => piece.nom);
for(let i = pieces.length -1 ; i >= 0; i--){
   if(pieces[i].prix > 35){
       noms.splice(i,1)
   };
};
console.log(noms);




//Création de la liste
const abordablesElements = document.createElement('ul');
//Ajout de chaque nom à la liste
for(let i=0; i < noms.length ; i++){
   const nomElement = document.createElement('li');
   nomElement.innerText = noms[i];
   abordablesElements.appendChild(nomElement)
}
// Ajout de l'en-tête puis de la liste au bloc résultats filtres
document.querySelector('.abordables')
   .appendChild(abordablesElements)





//Afficher les pieces disponibles
//--------------------------------

const piecesDisponibles = document.querySelector('.pieces-disponibles');

const listeDePiecesDisponibles = document.createElement('ul');
piecesDisponibles.appendChild(listeDePiecesDisponibles);

pieces.map((piece) => {
    if(piece.disponibilite){
        const nomDePiece = document.createElement('li');
        nomDePiece.innerText= `${piece.nom} ${piece.prix} €`;
        listeDePiecesDisponibles.appendChild(nomDePiece); 
    }
});



// Ajout du listener pour mettre à jour des données du localStorage
const boutonMettreAJour = document.querySelector(".btn-maj");
boutonMettreAJour.addEventListener("click", function () {
  window.localStorage.removeItem("pieces");
});