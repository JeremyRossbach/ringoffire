import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Game } from './../../models/game';
import { PlayerComponent } from "../player/player.component";

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, PlayerComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent {
  game!: Game;
  takeCardAnimation = false;
  currentCard: any = "";

  constructor() {
    this.newGame();
  }

  /**
   * starts a new game
   */
  newGame() {
    this.game = new Game();

  }

  /**
   * checks if card can be taken
   */
  takeCard() {
    if (!this.takeCardAnimation) {
      this.card()

      setTimeout(() => {
        this.game.playedCards.push(this.currentCard);
        this.takeCardAnimation = false;
      }, 2200);
    }
  }

  /**
   * take a card
   */
  card() {
    this.currentCard = this.game.stack.pop();
    this.takeCardAnimation = true;
    console.log(this.game);
    console.log('New Card: ' + this.currentCard);
  }
}