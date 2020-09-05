import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { ApiClientService } from '../api-client.service';
import Incident, { Envelope } from '../incident';
import * as constants from '../constants';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-review-incident',
  templateUrl: './review-incident.component.html',
  styleUrls: ['./review-incident.component.scss']
})
export class ReviewIncidentComponent implements OnInit {
  incidentId: number;
  incident: Incident;
  constants: any;
  completeDate: NgbDateStruct;

  constructor(private route: ActivatedRoute, private api: ApiClientService, private fb: FormBuilder, private router: Router) {
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
      reviewer: [''],
      completeDate: [''],
      experiencingConcernsListenedTo: [false],
      experiencingSatisfied: [false],
      displayingConcernsListenedTo: [false],
      displayingSatisfied: [false],
    }),
    actionProgressed: this.fb.group({
      procedures: [''],
      conclusion: ['']
    })
  });

  onSubmit() {
    const { monitorReview, actionProgressed } = this.reviewIncidentForm.value;

    const { completeDate: { year, month, day } } = monitorReview;
    const completeDate = new Date(year, month - 1, day);

    const incident = new Incident();
    incident.id = this.incidentId;
    incident.reviewer = monitorReview.reviewer;
    incident.completeDate = completeDate;
    incident.experiencingConcernsListenedTo = monitorReview.experiencingConcernsListenedTo;
    incident.experiencingSatisfied = monitorReview.experiencingSatisfied;
    incident.displayingConcernsListenedTo = monitorReview.displayingConcernsListenedTo;
    incident.displayingSatisfied = monitorReview.displayingSatisfied;
    incident.procedures = actionProgressed.procedures;
    incident.conclusion = actionProgressed.conclusion;
    this.api.updateIncident(incident).subscribe((envelope: Envelope) => this.router.navigate(['/list']));
  }
}
