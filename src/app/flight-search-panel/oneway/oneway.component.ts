import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import {  FlightOfferResponseModel } from 'src/app/Models/FlightOffer';
import {FlightSearchApiService} from 'src/app/services/flight-search-api.service';
import {AdditionalInformation, CabinRestriction, DepartureDateTimeRange, FlightFilters, FlightOfferRequestModel, OriginDestination, PricingOptions, SearchCriteria, Traveler} from '../../Models/FlightRequstModel';

@Component({
  selector: 'app-oneway',
  templateUrl: './oneway.component.html',
  styleUrls: ['./oneway.component.scss']
})
export class OnewayComponent implements OnInit {
  current_date:any;
  flight_details:any={
    passenger_detail:undefined
  }

  @Output() searchResult: EventEmitter<any> =
  new EventEmitter<any>();
  @Output() passengerChange2 = new EventEmitter<any>();

  FlightOfferRequestModel: FlightOfferRequestModel [] | undefined;

  flightofferlist!:Observable<any[]>;

  public fromCity:any;
  passenger:any={
    adult:1,
    childeren:0,
    infant:0,
    total:1,
    cabinClass:'e',
    cabinClassFull:'Economy'
  }

  public adult_count=1;
  public child_count=0;
  public infant_count=0;
  public totalPassengerCount=1;

  public dateselected:any;
  public resultDataList: FlightOfferResponseModel= new FlightOfferResponseModel;

  public date_selected:string="";

  constructor(private service:FlightSearchApiService,private router: Router) { }


  ngOnInit(): void {
    this.current_date=new Date().toISOString().substr(0, 10);
     this.date_selected=this.current_date;
  }

  setDate(e:any){
         this.date_selected= e.target.value;
  }


  public departureDateTimeRange : DepartureDateTimeRange= {
    date: '18/08/2022'
  };
  

  public originDestinations : OriginDestination[]= [{
    id: "1",
    originLocationCode: "DOH",
    destinationLocationCode: "COK",
    departureDateTimeRange: this.departureDateTimeRange
  }];
  public travelers: Traveler[]=[];
  // public travelers : Traveler[]= [{
  //   id: "1",
  //   travelerType: "ADULT",
  //   fareOptions: ["STANDARD"]
  // }];

  public additionalInformation: AdditionalInformation= {
    chargeableCheckedBags: true,
    brandedFares: true,
    fareRule: true
  }

  
  public pricingOptions : PricingOptions={
    fareType: ["PUBLISHED"],
    includedCheckedBagsOnly: true
  }

  public cabinRestriction : CabinRestriction[]=[{
    cabin: "ECONOMY",
    originDestinationIds: ["1"]
  }];

  public flightFilters : FlightFilters={
    cabinRestrictions: this.cabinRestriction
  }

  public searchCriteria : SearchCriteria={
    maxFlightOffers: 250,
    additionalInformation: this.additionalInformation,
    pricingOptions: this.pricingOptions,
    flightFilters: this.flightFilters
  };

  
  public flightobj :  FlightOfferRequestModel = {
    currencyCode: "NGN",
    travelers: this.travelers,
    sources: ["GDS"],
    searchCriteria: this.searchCriteria,
    originDestinations: this.originDestinations
  };


//   selectOption(e: MatAutocompleteSelectedEvent) {

//     const item: **YOUR INTERFACE** = e.option.value;
//     console.log(item);
//  }
  
 public search(){
  
  console.log(this.fromCity);
  var date_input = (<HTMLInputElement>document.getElementById('journeydate')).value;
  this.departureDateTimeRange.date=date_input;

  var travid=1;
  //For ADULT
  
  //this.travelers.length=0;
  this.travelers=[];
  for (let i = 1; i <= this.adult_count; i++) {
      let obj = new Traveler();
      obj.id =travid.toString();
      obj.travelerType = "ADULT"; 
      obj.fareOptions = ["STANDARD"]; 
      this.travelers.push(obj);
      travid++;
  }
  //For child
  for (let i = 1; i <= this.child_count; i++) {
    let obj = new Traveler();
    obj.id = travid.toString();
    obj.travelerType = "CHILD"; 
    obj.fareOptions = ["STANDARD"]; 
    this.travelers.push(obj);
    travid++;
  }
   //For INFANT
   for (let i = 1; i <= this.infant_count; i++) {
    let obj = new Traveler();
    obj.id = travid.toString();
    obj.travelerType = "HELD_INFANT"; 
    obj.fareOptions = ["STANDARD"]; 
    obj.associatedAdultId = "1"; 
    this.travelers.push(obj);
    travid++;
  }
  
  this.flightobj.travelers=this.travelers;

  this.service.FlightOfferlist(this.flightobj)
    .subscribe(
      (data: FlightOfferResponseModel) => {
        this.resultDataList = data;
       
        if(data)
        { //this.resultDataList
          console.log(this.resultDataList);
          this.searchResult.emit(this.resultDataList);
        
        }
        console.log('Success');
      },
      (error: any) => {
        console.log('error');
      });
}

public selectTableEvent(code: any) {
 console.log('test');
}

passengerChange(e: any) {
  if(e != null){
    this.adult_count=e.adult;
    this.child_count=e.childeren;
     this.infant_count=e.infant;
     this.totalPassengerCount= e.total;//this.adult_count+this.child_count+this.infant_count;
     this.passengerChange2.emit(e);
  }
   
}

cabinChange(e:any){
   if(e != null){
          this.cabinRestriction[0].cabin=e;
   }
}

fromClicked(e: any,type:string) {
 
  //console.log(date_input);
  if(type == "from"){
    this.originDestinations[0].originLocationCode= e.CityCode;
  }
  else if(type="to"){
    this.originDestinations[0].destinationLocationCode= e.CityCode;
  }

}


valuechange(e: any){
  console.log(e);
}
 
}
