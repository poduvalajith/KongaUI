import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FlightOfferRequestModel } from '../Models/FlightRequstModel';
import { PricingRequestModel } from '../Models/PricingRequestModel';
import { FlightOrdersRequest } from '../Models/FlightOrdersRequest';

@Injectable({
  providedIn: 'root'
})
export class FlightSearchApiService {

  readonly flightsearchurl = "https://localhost:44318/";

  constructor(private http:HttpClient) { }

  
  FlightOfferlist(flightobj:FlightOfferRequestModel): Observable<any> {
    return this.http.post<any>(this.flightsearchurl + "api/AmadeusAPI/FlightOffer" , flightobj);
  }

  FlightOfferPricing(pricingRequestModelObj: PricingRequestModel): Observable<any> {
    return this.http.post<any>(this.flightsearchurl + 'api/AmadeusAPI/Pricing', pricingRequestModelObj);
  }

  FlightOrders(flightOrdersRequestObj: FlightOrdersRequest): Observable<any> {
    debugger;
    return this.http.post<any>(this.flightsearchurl + 'api/AmadeusAPI/FlightOrder', flightOrdersRequestObj);
  }

}
