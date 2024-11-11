"use strict";
console.clear();

/* Visualizzare in pagina 5 numeri casuali. Da lì parte un timer di 30 secondi.
Dopo 30 secondi i numeri scompaiono e appaiono invece 5 input in cui l'utente deve inserire i numeri che ha visto precedentemente, nell'ordine che preferisce. (Per favorire il lavoro vostro e dei tutor mettete inizialmente un timer di 5-10 sec e non 30)
Dopo che sono stati inseriti i 5 numeri, il software dice quanti e quali dei numeri da indovinare sono stati individuati. */

//Recupero gli elementi del formm di input
const input = document.querySelectorAll('input');
// console.log(input);
const form = document.getElementById('answers-form');
const ulNumberList = document.getElementById('numbers-list');

//Array vuoto che si andrà si andrà a riempire di 5 numeri casuali
const temporaryRandomNumber = [];
//Richiamo la funzione (a cui passo l'array vuoto) che mi genera i 
// numeri casuali e li appende ciascuno ad un elemento <li>
randomGenerate(temporaryRandomNumber);


function randomGenerate(temporaryRandomNumber) {
    let i = 0;      //contatore per il ciclo while
//Riempio l'array e controllo che i 5 numeri generati casualmente
// non siano uguali tra loro
while (i < 5) {
    let randomNumber = getRndInteger(50, 1);
    // console.log(randomNumber);
    
    // for (let j = 0; j < temporaryRandomNumber.length; j++) {
    //      if (randomNumber === temporaryRandomNumber[j]) {
    //          break;
    //      } else {
    //          temporaryRandomNumber[i] = randomNumber;
    //          i++;
    //      }
    // }
    temporaryRandomNumber[i] = randomNumber;
    ulNumberList.innerHTML += `<li>${temporaryRandomNumber[i]}</li>`;   //mi creo la <li> contenente il numero generato randomicamente
    // console.log("Numero casuali: " + temporaryRandomNumber[i]);
    i++;
}
}




