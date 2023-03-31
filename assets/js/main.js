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
let         last_game       = 0; 

function toggle_on_off(where, btn_status)
{
    let     elements    = document.querySelectorAll(where + ' .toggle_btn');
    for (let i = 0; i < elements.length; i++)
    {
        elements[i].disabled = btn_status;
    }
}

function toggle_none(id_what)
{
    let element = document.getElementById(id_what);
    element.classList.toggle('d-none');
}

function play_palindrome()
{
    document.getElementById('even_odd_title').innerText = "PALINDROMA";
    toggle_none('palindrome_game');
}

function play_even_odd()
{
    document.getElementById('even_odd_title').innerText = "PARI o DISPARI";
    toggle_none('even_odd_game');
}

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

function is_palindrome(word)
{
    const   word_length     = word.length;
    const   last_char       = Math.floor(word_length / 2) - 1;
    for (let i=0; i <= last_char; i++)
    {
        if (!(word[i] == word[word_length - 1 - i]))
        {
            return false;
        }
    }
    return true;
}

function random_int(max)
{
    return Math.floor(Math.random() * max);
}

function game_back()
{
    switch (last_game)
    {
        case 1:
            toggle_none('game_buttons');
            toggle_none('palindrome_result');
            toggle_none('palindrome_result_msg');
            toggle_none('game_result');
            toggle_on_off('#palindrome_game', enable_btn);
            toggle_none('palindrome_game');
            toggle_on_off('#btn_nav', enable_btn);   
            toggle_none('games_box');
            break;
        case 2:
            toggle_none('game_buttons');
            toggle_none('even_odd_result');
            toggle_none('even_odd_result_msg');
            toggle_none('game_result');
            toggle_on_off('#even_odd_game', enable_btn);
            toggle_none('even_odd_game');
            toggle_on_off('#btn_nav', enable_btn);   
            toggle_none('games_box');
            break;
    }
}

function game_again()
{
    game_back();
    go_to_game(last_game);
}

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