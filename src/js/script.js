'use strict';

import dice1 from '../img/dice-1.png';
import dice2 from '../img/dice-2.png';
import dice3 from '../img/dice-3.png';
import dice4 from '../img/dice-4.png';
import dice5 from '../img/dice-5.png';
import dice6 from '../img/dice-6.png';

import { WINNING_SCORE } from './config.js';
class App {
   // Select Elements
   diceElement = document.querySelector('.dice');

   currentScore0Element = document.getElementById('current--0');
   currentScore1Element = document.getElementById('current--1');

   totalScore0Element = document.getElementById('score--0');
   totalScore1Element = document.getElementById('score--1');

   player0SectionElement = document.querySelector('.player--0');
   player1SectionElement = document.querySelector('.player--1');

   btnNewGameElement = document.querySelector('.btn--new');
   btnRollDiceElement = document.querySelector('.btn--roll');
   btnHoldElement = document.querySelector('.btn--hold');

   // Game Variables
   dicesImages = [dice1, dice2, dice3, dice4, dice5, dice6];
   winningScore = WINNING_SCORE;
   currentScore = 0;
   playersTotalScores = [0, 0];
   gameEnded = false;
   activePlayer = 0;

   constructor() {
      this.resetGame();

      this.btnRollDiceElement.addEventListener('click', this.rollDice);

      this.btnHoldElement.addEventListener('click', this.holdScore);

      this.btnNewGameElement.addEventListener('click', this.resetGame);
   }

   switchPlayer = () => {
      this.activePlayer = this.activePlayer === 0 ? 1 : 0;
      this.player0SectionElement.classList.toggle('player--active');
      this.player1SectionElement.classList.toggle('player--active');
   };

   resetGame = () => {
      this.totalScore0Element.textContent = 0;
      this.totalScore1Element.textContent = 0;
      this.currentScore0Element.textContent = 0;
      this.currentScore1Element.textContent = 0;
      this.diceElement.classList.add('hidden');
      document.querySelector(`.player--${this.activePlayer}`).classList.remove('player--winner');
      this.player0SectionElement.classList.add('player--active');
      this.player1SectionElement.classList.remove('player--active');
      this.currentScore = 0;
      this.playersTotalScores = [0, 0];
      this.gameEnded = false;
      this.activePlayer = 0;
   };

   rollDice = () => {
      console.log(this);
      if (this.gameEnded) {
         return;
      }
      // Generate random roll dice
      const rollDice = Math.floor(Math.random() * 6) + 1;
      // this.diceElement.src = `../src/img/dice-${rollDice}.png`;
      this.diceElement.src = this.dicesImages[rollDice];
      this.diceElement.classList.remove('hidden');

      // add dice result to current score or switch player if the dice result is 1
      if (rollDice !== 1) {
         this.currentScore += rollDice;
         document.getElementById(`current--${this.activePlayer}`).textContent = this.currentScore;
      } else {
         this.currentScore = 0;
         document.getElementById(`current--${this.activePlayer}`).textContent = this.currentScore;
         this.switchPlayer();
      }
   };

   holdScore = () => {
      if (this.gameEnded) {
         return;
      }
      // Update current player total score
      this.playersTotalScores[this.activePlayer] += this.currentScore;
      document.getElementById(`score--${this.activePlayer}`).textContent = this.playersTotalScores[this.activePlayer];

      // Update current player current score to zero
      this.currentScore = 0;
      document.getElementById(`current--${this.activePlayer}`).textContent = 0;

      //Switch player if game not ended
      if (!(this.playersTotalScores[this.activePlayer] >= 100)) {
         return this.switchPlayer();
      }

      // End game
      this.gameEnded = true;
      document.querySelector(`.player--${this.activePlayer}`).classList.add('player--winner');
      this.diceElement.classList.add('hidden');
   };
}

const app = new App();
