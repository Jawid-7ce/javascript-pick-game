'use strict';

//  Selecting elements
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const current0Player = document.querySelector('.player--0');
const current1Player = document.querySelector('.player--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// Starting conditions
let scores, currrentScore, playing, activePlayer;
function init() {
  scores = [0, 0];
  playing = true;
  currrentScore = 0;
  activePlayer = 0;

  current0El.textContent = 0;
  current1El.textContent = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;

  diceEl.classList.add('hidden');
  current0Player.classList.remove('player--winner');
  current1Player.classList.remove('player--winner');
  current0Player.classList.add('player--active');
  current1Player.classList.remove('player--active');
}

init();

const changePlayer = () => {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  // current0Player.classList.remove('player--active');
  // current1Player.classList.add('player--active');
  activePlayer = activePlayer === 0 ? 1 : 0;
  currrentScore = 0;
  current0Player.classList.toggle('player--active');
  current1Player.classList.toggle('player--active');
};

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // Generating a random dice roll
    const dice = Math.floor(Math.random() * 6) + 1;
    //   Display the dice
    diceEl.classList.remove('hidden');
    diceEl.src = `imgs/dice-${dice}.png`;

    //   Check for rolled 1
    if (dice != 1) {
      // add dice to the current score
      currrentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currrentScore;
    }
    //   switch to next player
    else {
      changePlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // add current score to active player's score
    scores[activePlayer] += currrentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // check if current player's score is >= 100
    if (scores[activePlayer] >= 100) {
      // finish the game
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      //   switch to next player
      changePlayer();
    }
  }
});

btnNew.addEventListener('click', init);
