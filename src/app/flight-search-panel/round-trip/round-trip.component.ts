import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import {  FlightOfferResponseModel } from 'src/app/Models/FlightOffer';
import {FlightSearchApiService} from 'src/app/services/flight-search-api.service';
import {FormControl} from '@angular/forms';
import {AdditionalInformation, CabinRestriction, DepartureDateTimeRange, FlightFilters, FlightOfferRequestModel, OriginDestination, PricingOptions, SearchCriteria, Traveler} from '../../Models/FlightRequstModel';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-round-trip',
  templateUrl: './round-trip.component.html',
  styleUrls: ['./round-trip.component.scss']
})
export class RoundTripComponent implements OnInit {
  date = new FormControl(new Date());
  serializedDate = new FormControl(new Date().toISOString())
  public disableSearch=false;

  public fromSelected="";
  public toSelected="";

  current_date:any;
  flight_details:any={
    passenger_detail:undefined
  }

  flight1_details:any={
    passenger_detail:undefined
  }
  flight2_details:any={
    passenger_detail:undefined
  }
  multi_city_flight_list:any[]=[];
  passenger:any={
    adult:1,
    childeren:0,
    infant:0,
    total:1,
    cabinClass:'e',
    cabinClassFull:'Economy'
  }

  @Output() searchResult: EventEmitter<any> =
  new EventEmitter<any>();
  @Output() passengerChange2 = new EventEmitter<any>();

  FlightOfferRequestModel: FlightOfferRequestModel [] | undefined;

  flightofferlist!:Observable<any[]>;

  public fromCity:any;
  public dateselected:any;
  public resultDataList: FlightOfferResponseModel= new FlightOfferResponseModel;
  constructor(private service:FlightSearchApiService,private router: Router
    , private toastr: ToastrService 
    ,private spinner: NgxSpinnerService
    ) { }

  public journeyDate_selected:string="";
  public returnDate_selected:string="";

  public adult_count=1;
  public child_count=0;
  public infant_count=0;
  public totalPassengerCount=1;


  ngOnInit(): void {
    this.current_date=new Date().toISOString().substr(0, 10);
    this.journeyDate_selected=this.current_date;
    this.returnDate_selected=this.current_date;
    (<HTMLInputElement>document.getElementById('homearea')).scrollIntoView();
  }
  public originDestinations : OriginDestination[]= [{
    id: "1",
    originLocationCode: "DOH",
    destinationLocationCode: "COK",
    departureDateTimeRange: new DepartureDateTimeRange
  },
  {

    id: "2",
    originLocationCode: "DOH",
    destinationLocationCode: "COK",
    departureDateTimeRange: new DepartureDateTimeRange

  }
];

  
public travelers: Traveler[]=[];
  // public travelers : Traveler[]= [{
  //   id: "1",
  //   travelerType: "ADULT",
  //   fareOptions: ["STANDARD"],
  //   associatedAdultId: undefined
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

  public search(){

    //validations start
  if(this.fromSelected ==""){
    //window.alert('Please select Origin') ;
    this.toastr.warning("Please select Origin");
    return;
}
else if(this.toSelected == ""){
   //window.alert('Please select Destination') ;
   this.toastr.warning("Please select Destination");
   return;
}
//validations end

    this.disableSearch=true;
    this.spinner.show('searchspinner2');

    var date_input = (<HTMLInputElement>document.getElementById('fromdate')).value;
    var date_retun = (<HTMLInputElement>document.getElementById('datereturn')).value;
    this.originDestinations[0].departureDateTimeRange.date=date_input;
   
    this.originDestinations[1].departureDateTimeRange.date=date_retun;

    this.travelers=[];
    var travid=1;
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
          debugger;
          this.resultDataList = data;
          if(data)
          { 
            this.searchResult.emit(this.resultDataList);
            (<HTMLInputElement>document.getElementById('explore_area')).scrollIntoView();
          }
          this.disableSearch=false;
          this.spinner.hide('searchspinner2');
        },
        (error: any) => {
          this.disableSearch=false;
          this.spinner.hide('searchspinner2');
        });
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
            (<HTMLElement>document.getElementById("dropdownMenuButton1")).click();
     }
  }

  public selectTableEvent(code: any) {
    console.log('test');
   }

   setJourneyDate(e:any){
    this.journeyDate_selected= e.target.value;
    this.returnDate_selected= e.target.value;
}

setReturnDate(e:any){
  this.returnDate_selected= e.target.value;
}
   
   fromClicked(e: any,type:string) {
    
     
     //console.log(date_input);
     if(type == "from"){
       this.originDestinations[0].originLocationCode= e.CityCode;
       this.originDestinations[1].destinationLocationCode= e.CityCode;
       this.fromSelected= e.CityCode;
     }
     else if(type="to"){
       this.originDestinations[0].destinationLocationCode= e.CityCode;
       this.originDestinations[1].originLocationCode= e.CityCode;
       this.toSelected= e.CityCode;
     }
   }
   
   
   valuechange(e: any){
     console.log(e);
     debugger;
   }
}
