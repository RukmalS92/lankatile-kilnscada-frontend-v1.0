import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { UpdateParamRoutingModule } from './update-param-routing.module';

import { UpdateMainComponent } from './update-main/update-main.component';
import { UpdateNavbarComponent } from './update-navbar/update-navbar.component';
import { TemperatureComponent } from './temperature/temperature.component';
import { InverterComponent } from './inverter/inverter.component';

import { UpdateServiceService } from './update-service/update-service.service';
import { InvDirectiveDirective } from './inverter/inv-param-directive/inv-directive.directive';

@NgModule({
  declarations: [UpdateMainComponent, UpdateNavbarComponent, TemperatureComponent, InverterComponent,InvDirectiveDirective],
  imports: [
    CommonModule,
    FormsModule,
    UpdateParamRoutingModule
  ],
  exports : [UpdateMainComponent, UpdateNavbarComponent, TemperatureComponent, InverterComponent],
  providers : [UpdateServiceService]
})
export class UpdateParamModule { }
