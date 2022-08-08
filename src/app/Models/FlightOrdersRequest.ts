import { PricingRequestFlightOffer } from "./PricingRequestModel";

export class FlightOrdersRequest
{
    public data: FlightOrdersData= new FlightOrdersData;
}

export class FlightOrdersData
{
    public  type:string="";
    //public flightOffers:FlightOrdersFlightOffer[]=[];
    public flightOffers:PricingRequestFlightOffer[]=[];
    
    public travelers:FlightOrdersTraveler[]=[];
    
    public remarks! :null;
    public  ticketingAgreement:TicketingAgreement=new TicketingAgreement;
   
    public contacts!:null;
    public formOfPayments:FormOfPayment[]=[];
}

export class FlightOrdersTraveler
{
    public  id :string="";
    public  dateOfBirth :string="";
    public  name :Name= new Name;
    public  gender :string="";

    public  contact :Contact= new Contact;
   
    //public List<Document>? documents { get; set; }
}

export class Name
{
    public  firstName:string="";
    public  lastName:string="";
}

export class Contact
{
    public  emailAddress :string="";
    public  phones :Phone[]=[];
}

export class Phone
{
    public deviceType :string="";
    public countryCallingCode :string="";
    public number :string="";
}

export class TicketingAgreement
{
    public  option :string="";
    public  delay :string="";
}

export class FormOfPayment
{
    public  other:Other = new Other;
}

export class Other
{
    public  method:string="";
    public  flightOfferIds:string[]=[];
}
