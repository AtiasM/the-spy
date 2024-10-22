import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog'; // Import MatDialogRef

@Component({
  selector: 'app-add-players',
  templateUrl: './add-players.component.html',
  styleUrls: ['./add-players.component.scss'],
})
export class AddPlayersComponent {
  players: string[] = [];
  newPlayer: string = '';

  constructor(private dialogRef: MatDialogRef<AddPlayersComponent>) {} // Inject MatDialogRef

  addPlayer() {
    if (this.newPlayer.trim()) {
      this.players.push(this.newPlayer.trim());
      this.newPlayer = '';
    }
  }

  save() {
    this.dialogRef.close(this.players); // Close the dialog
  }
}
