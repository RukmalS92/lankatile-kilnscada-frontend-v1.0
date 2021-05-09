import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { VfdComponent } from './vfd/vfd.component';
import { TempComponent } from './temp/temp.component';
import { DisplayComponent } from './display/display.component';
import { TimvalueComponent } from './timvalue/timvalue.component';

import { SharedService } from './services/shared.service';


@NgModule({
  declarations: [VfdComponent, TempComponent, DisplayComponent, TimvalueComponent],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports : [VfdComponent, TempComponent, DisplayComponent, TimvalueComponent],
  providers : [SharedService]
})
export class DisplayboardModule { }
