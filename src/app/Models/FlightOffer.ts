

export class DataFlightOffer {

    public type : string ="";
    public id : string ="";
    public source : string ="";
    public instantTicketingRequired: boolean =true;
    public nonHomogeneous: boolean =true;
    public oneWay: boolean =true;
    public lastTicketingDate: string ="";
    public numberOfBookableSeats: number =0;
    public flight_type!: string;
    public itineraries: Itinerary[] = [];
    public price: Price = new Price; 
    public pricingOptions: PricingOptions_res = new PricingOptions_res;
    public validatingAirlineCodes : string[] =[];
    public travelerPricings: TravelerPricing[] = [];
    public fareRules: FareRules=new FareRules;
    public isShow:boolean=true;
}

export class FareRules {
public currency!: string ;
public rules: Rules[]= [];
}

export class Description {
public descriptionType!: string ;
public text!: string;
}

export class Rules {
public category: string ="";
public circumstances!: string;
public notApplicable!: boolean;
public maxPenaltyAmount!: string;
public descriptions!: Description;
}

export class Itinerary {
    public duration: string ="";
    public segments: Segment[] = [];
}

export class Segment {
    public departure: Departure = new Departure;
    public arrival: Arrival = new Arrival;
    public carrierCode: string ="";
    public number: string ="";
    public aircraft: Aircraft = new Aircraft;
    public operating: Operating = new Operating;
    public duration: string ="";
    public id: string ="";
    public numberOfStops: number =0;
    public blacklistedInEU: boolean =true;
    public co2Emissions: Co2Emission[] = [];
}

export class Departure {
    public iataCode: string ="";
    public terminal: string ="";
    public at: Date =new Date;
    public departtime: string ="";
    public departtime_detail: string ="";
    public departtimeonly: string ="";
}

export class Arrival {
    public iataCode: string="";
    public terminal: string ="";
    public at: Date =new Date;
    public arrivaltime_detail: string ="";
    public arrivaltime: string ="";
    public arrivaltimeonly: string ="";
}

export class Aircraft {
    public code: string="";
}

export class Operating {
    public carrierCode: string ="";
}


export class Co2Emission {
    public weight: number =0;
    public weightUnit: string ="";
    public cabin: string ="";
}

export class PricingOptions_res {
public fareType: string[] =[];
public includedCheckedBagsOnly: boolean =true;
}

export class TravelerPricing {
public travelerId: string ="";
public fareOption: string ="";
public travelerType: string ="";
public price: Price =new Price; 
public  associatedAdultId!: string;
public fareDetailsBySegment: FareDetailsBySegment[] = [];
}

export class Price {
    public currency: string = "";
    public grandTotal!: string;
    public total: string = "";
    public base: string = ""; //@base
    public  fees!: Fee[];
    public taxes!: Tax[];
}

export class Tax {
  public amount: string = "";
  public type: string = "";
}

export class Fee {
  public amount: string = "";
  public type!: string ;
}

export class FareDetailsBySegment {
    public segmentId: string = "";
    public cabin: string = "";
    public fareBasis: string = "";
    //public string @class: string | undefined;
    public class: string = "";
    public includedCheckedBags: IncludedCheckedBags = new IncludedCheckedBags;

    //[JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
    public additionalServices!: AdditionalServices ;
}

export class IncludedCheckedBags {
 public quantity: number= 0;
//[JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
public weight!: number ;
//[JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
public weightUnit!: string ;
}

export class AdditionalServices {
  public chargeableCheckedBags: ChargeableCheckedBags = new ChargeableCheckedBags;
}

export class ChargeableCheckedBags {
    public quantity: number = 0;
    public weight: number = 0;
    public weightUnit: string = "";
}

export class Meta
{
    public count:number=0;
}

export class FlightOfferResponseModel
{
    public meta:Meta = new Meta;
    public data: DataFlightOffer[]=[];
    public dictionaries!: {[key: string]: [value: string]};
}
