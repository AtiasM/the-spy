import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  winner: string | null = null; // Store the winner

  onGameOver(winner: string): void {
    this.winner = winner; // Set the winner when the game ends
  }

  startNewGame(): void {
    this.winner = null; // Reset the winner
    console.log('New game started!');
    // Additional logic to trigger game setup (to be added later)
  }
}
