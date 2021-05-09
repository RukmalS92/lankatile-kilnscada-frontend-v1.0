import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//modules
import { DisplayboardModule } from './displayboard/displayboard.module';
import { NavbarComponent } from './navbar/navbar.component';
import { HistoryModule } from './history/history.module';
import { UpdateParamModule } from './update-param/update-param.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//services
import { ErrorHandlerService } from './errorHandler/error-handler.service';
import { AppServiceService } from './app-service/app-service.service';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DisplayboardModule,
    HistoryModule,
    UpdateParamModule,
    BrowserAnimationsModule,
  ],
  providers: [ErrorHandlerService, AppServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
