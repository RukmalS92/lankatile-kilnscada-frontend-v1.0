import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { HistoryService } from '../../service/history.service';

@Component({
  selector: 'app-inverter',
  templateUrl: './inverter.component.html',
  styleUrls: ['./inverter.component.css']
})
export class InverterComponent implements OnInit, OnDestroy {
  initialUpdate : Boolean = false;
  historySubjectSubscription : Subscription  = Subscription.EMPTY;

  invElementArray : any[] = []

  constructor(private historyservice : HistoryService) { 
    this.historySubjectSubscription = historyservice.invhistorySubject.subscribe(
      (data:any) => {
        if(this.initialUpdate === false){
          this.invElementArray = data
          this.historyservice.initialINVHistoryURLUpdateSubject.next('http://localhost:3000/invhistory?device=inv&init=1')
          this.initialUpdate = true; 
        }
        else{
          data.forEach(element => {
            this.invElementArray.push(element)
          });
          
        }
      }
    )
  }

  ngOnInit(): void {
    this.historyservice.updateINVhistory('http://localhost:3000/invhistory?device=inv&init=0');
  }

  ngOnDestroy(): void {
    this.historySubjectSubscription.unsubscribe();
  }

}
