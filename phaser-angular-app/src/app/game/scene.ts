import Phaser from 'phaser';
import { GameObjects } from 'phaser';
import { Injectable } from '@angular/core';
import { newArray } from '@angular/compiler/src/util';

@Injectable()

export class Scene extends Phaser.Scene {

  private bg?: GameObjects.Image;
  private toucanNames: string[];
  matrixPositions: { x: number, y: number, toucanPiece?: GameObjects.Image }[][];

  constructor() {
    super({ key: "Bootloader" });
    this.matrixPositions = new Array(3);
    this.matrixPositions[0] = [{ x: 39 / 2, y: 39 / 2 }, { x: 39 + (39 / 2), y: 39 / 2 }, { x: 78 + (39 / 2), y: 39 / 2 }];
    this.matrixPositions[1] = [{ x: 39 / 2, y: 39 + (39 / 2) }, { x: 39 + (39 / 2), y: 39 + (39 / 2) }, { x: 78 + (39 / 2), y: 39 + (39 / 2) }];
    this.matrixPositions[2] = [{ x: 39 / 2, y: 78 + (39 / 2) }, { x: 39 + (39 / 2), y: 78 + (39 / 2) }, { x: 78 + (39 / 2), y: 78 + (39 / 2) }];
    this.toucanNames = ['toucan00', 'toucan01', 'toucan02', 'toucan10', 'toucan11', 'toucan12', 'toucan20', 'toucan21', 'space'];
  }



  preload() {
    this.load.path = "../../assets/";
    this.load.image('bg', 'fondo.png');
    this.load.image('toucan00', '1.png');
    this.load.image('toucan01', '2.png');
    this.load.image('toucan02', '3.png');
    this.load.image('toucan10', '4.png');
    this.load.image('toucan11', '5.png');
    this.load.image('toucan12', '6.png');
    this.load.image('toucan20', '7.png');
    this.load.image('toucan21', '8.png');
    this.load.image('space', '10.png');
  }

  shuffle(array: string[]) {

    let currentIndex = array.length, randomIndex;
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array;
  }

  setPieces() {
    let toucanNamesShuffled = this.shuffle(this.toucanNames);
    let toucanNameIndex = 0;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        this.matrixPositions[i][j].toucanPiece = this.add.image(this.matrixPositions[i][j].x, this.matrixPositions[i][j].y, toucanNamesShuffled[toucanNameIndex]);
        this.matrixPositions[i][j].toucanPiece!.setDepth(0);
        this.matrixPositions[i][j].toucanPiece!.setName(toucanNamesShuffled[toucanNameIndex]);
        if (toucanNamesShuffled[toucanNameIndex] == 'space') {
          this.matrixPositions[i][j].toucanPiece!.setInteractive();
          this.matrixPositions[i][j].toucanPiece!.input.dropZone = true;
        }
        toucanNameIndex++;
      }
    }
  }

  spaceSearch(): { i: number, j: number } {
    let position = { i: -1, j: -1 };
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (this.matrixPositions[i][j].toucanPiece!.name == 'space') {
          position = { i, j }
        }
      }
    }
    return position;
  }

  defineDraggable() {



    //top
    if (this.spaceSearch().i > 0) {
      this.matrixPositions[this.spaceSearch().i - 1][this.spaceSearch().j].toucanPiece!.setInteractive();
      this.input.setDraggable(this.matrixPositions[this.spaceSearch().i - 1][this.spaceSearch().j].toucanPiece!);
    }

    //bottom
    if (this.spaceSearch().i < 2) {
      this.matrixPositions[this.spaceSearch().i + 1][this.spaceSearch().j].toucanPiece!.setInteractive();
      this.input.setDraggable(this.matrixPositions[this.spaceSearch().i + 1][this.spaceSearch().j].toucanPiece!);
    }

    //left
    if (this.spaceSearch().j > 0) {
      this.matrixPositions[this.spaceSearch().i][this.spaceSearch().j - 1].toucanPiece!.setInteractive();
      this.input.setDraggable(this.matrixPositions[this.spaceSearch().i][this.spaceSearch().j - 1].toucanPiece!);
    }

    //right
    if (this.spaceSearch().j < 2) {
      this.matrixPositions[this.spaceSearch().i][this.spaceSearch().j + 1].toucanPiece!.setInteractive();
      this.input.setDraggable(this.matrixPositions[this.spaceSearch().i][this.spaceSearch().j + 1].toucanPiece!);
    }
  }

  removeAllInteractives() {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (this.matrixPositions[i][j].toucanPiece!.name == 'space') {
          // this.matrixPositions[i][j].toucanPiece!.setInteractive();
          // this.matrixPositions[i][j].toucanPiece!.input.dropZone = true;
        } else {
          this.matrixPositions[i][j].toucanPiece!.disableInteractive();
        }
      }
    }
  }

  changePieces(toucanPiece: GameObjects.Image) {
    let { i, j } = this.spaceSearch();
    for (let iMatrix = 0; iMatrix < 3; iMatrix++) {
      for (let jMatrix = 0; jMatrix < 3; jMatrix++) {
        if (this.matrixPositions[iMatrix][jMatrix].toucanPiece!.name == toucanPiece.name) {
          let space = this.matrixPositions[i][j];
          this.matrixPositions[i][j] = this.matrixPositions[iMatrix][jMatrix];
          this.matrixPositions[iMatrix][jMatrix] = space;
          // this.matrixPositions[iMatrix][jMatrix].toucanPiece!.setInteractive();
          // this.matrixPositions[iMatrix][jMatrix].toucanPiece!.input.dropZone = true;
        }
      }
    }
  }




  create() {

    this.bg = this.add.image(this.scale.width / 2, this.scale.height / 2, 'bg');

    this.setPieces();

    this.defineDraggable();

    const events = Phaser.Input.Events;

    this.input.on(events.DRAG_START, (pointer: Phaser.Input.Pointer, toucanPiece: GameObjects.Image) => {

      toucanPiece.setDepth(100);
    });

    this.input.on(events.DRAG, (pointer: Phaser.Input.Pointer, obj: GameObjects.Image, dragX: number, dragY: number) => {
      obj.x = dragX;
      obj.y = dragY;
    });

    this.input.on(events.DRAG_END, (pointer: Phaser.Input.Pointer, toucanPiece: GameObjects.Image, dropZone: boolean) => {
      if (!dropZone) {
        toucanPiece.x = toucanPiece.input.dragStartX;
        toucanPiece.y = toucanPiece.input.dragStartY;
      }
    });

    this.input.on(events.DROP, (pointer: Phaser.Input.Pointer, toucanPiece: GameObjects.Image, dropZone: GameObjects.Image) => {

      let x = toucanPiece.input.dragStartX;
      let y = toucanPiece.input.dragStartY;

      toucanPiece.setDepth(0);
      toucanPiece.x = dropZone.x;
      toucanPiece.y = dropZone.y;

      let { i, j } = this.spaceSearch();

      this.matrixPositions[i][j].toucanPiece!.x = x;
      this.matrixPositions[i][j].toucanPiece!.y = y;
      this.changePieces(toucanPiece);
      this.removeAllInteractives();
      this.defineDraggable();

      this.isWinner();
    });

  }

  isWinner(){
    let correctToucanPieces = 0;

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if(this.matrixPositions[i][j].toucanPiece!.name == `toucan${i}${j}`){
          correctToucanPieces++;
        }
      }
    }

    if(correctToucanPieces==8){
      alert('ganaste');
    }
  }

  update(time: number, delta: number) {

  }


}





