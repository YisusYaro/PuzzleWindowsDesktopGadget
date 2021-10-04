import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RestartService {

  static instance: RestartService;

  showRestartWindow: EventEmitter<void> = new EventEmitter();
  restart: EventEmitter<void> = new EventEmitter();
  
  constructor() { 
    RestartService.instance = this;
  }

  

}
