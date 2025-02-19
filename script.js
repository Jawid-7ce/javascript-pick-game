'use strict';

// 🎯 Selecting elements
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
let countdown;
let timeLeft = 10;

let scores, currentScore, playing, activePlayer, timer;

// 🔄 Initialize the Game
function init() {
  scores = [0, 0];
  playing = true;
  currentScore = 0;
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

  resetTimer(); // ⏳ Start turn timer
}

init();

// 🔄 Switch Player Function (Now Resets Timer)
const changePlayer = () => {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  current0Player.classList.toggle('player--active');
  current1Player.classList.toggle('player--active');
  resetTimer(); // ⏳ Reset timer for the new player
};

// 🎲 Roll Dice Function
btnRoll.addEventListener('click', function () {
  if (playing) {
    resetTimer(); // ⏳ Reset timer after rolling

    // 🎲 Generate a random dice roll
    const dice = Math.floor(Math.random() * 6) + 1;

    // 🖼️ Display the dice
    diceEl.classList.remove('hidden');
    diceEl.src = `imgs/dice-${dice}.png`;

    // ❌ If dice is 1 → Lose turn
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    } else {
      changePlayer();
    }
  }
});

// 📥 Hold Score Function
btnHold.addEventListener('click', function () {
  if (playing) {
    resetTimer(); // ⏳ Reset timer after holding

    // ➕ Add current score to active player's score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

    // 🏆 Check for winner
    if (scores[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add('hidden');

      document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
      document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
      
      clearTimeout(timer); // ❌ Stop timeout after winning
    } else {
      changePlayer();
    }
  }
});

// 🔄 New Game Button Resets Everything
btnNew.addEventListener('click', init);

// ⏳ **Timeout Feature – 10 Seconds Per Turn**
function resetTimer() {
  clearTimeout(timer); // Clear previous timer
  clearInterval(countdown); // Clear previous countdown interval

  timeLeft = 10; // Reset time
  document.getElementById(`timer--0`).textContent = `⏳ 10s`;
  document.getElementById(`timer--1`).textContent = `⏳ 10s`;

  countdown = setInterval(() => {
    timeLeft--;
    document.getElementById(`timer--${activePlayer}`).textContent = `⏳ ${timeLeft}s`;

    if (timeLeft === 0) {
      clearInterval(countdown);
      changePlayer(); // ⏳ Switch player when time runs out
    }
  }, 1000); // Update every second

  // Main timeout for auto-switching after 10s
  timer = setTimeout(() => {
    if (playing) {
      changePlayer();
    }
  }, 10000);
}
