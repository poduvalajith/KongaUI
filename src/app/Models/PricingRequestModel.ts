import { Data } from "@angular/router";

    export class PricingRequestModel
    {
        public  data: PricingRequestData=new PricingRequestData;
    }
    export class PricingRequestAircraft
    {
        public code: string="";
    }

    export class PricingRequestArrival
    {
        public iataCode: string="";
        public terminal!: string;
        public at: Date=new Date;
    }

    export class PricingRequestData
    {
        public type: string="";
        //public flightOffers: Data[]=[];
        public flightOffers: PricingRequestFlightOffer[]=[];
    }

    export class PricingRequestDeparture
    {
        public iataCode: string="";
        public at: Date=new Date;
        public terminal!: string;
    }

    export class PricingRequestFareDetailsBySegment
    {
        public segmentId: string="";
        public cabin: string="";
        public fareBasis: string="";
        public class: string="";
        public includedCheckedBags!: PricingRequestIncludedCheckedBags;
    }

    export class PricingRequestFee
    {
        public amount!: string;
        public type!: string;
    }

    export class PricingRequestFlightOffer
    {
        public type: string="";
        public id: string="";
        public source: string="";
        public instantTicketingRequired: boolean=true;
        public nonHomogeneous: boolean=true;
        public oneWay: boolean=true;
        public lastTicketingDate: string="";
        public numberOfBookableSeats: number=0;
        public itineraries: PricingRequestItinerary[]=[];
        public price: PricingRequestPrice=new PricingRequestPrice;
        public pricingOptions: PricingRequestPricingOptions=new PricingRequestPricingOptions;
        public validatingAirlineCodes: string[]=[];
        public travelerPricings: PricingRequestTravelerPricing[]=[];
        public  fareRules: PricingRequestFareRules=new PricingRequestFareRules;
    }

    export class PricingRequestIncludedCheckedBags
    {
        public quantity!: number;
        public  weight!: number;
        public  weightUnit!: string;
    }

    export class PricingRequestFareRules
    {
        public rules: PricingRequestFareRule[]=[];
    }

    export class PricingRequestFareRule
    {
        public category: string="";
        public maxPenaltyAmount!: string;
        public notApplicable!: boolean;
    }

    export class PricingRequestItinerary
    {
        public duration: string="";
        public segments: PricingRequestSegment[]=[];
    }

    export class PricingRequestOperating
    {
        public carrierCode: string="";
    }

    export class PricingRequestPrice
    {
       
    //public  fees!: Fee[];
    //public taxes!: Tax[];

        public currency: string="";
        
        public total: string="";
        public base: string="";

        public fees!: PricingRequestFee[];
        public grandTotal!: string;
    }
    export class PricingRequestTravellerPricingPrice
    {
        public currency: string="";
        public total: string="";
        public base: string="";
    }
    export class PricingRequestPricingOptions
    {
        public fareType: string[]=[];
        public includedCheckedBagsOnly: boolean=true;
    }

    export class PricingRequestSegment
    {
        public  departure: PricingRequestDeparture=new PricingRequestDeparture;
        public  arrival: PricingRequestArrival=new PricingRequestArrival;
        public carrierCode: string="";
        public number: string="";
        public  aircraft: PricingRequestAircraft=new PricingRequestAircraft;
        public  operating: PricingRequestOperating=new PricingRequestOperating;
        public duration: string="";
        public id: string="";
        public numberOfStops: number=0;
        public blacklistedInEU: boolean=false;
    }

    export class PricingRequestTravelerPricing
    {
        public travelerId: string="";
        public fareOption: string="";
        public travelerType: string="";
        public  associatedAdultId!: string;
        public  price: PricingRequestTravellerPricingPrice=new PricingRequestTravellerPricingPrice;
        public fareDetailsBySegment: PricingRequestFareDetailsBySegment[]=[];
    }

