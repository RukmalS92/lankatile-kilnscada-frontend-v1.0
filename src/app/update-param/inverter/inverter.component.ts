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

  @ViewChild('inverter_settings') inv1inv2cycletime_settings;
  @ViewChild('timevalue_settings') inv3_settings;

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
          this.inv1inv2cycletime_settings.setValue({
              'inv1_setvalue' : data.inv1,
              'inv2_setvalue' : data.inv2,
              'time_value_set' : data.timevalue
          })

          this.inv3_settings.setValue(
            {
              'inv3_setvalue' : data.inv3
            }
          )
      }
    )
  }

  onInv1Inv2CycletimeSubmit() {
    let inverterValues = Object.values(this.inv1inv2cycletime_settings.value);
  
    let iObject = {
      timevalue : Number(inverterValues[2])
    }
    this.responseStatusInverters = "";
    this.formUpdateStatusDisplayStringInverters = "Pending...";
    this.inverterDataUpdateSubscription = this.updateservice.updateInv1Inv2CycletimeSettings(iObject).subscribe(
      (response:any) => {
        this.responseStatusInverters = response.status;
        this.invSVRetrieveSubscription = this.updateservice.retrieveInverterSV().subscribe(
          (response:any) => {
            this.inv1inv2cycletime_settings.setValue({
              'inv1_setvalue' : response.inv1,
              'inv2_setvalue' : response.inv2,
              'time_value_set' : response.timevalue
            })
          }
        )
        if(response.status === "success"){
          this.formUpdateStatusDisplayStringInverters = "Update success...";
        }
        else if(response.status === "fail"){
          this.formUpdateStatusDisplayStringInverters = "Update failed...";
        }
      }
    )
  }

  onInv3Submit() {
    let inv3value = this.inv3_settings.value.inv3_setvalue;
    let tObject = {inv3 : Number(inv3value)};
    this.responseStatusTimeValue = "";
    this.formUpdateStatusDisplayStringTimeValue = "Pending...";
    this.timevalueDataUpdateSubscription = this.updateservice.updateInv3Settings(tObject).subscribe(
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
