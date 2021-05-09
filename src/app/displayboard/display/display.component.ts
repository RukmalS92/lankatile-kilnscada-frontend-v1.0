import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppServiceService } from '../../app-service/app-service.service';
import { Subscription } from 'rxjs';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css'],
  animations : [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(5px)' }),
        animate('700ms', style({ opacity: 1, transform: 'translateY(0)' })),
      ])
      ]
    )
  ]
})
export class DisplayComponent implements OnInit, OnDestroy {
  tempIDArray : any[] = []
  tempDataArray : any[] = []
  invIDArray : any[] = []
  invDataArray : any[] = []
  timevalue : number;
  tempsubjectSubscription : Subscription = Subscription.EMPTY;
  invubjectSubscription : Subscription = Subscription.EMPTY;
  timvalueSubjectSubscription : Subscription = Subscription.EMPTY;

  constructor(private appservice : AppServiceService) { 
    this.tempsubjectSubscription = appservice.tempSubject.subscribe(
      (data:any) => {
        for (let index = 0; index < data.data.length; index++) {
          const element = data.data[index];
          this.tempIDArray[index] = element[0];
          this.tempDataArray[index] = element[1];
        }
      }
    )

    this.invubjectSubscription = appservice.invSubject.subscribe(
      (data:any) => {
        for (let index = 0; index < data.data.length; index++) {
          const element = data.data[index];
          this.invIDArray[index] = element[0];
          this.invDataArray[index] = element[1];
        }
        this.timevalue = data.timevalue
      }
    )

    this.timvalueSubjectSubscription = appservice.timevalueSubject.subscribe(
      (data:any) => {
        this.timevalue = data.value;
      }
    )

    
  }

  ngOnInit(): void {
    
  }

  ngOnDestroy() : void {
    this.tempsubjectSubscription.unsubscribe()
    this.invubjectSubscription.unsubscribe()
    this.timvalueSubjectSubscription.unsubscribe()
  }

}
