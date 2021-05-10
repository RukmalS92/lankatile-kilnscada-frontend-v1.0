import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { interval, of, Subject, Subscription } from 'rxjs';
import { map, catchError, retry } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { ErrorHandlerService } from '../../errorHandler/error-handler.service'

@Injectable()
export class HistoryService implements OnDestroy, OnInit {
  //update time interval
  updateTimeInterval = 2000;
  //subscrption
  tempHistorySubscription : Subscription = Subscription.EMPTY;
  invHistorySubscription : Subscription = Subscription.EMPTY;
  intervalSubscription : Subscription = Subscription.EMPTY;

  initialTempHistoryURLUpdateSubscription : Subscription = Subscription.EMPTY;
  initialINVHistoryURLUpdateSubscription : Subscription = Subscription.EMPTY;

  //history data update URL
  temphistoryFinalURL = "";
  invhistoryFinalURL = "";
  //subject to update history data
  temphistorySubject = new Subject()
  invhistorySubject = new Subject()
  //subject to update initial hitory update to tabel
  initialTempHistoryURLUpdateSubject = new Subject()
  initialINVHistoryURLUpdateSubject = new Subject()
  //multicast subject for temperature and vfd device data identification
  multicastDeviceSubject = new Subject()

  history_initial_flag = 0;

  constructor(private httpclient : HttpClient, private errorhandler : ErrorHandlerService) { 
    //intial flag update subscription
    this.initialTempHistoryURLUpdateSubscription =  this.initialTempHistoryURLUpdateSubject.subscribe(
      (data:any) => {
        this.temphistoryFinalURL = data;
      }
    )
    this.initialINVHistoryURLUpdateSubscription = this.initialINVHistoryURLUpdateSubject.subscribe(
      (data:any) => {
        this.invhistoryFinalURL = data;
      }
    )

    //update histroy data on interval
    this.intervalSubscription = interval(this.updateTimeInterval)
    .subscribe(
      (data:any) => {
        this.updateTempHistory(this.temphistoryFinalURL)
        this.updateINVhistory(this.invhistoryFinalURL)
      }
    )
  }

  //update temperature
  updateTempHistory = (historyURLencoded) => {
    this.tempHistorySubscription = this.httpclient.get(historyURLencoded, {responseType : 'json'})
    .pipe(
      retry(1),
      map((data:any)=>data),
      catchError(this.errorhandler.handlerError)
    )
    .subscribe(
      (data:any) => {
        this.temphistorySubject.next(data);
      }
    )
  }

  //update inverter data
  updateINVhistory = (historyURLencoded) => {
    this.invHistorySubscription = this.httpclient.get(historyURLencoded, {responseType : 'json'})
    .pipe(
      retry(1),
      map((data:any) => data),
      catchError(this.errorhandler.handlerError)
    )
    .subscribe(
      (data:any) => {
        this.invhistorySubject.next(data)
      }
    )

  }

  ngOnInit() : void {
    
  }

  ngOnDestroy() : void {
    this.tempHistorySubscription.unsubscribe()
    this.intervalSubscription.unsubscribe()
    this.initialTempHistoryURLUpdateSubject.unsubscribe()
    this.initialTempHistoryURLUpdateSubscription.unsubscribe()
  }

}

//this.historyFinalURL = 'http://localhost:3000/temphistory?device=' + encodeURIComponent(data.device) + '&id=' + encodeURIComponent(data.id) + '&init=' + encodeURIComponent(data.initflag);