import { Injectable } from '@angular/core';
import { interval, of, Subject, Subscription } from 'rxjs';
import { map, catchError, retry } from 'rxjs/operators';
import { HttpClient, HttpRequest, HttpResponse } from '@angular/common/http';
import { ErrorHandlerService } from '../../errorHandler/error-handler.service';


@Injectable()
export class UpdateServiceService {

  private updateTemperatureSttings_URL = "http://localhost:3000/tempwr";
  private updateInverterSettings_URL = "http://localhost:3000/invwr";
  private updateTimeValueSettings_URL = "http://localhost:3000/timevaluewr";
  private retrieveTemperatureSV_URL = "http://localhost:3000/tempretrieve";
  private retrieveInverterSV_URL = "http://localhost:3000/invretrieve";

  constructor(private httpclient : HttpClient, private errorhandler : ErrorHandlerService) { }

  updateTemperatureSettings = (body) =>{
    return this.httpclient.post(this.updateTemperatureSttings_URL, body, {responseType : 'json'})
    .pipe(
      map(
        (data:any) => data
      ),
      catchError(this.errorhandler.handlerError)
    )
  }

  updateInverterSettings = (body) => {
    return this.httpclient.post(this.updateInverterSettings_URL, body, {responseType : 'json'})
    .pipe(
      map(
        (data:any) => data
      ),
      catchError(this.errorhandler.handlerError)
    )
  }

  updateTimeValueSettings = (body) => {
    return this.httpclient.post(this.updateTimeValueSettings_URL, body, {responseType : 'json'})
    .pipe(
      map(
        (data:any) => data
      ),
      catchError(this.errorhandler.handlerError)
    )
  }

  retrieveInverterSV = () => {
    return this.httpclient.get(this.retrieveInverterSV_URL, {responseType : 'json'})
    .pipe(
      retry(1),
      map(
        (data:any) => data
      ),
      catchError(this.errorhandler.handlerError)
    )
  }

  retrieveTemperatureSV = () => {
    return this.httpclient.get(this.retrieveTemperatureSV_URL, {responseType : 'json'})
    .pipe(
      retry(1),
      map(
        (data:any) => data
      ),
      catchError(this.errorhandler.handlerError)
    )
  }
}
