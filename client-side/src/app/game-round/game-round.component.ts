import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-game-round',
  templateUrl: './game-round.component.html',
  styleUrls: ['./game-round.component.scss']
})
export class GameRoundComponent {
  @Input() selectedWorkplace!: { place: string; positions: string[] };
  @Input() assignedPositions!: { [player: string]: string };
  @Input() timeRound: number = 1;
  @Input() workplaces: string[] = []
  playersArray: string[] = []
  timerEnded = false;
  chosenPlayer?: string
  gameOver: boolean = false
  isRoundEnded: boolean = false 
  resultMessage: string = ""

  ngOnInit(){
    this.playersArray = Object.keys(this.assignedPositions)
  }
  onTimerEnd() {
    this.timerEnded = true;
  }

  onSpyChosen(player: string) {
    this.chosenPlayer = player; // Store the chosen player
    this.playersArray = this.playersArray.filter(p => p !== player); // Remove chosen player from available list
    // this.showWorkplaces();
  }

  selectWorkplace(workplaceName: string){
    debugger
    const isSpy = this.assignedPositions[this.chosenPlayer!] == "spy"
    const isPlaceCorrect = workplaceName === this.selectedWorkplace.place
    if(isSpy && isPlaceCorrect){
      this.resultMessage = "GAME OVER, SPIES ONE"
      this.gameOver = true; // Set game over to true
    }
    else if(!isSpy){
      this.resultMessage = "YOU ARE NOT A SPY"
    }
    else if(isSpy){
      this.resultMessage = "YOU ARE A SPY"
    }
    else{
      this.resultMessage = "YOU ARE NOT A SPY, HOW COULD YOU BE WRONG?"
    }
    this.isRoundEnded = true
  }

  continueClicked(){
    if(this.gameOver){
      this.newGame()
    }
    else{
      this.continueGame()
    }
  }
  newGame(){

  }
  continueGame(){
    this.chosenPlayer = ""
    this.isRoundEnded = false 
    this.resultMessage = ""
    this.timerEnded = false 
  }
}
