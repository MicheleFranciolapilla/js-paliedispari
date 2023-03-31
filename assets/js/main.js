// Palidroma
// Chiedere all’utente di inserire una parola
// Creare una funzione per capire se la parola inserita è palindroma
// Pari e Dispari
// L’utente sceglie pari o dispari e inserisce un numero da 1 a 5.
// Generiamo un numero random (sempre da 1 a 5) per il computer (usando una funzione).
// Sommiamo i due numeri
// Stabiliamo se la somma dei due numeri è pari o dispari (usando una funzione)
// Dichiariamo chi ha vinto.
// Consigli del giorno
// 1. Scriviamo sempre in italiano i passaggi che vogliamo fare
// 2. Scriviamo sempre solo un pezzetto di codice alla volta, se funziona allora andiamo avanti.

const       disable_btn     = true;
const       enable_btn      = false;


function toggle_on_off(where, btn_status)
{
    let     elements    = document.querySelectorAll(where + " .toggle_btn");
    for (let i = 0; i < elements.length; i++)
    {
        elements[i].disabled = btn_status;
    }
}

function toggle_none(id_what)
{
    let element = document.getElementById(id_what);
    element.classList.toggle("d-none");
}

function play_palindrome()
{

}

function play_even_odd()
{
    
}

function go_to_game(game)
{
    toggle_on_off("#btn_nav", disable_btn);   
    toggle_none("games_box");
    switch (game)
    {
        case 1:
            toggle_none("palindrome_game");
            play_palindrome();
            break;
        case 2:
            toggle_none("even_odd_game");
            play_even_odd();
            break;
    }
}