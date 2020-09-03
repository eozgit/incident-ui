import { Component, OnInit } from '@angular/core';
import { ApiClientService } from '../api-client.service';
import { Envelope, Incident } from '../incident';

@Component({
  selector: 'app-list-incidents',
  templateUrl: './list-incidents.component.html',
  styleUrls: ['./list-incidents.component.scss']
})
export class ListIncidentsComponent implements OnInit {

  incidents: Incident[] = [];

  constructor(private api: ApiClientService) { }

  ngOnInit(): void {
    this.listIncidents();
  }

  listIncidents() {
    console.log('listing incidents...');
    this.api.getIncidents().subscribe((envelope: Envelope) => this.incidents = envelope.incidents);
  }

}
