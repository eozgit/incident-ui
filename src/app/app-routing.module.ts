import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListIncidentsComponent } from './list-incidents/list-incidents.component';
import { AddIncidentComponent } from './add-incident/add-incident.component';
import { ReviewIncidentComponent } from './review-incident/review-incident.component';
import { ViewIncidentComponent } from './view-incident/view-incident.component';

const routes: Routes = [
  { path: 'list', component: ListIncidentsComponent },
  { path: 'add', component: AddIncidentComponent },
  { path: 'review/:incidentId', component: ReviewIncidentComponent },
  { path: 'view/:incidentId', component: ViewIncidentComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
