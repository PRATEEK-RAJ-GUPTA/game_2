"use strict";
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.querySelector("#score--0");
const score1El = document.querySelector("#score--1");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnHold = document.querySelector(".btn--hold");
const btnRoll = document.querySelector(".btn--roll");
//STARTINGG CONDITION
let scores, currentScore, activeplayer, playing;

//function of init function that is to reinitiase evertyhing to original value

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activeplayer = 0;
  playing = true;
  score0El.textContent = 0;
  score1El.textContent = 0;
  diceEl.classList.add("hidden");
  current0El.textContent = 0;
  current0El.textContent = 0;
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
};
init();
//function to switch player

const switchPlayer = function () {
  document.getElementById(`current--${activeplayer}`).textContent = 0;
  activeplayer = activeplayer === 0 ? 1 : 0;
  currentScore = 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

//ROLLING DICE FUNCTIONALITY
btnRoll.addEventListener("click", function () {
  //1.generating a randon dice roll
  if (playing) {
    const diceValue = Math.trunc(Math.random() * 6) + 1;

    //2.display the dice
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${diceValue}.png`;

    //3.check for roll 1 if true swirc hto next player

    if (diceValue !== 1) {
      //Add to current score
      currentScore = currentScore + diceValue;
      document.getElementById(`current--${activeplayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});
//HOLDING THE CURRENT SOCRE OF THE ACTIVE PLAYER

btnHold.addEventListener("click", function () {
  //1.Add current score to the actve player
  if (playing) {
    scores[activeplayer] += currentScore;
    document.getElementById(`score--${activeplayer}`).textContent =
      scores[activeplayer];
    //2.check if the player score>=100
    //finish the game
    if (scores[activeplayer] >= 20) {
      playing = false;
      diceEl.classList.add("hidden");
      document
        .querySelector(`.player--${activeplayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activeplayer}`)
        .classList.remove("player--active");
    } else {
      //3.Switch to the next player
      switchPlayer();
    }
  }
});
//RESETTING THE GAME CONDITION
btnNew.addEventListener("click", init);
