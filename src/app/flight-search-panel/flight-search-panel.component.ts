import { LabelType, Options } from '@angular-slider/ngx-slider';
import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { DataFlightOffer, FlightOfferResponseModel } from '../Models/FlightOffer';
import { Contact, FlightOrdersData, FlightOrdersRequest, FlightOrdersTraveler, FormOfPayment, Name, Other, Phone, TicketingAgreement } from '../Models/FlightOrdersRequest';
import { FlightOrdersResponse } from '../Models/FlightOrdersResponse';
import { FlightOfferRequestModel } from '../Models/FlightRequstModel';
import { PricingRequestData, PricingRequestFlightOffer, PricingRequestModel } from '../Models/PricingRequestModel';
import { FlightSearchApiService } from '../services/flight-search-api.service';


@Component({
  selector: 'app-flight-search-panel',
  templateUrl: './flight-search-panel.component.html',
  styleUrls: ['./flight-search-panel.component.scss']
})
export class FlightSearchPanelComponent implements OnInit {
  activeTab=1;
  FlightOfferRequestModel: FlightOfferRequestModel [] | undefined;

  flightofferlist$!:Observable<any[]>;

  flights_list:{id:number,type:string,stops:any[]}[]=[{id:1,type:'multipleAirports',stops:[{type:'Technical stop over',name:'Lucknow (LKO) | 40 mins layover'},{type:'Plan change',name:'Goa (GOI) | 1hr 15 mins layover'},{type:'Technical stop over',name:'Hydarabad (HYB) | 45 mins layover'}]},
  {id:2,type:'',stops:[]},{id:3,type:'multipleAirports',stops:[{type:'Technical stop over',name:'Lucknow (LKO) | 40 mins layover'}]},
  {id:4,type:'',stops:[]},{id:5,type:'multipleAirports',stops:[{type:'Technical stop over',name:'Lucknow (LKO) | 40 mins layover'}]},
  {id:6,type:'',stops:[]}];
  refund_policy=["Refund and Date Change are done as per thefollowing policies.",
  "Refund Amount= Refund Charge (as per airlinepolicy + ShareTrip Convenience Fee).",
  "Date Change Amount= Date Change Fee (as per Airline Policy + ShareTrip Convenience Fee)."]

  public resultDataList: FlightOfferResponseModel= new FlightOfferResponseModel;
  public flightorderResponse: FlightOrdersResponse = new FlightOrdersResponse;
  public resultDataListCount: number=0;


  public imgbaseurl: string="http://travvise.com/images/Airlogo/sm";

  public date1: Date=new Date();
  public date2: Date=new Date();

  public current_date=new Date().toISOString().substr(0, 10);

  public adultMaxDate=new Date().toISOString().substr(0, 10);
  public childMinDate=new Date().toISOString().substr(0, 10);
  public childMaxDate=new Date().toISOString().substr(0, 10);
  public infantMinDate=new Date().toISOString().substr(0, 10);

  public adultMaxDateVal=new Date().toISOString().substr(0, 10);
  public childMinDateVal=new Date().toISOString().substr(0, 10);
  public childMaxDateVal=new Date().toISOString().substr(0, 10);
  public infantMinDateVal=new Date().toISOString().substr(0, 10);

  public isCheckedOneStop=true;
  public isCheckedTwoStop=true;
  public isCheckedThreeStop=true;
  public isCheckedNonStop=true;

  public oneStopCount=0;
  public twoStopCount=0;
  public threeStopCount=0;
  public nonStopCount=0; 

  public isFlightSearchAndResultShow:boolean=true;
  public pricingRequestModel:PricingRequestModel= new PricingRequestModel;
  public flightBook_fromCity="";
  public flightBook_fromAirport="";
  public repricedFlightOffer:PricingRequestFlightOffer= new PricingRequestFlightOffer;
  public adultCount=1;
  public childCount=0;
  public infantCount=0;
  public totalTravellerCount=1;
  public flightOrdersRequestObj= new FlightOrdersRequest;

  public gender_adult1="MALE";
  public gender_adult2="MALE";
  public gender_adult3="MALE";
  public gender_adult4="MALE";
  public gender_adult5="MALE";
  public gender_adult6="MALE";
  public gender_adult7="MALE";
  public gender_adult8="MALE";
  public gender_adult9="MALE";
  
  public gender_child1="MALE";
  public gender_child2="MALE";
  public gender_child3="MALE";
  public gender_child4="MALE";
  public gender_child5="MALE";
  public gender_child6="MALE";
  public gender_child7="MALE";
  public gender_child8="MALE";
  public gender_child9="MALE";
   
  public gender_infant1="MALE";
  public gender_infant2="MALE";
  public gender_infant3="MALE";
  public gender_infant4="MALE";
  public gender_infant5="MALE";
  public gender_infant6="MALE";
  public gender_infant7="MALE";
  public gender_infant8="MALE";
  public gender_infant9="MALE";

  public isFlightConrifmationShow=false;

  public adultTravellerList:FlightOrdersTraveler[]=[];

  genderList: any = ['Male', 'Female'];

