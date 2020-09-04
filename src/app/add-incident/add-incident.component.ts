import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ApiClientService } from '../api-client.service';
import * as constants from '../constants';
import { Incident, Envelope } from '../incident';

@Component({
  selector: 'app-add-incident',
  templateUrl: './add-incident.component.html',
  styleUrls: ['./add-incident.component.scss']
})
export class AddIncidentComponent implements OnInit {
  constants: any;

  constructor(private fb: FormBuilder, private api: ApiClientService) {
    this.constants = constants;
  }

  ngOnInit(): void {
  }

  addIncidentForm = this.fb.group({
    basicInfo: this.fb.group({
      reportedTo: [''],
      location: ['']
    }),
    allegedIncident: this.fb.group({
      pupilsExperiencing: [''],
      pupilsDisplaying: ['']
    }),
    natureOfIncident: this.fb.group({
      nature: [''],
      detail: ['']
    }),
  });

  onSubmit() {
    const incident = new Incident();
    incident.reportedTo = this.addIncidentForm.value.basicInfo.reportedTo;
    incident.location = this.addIncidentForm.value.basicInfo.location;
    incident.incidentDate = new Date();
    incident.reportedBy = 'Unknown';
    incident.nature = this.addIncidentForm.value.natureOfIncident.nature;
    incident.detail = this.addIncidentForm.value.natureOfIncident.detail;
    this.api.addIncident(incident).subscribe((envelope: Envelope) => console.log(envelope));
    console.log(this.addIncidentForm.value);
  }

}
