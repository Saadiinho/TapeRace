const listeMots = [
    "le", "de", "un", "être", "et", "à", "il", "avoir", "que", "pour", 
    "ne", "dans", "sur", "se", "pas", "qui", "avec", "ce", "par", "je", 
    "on", "plus", "être", "faire", "leur", "comme", "ou", "dire", "mais", 
    "nous", "vous", "votre", "si", "tout", "faire", "lui", "bien", "aussi", 
    "ici", "moi", "donner", "peu", "être", "temps", "savoir", "ans", "juste", 
    "par", "beaucoup", "prendre", "très", "dire", "après", "avant", "même", 
    "voir", "un", "aller", "autre", "nouveau", "quand", "utiliser", "comment", 
    "dire", "travail", "deux", "trouver", "besoin", "dire", "année", "grand", 
    "chose", "penser", "personne", "moment", "façon", "long", "même", "petite", 
    "comprendre", "tenir", "montrer", "point", "question", "raison", "tous", 
    "apprendre", "signifier", "suivre", "faire", "chose", "beaucoup", "bien", 
    "placer", "encore", "dans", "bon", "devoir", "jamais", "la",
    "chat", "soleil", "maison", "bonjour", "plage", "rire", "livre", "musique", 
    "pomme", "voiture", "table", "école", "fleur", "tomate", "chien", "marcher", 
    "Bleu", "Bonbon", "Feuille", "Été", "Réchauffement", "Accélérer", 
    "Développement", "Château", "Rétablissement", "Dépêche", "Aîné", 
    "Coïncidence", "Haïr", "Crème", "Réussir", "Sérieux", "Inconvénient", 
    "Péripétie", "Ambiguïté", "Haïtien", "Zoologie", "Réception", "Naïf", 
    "Piège"
];
let scoreUser = 0; //Permet de connaître le score de l'utilisateur
let tentative = 0; //Permet de savoir combien de mot à été proposé
let tempsLimite = 60; //Permet de donner un temps limite à l'utilisateur
let jeuEnCours = false; //Permet de savoir si le jeu est en cours
let chronoDemarre = false; //Permet de savoir si le chrono est lancé
let stopJeu = false; // Permet d'arrêter le jeu

//Récupération des éléments du front
const zoneProposition = document.getElementById("proposition");
const inputEcriture = document.getElementById("inputEcriture");
const zoneScore = document.getElementById("zoneScore");
const result = document.getElementById("result");
const timer = document.getElementById("timer");

function createListeMot(){
    listeMots = [];
    return listeMots;
}

//Fonction qui permet de générer un mot aléatoirement dans la base de données 
function randomWord() {
    //Génération d'un nombre aléatoire pour ensuite retourner dans le tableau le mot correspondant à ce nombre 
    let randomIndex = Math.floor(Math.random() * listeMots.length);
    return listeMots[randomIndex].toLowerCase();
}

//Fonction qui permet de récupérer la saisie de l'utilisateur
function recupUser(){
    //Récupération de la saisie de l'utilisateur
    let valeurSaisie = inputEcriture.value;
    inputEcriture.value = "";
    return valeurSaisie.trim();
}

//Fonction qui permet de récupérer le mot à saisir
function recupAffiche(){
    //Récupération du mot à saisir
    let proposition = zoneProposition.textContent.trim();
    return proposition;
}

//Fonction qui permet de changer le mot à saisir
function changeMotAffiche(){
    let nouvelleProposition = randomWord();
    zoneProposition.textContent = nouvelleProposition;
}

//Fonction qui permet d'avoir la condition s'arrêt du jeu
function conditionArret(){
    return (tempsLimite <= 0)
}


//Fonction qui permet de démarrer le chrono
function demarrerChrono() {
    tempsTotal = 0; // Réinitialiser le temps total
    chronoEnCours = setInterval(function() {
        tempsTotal++; // Incrémenter le temps total chaque seconde
        tempsLimite--; //Décrémenter le temps limite pour montrer à l'utilisateur le temps restant        
        timer.textContent = tempsLimite + " secondes" //Afficher le temps restant à l'utilisateur

        if (conditionArret()){
            arreterJeu(); //Stopper le jeu
            //Remise des affichages par défaut et affichage du score
            timer.textContent = "60 secondes";
            zoneProposition.textContent = `Vous avez tapé ${scoreUser} mots corrects sur ${tentative} en une minute`;
            //Remise des paramètre du jeu comme au début 
            scoreUser = 0;
            tentative = 0;
            tempsLimite = 60;
            jeuEnCours = false;
            chronoDemarre = false;
            stopJeu = false;
        }

    }, 1000); // Exécuter toutes les 1000 millisecondes (soit 1 seconde)
    chronoDemarre = true; //Dire que le chrono a été démarrer
}

//DFonction qui permet d'arrêter le chrono
function arreterChrono() {
    clearInterval(chronoEnCours); // Arrêter l'intervalle du chronomètre
}

//Fonction qui permet d'arrêter le jeu
function arreterJeu(){
    jeuEnCours = false;
    arreterChrono();
}

//Fonction principale qui permet de lancer le jeu et de le gérer
function lancerJeu(){
    //Regarder si le jeu a commencer
    if (!jeuEnCours){
        return; //Si le jeu n'a pas commencé, quitter la fonction
    }
    //Si le chrono n'a pas démarré, démarrer le chrono
    if (!chronoDemarre){
        demarrerChrono();
    }
    //Récupération des éléments à comparer
    let proposition = recupAffiche();
    let userValue = recupUser();
    //Comparaison des éléments pour voir si l'utilisateur a gagné ou perdu
    if (userValue === proposition){
        scoreUser += 1;
        if (tentative != 0) {
            zoneScore.textContent = "Votre score : " + scoreUser;
            result.innerHTML = '<span class="text-success">Correct !</span>';
        }
    }
    else {
        if (tentative != 0){
            result.innerHTML = '<span class="text-danger">Incorrect !</span>';
        }
    }
    tentative ++;
    changeMotAffiche();
}

//Lancer le jeu seuelemnt lorsqu'on appuie sur le bouton "Commencer"
function lancerJeu2(){
    jeuEnCours = true;
    lancerJeu();
    document.getElementById("inputEcriture").focus();
}


document.addEventListener("keydown", function(event) {
    // Vérifier si la touche pressée est la touche "Entrée" (keyCode 13)
    if (event.keyCode === 13) {
        // Appeler la fonction lancerJeu() lorsque la touche "Entrée" est pressée
        lancerJeu();
    }
});

