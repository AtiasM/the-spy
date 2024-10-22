import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-display-roles',
  templateUrl: './display-roles.component.html',
  styleUrls: ['./display-roles.component.scss']
})
export class DisplayRolesComponent implements OnInit {
  @Input() selectedWorkplace!: { place: string; positions: string[] };
  @Input() assignedPositions!: { [player: string]: string };
  @Input() timeRound: number = 1;
  @Input() workplaces: string[] = []
  players: string[] = []
  currentPlayerIndex: number = 0; // Track the current player being displayed
  role: string = ''; // Store the current player's role
  isDisplayed: boolean = false
  isDisplayOver: boolean = false
  startGame: boolean = false
  constructor(private router: Router){}
  ngOnInit() {
    this.players = Object.keys(this.assignedPositions)
  }

  // Get the current player
  getCurrentPlayer() {
    return this.players[this.currentPlayerIndex];
  }

  // Display the current player's role
  displayRole() {
    const player = this.getCurrentPlayer();
    this.role = this.assignedPositions[player]; // Example logic
    this.isDisplayed = true
  }

  // Move to the next player
  nextPlayer() {
    this.isDisplayed = false
    this.currentPlayerIndex++;
    this.role = ''; // Reset the role for the next player
  }

  onStartClicked(){
    this.startGame = true
  }
}
