import { Component } from '@angular/core';
import { RestartService } from './services/restart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {


  title = 'Windows 7 Puzzle';

  showGame: boolean;
  showStartWindow: boolean;
  showRestartWindow: boolean;

  constructor(private restartService: RestartService){
    this.showGame = false;
    this.showStartWindow = true;
    this.showRestartWindow = false;
    this.restartService.showRestartWindow.subscribe(() =>{
      this.toggleRestartWindow();
    } )
  }

  start(){
    this.showStartWindow = false;
    this.showGame = true;
  }

  toggleRestartWindow(){
    this.showRestartWindow = true;
    this.showGame = false;
  }

  restart(){
    this.showRestartWindow = false;
    this.showGame = true;
    this.restartService.restart.emit();
  }
}
