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

    const { basicInfo, allegedIncident, natureOfIncident } = this.addIncidentForm.getRawValue();

    const { year, month, day } = basicInfo.incidentDate;
    const incidentDate = new Date(year, month - 1, day);

    const incident = new Incident();
    incident.reportedTo = basicInfo.reportedTo;
    incident.location = basicInfo.location;
    incident.incidentDate = incidentDate;
    incident.reportedBy = basicInfo.reportedBy;
    incident.nature = natureOfIncident.nature;
    incident.detail = natureOfIncident.detail;

    const pupilsExperiencing = allegedIncident.pupilsExperiencing.map(name => this.GetPerson(name, 'pupil', 'experiencing'));
    const staffExperiencing = allegedIncident.staffExperiencing.map(name => this.GetPerson(name, 'staff', 'experiencing'));
    const pupilsDisplaying = allegedIncident.pupilsDisplaying.map(name => this.GetPerson(name, 'pupil', 'displaying'));
    const staffDisplaying = allegedIncident.staffDisplaying.map(name => this.GetPerson(name, 'staff', 'displaying'));

    incident.parties = [...pupilsExperiencing, ...staffExperiencing, ...pupilsDisplaying, ...staffDisplaying];

    this.api.addIncident(incident).subscribe((envelope: Envelope) => this.router.navigate(['/list']));
  }

  GetPerson(name: string, category: string, side: string) {
    const person = new Person();
    person.name = name;
    person.category = category;
    person.side = side;
    return person;
  }

}
