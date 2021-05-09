import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateMainComponent } from './update-main/update-main.component';
import { TemperatureComponent } from './temperature/temperature.component';
import { InverterComponent } from './inverter/inverter.component';

const routes: Routes = [
  {
    path : "update",
    component : UpdateMainComponent,
    children : [
      {path : "temperature", component : TemperatureComponent},
      {path : "inverter", component : InverterComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UpdateParamRoutingModule { }
