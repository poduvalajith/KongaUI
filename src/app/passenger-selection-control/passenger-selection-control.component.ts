import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {NgbDropdownConfig} from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: '[appPassengerSelectionControl]',
  templateUrl: './passenger-selection-control.component.html',
  styleUrls: ['./passenger-selection-control.component.scss'],
  providers:[NgbDropdownConfig]
})
export class PassengerSelectionControlComponent implements OnInit {

  constructor(config: NgbDropdownConfig) { 
    config.autoClose = false;
  }
  
  
  //@Input() 
  passenger:any={
    adult:1,
    childeren:0,
    infant:0,
    total:1,
    cabinClass:'e',
    cabinClassFull:'Economy'
  }
  @Output() passengerChange = new EventEmitter<any>();
  @Output() cabinChange = new EventEmitter<any>();

  ngOnInit(): void {
    this.passengerChange.emit(this.passenger);
  }
  incrementPassengers(passengerType:string,e:any){
    e.stopPropagation();
    e.preventDefault();
    this.passenger[passengerType]=this.passenger[passengerType]+1;
    this.passenger.total=(this.passenger.adult+this.passenger.childeren+this.passenger.infant);
    this.passengerChange.emit(this.passenger);
  }
  decrementPassengers(passengerType:string,e:any){
    e.stopPropagation();
    e.preventDefault();
    if(this.passenger[passengerType]!=0){
      this.passenger[passengerType]=this.passenger[passengerType]-1;
      this.passenger.total=(this.passenger.adult+this.passenger.childeren+this.passenger.infant);
      this.passengerChange.emit(this.passenger);
    }
    
  }

  onClickCabin(cabinClass:string){
           this.cabinChange.emit(cabinClass);
  }

  stopEventProp(e:any){
    e.stopPropagation();
    e.preventDefault();
  }
}
