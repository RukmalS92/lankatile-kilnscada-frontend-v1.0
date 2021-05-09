import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DisplayComponent } from './displayboard/display/display.component';
import { HistoryComponent } from './history/history/history.component';
import { UpdateMainComponent } from './update-param/update-main/update-main.component';

const routes: Routes = [
  {path : "", redirectTo:"dashboard", pathMatch: 'full'},
  {path : "dashboard", component : DisplayComponent},
  {path : "history", component : HistoryComponent},
  {path : "update", component : UpdateMainComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
