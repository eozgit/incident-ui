import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiClientService } from '../api-client.service';
import Incident, { Envelope } from '../incident';
import * as constants from '../constants';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import Person from '../person';

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
      const incident = envelope.incidents.find(incident => incident.id === this.incidentId);
      const actionProgressed = this.reviewIncidentForm.controls.actionProgressed as FormGroup;
      const actions = actionProgressed.controls.actions as FormGroup;
      for (const person of incident.parties) {
        actions.controls[person.id] = this.fb.control('');
      }
      this.incident = incident;
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
      conclusion: [''],
      actions: this.fb.group({})
    })
  });

  onSubmit() {

    const { monitorReview, actionProgressed } = this.reviewIncidentForm.getRawValue();

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
    incident.parties = Object.entries(actionProgressed.actions).map(([id, action]) => this.GetPerson(+id, action as string))
    this.api.updateIncident(incident).subscribe((envelope: Envelope) => this.router.navigate(['/list']));
  }

  GetPerson(id: number, action: string): any {
    const person = new Person();
    person.id = id;
    person.action = action;
    return person;
  }

  get personsExperiencing() {
    return this.incident.parties.filter(person => person.side === 'experiencing');
  }

  get pupilsExperiencing() {
    return this.incident.parties.filter(person => person.category === 'pupil' && person.side === 'experiencing');
  }

  get staffExperiencing() {
    return this.incident.parties.filter(person => person.category === 'staff' && person.side === 'experiencing');
  }

  get personsDisplaying() {
    return this.incident.parties.filter(person => person.side === 'displaying');
  }

  get pupilsDisplaying() {
    return this.incident.parties.filter(person => person.category === 'pupil' && person.side === 'displaying');
  }

  get staffDisplaying() {
    return this.incident.parties.filter(person => person.category === 'staff' && person.side === 'displaying');
  }
}
