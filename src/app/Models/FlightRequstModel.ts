
    export class OriginDestination {
        public  id: string | undefined;
      public  originLocationCode: string | undefined;
      public  destinationLocationCode: string | undefined;
      public  departureDateTimeRange :DepartureDateTimeRange= new DepartureDateTimeRange;
     }
  
     export class DepartureDateTimeRange
     {
         public  date:string="";
     } 
  
     export class FlightOfferRequestModel {
   
      public  currencyCode: string | undefined;
      public  originDestinations : OriginDestination[] | undefined;
      public  travelers: Traveler[]|undefined;
      public  sources: string[]|undefined;
      public  searchCriteria:SearchCriteria | undefined;
     }
     
     export class Traveler {
      public  id: string|undefined;
      public  travelerType: string|undefined;
      public  fareOptions: string[]|undefined;
      public  associatedAdultId: string|undefined;
     }
  
     export class SearchCriteria {
      public  maxFlightOffers: number|undefined;
      public  additionalInformation: AdditionalInformation | undefined;
      public  pricingOptions: PricingOptions|undefined;
      public  flightFilters: FlightFilters|undefined;
  
     }
  
     export class AdditionalInformation {
      public  chargeableCheckedBags: boolean | undefined;
      public  brandedFares: boolean|undefined;
      public  fareRule: boolean|undefined;
     }
  
     export class PricingOptions {
      public  fareType: string[]|undefined;
      public  includedCheckedBagsOnly: boolean|undefined;
     }
  
     export class FlightFilters {
      public  cabinRestrictions: CabinRestriction[]=[];
     }
  
     export class CabinRestriction
     {
         public  cabin:string="";
         public originDestinationIds :string[]=[];
     }
  
  