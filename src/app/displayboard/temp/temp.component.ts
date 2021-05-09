import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-temp',
  templateUrl: './temp.component.html',
  styleUrls: ['./temp.component.css']
})
export class TempComponent implements OnInit {

  //input from parent
  @Input('controllerName') controller_name : string = "NaN";
  @Input('temperature') temperature : Number = 89;

  constructor() { }

  ngOnInit(): void {
  }

}
