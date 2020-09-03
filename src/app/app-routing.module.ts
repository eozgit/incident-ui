import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListIncidentsComponent } from './list-incidents/list-incidents.component';
import { AddIncidentComponent } from './add-incident/add-incident.component';

const routes: Routes = [
  { path: 'list', component: ListIncidentsComponent },
  { path: 'add', component: AddIncidentComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
