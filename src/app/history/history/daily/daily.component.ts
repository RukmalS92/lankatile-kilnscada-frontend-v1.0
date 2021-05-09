import { Component, OnDestroy, OnInit } from '@angular/core';
import { HistoryService } from '../../service/history.service'
import { MatTableDataSource } from '@angular/material/table';
import { MatProgressBar } from '@angular/material/progress-bar';
import { Subscription } from 'rxjs';

//iterface is used to make the custom data_variables
export interface temperatureController {
  controllerID : number,
  temperature : number,
  logtime : String
}

//iterface is used to make the custom data_variables
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-daily',
  templateUrl: './daily.component.html',
  styleUrls: ['./daily.component.css']
})

export class DailyComponent implements OnInit, OnDestroy {

  tempElementArray : any[] = [];

  initialUpdate : Boolean = false;

  historysubjectSubscription : Subscription = Subscription.EMPTY;
 
  constructor(private historyservice : HistoryService) { 
      this.historysubjectSubscription = historyservice.temphistorySubject.subscribe(
        (data:any) => {
          if(this.initialUpdate === false){
            this.tempElementArray = data;
            this.initialUpdate = true;
            this.historyservice.initialTempHistoryURLUpdateSubject.next('http://localhost:3000/temphistory?device=trcx&init=1')
          }
          else if(this.initialUpdate === true){
            data.forEach(element => {
              this.tempElementArray.push(element)
            });
          }
        }
      )
  }

  ngOnInit(): void {
    this.historyservice.updateTempHistory('http://localhost:3000/temphistory?device=trcx&init=0')
  }

  ngOnDestroy() : void {
    this.historysubjectSubscription.unsubscribe()
  }

}
