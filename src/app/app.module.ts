import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ListIncidentsComponent } from './list-incidents/list-incidents.component';
import { AddIncidentComponent } from './add-incident/add-incident.component';
import { ReviewIncidentComponent } from './review-incident/review-incident.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    ListIncidentsComponent,
    AddIncidentComponent,
    ReviewIncidentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
