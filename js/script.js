"use strict";
console.clear();

/* Visualizzare in pagina 5 numeri casuali. Da lì parte un timer di 30 secondi.
Dopo 30 secondi i numeri scompaiono e appaiono invece 5 input in cui l'utente deve inserire i numeri che ha visto precedentemente, nell'ordine che preferisce. (Per favorire il lavoro vostro e dei tutor mettete inizialmente un timer di 5-10 sec e non 30)
Dopo che sono stati inseriti i 5 numeri, il software dice quanti e quali dei numeri da indovinare sono stati individuati. */

//Recupero gli elementi del formm di input
const input = document.querySelectorAll('#input-group input');
// console.log(input);
const elementForm = document.getElementById('answers-form');
const ulNumberList = document.getElementById('numbers-list');
// console.log(ulNumberList);
const liCounterDown = document.getElementById('counter-down');
const message = document.getElementById('message');
//Array vuoto che si andrà si andrà a riempire di 5 numeri casuali
const temporaryRandomNumber = [];
// Array vuoto che si andrà a riempire dei numeri inseriti dall'utente
const arrayUsersNumber = [];
//Richiamo la funzione (a cui passo l'array vuoto) che mi genera i 
// numeri casuali e li appende ciascuno ad un elemento <li>
randomGenerate(temporaryRandomNumber);
let seconds = 10;   //variabile con numero di secondi conto alla rovescia. Dichiarata esternamete così da avere accesso al valore e alla variabile anche internamente a funzioni
let timer;  //anche qui dichiaro la variabile fuori così da renderla visibile in tutte le funzioni che andrò a dichiarare
// Richiamo la funzione countdown
countDown();
// Creo l'ascoltatore di eventi per il pulsante del form
elementForm.addEventListener('submit', usersNumberGuessed);


/* Funzione che genera 5 numeri casuali */
function randomGenerate(temporaryRandomNumber) {
    let i = 0;      //contatore per il ciclo while
    //Riempio l'array e controllo che i 5 numeri generati casualmente
    // non siano uguali tra loro
    while (i < 5) {
        let randomNumber = getRndInteger(50, 1);
        /* -------- Evito di generare due o più numeri uguali,
        i numeri random devono essere tutti e 5 diversi -------- */
        if (!temporaryRandomNumber.includes(randomNumber)) {
            temporaryRandomNumber[i] = randomNumber;
            //Creo un nuovo <li> di <ul> e gli assegno il numero casuale
            ulNumberList.innerHTML += `<li>${temporaryRandomNumber[i]}</li>`;   //mi creo la <li> contenente il numero generato randomicamente
            // console.log("Numero casuali: " + temporaryRandomNumber[i]);
            i++;
        }
    }
}

/* Funzione che esegue il countdown e poi nasconde il tag <ul>
   e mostra il form */
function countDown() {
    timer = setInterval(() => {
        if (seconds > 1) {
            liCounterDown.classList.remove('d-none');
            liCounterDown.innerHTML = "<li>Hai <strong>" + --seconds + "</strong> secondi per memorizzare bene i numeri</li>";
        } else {
            // Nascondo l'<ul> contenente i numeri casuali
            ulNumberList.classList.add("d-none");
            // Nascondo lo <li> contenente il conto alla rovescia
            liCounterDown.classList.add("d-none");
            // Mostro il form di input dove l'utente inserirà i numero
            elementForm.classList.remove("d-none");
            // Termino l'esecuzione del setInterval()
            clearTimeout(timer);
        }

    }, 300);
}
/* Funzione che al click del pulsante nel form aggiunge i numeri inseriti
dall'utente nell'array arrayUsersNumber[] e controlla le occorrenze*/
function usersNumberGuessed(event) {
    // Prevengo il caricamento della pagina
    event.preventDefault();
    // Contatore numeri indovinati
    let guessedNumber = 0;
    // Ciclo la NodeList input così da assegnare all'array vuoto i 5 numeri inseriti dall'utente
    for (let i = 0; i < input.length; i++) {
        console.log(input[i].value);

        arrayUsersNumber.push(parseInt(input[i].value));
        // console.log(arrayUsersNumber);
        // console.log(arrayUsersNumber[i]);
        // Controllo le occorrenze (se il numero è presente) nell'array dei numeri casuali
        if (temporaryRandomNumber.includes(arrayUsersNumber[i])) {
            // In caso positivo incremento il contatore
            guessedNumber++;
        }
    }
    // If che controlla se l'utente ha indovinato tutti i numeri,
    // in tal caso riceve un messaggio di congratulazioni personalizzato
    if (guessedNumber == 5) {
        message.innerHTML = `Complimenti! Hai indovinato <strong>tutti</strong> i numeri!`;
        confetti({ particleCount: 1000, spread: 360 });
    } else {
        // Aggiungo la classe che toglie i pallini dalla list item
        message.classList.add("list-unstyled");
        // Altrimenti riceve un messaggio con il numero di occorrenze indovinate
        message.innerHTML = `Hai indovinato <strong>${guessedNumber}</strong> numeri!`;
    }
}



