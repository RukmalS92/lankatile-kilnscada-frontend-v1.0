import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AppServiceService } from 'src/app/app-service/app-service.service';
import { UpdateServiceService } from '../update-service/update-service.service';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-inverter',
  templateUrl: './inverter.component.html',
  styleUrls: ['./inverter.component.css'],
  animations : [
    trigger('fadeIn',[
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(5px)' }),
        animate('700ms', style({ opacity: 1, transform: 'translateY(0)' })),
      ])
    ])
  ]
})
export class InverterComponent implements OnInit, OnDestroy {
  responseStatusInverters : String = "";
  responseStatusTimeValue : String = "";

  inverterValues : any[] = []
  timeValue : number = 123;

  formUpdateStatusDisplayStringInverters : String = "Pending";
  formUpdateStatusDisplayStringTimeValue : String = "Pending"

  invSubjectSubscription : Subscription  = Subscription.EMPTY;
  inverterDataUpdateSubscription : Subscription = Subscription.EMPTY;
  timevalueDataUpdateSubscription : Subscription = Subscription.EMPTY;
  invSVRetrieveSubscription : Subscription = Subscription.EMPTY;

  @ViewChild('inverter_settings') inverter_settings;
  @ViewChild('timevalue_settings') timevalue_settings;

  constructor(private appservice : AppServiceService, private updateservice : UpdateServiceService) { 
      this.invSubjectSubscription = this.appservice.invSubject.subscribe(
        (data:any) => {
          // console.log( this.inverterValues)
          this.inverterValues = []
          let invValueArray = data.data;
          invValueArray.forEach(element => {
            this.inverterValues.push(element[1]);
          });
          this.timeValue = data.timevalue;
        }
      )
   }

  ngOnInit(): void {
    this.invSVRetrieveSubscription = this.updateservice.retrieveInverterSV().subscribe(
      (data:any) => {
          this.inverter_settings.setValue({
              'inv1_setvalue' : data.inv1,
              'inv2_setvalue' : data.inv2
          })

          this.timevalue_settings.setValue(
            {
              'time_value_set' : data.timevalue
            }
          )
      }
    )
  }

  onInverterSubmit() {
    let inverterValues = Object.values(this.inverter_settings.value);
    let iObject = {
      inv1 : Number(inverterValues[0]),
      inv2 : Number(inverterValues[1])
    }
    this.responseStatusInverters = "";
    this.formUpdateStatusDisplayStringInverters = "Pending...";
    this.inverterDataUpdateSubscription = this.updateservice.updateInverterSettings(iObject).subscribe(
      (response:any) => {
        this.responseStatusInverters = response.status;
        if(response.status === "success"){
          this.formUpdateStatusDisplayStringInverters = "Update success...";
        }
        else if(response.status === "fail"){
          this.formUpdateStatusDisplayStringInverters = "Update failed...";
        }
      }
    )
  }

  ontimevalueSubmit() {
    let timevalue = this.timevalue_settings.value.time_value_set;
    let tObject = {timevalue : Number(timevalue)};
    this.responseStatusTimeValue = "";
    this.formUpdateStatusDisplayStringTimeValue = "Pending...";
    this.timevalueDataUpdateSubscription = this.updateservice.updateTimeValueSettings(tObject).subscribe(
      (response:any) => {
        this.responseStatusTimeValue = response.status;
        if(response.status === "success"){
          this.formUpdateStatusDisplayStringTimeValue = "Update success...";
        }
        else if(response.status === "fail"){
          this.formUpdateStatusDisplayStringTimeValue = "Update failed...";
        }
      }
    )
  }

  ngOnDestroy() : void {
    this.inverterDataUpdateSubscription.unsubscribe();
    this.timevalueDataUpdateSubscription.unsubscribe();
    this.invSubjectSubscription.unsubscribe();
    this.invSVRetrieveSubscription.unsubscribe();
  }

}
