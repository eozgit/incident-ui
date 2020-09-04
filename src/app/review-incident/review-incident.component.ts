import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { ApiClientService } from '../api-client.service';
import Incident, { Envelope } from '../incident';
import * as constants from '../constants';

@Component({
  selector: 'app-review-incident',
  templateUrl: './review-incident.component.html',
  styleUrls: ['./review-incident.component.scss']
})
export class ReviewIncidentComponent implements OnInit {
  incidentId: number;
  incident: Incident;
  constants: any;

  constructor(private route: ActivatedRoute, private api: ApiClientService, private fb: FormBuilder) {
    this.constants = constants;
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.incidentId = +params['incidentId'];
    });
    this.api.getIncidents().subscribe((envelope: Envelope) => {
      return this.incident = envelope.incidents.find(incident => incident.id === this.incidentId)
    });
  }

  reviewIncidentForm = this.fb.group({
    monitorReview: this.fb.group({
      reviewer: ['']
    })
  });
}
