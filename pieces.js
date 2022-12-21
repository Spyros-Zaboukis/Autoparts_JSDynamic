// Récupération des pièces depuis le fichier JSON
//-------------------------------------------------

const reponse = await fetch('pieces-autos.json');
const pieces = await reponse.json();


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
    
     }
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



 // Function pour filtrer les résultats en fonction du prix : 

 const boutonFiltrer = document.querySelector(".btn-filtrer");

 boutonFiltrer.addEventListener('click' , ()=> {
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




