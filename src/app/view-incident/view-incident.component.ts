import { Component, OnInit } from '@angular/core';
import Incident, { Envelope } from '../incident';
import { ActivatedRoute } from '@angular/router';
import { ApiClientService } from '../api-client.service';

@Component({
  selector: 'app-view-incident',
  templateUrl: './view-incident.component.html',
  styleUrls: ['./view-incident.component.scss']
})
export class ViewIncidentComponent implements OnInit {
  incidentId: number;
  incident: Incident;

  constructor(private route: ActivatedRoute, private api: ApiClientService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.incidentId = +params['incidentId'];
    });
    this.api.getIncidents().subscribe((envelope: Envelope) => {
      return this.incident = envelope.incidents.find(incident => incident.id === this.incidentId)
    });
  }

}
