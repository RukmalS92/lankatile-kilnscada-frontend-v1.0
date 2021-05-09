import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistoryRoutingModule } from './history-routing.module';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { HistorynavbarComponent } from '../history/historynavbar/historynavbar.component';
import { HistoryComponent } from './history/history.component';
import { DailyComponent } from './history/daily/daily.component';
import { HistoryService } from './service/history.service';
import { InverterComponent } from './history/inverter/inverter.component';


@NgModule({
  declarations: [HistorynavbarComponent, HistoryComponent, DailyComponent, InverterComponent],
  imports: [
    CommonModule,
    HistoryRoutingModule,
    MatProgressBarModule
  ],
  exports :  [HistorynavbarComponent,DailyComponent,HistoryComponent],
  providers: [HistoryService]
})
export class HistoryModule { }
