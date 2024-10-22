import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddPlayersComponent } from '../add-players/add-players.component';
import { WorkPlace } from '../entities';
import { HttpClient } from '@angular/common/http';
import {shuffle} from 'lodash';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  players: string[] = [];
  spyCount: number = 1;
  roundTime: number = 3;
  workplace: WorkPlace | undefined
  gameStarted: boolean = false
  assignedPositions: {[key: string]: string} = {}
  workplaces: WorkPlace[] = []
  workplacesNames: string[] = []
  constructor(
    private dialog: MatDialog,
    private http: HttpClient,
    ) {}

    ngOnInit(): void {
      this.loadWorkplaces();
    }

    loadWorkplaces(): void {
      this.http.get<any[]>('assets/work-places.json').subscribe((data) => {
        this.workplaces = data;
        this.workplacesNames = this.workplaces.map(w => w.place)
      });
    }
  
    openAddPlayersDialog(): void {
    const dialogRef = this.dialog.open(AddPlayersComponent, {
      panelClass: 'custom-dialog-container', // Custom CSS class
      width: '300px', // Optional: Set a width
    });
  
    dialogRef.afterClosed().subscribe((result: string[]) => {
      if (result) {
        this.players = result;
      }
    });
  }

  changeSpyCount(amount: number) {
    const newCount = this.spyCount + amount;
    if (newCount >= 1 && newCount < this.players.length) {
      this.spyCount = newCount;
    }
  }

  changeRoundTime(amount: number) {
    const newTime = this.roundTime + amount;
    if (newTime >= 1) {
      this.roundTime = newTime;
    }
  }

  startGame() {
    if (!this.canStartGame()) {
      return; // Prevent starting the game if conditions are not met
    }

    // Choose a random workplace
    const randomIndex = Math.floor(Math.random() * this.workplaces.length);
    this.workplace = this.workplaces[randomIndex];

    // Assign positions to players
    this.assignPositions();
    this.gameStarted = true;
    console.log('Game started with workplace:', this.workplace);
    console.log('Assigned positions:', this.assignedPositions);
  }
  
  private assignPositions(): void {
    const positions = this.workplace!.positions.slice(); // Copy positions to avoid modifying original array
    const assigned = new Set<string>(); // Track assigned positions

    const shuffledPlayers = shuffle(this.players)
    //assign spies 
    let remainingSpiesCount = this.spyCount
    while(remainingSpiesCount > 0){
      const newSpy = shuffledPlayers.pop() as string
      this.assignedPositions[newSpy] = "spy"
      remainingSpiesCount--
    }
    for (const player of shuffledPlayers) {
      if (assigned.size < positions.length) {
        // Assign a unique position if available
        const positionIndex = Math.floor(Math.random() * positions.length);
        const position = positions[positionIndex];
        this.assignedPositions[player] = position
        assigned.add(position); // Track assigned position
      } else {
        // Allow repetitions if players > positions
        const position = positions[Math.floor(Math.random() * positions.length)];
        this.assignedPositions[player] = position
      }
    }
  }

  canStartGame(): boolean {
    return (
      this.players.length >= 3 &&
      this.spyCount > 0 &&
      this.spyCount < this.players.length &&
      this.roundTime > 1
    );
  }
  onNewGame(){
    this.players = []
    this.workplace = undefined
    this.spyCount = 1
    this.roundTime = 3 
    this.assignedPositions = {}
    this.workplacesNames = []
    this.gameStarted = false 
  }
}
