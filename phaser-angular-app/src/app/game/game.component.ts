import { Component, OnInit } from '@angular/core';
import Phaser from 'phaser';
import { Scene } from './scene';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  phaserGame: Phaser.Game;
  config: Phaser.Types.Core.GameConfig;


  constructor() { 

    this.config = {
      type: Phaser.AUTO,
      width: 117,
      height: 117,
      scene: [ Scene ],
      parent: 'gameContainer',
      pixelArt: true,
    };
    this.phaserGame = new Phaser.Game(this.config);
  }

  ngOnInit(): void {

  }

}
