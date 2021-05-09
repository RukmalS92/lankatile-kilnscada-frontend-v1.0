import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-timvalue',
  templateUrl: './timvalue.component.html',
  styleUrls: ['./timvalue.component.css']
})
export class TimvalueComponent implements OnInit {

  @Input('timevalue') timevalue : number;

  constructor() { }

  ngOnInit(): void {
  }

}
