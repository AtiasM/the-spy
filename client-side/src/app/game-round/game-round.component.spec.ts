import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameRoundComponent } from './game-round.component';

describe('GameRoundComponent', () => {
  let component: GameRoundComponent;
  let fixture: ComponentFixture<GameRoundComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GameRoundComponent]
    });
    fixture = TestBed.createComponent(GameRoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
