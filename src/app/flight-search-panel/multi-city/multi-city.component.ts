import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-multi-city',
  templateUrl: './multi-city.component.html',
  styleUrls: ['./multi-city.component.scss']
})
export class MultiCityComponent implements OnInit {
  current_date:any;
  flight1_details:any={
    passenger_detail:undefined
  }
  flight2_details:any={
    passenger_detail:undefined
  }
  multi_city_flight_list:any[]=[];
  constructor() { }

  ngOnInit(): void {
    this.current_date=new Date().toISOString().substr(0, 10);
  }
  addAnotherFlight(){
    if(this.multi_city_flight_list.length>=3){
      alert("Max Citry Limit Reached!!")
    }else{
      this.multi_city_flight_list.push({
        flight_details:{
        passenger_detail:undefined
      }});
    }

  }
  removeFlight(index:number){
    this.multi_city_flight_list.splice(index,1);
  }
}