  minValue: number = 100;
  maxValue: number = 400;
  options: Options = {
    floor: 0,
    ceil: 1000,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return "$" + value;
        case LabelType.High:
          return "$" + value;
        default:
          return "$" + value;
      }
    }
  };

  constructor(private service:FlightSearchApiService,public datepipe: DatePipe,private spinner: NgxSpinnerService, private toastr: ToastrService ) {
   
   }

  ngOnInit(): void {
  }

  toogleTab(tabNum:number){
    this.activeTab=tabNum;
    this.resultDataList=new FlightOfferResponseModel;
    this.resultDataListCount=0;
  }
  searchResult(e: any,type:string) {

    //console.log(date_input);
    if(type == "oneway"){
      this.resultDataList =e;
      this.resultDataListCount=  this.resultDataList.data.length;
    
    }
    else if(type="roundtrip"){
      // this.resultDataListRoundTrip=e;
      // this.resultDataListRoundTripCount=  this.resultDataListRoundTrip.data.length;
      this.resultDataList =e;
      this.resultDataListCount=  this.resultDataList.data.length;
    }

    this.resultDataList.data.forEach(element => {
      
        element.isShow=true;
    });
    
    this.oneStopCount=0;
    this.twoStopCount=0;
    this.threeStopCount=0;
    this.nonStopCount=0; 
  
  }
  calculateDiff(date1:any,date2:any){
    console.log(date1);
    console.log(date2);
    var Time = new Date(date2).getTime() - new Date(date1).getTime(); 
    
    return Math.floor(Time/(1000*60*60)) + " H:" + Math.floor(Time/(1000*60))%60+" M";
  }

  public changeStop(checked:boolean,type:string){
     if(type="oneStop"){
      this.isCheckedOneStop=checked;
     }
  }

  filterByAirline(Filtercarrier:any, event:any) {
    if (event.target.checked) {
      this.resultDataList.data.forEach(element => {
            if(element.itineraries[0].segments[0].carrierCode==Filtercarrier.key){
              element.isShow=true;
            }
      });
      // const arraytemp = this.resultDataListGlobal2.data.filter(function (e) // checking duplicate entries
      //     {
      //       return (e.itineraries[0].segments[0].carrierCode== Filtercarrier.key);
      //     });
      //     this.resultDataList.data = arraytemp;
     
    } else {
      this.resultDataList.data.forEach(element => {
        if(element.itineraries[0].segments[0].carrierCode==Filtercarrier.key){
          element.isShow=false;
        }
  });
      // const arraytemp = this.resultDataListGlobal.data.filter(function (e) // checking duplicate entries
      //     {
      //       return (e.itineraries[0].segments[0].carrierCode != Filtercarrier.key);
      //     });
      //     this.resultDataList.data = arraytemp;
      //return (this.rows = this.temp);
    }
  }

  GoBackToSearch(){
    window.location.reload();
  }

  OnClickBookNow(FlightOffer: DataFlightOffer){
    this.spinner.show("searchspinner_reprice");
    this.pricingRequestModel.data=new  PricingRequestData;
    this.pricingRequestModel.data.flightOffers= [new PricingRequestFlightOffer];
    if(FlightOffer){
      this.pricingRequestModel.data.flightOffers[0].type=FlightOffer.type;
      this.pricingRequestModel.data.flightOffers[0].id=FlightOffer.id;
      this.pricingRequestModel.data.flightOffers[0].source=FlightOffer.source;
      this.pricingRequestModel.data.flightOffers[0].instantTicketingRequired=FlightOffer.instantTicketingRequired;
      this.pricingRequestModel.data.flightOffers[0].nonHomogeneous=FlightOffer.nonHomogeneous;
      this.pricingRequestModel.data.flightOffers[0].oneWay=FlightOffer.oneWay;
      this.pricingRequestModel.data.flightOffers[0].lastTicketingDate=FlightOffer.lastTicketingDate;
      this.pricingRequestModel.data.flightOffers[0].numberOfBookableSeats=FlightOffer.numberOfBookableSeats;
      this.pricingRequestModel.data.flightOffers[0].itineraries=FlightOffer.itineraries;
      this.pricingRequestModel.data.flightOffers[0].price=FlightOffer.price;
      this.pricingRequestModel.data.flightOffers[0].pricingOptions=FlightOffer.pricingOptions;
      this.pricingRequestModel.data.flightOffers[0].validatingAirlineCodes=FlightOffer.validatingAirlineCodes;

      if(this.infantCount>0){
        for(var i=0;i<FlightOffer.travelerPricings.length;i++){
             if(FlightOffer.travelerPricings[i].travelerType=="HELD_INFANT"){
              FlightOffer.travelerPricings[i].associatedAdultId="1";
             }
        }
     }

      this.pricingRequestModel.data.flightOffers[0].travelerPricings=FlightOffer.travelerPricings;
      
      this.pricingRequestModel.data.flightOffers[0].fareRules=FlightOffer.fareRules;
    }
    
    this.pricingRequestModel.data.type="flight-offers-pricing";
    //localStorage.setItem('selectedFlightOffer',FlightOffer);
    this.service.FlightOfferPricing(this.pricingRequestModel)
    .pipe()
    .subscribe(
      (data: any) => {
        if(data != null)
        { 
          if(this.infantCount>0){
            for(var i=0;i<data.data.flightOffers[0].travelerPricings.length;i++){
                 if(data.data.flightOffers[0].travelerPricings[i].travelerType=="HELD_INFANT"){
                  data.data.flightOffers[0].travelerPricings[i].associatedAdultId="1";
                 }
            }
         }
          this.repricedFlightOffer=data.data.flightOffers[0];
          this.LoadPassengerDetails();
        }
        this.spinner.hide("searchspinner_reprice");
      },
      (error: any) => {
        this.spinner.hide("searchspinner_reprice");
      });
    // this.service.FlightOfferPricing(this.pricingRequestModel)
    // .subscribe(
    //   (resultData: any) => {
    //     debugger;
    //     if(resultData)
    //     { 
    //       this.repricedFlightOffer=resultData.data.flightOffers[0];
    //       //this.flightBook_fromCity=this.RepricedFlightOffer.itineraries[0].;
    //       //this.flightBook_fromAirport="";
    //     }
    //     console.log('Success');
    //   },
    //   (error: any) => {
    //     console.log('error');
    //   });

     
  }

 isLeapYear(year : number) {
    return (year % 4 === 0 && year % 100 !==0 || year % 400 === 0);
 }

  LoadPassengerDetails(){
    debugger;
    var journeryDepartureDate=new Date(this.repricedFlightOffer.itineraries[0].segments[0].departure.at);
    //journeryDepartureDate.setDate(journeryDepartureDate.getFullYear() - 1);
    //var dobmin=journeryDepartureDate;
    //var dobmin= new Date(journeryDepartureDate.getFullYear() - 12);
    //this.datepipe.transform(journeryDepartureDate, 'yyyy-MM-dd');
    //this.adultMinDate.setDate(journeryDepartureDate.getDate() - 12);
    var dateJourney=journeryDepartureDate.toISOString().substr(0, 10);
    var arr=dateJourney.split('-');
     let year= Number(arr[0]);
     let month= Number(arr[1]);
     let day= Number(arr[2]);
     let adultYear=year-12;
     let infantYear=year-2;
     let childYear=year-2;
     let childMinYear=year-12;
     let infantMonth=month;
     let childMinMonth=month;

     var is31=this.checkMonth31(month.toString());

     let infantDay=1;
     let childMinDay=1;

     if(is31==true && day==31){
            if(infantMonth==12){
              infantMonth=1;
              infantYear=infantYear+1;
            }
            else{
              infantMonth=infantMonth+1;
            }
            if(childMinMonth==12){
              childMinMonth=1;
              childMinYear=childMinYear+1;
            }
            else{
              childMinMonth=childMinMonth+1;
            }
        
     }
     else if(is31==false && day==30){
          // infantMonth=infantMonth+1;
          // childMonth=childMonth+1;
            if(infantMonth==12){
              infantMonth=1;
              infantYear=infantYear+1;
            }
            else{
              infantMonth=infantMonth+1;
            }
            if(childMinMonth==12){
              childMinMonth=1;
              childMinYear=childMinYear+1;
            }
            else{
              childMinMonth=childMinMonth+1;
            }
     }
     else if(month==2 && day==29){
        infantMonth=infantMonth+1;
        childMinMonth=childMinMonth+1;
     }
     else if(month==2 && day==28 ){
              if(this.isLeapYear(childMinYear)==false){
                childMinMonth=childMinMonth+1;
              }
              else{
                childMinDay=day+1;
              }
              if(this.isLeapYear(infantYear)==false){
                infantMonth=infantMonth+1;
              }
              else{
                infantDay=day+1;
              }
        
       
    }
     else{
        infantDay=day+1;
        childMinDay=day+1;
     }

     
 
     let infMonth=infantMonth.toString();
     let chMinMonth=childMinMonth.toString();
     let infDay=infantDay.toString();
     let chMinDay=childMinDay.toString();
     if(new String(infantMonth).length==1){
      infMonth="0"+  infantMonth.toString();
     }
     if(new String(childMinMonth).length==1){
      chMinMonth="0"+  childMinMonth.toString();
     }
     if(new String(infantDay).length==1){
      infDay="0"+  infantDay.toString();
     }
     if(new String(childMinDay).length==1){
      chMinDay="0"+  childMinDay.toString();
     }
     
     //year=year-12;
     this.adultMaxDate=adultYear.toString()+"-"+arr[1]+"-"+arr[2];
    this.childMinDate = childMinYear.toString()+"-"+chMinMonth+"-"+chMinDay.toString();
    this.childMaxDate =  childYear.toString()+"-"+arr[1]+"-"+arr[2];
    this.infantMinDate = infantYear.toString()+"-"+infMonth+"-"+infDay.toString();

    this.adultMaxDateVal=arr[2]+"/"+arr[1]+"/"+adultYear.toString();
    this.childMinDateVal =  chMinDay.toString()+"/"+chMinMonth+"/"+childYear.toString();
    this.childMaxDateVal = arr[2]+"/"+arr[1]+"/"+adultYear.toString();
    this.infantMinDateVal =  infDay.toString()+"/"+infMonth+"/"+infantYear.toString();
    
    this.isFlightSearchAndResultShow=false;
  }

  checkMonth31(mon:string){
          switch(mon){
            case "1": 
              return true;
              break;
              case "2": 
              return false;
              break;
              case "3": 
              return true;
              break;
              case "4": 
              return false;
              break;
              case "5": 
              return true;
              break;
              case "6": 
              return false;
              break;
              case "7": 
              return true;
              break;
              case "8": 
              return true;
              break;
              case "9": 
              return false;
              break;
              case "10": 
              return true;
              break;
              case "11": 
              return false;
              break;
              case "12": 
              return true;
              break;
            default:
              return true;
              break;
          }
  }

  changeGender(e:any,passengerNo:string){
       debugger;
       console.log(e.target.value);
       switch(passengerNo){
        case "1":
          if(e.target.value=="Male"){
            this.gender_adult1="MALE";
         }
         else{
            this.gender_adult1="FEMALE";
         }
         break;
         case "2":
          if(e.target.value=="Male"){
            this.gender_adult2="MALE";
         }
         else{
            this.gender_adult2="FEMALE";
         }
         break;
         case "3":
          if(e.target.value=="Male"){
            this.gender_adult3="MALE";
         }
         else{
            this.gender_adult3="FEMALE";
         }
         break;
         case "4":
          if(e.target.value=="Male"){
            this.gender_adult4="MALE";
         }
         else{
            this.gender_adult4="FEMALE";
         }
         break;
         case "5":
          if(e.target.value=="Male"){
            this.gender_adult5="MALE";
         }
         else{
            this.gender_adult5="FEMALE";
         }
         break;
         case "6":
          if(e.target.value=="Male"){
            this.gender_adult6="MALE";
         }
         else{
            this.gender_adult6="FEMALE";
         }
         break;
         case "7":
          if(e.target.value=="Male"){
            this.gender_adult7="MALE";
         }
         else{
            this.gender_adult7="FEMALE";
         }
         break;
         case "8":
          if(e.target.value=="Male"){
            this.gender_adult8="MALE";
         }
         else{
            this.gender_adult8="FEMALE";
         }
         break;
         case "9":
          if(e.target.value=="Male"){
            this.gender_adult9="MALE";
         }
         else{
            this.gender_adult9="FEMALE";
         }
         break;
         default:
          if(e.target.value=="Male"){
            this.gender_adult1="MALE";
         }
         else{
            this.gender_adult1="FEMALE";
         }
         break;
       }
       
       
  }

  changeChildGender(e:any,passengerNo:string){
    console.log(e.target.value);
    switch(passengerNo){
     case "1":
       if(e.target.value=="Male"){
         this.gender_child1="MALE";
      }
      else{
         this.gender_child1="FEMALE";
      }
      break;
      case "2":
       if(e.target.value=="Male"){
         this.gender_child2="MALE";
      }
      else{
         this.gender_child2="FEMALE";
      }
      break;
      case "3":
       if(e.target.value=="Male"){
         this.gender_child3="MALE";
      }
      else{
         this.gender_child3="FEMALE";
      }
      break;
      case "4":
       if(e.target.value=="Male"){
         this.gender_child4="MALE";
      }
      else{
         this.gender_child4="FEMALE";
      }
      break;
      case "5":
       if(e.target.value=="Male"){
         this.gender_child5="MALE";
      }
      else{
         this.gender_child5="FEMALE";
      }
      break;
      case "6":
       if(e.target.value=="Male"){
         this.gender_child6="MALE";
      }
      else{
         this.gender_child6="FEMALE";
      }
      break;
      case "7":
       if(e.target.value=="Male"){
         this.gender_child7="MALE";
      }
      else{
         this.gender_child7="FEMALE";
      }
      break;
      case "8":
       if(e.target.value=="Male"){
         this.gender_child8="MALE";
      }
      else{
         this.gender_child8="FEMALE";
      }
      break;
      case "9":
       if(e.target.value=="Male"){
         this.gender_child9="MALE";
      }
      else{
         this.gender_child9="FEMALE";
      }
      break;
      default:
       if(e.target.value=="Male"){
         this.gender_child1="MALE";
      }
      else{
         this.gender_child1="FEMALE";
      }
      break;
    }
    
    
}

