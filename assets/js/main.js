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

// Costanti e variabili globali
// Costanti usate per comandare la disabilitazione/abilitazione dei pulsanti e degli input
const       disable_btn     = true;
const       enable_btn      = false;
// Variabile che "registra" il gioco corrente/ultimo gioco a cui si è giocato
let         last_game       = 0; 

// Funzione che resetta gli attributi degli input. Utilizzata nelle fasi di ripetizione gioco e ritorno alla barra dei pulsanti
function reset_data()
{
    document.getElementById('your_word').value = "Osso";
    document.getElementById('bet_even').checked = "false";
    document.getElementById('bet_odd').checked = "true";
    document.getElementById('user_nr').value = "1";
}

// Funzione che inverte lo stato di enabled/disabled degli elementi (pulsanti e input) discendenti dell'elemento specificato
function toggle_on_off(where, btn_status)
{
    let     elements    = document.querySelectorAll(where + ' .toggle_btn');
    for (let i = 0; i < elements.length; i++)
    {
        elements[i].disabled = btn_status;
    }
}

// Funzione che esegue lo switch del display "none" dell'id specificato
function toggle_none(id_what)
{
    let element = document.getElementById(id_what);
    element.classList.toggle('d-none');
}

// Funzione che avvia il gioco della palindroma
function play_palindrome()
{
    document.getElementById('even_odd_title').innerText = "PALINDROMA";
    toggle_none('palindrome_game');
}

// Funzione che avvia il gioco del pari o dispari
function play_even_odd()
{
    document.getElementById('even_odd_title').innerText = "PARI o DISPARI";
    toggle_none('even_odd_game');
}

// Funzione che viene evocata in prima istanza dai pulsanti della barra di navigazione e rievocata all'atto del "gioca di nuovo". Setta la variabile "last_game" e prepara il gioco, chiamando la funzione specifica
function go_to_game(game)
{
    last_game = game;
    toggle_on_off('#btn_nav', disable_btn);   
    toggle_none('games_box');
    switch (game)
    {
        case 1:
            play_palindrome();
            break;
        case 2:
            play_even_odd();
            break;
    }
}

// Funzione booleana che restituisce true o false, a seconda che il parametro sia pari o dispari
function is_even(number)
{
    if (number % 2 == 0)
    {
        return true;
    }
    else
    {
        return false;
    }
}

// Funzione booleana che restituisce true o false, a seconda che la parola passata come parametro sia palindroma o meno.
function is_palindrome(word)
{
    const   word_length     = word.length;
    const   last_char       = Math.floor(word_length / 2) - 1;
    for (let i=0; i <= last_char; i++)
    {
        if (!(word[i] == word[word_length - 1 - i]))
        // Per stabilire se la parola è palindroma si confrontano, a coppie, i caratteri simmetrici rispetto all'asse centrale della funzione
        {
            return false;
        }
    }
    return true;
}

// Generatore randomico di numeri interi
function random_int(max)
{
    return Math.floor(Math.random() * max);
}

// Funzione che ristabilisce le condizioni iniziali del display none e di abilitazione dei vari elementi e ritorna alla barra dei pulsanti
function game_back()
{
    toggle_none('game_buttons');
    toggle_none('game_result');
    toggle_on_off('#btn_nav', enable_btn);   
    toggle_none('games_box');
    switch (last_game)
    {
        case 1:
            toggle_none('palindrome_result');
            toggle_none('palindrome_result_msg');
            toggle_on_off('#palindrome_game', enable_btn);
            toggle_none('palindrome_game');
            break;
        case 2:
            toggle_none('even_odd_result');
            toggle_none('even_odd_result_msg');
            toggle_on_off('#even_odd_game', enable_btn);
            toggle_none('even_odd_game');

            break;
    }
    reset_data();
}

// Funzione che resetta le condizioni iniziali e riesegue l'ultimo gioco
function game_again()
{
    game_back();
    go_to_game(last_game);
}

// Funzione di call back che gestisce la parte logica e di output del gioco del pari o dispari
even_odd_game.addEventListener("submit", (even_odd_call_back) => 
{
    even_odd_call_back.preventDefault();
    const   even        = document.getElementById('bet_even').checked;
    const   odd         = document.getElementById('bet_odd').checked;
    const   number      = parseInt(document.getElementById('user_nr').value);
    const   cpu_nr      = random_int(5) + 1;
    const   result      = number + cpu_nr;
    const   even_odd    = is_even(result);
    let     you_win     = false;
    let     you_win_msg = "Ha vinto la CPU";

    if ((even_odd && even) || (!even_odd && odd))
    {
        you_win = true;
        you_win_msg = "Hai vinto tu";
    }
    toggle_on_off('#even_odd_game', disable_btn);
    toggle_none('game_result');
    document.getElementById('cpu_nr').innerText = cpu_nr;
    document.getElementById('even_odd_result_msg').innerText = you_win_msg;
    toggle_none('even_odd_result');
    toggle_none('even_odd_result_msg');
    toggle_none('game_buttons');
});

// Funzione di call back che gestisce la parte logica e di output del gioco della palindroma
palindrome_game.addEventListener("submit", (palindrome_call_back) => 
{
    palindrome_call_back.preventDefault();
    const   word    = document.getElementById('your_word').value.toUpperCase();
    const   result  = is_palindrome(word);
    let     msg     = "Non palindroma"; 
    if (result)
    {
        msg = "Palindroma";
    }
    toggle_on_off('#palindrome_game', disable_btn);
    toggle_none('game_result');
    toggle_none('palindrome_result');
    document.getElementById('palindrome_result_msg').innerText = msg;
    toggle_none('palindrome_result_msg');
    toggle_none('game_buttons');
});