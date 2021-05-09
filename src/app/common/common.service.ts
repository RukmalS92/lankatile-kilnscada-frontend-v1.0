import { Injectable } from '@angular/core';

export interface temperatureController {
  controllerID : String,
  temperature : Number,
  logtime : String
}

@Injectable({
  providedIn: 'root'
})

export class CommonService {

  constructor() { }
}
