// Define variables
let scores, roundScore, activePlayer, gamePlaying;

// Initialize game
init();

// Function to simulate a dice rolling
function simulateDiceRolling() {
  const dice = document.querySelector('.dice');
  const intervalId = setInterval(function () {
    const randomDiceNumber = Math.floor(Math.random() * 6) + 1;
    dice.src = `dice-${randomDiceNumber}.png`;
  }, 100); // change the value to change the speed of the dice rolling animation

  // Stop the dice rolling animation after a certain time
  setTimeout(function () {
    clearInterval(intervalId);
  }, 1000); // change the value to change the duration of the dice rolling animation
}

// Roll dice event listener
document.querySelector('.btn--roll').addEventListener('click', function () {
  if (gamePlaying) {
    // Simulate dice rolling animation
    simulateDiceRolling();

    // Wait for a certain time before updating the score and switching to the next player
    setTimeout(function () {
      // 1. Random number
      const dice = Math.floor(Math.random() * 6) + 1;

      // 2. Display the result
      const diceDOM = document.querySelector('.dice');
      diceDOM.src = `dice-${dice}.png`;
      diceDOM.style.display = 'block';

      // 3. Update the round score IF the rolled number was NOT a 1
      if (dice !== 1) {
        // Add score
        roundScore += dice;
        document.querySelector('#current--' + activePlayer).textContent =
          roundScore;
      } else {
        // Next player
        nextPlayer();
      }
    }, 1000); // wait for the same duration as the dice rolling animation
  }
});

// Hold event listener
document.querySelector('.btn--hold').addEventListener('click', function () {
  if (gamePlaying) {
    // Add current score to global score
    scores[activePlayer] += roundScore;

    // Update UI
    document.querySelector('#score--' + activePlayer).textContent =
      scores[activePlayer];

    // Check if player won the game
    if (scores[activePlayer] >= 100) {
      document.querySelector('#name--' + activePlayer).textContent = 'Winner!';
      document.querySelector('.dice').style.display = 'block';
      document
        .querySelector('.player--' + activePlayer)
        .classList.add('player--winner');
      document
        .querySelector('.player--' + activePlayer)
        .classList.remove('active');
      gamePlaying = false;
    } else {
      // Next player
      nextPlayer();
    }
  }
});

// New game event listener
document.querySelector('.btn--new').addEventListener('click', init);

// Initialize game function
function init() {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  gamePlaying = true;

  document.querySelector('.dice').style.display = 'block';

  document.getElementById('score--0').textContent = '0';
  document.getElementById('score--1').textContent = '0';
  document.getElementById('current--0').textContent = '0';
  document.getElementById('current--1').textContent = '0';
  document.getElementById('name--0').textContent = 'Jugador 1';
  document.getElementById('name--1').textContent = 'Jugador 2';
  document.querySelector('.player--0').classList.remove('player--winner');
  document.querySelector('.player--1').classList.remove('player--winner');
  document.querySelector('.player--0').classList.add('active');
  document.querySelector('.player--1').classList.remove('active');
}

// Switch to next player function
function nextPlayer() {
  // Next player
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  roundScore = 0;

  document.getElementById('current--0').textContent = '0';
  document.getElementById('current--1').textContent = '0';

  document.querySelector('.player--0').classList.toggle('active');
  document.querySelector('.player--1').classList.toggle('active');

  document.querySelector('.dice').style.display = 'block';
}
