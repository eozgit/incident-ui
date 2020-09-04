import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListIncidentsComponent } from './list-incidents/list-incidents.component';
import { AddIncidentComponent } from './add-incident/add-incident.component';
import { ReviewIncidentComponent } from './review-incident/review-incident.component';


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
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
