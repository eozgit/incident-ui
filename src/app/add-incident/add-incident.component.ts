import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { ApiClientService } from '../api-client.service';
import * as constants from '../constants';
import Incident, { Envelope } from '../incident';
import Person from '../person';

@Component({
  selector: 'app-add-incident',
  templateUrl: './add-incident.component.html',
  styleUrls: ['./add-incident.component.scss']
})
export class AddIncidentComponent implements OnInit {
  constants: any;
  incidentDate: NgbDateStruct;

  constructor(private fb: FormBuilder, private api: ApiClientService, private router: Router) {
    this.constants = constants;
  }

  ngOnInit(): void {
  }

  addIncidentForm = this.fb.group({
    basicInfo: this.fb.group({
      reportedTo: [''],
      location: [''],
      incidentDate: [''],
      reportedBy: ['']
    }),
    allegedIncident: this.fb.group({
      pupilsExperiencing: [[]],
      staffExperiencing: [[]],
      pupilsDisplaying: [[]],
      staffDisplaying: [[]]
    }),
    natureOfIncident: this.fb.group({
      nature: [''],
      detail: ['']
    }),
  });

  onSubmit() {
    const date = this.addIncidentForm.value.basicInfo.incidentDate;
    const incidentDate = new Date(date.year, date.month - 1, date.day);

    const incident = new Incident();
    incident.reportedTo = this.addIncidentForm.value.basicInfo.reportedTo;
    incident.location = this.addIncidentForm.value.basicInfo.location;
    incident.incidentDate = incidentDate;
    incident.reportedBy = this.addIncidentForm.value.basicInfo.reportedBy;
    incident.nature = this.addIncidentForm.value.natureOfIncident.nature;
    incident.detail = this.addIncidentForm.value.natureOfIncident.detail;
    incident.pupilsExperiencing = this.addIncidentForm.value.allegedIncident.pupilsExperiencing.map(this.toPerson);
    incident.staffExperiencing = this.addIncidentForm.value.allegedIncident.staffExperiencing.map(this.toPerson);
    incident.pupilsDisplaying = this.addIncidentForm.value.allegedIncident.pupilsDisplaying.map(this.toPerson);
    incident.staffDisplaying = this.addIncidentForm.value.allegedIncident.staffDisplaying.map(this.toPerson);
    this.api.addIncident(incident).subscribe((envelope: Envelope) => this.router.navigate(['/list']));
  }

  toPerson(name) {
    const person = new Person();
    person.name = name;
    return person;
  }

}
