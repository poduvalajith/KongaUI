export class FlightOrdersResponse
{
    public data!: FlightOrdersResponseData;
    public dictionaries!: FlightOrdersResponseDictionaries;
}
export class FlightOrdersResponseAddress
{
    public lines:string []=[];
    public countryCode!  : string;
    public cityName! :string;
}


export class FlightOrdersResponseAddresseeName
{
    public firstName! : string;
}

export class FlightOrdersResponseAircraft
{
    public code! : string;
}

export class FlightOrdersResponseArrival
{
    public  iataCode!: string;
    public terminal! : string;
    public DateTime! : string; 
}

export class AssociatedRecord
{
    public reference! : string ;
    public  creationDate! : string;
    public originSystemCode! : string;
    public flightOfferId! : string;
    public formatedcreationDate!:string;
}

export class FlightOrdersResponseCo2Emission
{
    public weight : number[]=[];
    public  weightUnit! : string;
    public cabin! : string;
}

export class FlightOrdersResponseContact
{
    public purpose : string | undefined;
    public flightOrdersResponsePhone: FlightOrdersResponsePhone[] | undefined;
    public  emailAddress : string | undefined;
}

export class FlightOrdersResponsePhone {

    public deviceType : string | undefined;
    public  countryCallingCode : string | undefined;
    public  number : string | undefined;
}


export class FlightOrdersResponseData
{
    public type! : string;
    public  id! : string;
    public associatedRecords!: AssociatedRecord[] ;
    public flightOffers!:FlightOrdersResponseFlightOffer[];
    public travelers!:FlightOrdersResponseTraveler[];
    public formOfPayments!:FlightOrdersResponseFormOfPayment[];
    public ticketingAgreement!: FlightOrdersResponseTicketingAgreement;
    public contacts!:FlightOrdersResponseContact[];
}

export class FlightOrdersResponseDeparture
{
    public iataCode : string | undefined;
    public terminal : string | undefined;
    public DateTime :string="";
}

export class FlightOrdersResponseDictionaries
{
    public  locations: Location | undefined
}

export class FlightOrdersResponseFareDetailsBySegment
{
    public segmentId! : string;
    public  cabin! : string;
    public  fareBasis! : string;
    public  brandedFare! : string;
    public  class!: string;
    public includedCheckedBags!: FlightOrdersResponseIncludedCheckedBags;
}

export class FlightOrdersResponseFee
{
    public amount : string | undefined;
    public type : string | undefined;
}

export class FlightOrdersResponseFlightOffer
{
    public type! : string;
    public id! : string;
    public source! : string;
    public  nonHomogeneous! : boolean ;
    public lastTicketingDate!: string ;
    public itineraries!:FlightOrdersResponseItinerary[];
    public price!: Price ;
    public pricingOptions!:FlightOrdersResponsePricingOptions;
    public  validatingAirlineCodes: string[]=[];
    public travelerPricings!:FlightOrdersResponseTravelerPricing[];
}

export class FlightOrdersResponseFormOfPayment
{
    public other: FlightOrdersResponseOther | undefined;
}

// export class FRA
// {
//     public string cityCode { get; set; }
//     public string countryCode { get; set; }
// }

export class FlightOrdersResponseIncludedCheckedBags
{
    public quantity!:string;
}

export class FlightOrdersResponseItinerary
{
    public segments: FlightOrdersResponseSegment[]| undefined;
}

export class FlightOrdersResponseName
{
    public  firstName! :string;
    public lastName! :string;
}

export class FlightOrdersResponseOther
{
    public method :string | undefined;
    // public flightOfferIds: flightOfferIds | undefined;
}


export class Price
{
    public  currency ! : string;
    public  total ! : string;
    public  base ! : string
    public  grandTotal! : string ;
}
export class FlightOrdersResponsePrice
{
    public currency! : string;
    public total! : string ;
    public base! : string;
    public fees!:FlightOrdersResponseFee[];
    public grandTotal!: string;
    public  billingCurrency! : string ;
    public taxes!:FlightOrdersResponseTaxis[];
}

export class FlightOrdersResponsePricingOptions
{
    public  fareType : string[]=[] ;
    public  includedCheckedBagsOnly: boolean | undefined;
}


export class FlightOrdersResponseSegment
{
    public departure: FlightOrdersResponseDeparture | undefined;
    public arrival: FlightOrdersResponseArrival | undefined; 
    public  carrierCode :string | undefined;
    public  number:string | undefined;
    public aircraft: FlightOrdersResponseAircraft | undefined;  
    public  id :string | undefined;
    public  numberOfStops :string | undefined;
    public co2Emissions:FlightOrdersResponseCo2Emission[] | undefined; 
}

export class FlightOrdersResponseTaxis
{
    public amount:string | undefined;
    public  code :string | undefined;
}

export class FlightOrdersResponseTicketingAgreement
{
    public  option:string | undefined;
    public  delay :string | undefined;
}

export class FlightOrdersResponseTraveler
{
    public id : string | undefined;
    public  dateOfBirth : string | undefined;
    public  gender : string | undefined;
    public name!: FlightOrdersResponseName;
    public contact!: FlightOrdersResponseContact;
}

export class FlightOrdersResponseTravelerPricing
{
    public travelerId! : string;
    public fareOption! : string;
    public travelerType! : string;
    public price!: FlightOrdersResponsePrice; 
    public fareDetailsBySegment!: FlightOrdersResponseFareDetailsBySegment[]; 
    public associatedAdultId! : string;
}