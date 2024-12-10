const images = document.getElementById("penduimg1");
const boutonlancerJeu = document.getElementById("lanceJeu");
const departJeu = boutonlancerJeu.addEventListener('click', () => {init()});
const afficheMot = document.getElementById("afficheMot");
const inputSaisieLettre = document.getElementById("saisieLettre");
const saisieLettre = inputSaisieLettre.addEventListener('input', () => {
    demandeUneLettre = inputSaisieLettre.value;
    lancerJeu()});
const reset = document.getElementById("reset");
const recommenceJeu = reset.addEventListener('click', () => {reinitialise()});

let erreurs_autorisees = 7;
let mot_a_trouver = "";
let lettresVersUnderscores = "";
let nombreErreurs = 0;
let demandeUneLettre = "";

//choisir un mot dans la liste
function computerChoose() {
    let index = Math.floor(Math.random() * wordsArray.length);
    let computerChoice = wordsArray[index];
    return computerChoice;
}

//donner un mot de la liste
//mettre des underscores a la place des lettres
//mettre en place le pendu pour les eventuelles erreurs de l'utilisateur
//faire un lieu de saisie pour les lettres que proposera l'utilisateur
//préciser le nombre d'erreur aurotisé

function remplacerLesLettresParDesUnderscores() {
    lettresVersUnderscores = "_".repeat(mot_a_trouver.length);
    return lettresVersUnderscores;
}

function erreurUtilisateur() {
    nombreErreurs++;
    images.src =`./images/images/pendu${7-nombreErreurs}.png`
}

function init() {
    mot_a_trouver = computerChoose();
    console.log(mot_a_trouver);
    lettresVersUnderscores = remplacerLesLettresParDesUnderscores();
    nombreErreurs = 0;
}

function lancerJeu() {
    afficheMot.innerHTML = lettresVersUnderscores;
    if (VerifieLettre(demandeUneLettre)){
         lettresVersUnderscores;
    } else {
        erreurUtilisateur();
    }
    if(lettresVersUnderscores === mot_a_trouver){
        alert("Gagné !")
    }
    
    if(nombreErreurs === erreurs_autorisees) {
        document.getElementById("gameOver").innerHTML = `Tu as perdu ! le mot a trouvé était "${mot_a_trouver}"`;
    }
    inputSaisieLettre.value = "";
}

function VerifieLettre(lettre) {
    if(mot_a_trouver.includes(lettre)){
        let temp = ""; 
        for (let i = 0; i<mot_a_trouver.length; i++){
            if(lettre === mot_a_trouver[i]){
                temp += lettre;
            } else{
                temp += lettresVersUnderscores[i];
            }
        }
        lettresVersUnderscores = temp;
        return true;
    } else {
        return false;
    }
}

function reinitialise(reset) {
    computerChoose();
    init();
    lancerJeu();
    VerifieLettre();
    nombreErreurs = -1;
    erreurUtilisateur();
    remplacerLesLettresParDesUnderscores();
}
reinitialise(reset);



