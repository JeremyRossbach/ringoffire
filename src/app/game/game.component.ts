import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Game } from './../../models/game';
import { PlayerComponent } from "../player/player.component";
import { GameInfoComponent } from "../game-info/game-info.component";
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, PlayerComponent, GameInfoComponent, MatButtonModule, MatIconModule, MatDialogModule, GameInfoComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent {
  game!: Game;
  takeCardAnimation = false;
  currentCard: any = "";


  constructor(public dialog: MatDialog) {
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
      this.nextPlayer()

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


  nextPlayer() {
    this.game.currentPlayer++;
    this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
  }


  /**
   * opens a dialog
   */
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe(name => {
      if (name && name.length > 0) {
        this.game.players.push(name);
      }
    });
  }
}