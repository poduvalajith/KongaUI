import { Attribute, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgbTypeaheadSelectItemEvent } from '@ng-bootstrap/ng-bootstrap';
import {Observable, OperatorFunction} from 'rxjs';
import {debounceTime, map} from 'rxjs/operators';
import {default  as airLineCity} from "src/assets/AirIntCitys.json"

@Component({
  selector: '[appautocompletecity]',
  templateUrl: './autocomplete-city.component.html',
  styleUrls: ['./autocomplete-city.component.scss']
})
export class AutocompleteCityComponent implements OnInit {
  @Output() fromClicked: EventEmitter<any> =
  new EventEmitter<any>();
  selected_flight:{ CityName: any; CityCode: any; } | undefined;
  showDirectionIcon=false;
  constructor( @Attribute('label') public _control_label:any,@Attribute('icon') public _control_icon:any,@Attribute('showDirectionIcon') public _showDirectionIcon:any) { 
    if(_showDirectionIcon=='true' || _showDirectionIcon==true){
      this.showDirectionIcon=true;
    }else{
      this.showDirectionIcon=false;
    }
  }

  ngOnInit(): void {
  }
  setModel(e: NgbTypeaheadSelectItemEvent) {
    
    this.selected_flight = e.item;
    console.log("Selected Item",e);
    this.fromClicked.emit(this.selected_flight);
  }
  onKey(event: KeyboardEvent) {
    this.selected_flight=undefined;
    console.log("Key Pressd",this.selected_flight)
  }
  search: OperatorFunction<string, readonly {CityName:any, CityCode:any}[]> = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      map(term => term === '' ? []
        : airLineCity.filter(v => ((v.CityName).toLowerCase().indexOf(term.toLowerCase()) > -1) || ((v.CityCode+'').toLowerCase()== term.toLowerCase()))
        .sort((a,b)=>{
          if((new RegExp("\\b"+((a.CityCode+'').toLowerCase())+"\\b").test(term.toLowerCase()))){
            return -1 
          }
          else if(((a.CityName).toLowerCase().indexOf(term.toLowerCase()) > -1) || ((a.CityCode+'').toLowerCase()== term.toLowerCase())){
            return 1
          }else{
            return 0
          }
        }).slice(0, 10)
        )
    );
    
  formatter = (x: {CityCode: string}) => x.CityCode;
}
