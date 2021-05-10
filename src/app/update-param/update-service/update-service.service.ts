import { Injectable } from '@angular/core';
import { interval, of, Subject, Subscription } from 'rxjs';
import { map, catchError, retry } from 'rxjs/operators';
import { HttpClient, HttpRequest, HttpResponse } from '@angular/common/http';
import { ErrorHandlerService } from '../../errorHandler/error-handler.service';


@Injectable()
export class UpdateServiceService {

  private updateTemperatureSttings_URL = "http://localhost:3000/tempwr";
  private updateInv1Inv2CycletimeSettings_URL = "http://localhost:3000/cycleinvwr";
  private updateInv3Settings_URL = "http://localhost:3000/inv3wr";
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

  updateInv1Inv2CycletimeSettings = (body) => {
    return this.httpclient.post(this.updateInv1Inv2CycletimeSettings_URL, body, {responseType : 'json'})
    .pipe(
      map(
        (data:any) => data
      ),
      catchError(this.errorhandler.handlerError)
    )
  }

  updateInv3Settings = (body) => {
    return this.httpclient.post(this.updateInv3Settings_URL, body, {responseType : 'json'})
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
