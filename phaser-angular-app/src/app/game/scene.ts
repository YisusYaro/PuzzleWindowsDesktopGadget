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
    this.toucanNames = ['toucan1', 'toucan2', 'toucan3', 'toucan4', 'toucan5', 'toucan6', 'toucan7', 'toucan8', 'space'];
  }



  preload() {
    this.load.path = "../../assets/";
    this.load.image('toucan1', '1.png');
    this.load.image('toucan2', '2.png');
    this.load.image('toucan3', '3.png');
    this.load.image('toucan4', '4.png');
    this.load.image('toucan5', '5.png');
    this.load.image('toucan6', '6.png');
    this.load.image('toucan7', '7.png');
    this.load.image('toucan8', '8.png');
    this.load.image('space', '10.png');
  }

  shuffle(array: any) {
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
        if(toucanNamesShuffled[toucanNameIndex]!='space'){
          this.matrixPositions[i][j].toucanPiece = this.add.image(this.matrixPositions[i][j].x, this.matrixPositions[i][j].y, toucanNamesShuffled[toucanNameIndex]).setInteractive();
          this.input.setDraggable(this.matrixPositions[i][j].toucanPiece!);
        }
        else{
          this.matrixPositions[i][j].toucanPiece = this.add.image(this.matrixPositions[i][j].x, this.matrixPositions[i][j].y, toucanNamesShuffled[toucanNameIndex]);
        }
        this.matrixPositions[i][j].toucanPiece!.setDepth(0);
        toucanNameIndex++;
      }
    }



  }

  create() {

    this.setPieces();

    const events = Phaser.Input.Events;

    this.input.on(events.DRAG_START, (pointer: Phaser.Input. Pointer, toucanPiece: GameObjects.Image) => {
      console.log(pointer.position);
      toucanPiece.setDepth(100);
    });

    this.input.on(events.DRAG, (pointer: any, obj: any, dragX: any, dragY: any) => {
      obj.x = dragX;
      obj.y = dragY;
    });

    this.input.on(events.DRAG_END, (pointer: any, toucanPiece: GameObjects.Image, dragX: any, dragY: any) => {
      toucanPiece.setDepth(0);
    });
  }

  update(time: number, delta: number) {

  }


}