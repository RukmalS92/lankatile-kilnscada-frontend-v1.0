import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { interval, of, Subject, Subscription } from 'rxjs';
import { map, catchError, retry } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { ErrorHandlerService } from '../errorHandler/error-handler.service';


@Injectable({
  providedIn: 'root'
})

@Injectable()
export class AppServiceService implements OnInit, OnDestroy {

  temperatureURL = 'http://localhost:3000/temp';
  invURL = 'http://localhost:3000/inv';
  timevalueURL = "http://localhost:3000/timevalue";
  //subscription
  temperaturedataSubscription : Subscription = Subscription.EMPTY;
  inverterdataSubscription : Subscription = Subscription.EMPTY;
  intervalSubscription : Subscription =  Subscription.EMPTY;
  timevalueSubscription : Subscription = Subscription.EMPTY;
  
  //data transfer subjects
  tempSubject = new Subject()
  invSubject = new Subject()
  timevalueSubject = new Subject()

  constructor(private httpclient : HttpClient, private errorHandler : ErrorHandlerService) { 
    this.intervalSubscription = interval(5000)
    .subscribe(
      (d:any) =>{
        this.getTemperatureData();
        this.getInverterData();
        // this.getTimeValueData();
      }
    )
  }

  //updating realtime temperature data
  getTemperatureData = () => {
   this.temperaturedataSubscription = this.httpclient.get(this.temperatureURL, {responseType : 'json'})
    .pipe(
      retry(1),
      map(
        (data : any) => data
      ),
      catchError (this.errorHandler.handlerError)
    )
    .subscribe(
      (data :any) => this.tempSubject.next(data)
    )
  }

  //updating realtime inverter data
  getInverterData = () => {
    this.inverterdataSubscription = this.httpclient.get(this.invURL, {responseType : 'json'})
    .pipe(
      retry(1),
      map(
        (data :any) => data
      ),
      catchError(this.errorHandler.handlerError)
    )
    .subscribe(
      (data :any) => this.invSubject.next(data)
    )
  }

  //upate timevalue
  getTimeValueData = () => {
    this.timevalueSubscription = this.httpclient.get(this.timevalueURL, {responseType : 'json'})
    .pipe(
      retry(1),
      map(
        (data:any) => data
      ),
      catchError(this.errorHandler.handlerError)
    )
    .subscribe(
      (data:any) => this.timevalueSubject.next(data)
    )
  }

  ngOnInit() :void {

  }

  ngOnDestroy() : void {
    this.intervalSubscription.unsubscribe()
    this.temperaturedataSubscription.unsubscribe()
    this.inverterdataSubscription.unsubscribe()
    this.timevalueSubscription.unsubscribe()
  }
}