changeInfantGender(e:any,passengerNo:string){
  console.log(e.target.value);
  switch(passengerNo){
   case "1":
     if(e.target.value=="Male"){
       this.gender_infant1="MALE";
    }
    else{
       this.gender_infant1="FEMALE";
    }
    break;
    case "2":
     if(e.target.value=="Male"){
       this.gender_infant2="MALE";
    }
    else{
       this.gender_infant2="FEMALE";
    }
    break;
    case "3":
     if(e.target.value=="Male"){
       this.gender_infant3="MALE";
    }
    else{
       this.gender_infant3="FEMALE";
    }
    break;
    case "4":
     if(e.target.value=="Male"){
       this.gender_infant4="MALE";
    }
    else{
       this.gender_infant4="FEMALE";
    }
    break;
    case "5":
     if(e.target.value=="Male"){
       this.gender_infant5="MALE";
    }
    else{
       this.gender_infant5="FEMALE";
    }
    break;
    case "6":
     if(e.target.value=="Male"){
       this.gender_infant6="MALE";
    }
    else{
       this.gender_infant6="FEMALE";
    }
    break;
    case "7":
     if(e.target.value=="Male"){
       this.gender_infant7="MALE";
    }
    else{
       this.gender_infant7="FEMALE";
    }
    break;
    case "8":
     if(e.target.value=="Male"){
       this.gender_infant8="MALE";
    }
    else{
       this.gender_infant8="FEMALE";
    }
    break;
    case "9":
     if(e.target.value=="Male"){
       this.gender_infant9="MALE";
    }
    else{
       this.gender_infant9="FEMALE";
    }
    break;
    default:
     if(e.target.value=="Male"){
       this.gender_infant1="MALE";
    }
    else{
       this.gender_infant1="FEMALE";
    }
    break;
  }
  
  
}

  passengerChange2(e: any) {
    if(e != null){
      this.adultCount=e.adult;
      this.childCount=e.childeren;
       this.infantCount=e.infant;
       this.totalTravellerCount= e.total;//this.adult_count+this.child_count+this.infant_count;
    }
     
  }


  OnClickPayNowBookingConfirmation(){

    if(this.callPassengerRequiredValidation()){
      this.spinner.show("searchspinner_order");
      this.flightOrdersRequestObj.data=new FlightOrdersData;
      this.flightOrdersRequestObj.data.type="flight-order";
      this.flightOrdersRequestObj.data.flightOffers= [new PricingRequestFlightOffer];
      this.flightOrdersRequestObj.data.flightOffers[0]=this.repricedFlightOffer;
      this.LoadTravellers();
      
  
      this.flightOrdersRequestObj.data.ticketingAgreement= new TicketingAgreement;
      this.flightOrdersRequestObj.data.ticketingAgreement.option="DELAY_TO_CANCEL";
      this.flightOrdersRequestObj.data.ticketingAgreement.delay="6D";
  
      this.flightOrdersRequestObj.data.formOfPayments= [new FormOfPayment];
      this.flightOrdersRequestObj.data.formOfPayments[0].other=new Other;
      this.flightOrdersRequestObj.data.formOfPayments[0].other.flightOfferIds=[this.flightOrdersRequestObj.data.flightOffers[0].id];
      this.flightOrdersRequestObj.data.formOfPayments[0].other.method="CASH";
  
      this.flightOrdersRequestObj.data.remarks=null;
      this.flightOrdersRequestObj.data.contacts=null;
  
      this.service.FlightOrders(this.flightOrdersRequestObj)
      .pipe()
      .subscribe(
        (data: any) => {
          
          if(data)
          { 
               this.flightorderResponse =data;
               this.isFlightConrifmationShow=true;
          }
          this.spinner.hide("searchspinner_order");
        },
        (error: any) => {
          debugger;
          this.spinner.hide("searchspinner_order");
        });
  
    }
    
  }

  callPassengerRequiredValidation(){
    var returnData=true;
    for(var i=1;i<=this.adultCount;i++){
      returnData=this.checkRequiredValidation("adult",i.toString());
      if(returnData==false){
         return returnData;
      }
    }
    for(var i=1;i<=this.childCount;i++){
      returnData=this.checkRequiredValidation("child",i.toString());
      if(returnData==false){
         return returnData;
      }
    }
    for(var i=1;i<=this.infantCount;i++){
      returnData=this.checkRequiredValidation("infant",i.toString());
      if(returnData==false){
         return returnData;
      }
    }
    
    return returnData;
  }


  checkRequiredValidation(passengerType: string, passengerTypeCount: string) {
    var canProceed = true;
    if (passengerType == "adult") {
      switch (passengerTypeCount) {
        case "1":
          if (this.isShowRequiredValidation("firstname_adult1")) {
            this.toastr.warning("First Name is required for Passenger (Adult 1)");
            canProceed = false;
            return canProceed;
          }
          else if (this.isShowRequiredValidation("lastname_adult1")) {
            this.toastr.warning("Last Name is required for Passenger (Adult 1)");
            canProceed = false;
            return canProceed;
          }
          else if (this.isShowRequiredValidation("email_adult1")) {
            this.toastr.warning("Email is required for Passenger (Adult 1)");
            canProceed = false;
            return canProceed;
          }
          else if (this.isShowRequiredValidation("phonenumber_adult1")) {
            this.toastr.warning("Mobile Number is required for Passenger (Adult 1)");
            canProceed = false;
            return canProceed;
          }
          else if (this.isShowRequiredValidation("dob_adult1")) {
            this.toastr.warning("DOB is required for Passenger (Adult 1)");
            canProceed = false;
            return canProceed;
          }
          // else{
          //      var email=(<HTMLInputElement>document.getElementById('email_adult1')).value;
          // }
          break;
        case "2":
          if (this.isShowRequiredValidation("firstname_adult2")) {
            this.toastr.warning("First Name is required for Passenger (Adult 2)");
            canProceed = false;
            return canProceed;
          }
          else if (this.isShowRequiredValidation("lastname_adult2")) {
            this.toastr.warning("Last Name is required for Passenger (Adult 2)");
            canProceed = false;
            return canProceed;
          }
          else if (this.isShowRequiredValidation("email_adult2")) {
            this.toastr.warning("Email is required for Passenger (Adult 2)");
            canProceed = false;
            return canProceed;
          }
          else if (this.isShowRequiredValidation("phonenumber_adult2")) {
            this.toastr.warning("Mobile Number is required for Passenger (Adult 2)");
            canProceed = false;
            return canProceed;
          }
          else if (this.isShowRequiredValidation("dob_adult2")) {
            this.toastr.warning("DOB is required for Passenger (Adult 2)");
            canProceed = false;
            return canProceed;
          }
          break;
        case "3":
          if (this.isShowRequiredValidation("firstname_adult3")) {
            this.toastr.warning("First Name is required for Passenger (Adult 3)");
            canProceed = false;
            return canProceed;
          }
          else if (this.isShowRequiredValidation("lastname_adult3")) {
            this.toastr.warning("Last Name is required for Passenger (Adult 3)");
            canProceed = false;
            return canProceed;
          }
          else if (this.isShowRequiredValidation("email_adult3")) {
            this.toastr.warning("Email is required for Passenger (Adult 3)");
            canProceed = false;
            return canProceed;
          }
          else if (this.isShowRequiredValidation("phonenumber_adult3")) {
            this.toastr.warning("Mobile Number is required for Passenger (Adult 3)");
            canProceed = false;
            return canProceed;
          }
          else if (this.isShowRequiredValidation("dob_adult3")) {
            this.toastr.warning("DOB is required for Passenger (Adult 3)");
            canProceed = false;
            return canProceed;
          }
          break;
        case "4":
          if (this.isShowRequiredValidation("firstname_adult4")) {
            this.toastr.warning("First Name is required for Passenger (Adult 4)");
            canProceed = false;
            return canProceed;
          }
          else if (this.isShowRequiredValidation("lastname_adult4")) {
            this.toastr.warning("Last Name is required for Passenger (Adult 4)");
            canProceed = false;
            return canProceed;
          }
          else if (this.isShowRequiredValidation("email_adult4")) {
            this.toastr.warning("Email is required for Passenger (Adult 4)");
            canProceed = false;
            return canProceed;
          }
          else if (this.isShowRequiredValidation("phonenumber_adult4")) {
            this.toastr.warning("Mobile Number is required for Passenger (Adult 4)");
            canProceed = false;
            return canProceed;
          }
          else if (this.isShowRequiredValidation("dob_adult4")) {
            this.toastr.warning("DOB is required for Passenger (Adult 4)");
            canProceed = false;
            return canProceed;
          }
          break;
        case "5":
          if (this.isShowRequiredValidation("firstname_adult5")) {
            this.toastr.warning("First Name is required for Passenger (Adult 5)");
            canProceed = false;
            return canProceed;
          }
          else if (this.isShowRequiredValidation("lastname_adult5")) {
            this.toastr.warning("Last Name is required for Passenger (Adult 5)");
            canProceed = false;
            return canProceed;
          }
          else if (this.isShowRequiredValidation("email_adult5")) {
            this.toastr.warning("Email is required for Passenger (Adult 5)");
            canProceed = false;
            return canProceed;
          }
          else if (this.isShowRequiredValidation("phonenumber_adult5")) {
            this.toastr.warning("Mobile Number is required for Passenger (Adult 5)");
            canProceed = false;
            return canProceed;
          }
          else if (this.isShowRequiredValidation("dob_adult5")) {
            this.toastr.warning("DOB is required for Passenger (Adult 5)");
            canProceed = false;
            return canProceed;
          }
          break;
        case "6":
          if (this.isShowRequiredValidation("firstname_adult6")) {
            this.toastr.warning("First Name is required for Passenger (Adult 6)");
            canProceed = false;
            return canProceed;
          }
          else if (this.isShowRequiredValidation("lastname_adult6")) {
            this.toastr.warning("Last Name is required for Passenger (Adult 6)");
            canProceed = false;
            return canProceed;
          }
          else if (this.isShowRequiredValidation("email_adult6")) {
            this.toastr.warning("Email is required for Passenger (Adult 6)");
            canProceed = false;
            return canProceed;
          }
          else if (this.isShowRequiredValidation("phonenumber_adult6")) {
            this.toastr.warning("Mobile Number is required for Passenger (Adult 6)");
            canProceed = false;
            return canProceed;
          }
          else if (this.isShowRequiredValidation("dob_adult6")) {
            this.toastr.warning("DOB is required for Passenger (Adult 6)");
            canProceed = false;
            return canProceed;
          }
          break;
        case "7":
          if (this.isShowRequiredValidation("firstname_adult7")) {
            this.toastr.warning("First Name is required for Passenger (Adult 7)");
            canProceed = false;
            return canProceed;
          }
          else if (this.isShowRequiredValidation("lastname_adult7")) {
            this.toastr.warning("Last Name is required for Passenger (Adult 7)");
            canProceed = false;
            return canProceed;
          }
          else if (this.isShowRequiredValidation("email_adult7")) {
            this.toastr.warning("Email is required for Passenger (Adult 7)");
            canProceed = false;
            return canProceed;
          }
          else if (this.isShowRequiredValidation("phonenumber_adult7")) {
            this.toastr.warning("Mobile Number is required for Passenger (Adult 7)");
            canProceed = false;
            return canProceed;
          }
          else if (this.isShowRequiredValidation("dob_adult7")) {
            this.toastr.warning("DOB is required for Passenger (Adult 7)");
            canProceed = false;
            return canProceed;
          }
          break;
        case "8":
          if (this.isShowRequiredValidation("firstname_adult8")) {
            this.toastr.warning("First Name is required for Passenger (Adult 8)");
            canProceed = false;
            return canProceed;
          }
          else if (this.isShowRequiredValidation("lastname_adult8")) {
            this.toastr.warning("Last Name is required for Passenger (Adult 8)");
            canProceed = false;
            return canProceed;
          }
          else if (this.isShowRequiredValidation("email_adult8")) {
            this.toastr.warning("Email is required for Passenger (Adult 8)");
            canProceed = false;
            return canProceed;
          }
          else if (this.isShowRequiredValidation("phonenumber_adult8")) {
            this.toastr.warning("Mobile Number is required for Passenger (Adult 8)");
            canProceed = false;
            return canProceed;
          }
          else if (this.isShowRequiredValidation("dob_adult8")) {
            this.toastr.warning("DOB is required for Passenger (Adult 8)");
            canProceed = false;
            return canProceed;
          }
          break;
        case "9":
          if (this.isShowRequiredValidation("firstname_adult9")) {
            this.toastr.warning("First Name is required for Passenger (Adult 9)");
            canProceed = false;
            return canProceed;
          }
          else if (this.isShowRequiredValidation("lastname_adult9")) {
            this.toastr.warning("Last Name is required for Passenger (Adult 9)");
            canProceed = false;
            return canProceed;
          }
          else if (this.isShowRequiredValidation("email_adult9")) {
            this.toastr.warning("Email is required for Passenger (Adult 9)");
            canProceed = false;
            return canProceed;
          }
          else if (this.isShowRequiredValidation("phonenumber_adult9")) {
            this.toastr.warning("Mobile Number is required for Passenger (Adult 9)");
            canProceed = false;
            return canProceed;
          }
          else if (this.isShowRequiredValidation("dob_adult9")) {
            this.toastr.warning("DOB is required for Passenger (Adult 9)");
            canProceed = false;
            return canProceed;
          }
          break;
        default:
          return canProceed;
          break;
      }
    }
    else if (passengerType == "child") {
      switch (passengerTypeCount) {
        case "1":
          if (this.isShowRequiredValidation("firstname_child1")) {
            this.toastr.warning("First Name is required for Passenger (Child 1)");
            canProceed = false;
            return canProceed;
          }
          else if (this.isShowRequiredValidation("lastname_child1")) {
            this.toastr.warning("Last Name is required for Passenger (Child 1)");
            canProceed = false;
            return canProceed;
          }
          else if (this.isShowRequiredValidation("email_child1")) {
            this.toastr.warning("Email is required for Passenger (Child 1)");
            canProceed = false;
            return canProceed;
          }
          else if (this.isShowRequiredValidation("phonenumber_child1")) {
            this.toastr.warning("Mobile Number is required for Passenger (Child 1)");
            canProceed = false;
            return canProceed;
          }
          else if (this.isShowRequiredValidation("dob_child1")) {
            this.toastr.warning("DOB is required for Passenger (Child 1)");
            canProceed = false;
            return canProceed;
          }
          break;
        case "2":
          if (this.isShowRequiredValidation("firstname_child2")) {
            this.toastr.warning("First Name is required for Passenger (Child 2)");
            canProceed = false;
            return canProceed;
          }
          else if (this.isShowRequiredValidation("lastname_child2")) {
            this.toastr.warning("Last Name is required for Passenger (Child 2)");
            canProceed = false;
            return canProceed;
          }
          else if (this.isShowRequiredValidation("email_child2")) {
            this.toastr.warning("Email is required for Passenger (Child 2)");
            canProceed = false;
            return canProceed;
          }
          else if (this.isShowRequiredValidation("phonenumber_child2")) {
            this.toastr.warning("Mobile Number is required for Passenger (Child 2)");
            canProceed = false;
            return canProceed;
          }
          else if (this.isShowRequiredValidation("dob_child2")) {
            this.toastr.warning("DOB is required for Passenger (Child 2)");
            canProceed = false;
            return canProceed;
          }
          break;
        case "3":
          if (this.isShowRequiredValidation("firstname_child3")) {
            this.toastr.warning("First Name is required for Passenger (Child 3)");
            canProceed = false;
            return canProceed;
          }
          else if (this.isShowRequiredValidation("lastname_child3")) {
            this.toastr.warning("Last Name is required for Passenger (Child 3)");
            canProceed = false;
            return canProceed;
          }
          else if (this.isShowRequiredValidation("email_child3")) {
            this.toastr.warning("Email is required for Passenger (Child 3)");
            canProceed = false;
            return canProceed;
          }
          else if (this.isShowRequiredValidation("phonenumber_child3")) {
            this.toastr.warning("Mobile Number is required for Passenger (Child 3)");
            canProceed = false;
            return canProceed;
          }
          else if (this.isShowRequiredValidation("dob_child3")) {
            this.toastr.warning("DOB is required for Passenger (Child 3)");
            canProceed = false;
            return canProceed;
          }
          break;
        case "4":
          if (this.isShowRequiredValidation("firstname_child4")) {
            this.toastr.warning("First Name is required for Passenger (Child 4)");
            canProceed = false;
            return canProceed;
          }
          else if (this.isShowRequiredValidation("lastname_child4")) {
            this.toastr.warning("Last Name is required for Passenger (Child 4)");
            canProceed = false;
            return canProceed;
          }
          else if (this.isShowRequiredValidation("email_child4")) {
            this.toastr.warning("Email is required for Passenger (Child 4)");
            canProceed = false;
            return canProceed;
          }
          else if (this.isShowRequiredValidation("phonenumber_child4")) {
            this.toastr.warning("Mobile Number is required for Passenger (Child 4)");
            canProceed = false;
            return canProceed;
          }
          else if (this.isShowRequiredValidation("dob_child4")) {
            this.toastr.warning("DOB is required for Passenger (Child 4)");
            canProceed = false;
            return canProceed;
          }
          break;
        case "5":
          if (this.isShowRequiredValidation("firstname_child5")) {
            this.toastr.warning("First Name is required for Passenger (Child 5)");
            canProceed = false;
            return canProceed;
          }
          else if (this.isShowRequiredValidation("lastname_child5")) {
            this.toastr.warning("Last Name is required for Passenger (Child 5)");
            canProceed = false;
            return canProceed;
          }
          else if (this.isShowRequiredValidation("email_child5")) {
            this.toastr.warning("Email is required for Passenger (Child 5)");
            canProceed = false;
            return canProceed;
          }
          else if (this.isShowRequiredValidation("phonenumber_child5")) {
            this.toastr.warning("Mobile Number is required for Passenger (Child 5)");
            canProceed = false;
            return canProceed;
          }
          else if (this.isShowRequiredValidation("dob_child5")) {
            this.toastr.warning("DOB is required for Passenger (Child 5)");
            canProceed = false;
            return canProceed;
          }
          break;
        case "6":
          if (this.isShowRequiredValidation("firstname_child6")) {
            this.toastr.warning("First Name is required for Passenger (Child 6)");
            canProceed = false;
            return canProceed;
          }
          else if (this.isShowRequiredValidation("lastname_child6")) {
            this.toastr.warning("Last Name is required for Passenger (Child 6)");
            canProceed = false;
            return canProceed;
          }
          else if (this.isShowRequiredValidation("email_child6")) {
            this.toastr.warning("Email is required for Passenger (Child 6)");
            canProceed = false;
            return canProceed;
          }
          else if (this.isShowRequiredValidation("phonenumber_child6")) {
            this.toastr.warning("Mobile Number is required for Passenger (Child 6)");
            canProceed = false;
            return canProceed;
          }
          else if (this.isShowRequiredValidation("dob_child6")) {
            this.toastr.warning("DOB is required for Passenger (Child 6)");
            canProceed = false;
            return canProceed;
          }
          break;
        case "7":
          if (this.isShowRequiredValidation("firstname_child7")) {
            this.toastr.warning("First Name is required for Passenger (Child 7)");
            canProceed = false;
            return canProceed;
          }
          else if (this.isShowRequiredValidation("lastname_child7")) {
            this.toastr.warning("Last Name is required for Passenger (Child 7)");
            canProceed = false;
            return canProceed;
          }
          else if (this.isShowRequiredValidation("email_child7")) {
            this.toastr.warning("Email is required for Passenger (Child 7)");
            canProceed = false;
            return canProceed;
          }
          else if (this.isShowRequiredValidation("phonenumber_child7")) {
            this.toastr.warning("Mobile Number is required for Passenger (Child 7)");
            canProceed = false;
            return canProceed;
          }
          else if (this.isShowRequiredValidation("dob_child7")) {
            this.toastr.warning("DOB is required for Passenger (Child 7)");
            canProceed = false;
            return canProceed;
          }
          break;
        case "8":
          if (this.isShowRequiredValidation("firstname_child8")) {
            this.toastr.warning("First Name is required for Passenger (Child 8)");
            canProceed = false;
            return canProceed;
          }
          else if (this.isShowRequiredValidation("lastname_child8")) {
            this.toastr.warning("Last Name is required for Passenger (Child 8)");
            canProceed = false;
            return canProceed;
          }
          else if (this.isShowRequiredValidation("email_child8")) {
            this.toastr.warning("Email is required for Passenger (Child 8)");
            canProceed = false;
            return canProceed;
          }
          else if (this.isShowRequiredValidation("phonenumber_child8")) {
            this.toastr.warning("Mobile Number is required for Passenger (Child 8)");
            canProceed = false;
            return canProceed;
          }
          else if (this.isShowRequiredValidation("dob_child8")) {
            this.toastr.warning("DOB is required for Passenger (Child 8)");
            canProceed = false;
            return canProceed;
          }
          break;
        case "9":
          if (this.isShowRequiredValidation("firstname_child9")) {
            this.toastr.warning("First Name is required for Passenger (Child 9)");
            canProceed = false;
            return canProceed;
          }
          else if (this.isShowRequiredValidation("lastname_child9")) {
            this.toastr.warning("Last Name is required for Passenger (Child 9)");
            canProceed = false;
            return canProceed;
          }
          else if (this.isShowRequiredValidation("email_child9")) {
            this.toastr.warning("Email is required for Passenger (Child 9)");
            canProceed = false;
            return canProceed;
          }
          else if (this.isShowRequiredValidation("phonenumber_child9")) {
            this.toastr.warning("Mobile Number is required for Passenger (Child 9)");
            canProceed = false;
            return canProceed;
          }
          else if (this.isShowRequiredValidation("dob_child9")) {
            this.toastr.warning("DOB is required for Passenger (Child 9)");
            canProceed = false;
            return canProceed;
          }
          break;
        default:
          return canProceed;
          break;
      }
    }
    else if (passengerType == "infant") {
      switch (passengerTypeCount) {
        case "1":
          if (this.isShowRequiredValidation("firstname_infant1")) {
            this.toastr.warning("First Name is required for Passenger (Infant 1)");
            canProceed = false;
            return canProceed;
          }
          else if (this.isShowRequiredValidation("lastname_infant1")) {
            this.toastr.warning("Last Name is required for Passenger (Infant 1)");
            canProceed = false;
            return canProceed;
          }
          else if (this.isShowRequiredValidation("email_infant1")) {
            this.toastr.warning("Email is required for Passenger (Infant 1)");
            canProceed = false;
            return canProceed;
          }
          else if (this.isShowRequiredValidation("phonenumber_infant1")) {
            this.toastr.warning("Mobile Number is required for Passenger (Infant 1)");
            canProceed = false;
            return canProceed;
          }
          else if (this.isShowRequiredValidation("dob_infant1")) {
            this.toastr.warning("DOB is required for Passenger (Infant 1)");
            canProceed = false;
            return canProceed;
          }
          break;
        case "2":
          if (this.isShowRequiredValidation("firstname_infant2")) {
            this.toastr.warning("First Name is required for Passenger (Infant 2)");
            canProceed = false;
            return canProceed;
          }
          else if (this.isShowRequiredValidation("lastname_infant2")) {
            this.toastr.warning("Last Name is required for Passenger (Infant 2)");
            canProceed = false;
            return canProceed;
          }
          else if (this.isShowRequiredValidation("email_infant2")) {
            this.toastr.warning("Email is required for Passenger (Infant 2)");
            canProceed = false;
            return canProceed;
          }
          else if (this.isShowRequiredValidation("phonenumber_infant2")) {
            this.toastr.warning("Mobile Number is required for Passenger (Infant 2)");
            canProceed = false;
            return canProceed;
          }
          else if (this.isShowRequiredValidation("dob_infant2")) {
            this.toastr.warning("DOB is required for Passenger (Infant 2)");
            canProceed = false;
            return canProceed;
          }
          break;
        case "3":
          if (this.isShowRequiredValidation("firstname_infant3")) {
            this.toastr.warning("First Name is required for Passenger (Infant 3)");
            canProceed = false;
            return canProceed;
          }
          else if (this.isShowRequiredValidation("lastname_infant3")) {
            this.toastr.warning("Last Name is required for Passenger (Infant 3)");
            canProceed = false;
            return canProceed;
          }
          else if (this.isShowRequiredValidation("email_infant3")) {
            this.toastr.warning("Email is required for Passenger (Infant 3)");
            canProceed = false;
            return canProceed;
          }
          else if (this.isShowRequiredValidation("phonenumber_infant3")) {
            this.toastr.warning("Mobile Number is required for Passenger (Infant 3)");
            canProceed = false;
            return canProceed;
          }
          else if (this.isShowRequiredValidation("dob_infant3")) {
            this.toastr.warning("DOB is required for Passenger (Infant 3)");
            canProceed = false;
            return canProceed;
          }
          break;
        case "4":
          if (this.isShowRequiredValidation("firstname_infant4")) {
            this.toastr.warning("First Name is required for Passenger (Infant 4)");
            canProceed = false;
            return canProceed;
          }
          else if (this.isShowRequiredValidation("lastname_infant4")) {
            this.toastr.warning("Last Name is required for Passenger (Infant 4)");
            canProceed = false;
            return canProceed;
          }
          else if (this.isShowRequiredValidation("email_infant4")) {
            this.toastr.warning("Email is required for Passenger (Infant 4)");
            canProceed = false;
            return canProceed;
          }
          else if (this.isShowRequiredValidation("phonenumber_infant4")) {
            this.toastr.warning("Mobile Number is required for Passenger (Infant 4)");
            canProceed = false;
            return canProceed;
          }
          else if (this.isShowRequiredValidation("dob_infant4")) {
            this.toastr.warning("DOB is required for Passenger (Infant 4)");
            canProceed = false;
            return canProceed;
          }
          break;
        case "5":
          if (this.isShowRequiredValidation("firstname_infant5")) {
            this.toastr.warning("First Name is required for Passenger (Infant 5)");
            canProceed = false;
            return canProceed;
          }
          else if (this.isShowRequiredValidation("lastname_infant5")) {
            this.toastr.warning("Last Name is required for Passenger (Infant 5)");
            canProceed = false;
            return canProceed;
          }
          else if (this.isShowRequiredValidation("email_infant5")) {
            this.toastr.warning("Email is required for Passenger (Infant 5)");
            canProceed = false;
            return canProceed;
          }
          else if (this.isShowRequiredValidation("phonenumber_infant5")) {
            this.toastr.warning("Mobile Number is required for Passenger (Infant 5)");
            canProceed = false;
            return canProceed;
          }
          else if (this.isShowRequiredValidation("dob_infant5")) {
            this.toastr.warning("DOB is required for Passenger (Infant 5)");
            canProceed = false;
            return canProceed;
          }
          break;
        case "6":
          if (this.isShowRequiredValidation("firstname_infant6")) {
            this.toastr.warning("First Name is required for Passenger (Infant 6)");
            canProceed = false;
            return canProceed;
          }
          else if (this.isShowRequiredValidation("lastname_infant6")) {
            this.toastr.warning("Last Name is required for Passenger (Infant 6)");
            canProceed = false;
            return canProceed;
          }
          else if (this.isShowRequiredValidation("email_infant6")) {
            this.toastr.warning("Email is required for Passenger (Infant 6)");
            canProceed = false;
            return canProceed;
          }
          else if (this.isShowRequiredValidation("phonenumber_infant6")) {
            this.toastr.warning("Mobile Number is required for Passenger (Infant 6)");
            canProceed = false;
            return canProceed;
          }
          else if (this.isShowRequiredValidation("dob_infant6")) {
            this.toastr.warning("DOB is required for Passenger (Infant 6)");
            canProceed = false;
            return canProceed;
          }
          break;
        case "7":
          if (this.isShowRequiredValidation("firstname_infant7")) {
            this.toastr.warning("First Name is required for Passenger (Infant 7)");
            canProceed = false;
            return canProceed;
          }
          else if (this.isShowRequiredValidation("lastname_infant7")) {
            this.toastr.warning("Last Name is required for Passenger (Infant 7)");
            canProceed = false;
            return canProceed;
          }
          else if (this.isShowRequiredValidation("email_infant7")) {
            this.toastr.warning("Email is required for Passenger (Infant 7)");
            canProceed = false;
            return canProceed;
          }
          else if (this.isShowRequiredValidation("phonenumber_infant7")) {
            this.toastr.warning("Mobile Number is required for Passenger (Infant 7)");
            canProceed = false;
            return canProceed;
          }
          else if (this.isShowRequiredValidation("dob_infant7")) {
            this.toastr.warning("DOB is required for Passenger (Infant 7)");
            canProceed = false;
            return canProceed;
          }
          break;
        case "8":
          if (this.isShowRequiredValidation("firstname_infant8")) {
            this.toastr.warning("First Name is required for Passenger (Infant 8)");
            canProceed = false;
            return canProceed;
          }
          else if (this.isShowRequiredValidation("lastname_infant8")) {
            this.toastr.warning("Last Name is required for Passenger (Infant 8)");
            canProceed = false;
            return canProceed;
          }
          else if (this.isShowRequiredValidation("email_infant8")) {
            this.toastr.warning("Email is required for Passenger (Infant 8)");
            canProceed = false;
            return canProceed;
          }
          else if (this.isShowRequiredValidation("phonenumber_infant8")) {
            this.toastr.warning("Mobile Number is required for Passenger (Infant 8)");
            canProceed = false;
            return canProceed;
          }
          else if (this.isShowRequiredValidation("dob_infant8")) {
            this.toastr.warning("DOB is required for Passenger (Infant 8)");
            canProceed = false;
            return canProceed;
          }
          break;
        case "9":
          if (this.isShowRequiredValidation("firstname_infant9")) {
            this.toastr.warning("First Name is required for Passenger (Infant 9)");
            canProceed = false;
            return canProceed;
          }
          else if (this.isShowRequiredValidation("lastname_infant9")) {
            this.toastr.warning("Last Name is required for Passenger (Infant 9)");
            canProceed = false;
            return canProceed;
          }
          else if (this.isShowRequiredValidation("email_infant9")) {
            this.toastr.warning("Email is required for Passenger (Infant 9)");
            canProceed = false;
            return canProceed;
          }
          else if (this.isShowRequiredValidation("phonenumber_infant9")) {
            this.toastr.warning("Mobile Number is required for Passenger (Infant 9)");
            canProceed = false;
            return canProceed;
          }
          else if (this.isShowRequiredValidation("dob_infant9")) {
            this.toastr.warning("DOB is required for Passenger (Infant 9)");
            canProceed = false;
            return canProceed;
          }
          break;
        default:
          return canProceed;
          break;
      }
    }
    return canProceed;

  }

  isShowRequiredValidation(fieldName:string){
    var value =(<HTMLInputElement>document.getElementById(fieldName)).value;
    if(value == null || value==""|| value.trim()==""|| value==" "){
         return true;
    }
    else{
      return false;
    }
  }

  LoadTravellers() {
    this.flightOrdersRequestObj.data.travelers.length = this.totalTravellerCount;
     var travellerId=1;
    //ADULT START
    if (this.adultCount > 0) {

      this.flightOrdersRequestObj.data.travelers[travellerId-1] = new FlightOrdersTraveler;

      this.flightOrdersRequestObj.data.travelers[travellerId-1].id = travellerId.toString();
      this.flightOrdersRequestObj.data.travelers[travellerId-1].gender = this.gender_adult1;
      this.flightOrdersRequestObj.data.travelers[travellerId-1].dateOfBirth = (<HTMLInputElement>document.getElementById('dob_adult1')).value;
      this.flightOrdersRequestObj.data.travelers[travellerId-1].name = new Name;
      this.flightOrdersRequestObj.data.travelers[travellerId-1].name.firstName = (<HTMLInputElement>document.getElementById('firstname_adult1')).value;
      this.flightOrdersRequestObj.data.travelers[travellerId-1].name.lastName = (<HTMLInputElement>document.getElementById('lastname_adult1')).value;
      this.flightOrdersRequestObj.data.travelers[travellerId-1].contact = new Contact;
      this.flightOrdersRequestObj.data.travelers[travellerId-1].contact.emailAddress = (<HTMLInputElement>document.getElementById('email_adult1')).value;
      this.flightOrdersRequestObj.data.travelers[travellerId-1].contact.phones = [new Phone];
      this.flightOrdersRequestObj.data.travelers[travellerId-1].contact.phones[0].deviceType = "MOBILE";
      this.flightOrdersRequestObj.data.travelers[travellerId-1].contact.phones[0].countryCallingCode = "234";
      this.flightOrdersRequestObj.data.travelers[travellerId-1].contact.phones[0].number = (<HTMLInputElement>document.getElementById('phonenumber_adult1')).value;
      //this.flightOrdersRequestObj.data.travelers[travellerId-1].
      
      travellerId++;
    }

    if (this.adultCount > 1) {
      this.flightOrdersRequestObj.data.travelers[travellerId-1] = new FlightOrdersTraveler;

      this.flightOrdersRequestObj.data.travelers[travellerId-1].id =  travellerId.toString();;
      this.flightOrdersRequestObj.data.travelers[travellerId-1].gender = this.gender_adult2;
      this.flightOrdersRequestObj.data.travelers[travellerId-1].dateOfBirth = (<HTMLInputElement>document.getElementById('dob_adult2')).value;
      this.flightOrdersRequestObj.data.travelers[travellerId-1].name = new Name;
      this.flightOrdersRequestObj.data.travelers[travellerId-1].name.firstName = (<HTMLInputElement>document.getElementById('firstname_adult2')).value;
      this.flightOrdersRequestObj.data.travelers[travellerId-1].name.lastName = (<HTMLInputElement>document.getElementById('lastname_adult2')).value;
      this.flightOrdersRequestObj.data.travelers[travellerId-1].contact = new Contact;
      this.flightOrdersRequestObj.data.travelers[travellerId-1].contact.emailAddress = (<HTMLInputElement>document.getElementById('email_adult2')).value;
      this.flightOrdersRequestObj.data.travelers[travellerId-1].contact.phones = [new Phone];
      this.flightOrdersRequestObj.data.travelers[travellerId-1].contact.phones[0].deviceType = "MOBILE";
      this.flightOrdersRequestObj.data.travelers[travellerId-1].contact.phones[0].countryCallingCode = "234";
      this.flightOrdersRequestObj.data.travelers[travellerId-1].contact.phones[0].number = (<HTMLInputElement>document.getElementById('phonenumber_adult2')).value;
      
      travellerId++;
    }
    
    if (this.adultCount > 2) {
      this.flightOrdersRequestObj.data.travelers[travellerId-1] = new FlightOrdersTraveler;

      this.flightOrdersRequestObj.data.travelers[travellerId-1].id =  travellerId.toString();;
      this.flightOrdersRequestObj.data.travelers[travellerId-1].gender = this.gender_adult3;
      this.flightOrdersRequestObj.data.travelers[travellerId-1].dateOfBirth = (<HTMLInputElement>document.getElementById('dob_adult3')).value;
      this.flightOrdersRequestObj.data.travelers[travellerId-1].name = new Name;
      this.flightOrdersRequestObj.data.travelers[travellerId-1].name.firstName = (<HTMLInputElement>document.getElementById('firstname_adult3')).value;
      this.flightOrdersRequestObj.data.travelers[travellerId-1].name.lastName = (<HTMLInputElement>document.getElementById('lastname_adult3')).value;
      this.flightOrdersRequestObj.data.travelers[travellerId-1].contact = new Contact;
      this.flightOrdersRequestObj.data.travelers[travellerId-1].contact.emailAddress = (<HTMLInputElement>document.getElementById('email_adult3')).value;
      this.flightOrdersRequestObj.data.travelers[travellerId-1].contact.phones = [new Phone];
      this.flightOrdersRequestObj.data.travelers[travellerId-1].contact.phones[0].deviceType = "MOBILE";
      this.flightOrdersRequestObj.data.travelers[travellerId-1].contact.phones[0].countryCallingCode = "234";
      this.flightOrdersRequestObj.data.travelers[travellerId-1].contact.phones[0].number = (<HTMLInputElement>document.getElementById('phonenumber_adult3')).value;
      
      travellerId++;
    }
    
    if (this.adultCount > 3) {
      this.flightOrdersRequestObj.data.travelers[travellerId-1] = new FlightOrdersTraveler;

      this.flightOrdersRequestObj.data.travelers[travellerId-1].id =  travellerId.toString();
      this.flightOrdersRequestObj.data.travelers[travellerId-1].gender = this.gender_adult4;
      this.flightOrdersRequestObj.data.travelers[travellerId-1].dateOfBirth = (<HTMLInputElement>document.getElementById('dob_adult4')).value;
      this.flightOrdersRequestObj.data.travelers[travellerId-1].name = new Name;
      this.flightOrdersRequestObj.data.travelers[travellerId-1].name.firstName = (<HTMLInputElement>document.getElementById('firstname_adult4')).value;
      this.flightOrdersRequestObj.data.travelers[travellerId-1].name.lastName = (<HTMLInputElement>document.getElementById('lastname_adult4')).value;
      this.flightOrdersRequestObj.data.travelers[travellerId-1].contact = new Contact;
      this.flightOrdersRequestObj.data.travelers[travellerId-1].contact.emailAddress = (<HTMLInputElement>document.getElementById('email_adult4')).value;
      this.flightOrdersRequestObj.data.travelers[travellerId-1].contact.phones = [new Phone];
      this.flightOrdersRequestObj.data.travelers[travellerId-1].contact.phones[0].deviceType = "MOBILE";
      this.flightOrdersRequestObj.data.travelers[travellerId-1].contact.phones[0].countryCallingCode = "234";
      this.flightOrdersRequestObj.data.travelers[travellerId-1].contact.phones[0].number = (<HTMLInputElement>document.getElementById('phonenumber_adult4')).value;
      
      travellerId++;
    }
    
    if (this.adultCount > 4) {
      this.flightOrdersRequestObj.data.travelers[travellerId-1] = new FlightOrdersTraveler;

      this.flightOrdersRequestObj.data.travelers[travellerId-1].id = travellerId.toString();
      this.flightOrdersRequestObj.data.travelers[travellerId-1].gender = this.gender_adult5;
      this.flightOrdersRequestObj.data.travelers[travellerId-1].dateOfBirth = (<HTMLInputElement>document.getElementById('dob_adult5')).value;
      this.flightOrdersRequestObj.data.travelers[travellerId-1].name = new Name;
      this.flightOrdersRequestObj.data.travelers[travellerId-1].name.firstName = (<HTMLInputElement>document.getElementById('firstname_adult5')).value;
      this.flightOrdersRequestObj.data.travelers[travellerId-1].name.lastName = (<HTMLInputElement>document.getElementById('lastname_adult5')).value;
      this.flightOrdersRequestObj.data.travelers[travellerId-1].contact = new Contact;
      this.flightOrdersRequestObj.data.travelers[travellerId-1].contact.emailAddress = (<HTMLInputElement>document.getElementById('email_adult5')).value;
      this.flightOrdersRequestObj.data.travelers[travellerId-1].contact.phones = [new Phone];
      this.flightOrdersRequestObj.data.travelers[travellerId-1].contact.phones[0].deviceType = "MOBILE";
      this.flightOrdersRequestObj.data.travelers[travellerId-1].contact.phones[0].countryCallingCode = "234";
      this.flightOrdersRequestObj.data.travelers[travellerId-1].contact.phones[0].number = (<HTMLInputElement>document.getElementById('phonenumber_adult5')).value;
      
      travellerId++;
    }
    
    if (this.adultCount > 5) {
      this.flightOrdersRequestObj.data.travelers[travellerId-1] = new FlightOrdersTraveler;

      this.flightOrdersRequestObj.data.travelers[travellerId-1].id =  travellerId.toString();
      this.flightOrdersRequestObj.data.travelers[travellerId-1].gender = this.gender_adult6;
      this.flightOrdersRequestObj.data.travelers[travellerId-1].dateOfBirth = (<HTMLInputElement>document.getElementById('dob_adult6')).value;
      this.flightOrdersRequestObj.data.travelers[travellerId-1].name = new Name;
      this.flightOrdersRequestObj.data.travelers[travellerId-1].name.firstName = (<HTMLInputElement>document.getElementById('firstname_adult6')).value;
      this.flightOrdersRequestObj.data.travelers[travellerId-1].name.lastName = (<HTMLInputElement>document.getElementById('lastname_adult6')).value;
      this.flightOrdersRequestObj.data.travelers[travellerId-1].contact = new Contact;
      this.flightOrdersRequestObj.data.travelers[travellerId-1].contact.emailAddress = (<HTMLInputElement>document.getElementById('email_adult6')).value;
      this.flightOrdersRequestObj.data.travelers[travellerId-1].contact.phones = [new Phone];
      this.flightOrdersRequestObj.data.travelers[travellerId-1].contact.phones[0].deviceType = "MOBILE";
      this.flightOrdersRequestObj.data.travelers[travellerId-1].contact.phones[0].countryCallingCode = "234";
      this.flightOrdersRequestObj.data.travelers[travellerId-1].contact.phones[0].number = (<HTMLInputElement>document.getElementById('phonenumber_adult6')).value;
      
      travellerId++;
    }
    
    if (this.adultCount > 6) {
      this.flightOrdersRequestObj.data.travelers[travellerId-1] = new FlightOrdersTraveler;

      this.flightOrdersRequestObj.data.travelers[travellerId-1].id =  travellerId.toString();
      this.flightOrdersRequestObj.data.travelers[travellerId-1].gender = this.gender_adult7;
      this.flightOrdersRequestObj.data.travelers[travellerId-1].dateOfBirth = (<HTMLInputElement>document.getElementById('dob_adult7')).value;
      this.flightOrdersRequestObj.data.travelers[travellerId-1].name = new Name;
      this.flightOrdersRequestObj.data.travelers[travellerId-1].name.firstName = (<HTMLInputElement>document.getElementById('firstname_adult7')).value;
      this.flightOrdersRequestObj.data.travelers[travellerId-1].name.lastName = (<HTMLInputElement>document.getElementById('lastname_adult7')).value;
      this.flightOrdersRequestObj.data.travelers[travellerId-1].contact = new Contact;
      this.flightOrdersRequestObj.data.travelers[travellerId-1].contact.emailAddress = (<HTMLInputElement>document.getElementById('email_adult7')).value;
      this.flightOrdersRequestObj.data.travelers[travellerId-1].contact.phones = [new Phone];
      this.flightOrdersRequestObj.data.travelers[travellerId-1].contact.phones[0].deviceType = "MOBILE";
      this.flightOrdersRequestObj.data.travelers[travellerId-1].contact.phones[0].countryCallingCode = "234";
      this.flightOrdersRequestObj.data.travelers[travellerId-1].contact.phones[0].number = (<HTMLInputElement>document.getElementById('phonenumber_adult7')).value;
      
      travellerId++;
    }
    
    if (this.adultCount > 7) {
      this.flightOrdersRequestObj.data.travelers[travellerId-1] = new FlightOrdersTraveler;

      this.flightOrdersRequestObj.data.travelers[travellerId-1].id =  travellerId.toString();
      this.flightOrdersRequestObj.data.travelers[travellerId-1].gender = this.gender_adult8;
      this.flightOrdersRequestObj.data.travelers[travellerId-1].dateOfBirth = (<HTMLInputElement>document.getElementById('dob_adult8')).value;
      this.flightOrdersRequestObj.data.travelers[travellerId-1].name = new Name;
      this.flightOrdersRequestObj.data.travelers[travellerId-1].name.firstName = (<HTMLInputElement>document.getElementById('firstname_adult8')).value;
      this.flightOrdersRequestObj.data.travelers[travellerId-1].name.lastName = (<HTMLInputElement>document.getElementById('lastname_adult8')).value;
      this.flightOrdersRequestObj.data.travelers[travellerId-1].contact = new Contact;
      this.flightOrdersRequestObj.data.travelers[travellerId-1].contact.emailAddress = (<HTMLInputElement>document.getElementById('email_adult8')).value;
      this.flightOrdersRequestObj.data.travelers[travellerId-1].contact.phones = [new Phone];
      this.flightOrdersRequestObj.data.travelers[travellerId-1].contact.phones[0].deviceType = "MOBILE";
      this.flightOrdersRequestObj.data.travelers[travellerId-1].contact.phones[0].countryCallingCode = "234";
      this.flightOrdersRequestObj.data.travelers[travellerId-1].contact.phones[0].number = (<HTMLInputElement>document.getElementById('phonenumber_adult8')).value;
      
      travellerId++;
    }
    
    if (this.adultCount > 8) {
      this.flightOrdersRequestObj.data.travelers[travellerId-1] = new FlightOrdersTraveler;

      this.flightOrdersRequestObj.data.travelers[travellerId-1].id =  travellerId.toString();
      this.flightOrdersRequestObj.data.travelers[travellerId-1].gender = this.gender_adult9;
      this.flightOrdersRequestObj.data.travelers[travellerId-1].dateOfBirth = (<HTMLInputElement>document.getElementById('dob_adult9')).value;
      this.flightOrdersRequestObj.data.travelers[travellerId-1].name = new Name;
      this.flightOrdersRequestObj.data.travelers[travellerId-1].name.firstName = (<HTMLInputElement>document.getElementById('firstname_adult9')).value;
      this.flightOrdersRequestObj.data.travelers[travellerId-1].name.lastName = (<HTMLInputElement>document.getElementById('lastname_adult9')).value;
      this.flightOrdersRequestObj.data.travelers[travellerId-1].contact = new Contact;
      this.flightOrdersRequestObj.data.travelers[travellerId-1].contact.emailAddress = (<HTMLInputElement>document.getElementById('email_adult9')).value;
      this.flightOrdersRequestObj.data.travelers[travellerId-1].contact.phones = [new Phone];
      this.flightOrdersRequestObj.data.travelers[travellerId-1].contact.phones[0].deviceType = "MOBILE";
      this.flightOrdersRequestObj.data.travelers[travellerId-1].contact.phones[0].countryCallingCode = "234";
      this.flightOrdersRequestObj.data.travelers[travellerId-1].contact.phones[0].number = (<HTMLInputElement>document.getElementById('phonenumber_adult9')).value;
      
      travellerId++;
    }
    //ADULT END

    //CHILD START
    if (this.childCount > 0) {

      this.flightOrdersRequestObj.data.travelers[travellerId-1] = new FlightOrdersTraveler;

      this.flightOrdersRequestObj.data.travelers[travellerId-1].id =  travellerId.toString();
      this.flightOrdersRequestObj.data.travelers[travellerId-1].gender = this.gender_child1;
      this.flightOrdersRequestObj.data.travelers[travellerId-1].dateOfBirth = (<HTMLInputElement>document.getElementById('dob_child1')).value;
      this.flightOrdersRequestObj.data.travelers[travellerId-1].name = new Name;
      this.flightOrdersRequestObj.data.travelers[travellerId-1].name.firstName = (<HTMLInputElement>document.getElementById('firstname_child1')).value;
      this.flightOrdersRequestObj.data.travelers[travellerId-1].name.lastName = (<HTMLInputElement>document.getElementById('lastname_child1')).value;
      this.flightOrdersRequestObj.data.travelers[travellerId-1].contact = new Contact;
      this.flightOrdersRequestObj.data.travelers[travellerId-1].contact.emailAddress = (<HTMLInputElement>document.getElementById('email_child1')).value;
      this.flightOrdersRequestObj.data.travelers[travellerId-1].contact.phones = [new Phone];
      this.flightOrdersRequestObj.data.travelers[travellerId-1].contact.phones[0].deviceType = "MOBILE";
      this.flightOrdersRequestObj.data.travelers[travellerId-1].contact.phones[0].countryCallingCode = "234";
      this.flightOrdersRequestObj.data.travelers[travellerId-1].contact.phones[0].number = (<HTMLInputElement>document.getElementById('phonenumber_child1')).value;
      
      travellerId++;
    }

    if (this.childCount > 1) {
      this.flightOrdersRequestObj.data.travelers[travellerId-1] = new FlightOrdersTraveler;

      this.flightOrdersRequestObj.data.travelers[travellerId-1].id =  travellerId.toString();
      this.flightOrdersRequestObj.data.travelers[travellerId-1].gender = this.gender_child2;
      this.flightOrdersRequestObj.data.travelers[travellerId-1].dateOfBirth = (<HTMLInputElement>document.getElementById('dob_child2')).value;
      this.flightOrdersRequestObj.data.travelers[travellerId-1].name = new Name;
      this.flightOrdersRequestObj.data.travelers[travellerId-1].name.firstName = (<HTMLInputElement>document.getElementById('firstname_child2')).value;
      this.flightOrdersRequestObj.data.travelers[travellerId-1].name.lastName = (<HTMLInputElement>document.getElementById('lastname_child2')).value;
      this.flightOrdersRequestObj.data.travelers[travellerId-1].contact = new Contact;
      this.flightOrdersRequestObj.data.travelers[travellerId-1].contact.emailAddress = (<HTMLInputElement>document.getElementById('email_child2')).value;
      this.flightOrdersRequestObj.data.travelers[travellerId-1].contact.phones = [new Phone];
      this.flightOrdersRequestObj.data.travelers[travellerId-1].contact.phones[0].deviceType = "MOBILE";
      this.flightOrdersRequestObj.data.travelers[travellerId-1].contact.phones[0].countryCallingCode = "234";
      this.flightOrdersRequestObj.data.travelers[travellerId-1].contact.phones[0].number = (<HTMLInputElement>document.getElementById('phonenumber_child2')).value;
      
      travellerId++;
    }
    
    if (this.childCount > 2) {
      this.flightOrdersRequestObj.data.travelers[travellerId-1] = new FlightOrdersTraveler;

      this.flightOrdersRequestObj.data.travelers[travellerId-1].id =  travellerId.toString();
      this.flightOrdersRequestObj.data.travelers[travellerId-1].gender = this.gender_child3;
      this.flightOrdersRequestObj.data.travelers[travellerId-1].dateOfBirth = (<HTMLInputElement>document.getElementById('dob_child3')).value;
      this.flightOrdersRequestObj.data.travelers[travellerId-1].name = new Name;
      this.flightOrdersRequestObj.data.travelers[travellerId-1].name.firstName = (<HTMLInputElement>document.getElementById('firstname_child3')).value;
      this.flightOrdersRequestObj.data.travelers[travellerId-1].name.lastName = (<HTMLInputElement>document.getElementById('lastname_child3')).value;
      this.flightOrdersRequestObj.data.travelers[travellerId-1].contact = new Contact;
      this.flightOrdersRequestObj.data.travelers[travellerId-1].contact.emailAddress = (<HTMLInputElement>document.getElementById('email_child3')).value;
      this.flightOrdersRequestObj.data.travelers[travellerId-1].contact.phones = [new Phone];
      this.flightOrdersRequestObj.data.travelers[travellerId-1].contact.phones[0].deviceType = "MOBILE";
      this.flightOrdersRequestObj.data.travelers[travellerId-1].contact.phones[0].countryCallingCode = "234";
      this.flightOrdersRequestObj.data.travelers[travellerId-1].contact.phones[0].number = (<HTMLInputElement>document.getElementById('phonenumber_child3')).value;
      
      travellerId++;
    }
    
    if (this.childCount > 3) {
      this.flightOrdersRequestObj.data.travelers[travellerId-1] = new FlightOrdersTraveler;

      this.flightOrdersRequestObj.data.travelers[travellerId-1].id =  travellerId.toString();
      this.flightOrdersRequestObj.data.travelers[travellerId-1].gender = this.gender_child4;
      this.flightOrdersRequestObj.data.travelers[travellerId-1].dateOfBirth = (<HTMLInputElement>document.getElementById('dob_child4')).value;
      this.flightOrdersRequestObj.data.travelers[travellerId-1].name = new Name;
      this.flightOrdersRequestObj.data.travelers[travellerId-1].name.firstName = (<HTMLInputElement>document.getElementById('firstname_child4')).value;
      this.flightOrdersRequestObj.data.travelers[travellerId-1].name.lastName = (<HTMLInputElement>document.getElementById('lastname_child4')).value;
      this.flightOrdersRequestObj.data.travelers[travellerId-1].contact = new Contact;
      this.flightOrdersRequestObj.data.travelers[travellerId-1].contact.emailAddress = (<HTMLInputElement>document.getElementById('email_child4')).value;
      this.flightOrdersRequestObj.data.travelers[travellerId-1].contact.phones = [new Phone];
      this.flightOrdersRequestObj.data.travelers[travellerId-1].contact.phones[0].deviceType = "MOBILE";
      this.flightOrdersRequestObj.data.travelers[travellerId-1].contact.phones[0].countryCallingCode = "234";
      this.flightOrdersRequestObj.data.travelers[travellerId-1].contact.phones[0].number = (<HTMLInputElement>document.getElementById('phonenumber_child4')).value;
      
      travellerId++;
    }
    
    if (this.childCount > 4) {
      this.flightOrdersRequestObj.data.travelers[travellerId-1] = new FlightOrdersTraveler;

      this.flightOrdersRequestObj.data.travelers[travellerId-1].id =  travellerId.toString();
      this.flightOrdersRequestObj.data.travelers[travellerId-1].gender = this.gender_child5;
      this.flightOrdersRequestObj.data.travelers[travellerId-1].dateOfBirth = (<HTMLInputElement>document.getElementById('dob_child5')).value;
      this.flightOrdersRequestObj.data.travelers[travellerId-1].name = new Name;
      this.flightOrdersRequestObj.data.travelers[travellerId-1].name.firstName = (<HTMLInputElement>document.getElementById('firstname_child5')).value;
      this.flightOrdersRequestObj.data.travelers[travellerId-1].name.lastName = (<HTMLInputElement>document.getElementById('lastname_child5')).value;
      this.flightOrdersRequestObj.data.travelers[travellerId-1].contact = new Contact;
      this.flightOrdersRequestObj.data.travelers[travellerId-1].contact.emailAddress = (<HTMLInputElement>document.getElementById('email_child5')).value;
      this.flightOrdersRequestObj.data.travelers[travellerId-1].contact.phones = [new Phone];
      this.flightOrdersRequestObj.data.travelers[travellerId-1].contact.phones[0].deviceType = "MOBILE";
      this.flightOrdersRequestObj.data.travelers[travellerId-1].contact.phones[0].countryCallingCode = "97travellerId-1";
      this.flightOrdersRequestObj.data.travelers[travellerId-1].contact.phones[0].number = (<HTMLInputElement>document.getElementById('phonenumber_child5')).value;
      
      travellerId++;
    }
    
    if (this.childCount > 5) {
      this.flightOrdersRequestObj.data.travelers[travellerId-1] = new FlightOrdersTraveler;

      this.flightOrdersRequestObj.data.travelers[travellerId-1].id =  travellerId.toString();
      this.flightOrdersRequestObj.data.travelers[travellerId-1].gender = this.gender_child6;
      this.flightOrdersRequestObj.data.travelers[travellerId-1].dateOfBirth = (<HTMLInputElement>document.getElementById('dob_child6')).value;
      this.flightOrdersRequestObj.data.travelers[travellerId-1].name = new Name;
      this.flightOrdersRequestObj.data.travelers[travellerId-1].name.firstName = (<HTMLInputElement>document.getElementById('firstname_child6')).value;
      this.flightOrdersRequestObj.data.travelers[travellerId-1].name.lastName = (<HTMLInputElement>document.getElementById('lastname_child6')).value;
      this.flightOrdersRequestObj.data.travelers[travellerId-1].contact = new Contact;
      this.flightOrdersRequestObj.data.travelers[travellerId-1].contact.emailAddress = (<HTMLInputElement>document.getElementById('email_child6')).value;
      this.flightOrdersRequestObj.data.travelers[travellerId-1].contact.phones = [new Phone];
      this.flightOrdersRequestObj.data.travelers[travellerId-1].contact.phones[0].deviceType = "MOBILE";
      this.flightOrdersRequestObj.data.travelers[travellerId-1].contact.phones[0].countryCallingCode = "234";
      this.flightOrdersRequestObj.data.travelers[travellerId-1].contact.phones[0].number = (<HTMLInputElement>document.getElementById('phonenumber_child6')).value;
      
      travellerId++;
    }
    
    if (this.childCount > 6) {
      this.flightOrdersRequestObj.data.travelers[travellerId-1] = new FlightOrdersTraveler;

      this.flightOrdersRequestObj.data.travelers[travellerId-1].id =  travellerId.toString();
      this.flightOrdersRequestObj.data.travelers[travellerId-1].gender = this.gender_child7;
      this.flightOrdersRequestObj.data.travelers[travellerId-1].dateOfBirth = (<HTMLInputElement>document.getElementById('dob_child7')).value;
      this.flightOrdersRequestObj.data.travelers[travellerId-1].name = new Name;
      this.flightOrdersRequestObj.data.travelers[travellerId-1].name.firstName = (<HTMLInputElement>document.getElementById('firstname_child7')).value;
      this.flightOrdersRequestObj.data.travelers[travellerId-1].name.lastName = (<HTMLInputElement>document.getElementById('lastname_child7')).value;
      this.flightOrdersRequestObj.data.travelers[travellerId-1].contact = new Contact;
      this.flightOrdersRequestObj.data.travelers[travellerId-1].contact.emailAddress = (<HTMLInputElement>document.getElementById('email_child7')).value;
      this.flightOrdersRequestObj.data.travelers[travellerId-1].contact.phones = [new Phone];
      this.flightOrdersRequestObj.data.travelers[travellerId-1].contact.phones[0].deviceType = "MOBILE";
      this.flightOrdersRequestObj.data.travelers[travellerId-1].contact.phones[0].countryCallingCode = "234";
      this.flightOrdersRequestObj.data.travelers[travellerId-1].contact.phones[0].number = (<HTMLInputElement>document.getElementById('phonenumber_child7')).value;
      
      travellerId++;
    }
    
    if (this.childCount > 7) {
      this.flightOrdersRequestObj.data.travelers[travellerId-1] = new FlightOrdersTraveler;

      this.flightOrdersRequestObj.data.travelers[travellerId-1].id =  travellerId.toString();
      this.flightOrdersRequestObj.data.travelers[travellerId-1].gender = this.gender_child8;
      this.flightOrdersRequestObj.data.travelers[travellerId-1].dateOfBirth = (<HTMLInputElement>document.getElementById('dob_child8')).value;
      this.flightOrdersRequestObj.data.travelers[travellerId-1].name = new Name;
      this.flightOrdersRequestObj.data.travelers[travellerId-1].name.firstName = (<HTMLInputElement>document.getElementById('firstname_child8')).value;
      this.flightOrdersRequestObj.data.travelers[travellerId-1].name.lastName = (<HTMLInputElement>document.getElementById('lastname_child8')).value;
      this.flightOrdersRequestObj.data.travelers[travellerId-1].contact = new Contact;
      this.flightOrdersRequestObj.data.travelers[travellerId-1].contact.emailAddress = (<HTMLInputElement>document.getElementById('email_child8')).value;
      this.flightOrdersRequestObj.data.travelers[travellerId-1].contact.phones = [new Phone];
      this.flightOrdersRequestObj.data.travelers[travellerId-1].contact.phones[0].deviceType = "MOBILE";
      this.flightOrdersRequestObj.data.travelers[travellerId-1].contact.phones[0].countryCallingCode = "234";
      this.flightOrdersRequestObj.data.travelers[travellerId-1].contact.phones[0].number = (<HTMLInputElement>document.getElementById('phonenumber_child8')).value;
      
      travellerId++;
    }
    
    if (this.childCount > 8) {
      this.flightOrdersRequestObj.data.travelers[travellerId-1] = new FlightOrdersTraveler;

      this.flightOrdersRequestObj.data.travelers[travellerId-1].id =  travellerId.toString();
      this.flightOrdersRequestObj.data.travelers[travellerId-1].gender = this.gender_child9;
      this.flightOrdersRequestObj.data.travelers[travellerId-1].dateOfBirth = (<HTMLInputElement>document.getElementById('dob_child9')).value;
      this.flightOrdersRequestObj.data.travelers[travellerId-1].name = new Name;
      this.flightOrdersRequestObj.data.travelers[travellerId-1].name.firstName = (<HTMLInputElement>document.getElementById('firstname_child9')).value;
      this.flightOrdersRequestObj.data.travelers[travellerId-1].name.lastName = (<HTMLInputElement>document.getElementById('lastname_child9')).value;
      this.flightOrdersRequestObj.data.travelers[travellerId-1].contact = new Contact;
      this.flightOrdersRequestObj.data.travelers[travellerId-1].contact.emailAddress = (<HTMLInputElement>document.getElementById('email_child9')).value;
      this.flightOrdersRequestObj.data.travelers[travellerId-1].contact.phones = [new Phone];
      this.flightOrdersRequestObj.data.travelers[travellerId-1].contact.phones[0].deviceType = "MOBILE";
      this.flightOrdersRequestObj.data.travelers[travellerId-1].contact.phones[0].countryCallingCode = "234";
      this.flightOrdersRequestObj.data.travelers[travellerId-1].contact.phones[0].number = (<HTMLInputElement>document.getElementById('phonenumber_child9')).value;
      
      travellerId++;
    }
    //CHILD END

    //INFANT START
    if (this.infantCount > 0) {

      this.flightOrdersRequestObj.data.travelers[travellerId-1] = new FlightOrdersTraveler;

      this.flightOrdersRequestObj.data.travelers[travellerId-1].id =  travellerId.toString();
      this.flightOrdersRequestObj.data.travelers[travellerId-1].gender = this.gender_infant1;
      this.flightOrdersRequestObj.data.travelers[travellerId-1].dateOfBirth = (<HTMLInputElement>document.getElementById('dob_infant1')).value;
      this.flightOrdersRequestObj.data.travelers[travellerId-1].name = new Name;
      this.flightOrdersRequestObj.data.travelers[travellerId-1].name.firstName = (<HTMLInputElement>document.getElementById('firstname_infant1')).value;
      this.flightOrdersRequestObj.data.travelers[travellerId-1].name.lastName = (<HTMLInputElement>document.getElementById('lastname_infant1')).value;
      this.flightOrdersRequestObj.data.travelers[travellerId-1].contact = new Contact;
      this.flightOrdersRequestObj.data.travelers[travellerId-1].contact.emailAddress = (<HTMLInputElement>document.getElementById('email_infant1')).value;
      this.flightOrdersRequestObj.data.travelers[travellerId-1].contact.phones = [new Phone];
      this.flightOrdersRequestObj.data.travelers[travellerId-1].contact.phones[0].deviceType = "MOBILE";
      this.flightOrdersRequestObj.data.travelers[travellerId-1].contact.phones[0].countryCallingCode = "234";
      this.flightOrdersRequestObj.data.travelers[travellerId-1].contact.phones[0].number = (<HTMLInputElement>document.getElementById('phonenumber_infant1')).value;
      
      travellerId++;
    }

    if (this.infantCount > 1) {
      this.flightOrdersRequestObj.data.travelers[travellerId-1] = new FlightOrdersTraveler;

      this.flightOrdersRequestObj.data.travelers[travellerId-1].id =  travellerId.toString();
      this.flightOrdersRequestObj.data.travelers[travellerId-1].gender = this.gender_infant2;
      this.flightOrdersRequestObj.data.travelers[travellerId-1].dateOfBirth = (<HTMLInputElement>document.getElementById('dob_infant2')).value;
      this.flightOrdersRequestObj.data.travelers[travellerId-1].name = new Name;
      this.flightOrdersRequestObj.data.travelers[travellerId-1].name.firstName = (<HTMLInputElement>document.getElementById('firstname_infant2')).value;
      this.flightOrdersRequestObj.data.travelers[travellerId-1].name.lastName = (<HTMLInputElement>document.getElementById('lastname_infant2')).value;
      this.flightOrdersRequestObj.data.travelers[travellerId-1].contact = new Contact;
      this.flightOrdersRequestObj.data.travelers[travellerId-1].contact.emailAddress = (<HTMLInputElement>document.getElementById('email_infant2')).value;
      this.flightOrdersRequestObj.data.travelers[travellerId-1].contact.phones = [new Phone];
      this.flightOrdersRequestObj.data.travelers[travellerId-1].contact.phones[0].deviceType = "MOBILE";
      this.flightOrdersRequestObj.data.travelers[travellerId-1].contact.phones[0].countryCallingCode = "234";
      this.flightOrdersRequestObj.data.travelers[travellerId-1].contact.phones[0].number = (<HTMLInputElement>document.getElementById('phonenumber_infant2')).value;
      
      travellerId++;
    }
    
    if (this.infantCount > 2) {
      this.flightOrdersRequestObj.data.travelers[travellerId-1] = new FlightOrdersTraveler;

      this.flightOrdersRequestObj.data.travelers[travellerId-1].id =  travellerId.toString();
      this.flightOrdersRequestObj.data.travelers[travellerId-1].gender = this.gender_infant3;
      this.flightOrdersRequestObj.data.travelers[travellerId-1].dateOfBirth = (<HTMLInputElement>document.getElementById('dob_infant3')).value;
      this.flightOrdersRequestObj.data.travelers[travellerId-1].name = new Name;
      this.flightOrdersRequestObj.data.travelers[travellerId-1].name.firstName = (<HTMLInputElement>document.getElementById('firstname_infant3')).value;
      this.flightOrdersRequestObj.data.travelers[travellerId-1].name.lastName = (<HTMLInputElement>document.getElementById('lastname_infant3')).value;
      this.flightOrdersRequestObj.data.travelers[travellerId-1].contact = new Contact;
      this.flightOrdersRequestObj.data.travelers[travellerId-1].contact.emailAddress = (<HTMLInputElement>document.getElementById('email_infant3')).value;
      this.flightOrdersRequestObj.data.travelers[travellerId-1].contact.phones = [new Phone];
      this.flightOrdersRequestObj.data.travelers[travellerId-1].contact.phones[0].deviceType = "MOBILE";
      this.flightOrdersRequestObj.data.travelers[travellerId-1].contact.phones[0].countryCallingCode = "234";
      this.flightOrdersRequestObj.data.travelers[travellerId-1].contact.phones[0].number = (<HTMLInputElement>document.getElementById('phonenumber_infant3')).value;
      
      travellerId++;
    }
    
    if (this.infantCount > 3) {
      this.flightOrdersRequestObj.data.travelers[travellerId-1] = new FlightOrdersTraveler;

      this.flightOrdersRequestObj.data.travelers[travellerId-1].id =  travellerId.toString();
      this.flightOrdersRequestObj.data.travelers[travellerId-1].gender = this.gender_infant4;
      this.flightOrdersRequestObj.data.travelers[travellerId-1].dateOfBirth = (<HTMLInputElement>document.getElementById('dob_infant4')).value;
      this.flightOrdersRequestObj.data.travelers[travellerId-1].name = new Name;
      this.flightOrdersRequestObj.data.travelers[travellerId-1].name.firstName = (<HTMLInputElement>document.getElementById('firstname_infant4')).value;
      this.flightOrdersRequestObj.data.travelers[travellerId-1].name.lastName = (<HTMLInputElement>document.getElementById('lastname_infant4')).value;
      this.flightOrdersRequestObj.data.travelers[travellerId-1].contact = new Contact;
      this.flightOrdersRequestObj.data.travelers[travellerId-1].contact.emailAddress = (<HTMLInputElement>document.getElementById('email_infant4')).value;
      this.flightOrdersRequestObj.data.travelers[travellerId-1].contact.phones = [new Phone];
      this.flightOrdersRequestObj.data.travelers[travellerId-1].contact.phones[0].deviceType = "MOBILE";
      this.flightOrdersRequestObj.data.travelers[travellerId-1].contact.phones[0].countryCallingCode = "234";
      this.flightOrdersRequestObj.data.travelers[travellerId-1].contact.phones[0].number = (<HTMLInputElement>document.getElementById('phonenumber_infant4')).value;
      
      travellerId++;
    }
    
    if (this.infantCount > 4) {
      this.flightOrdersRequestObj.data.travelers[travellerId-1] = new FlightOrdersTraveler;

      this.flightOrdersRequestObj.data.travelers[travellerId-1].id =  travellerId.toString();
      this.flightOrdersRequestObj.data.travelers[travellerId-1].gender = this.gender_infant5;
      this.flightOrdersRequestObj.data.travelers[travellerId-1].dateOfBirth = (<HTMLInputElement>document.getElementById('dob_infant5')).value;
      this.flightOrdersRequestObj.data.travelers[travellerId-1].name = new Name;
      this.flightOrdersRequestObj.data.travelers[travellerId-1].name.firstName = (<HTMLInputElement>document.getElementById('firstname_infant5')).value;
      this.flightOrdersRequestObj.data.travelers[travellerId-1].name.lastName = (<HTMLInputElement>document.getElementById('lastname_infant5')).value;
      this.flightOrdersRequestObj.data.travelers[travellerId-1].contact = new Contact;
      this.flightOrdersRequestObj.data.travelers[travellerId-1].contact.emailAddress = (<HTMLInputElement>document.getElementById('email_infant5')).value;
      this.flightOrdersRequestObj.data.travelers[travellerId-1].contact.phones = [new Phone];
      this.flightOrdersRequestObj.data.travelers[travellerId-1].contact.phones[0].deviceType = "MOBILE";
      this.flightOrdersRequestObj.data.travelers[travellerId-1].contact.phones[0].countryCallingCode = "97travellerId-1";
      this.flightOrdersRequestObj.data.travelers[travellerId-1].contact.phones[0].number = (<HTMLInputElement>document.getElementById('phonenumber_infant5')).value;
      
      travellerId++;
    }
    
    if (this.infantCount > 5) {
      this.flightOrdersRequestObj.data.travelers[travellerId-1] = new FlightOrdersTraveler;

      this.flightOrdersRequestObj.data.travelers[travellerId-1].id =  travellerId.toString();
      this.flightOrdersRequestObj.data.travelers[travellerId-1].gender = this.gender_infant6;
      this.flightOrdersRequestObj.data.travelers[travellerId-1].dateOfBirth = (<HTMLInputElement>document.getElementById('dob_infant6')).value;
      this.flightOrdersRequestObj.data.travelers[travellerId-1].name = new Name;
      this.flightOrdersRequestObj.data.travelers[travellerId-1].name.firstName = (<HTMLInputElement>document.getElementById('firstname_infant6')).value;
      this.flightOrdersRequestObj.data.travelers[travellerId-1].name.lastName = (<HTMLInputElement>document.getElementById('lastname_infant6')).value;
      this.flightOrdersRequestObj.data.travelers[travellerId-1].contact = new Contact;
      this.flightOrdersRequestObj.data.travelers[travellerId-1].contact.emailAddress = (<HTMLInputElement>document.getElementById('email_infant6')).value;
      this.flightOrdersRequestObj.data.travelers[travellerId-1].contact.phones = [new Phone];
      this.flightOrdersRequestObj.data.travelers[travellerId-1].contact.phones[0].deviceType = "MOBILE";
      this.flightOrdersRequestObj.data.travelers[travellerId-1].contact.phones[0].countryCallingCode = "234";
      this.flightOrdersRequestObj.data.travelers[travellerId-1].contact.phones[0].number = (<HTMLInputElement>document.getElementById('phonenumber_infant6')).value;
      
      travellerId++;
    }
    
    if (this.infantCount > 6) {
      this.flightOrdersRequestObj.data.travelers[travellerId-1] = new FlightOrdersTraveler;

      this.flightOrdersRequestObj.data.travelers[travellerId-1].id =  travellerId.toString();
      this.flightOrdersRequestObj.data.travelers[travellerId-1].gender = this.gender_infant7;
      this.flightOrdersRequestObj.data.travelers[travellerId-1].dateOfBirth = (<HTMLInputElement>document.getElementById('dob_infant7')).value;
      this.flightOrdersRequestObj.data.travelers[travellerId-1].name = new Name;
      this.flightOrdersRequestObj.data.travelers[travellerId-1].name.firstName = (<HTMLInputElement>document.getElementById('firstname_infant7')).value;
      this.flightOrdersRequestObj.data.travelers[travellerId-1].name.lastName = (<HTMLInputElement>document.getElementById('lastname_infant7')).value;
      this.flightOrdersRequestObj.data.travelers[travellerId-1].contact = new Contact;
      this.flightOrdersRequestObj.data.travelers[travellerId-1].contact.emailAddress = (<HTMLInputElement>document.getElementById('email_infant7')).value;
      this.flightOrdersRequestObj.data.travelers[travellerId-1].contact.phones = [new Phone];
      this.flightOrdersRequestObj.data.travelers[travellerId-1].contact.phones[0].deviceType = "MOBILE";
      this.flightOrdersRequestObj.data.travelers[travellerId-1].contact.phones[0].countryCallingCode = "234";
      this.flightOrdersRequestObj.data.travelers[travellerId-1].contact.phones[0].number = (<HTMLInputElement>document.getElementById('phonenumber_infant7')).value;
      
      travellerId++;
    }
    
    if (this.infantCount > 7) {
      this.flightOrdersRequestObj.data.travelers[travellerId-1] = new FlightOrdersTraveler;

      this.flightOrdersRequestObj.data.travelers[travellerId-1].id =  travellerId.toString();
      this.flightOrdersRequestObj.data.travelers[travellerId-1].gender = this.gender_infant8;
      this.flightOrdersRequestObj.data.travelers[travellerId-1].dateOfBirth = (<HTMLInputElement>document.getElementById('dob_infant8')).value;
      this.flightOrdersRequestObj.data.travelers[travellerId-1].name = new Name;
      this.flightOrdersRequestObj.data.travelers[travellerId-1].name.firstName = (<HTMLInputElement>document.getElementById('firstname_infant8')).value;
      this.flightOrdersRequestObj.data.travelers[travellerId-1].name.lastName = (<HTMLInputElement>document.getElementById('lastname_infant8')).value;
      this.flightOrdersRequestObj.data.travelers[travellerId-1].contact = new Contact;
      this.flightOrdersRequestObj.data.travelers[travellerId-1].contact.emailAddress = (<HTMLInputElement>document.getElementById('email_infant8')).value;
      this.flightOrdersRequestObj.data.travelers[travellerId-1].contact.phones = [new Phone];
      this.flightOrdersRequestObj.data.travelers[travellerId-1].contact.phones[0].deviceType = "MOBILE";
      this.flightOrdersRequestObj.data.travelers[travellerId-1].contact.phones[0].countryCallingCode = "234";
      this.flightOrdersRequestObj.data.travelers[travellerId-1].contact.phones[0].number = (<HTMLInputElement>document.getElementById('phonenumber_infant8')).value;
      
      travellerId++;
    }
    
    if (this.infantCount > 8) {
      this.flightOrdersRequestObj.data.travelers[travellerId-1] = new FlightOrdersTraveler;

      this.flightOrdersRequestObj.data.travelers[travellerId-1].id =  travellerId.toString();
      this.flightOrdersRequestObj.data.travelers[travellerId-1].gender = this.gender_infant9;
      this.flightOrdersRequestObj.data.travelers[travellerId-1].dateOfBirth = (<HTMLInputElement>document.getElementById('dob_infant9')).value;
      this.flightOrdersRequestObj.data.travelers[travellerId-1].name = new Name;
      this.flightOrdersRequestObj.data.travelers[travellerId-1].name.firstName = (<HTMLInputElement>document.getElementById('firstname_infant9')).value;
      this.flightOrdersRequestObj.data.travelers[travellerId-1].name.lastName = (<HTMLInputElement>document.getElementById('lastname_infant9')).value;
      this.flightOrdersRequestObj.data.travelers[travellerId-1].contact = new Contact;
      this.flightOrdersRequestObj.data.travelers[travellerId-1].contact.emailAddress = (<HTMLInputElement>document.getElementById('email_infant9')).value;
      this.flightOrdersRequestObj.data.travelers[travellerId-1].contact.phones = [new Phone];
      this.flightOrdersRequestObj.data.travelers[travellerId-1].contact.phones[0].deviceType = "MOBILE";
      this.flightOrdersRequestObj.data.travelers[travellerId-1].contact.phones[0].countryCallingCode = "234";
      this.flightOrdersRequestObj.data.travelers[travellerId-1].contact.phones[0].number = (<HTMLInputElement>document.getElementById('phonenumber_infant9')).value;
      
      travellerId++;
    }
    //INFANT END

  }

}
