import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor() { }

  handlerError = (error) => {
    let e_message;
    if(error.error instanceof ErrorEvent){
      e_message = "Error : " + error.message;
    }
    else{
      e_message = "Error Code : " + error.status + "\n" + "Message : " + error.message;
    }
    // window.alert(e_message);
    return throwError(e_message);
  }
}
