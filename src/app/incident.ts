export class Incident {
    id: number;
    reportedTo: string;
    location: string;
    incidentDate: Date;
    reportedBy: string;
    nature: string;
    detail: string;
    reviewer: string;
    completeDate: Date;
    experiencingConcernsListenedTo: boolean;
    experiencingSatisfied: boolean;
    displayingConcernsListenedTo: boolean;
    displayingSatisfied: boolean;
    procedures: string;
    conclusion: number;
}

export class Envelope {
    incidents: Incident[];
}
