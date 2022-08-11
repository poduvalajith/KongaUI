import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FlightSearchPanelComponent } from './flight-search-panel/flight-search-panel.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OnewayComponent } from './flight-search-panel/oneway/oneway.component';
import { RoundTripComponent } from './flight-search-panel/round-trip/round-trip.component';
import { MultiCityComponent } from './flight-search-panel/multi-city/multi-city.component';

import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { FormsModule } from '@angular/forms';
import { AutocompleteCityComponent } from './autocomplete-city/autocomplete-city.component';
import { PassengerSelectionControlComponent } from './passenger-selection-control/passenger-selection-control.component';

import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DatePipe } from '@angular/common';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [
    AppComponent,
    FlightSearchPanelComponent,
    OnewayComponent,
    RoundTripComponent,
    MultiCityComponent,
    AutocompleteCityComponent,
    PassengerSelectionControlComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    NgxSliderModule,HttpClientModule,BrowserAnimationsModule
    ,NgxSpinnerModule
  
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
