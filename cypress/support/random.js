import * as constants from '../../src/app/constants';

const dateFormatter = new Intl.DateTimeFormat('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

const reporters = [
    'Newt Scamander',
    'Tina Goldstein',
    'Jacob Kowalski',
    'Queenie Goldstein'
];

const details = [
    'Not cool!',
    'Naughty boy!',
    'Poor kid.'
];

const procedures = [
    'Actions taken after investigation and discussion with parents',
    'Talked with them and any other persons involved',
    'Listened to their point of view',
    'Set up a training or development plan',
];

export function getAddParameters() {
    return {
        reportedTo: getStaffMember(),
        location: getLocation(),
        incidentDate: formatDate(getDate()),
        reportedBy: getPerson(),
        pupilsExperiencing: getPupils(),
        staffExperiencing: getStaff(),
        pupilsDisplaying: getPupils(),
        staffDisplaying: getStaff(),
        nature: getTypeOfOffence(),
        detail: getDetail()
    };
}

export function getReviewParameters() {
    return {
        reviewer: getStaffMember(),
        completeDate: formatDate(getDate()),
        experiencingConcernsListenedTo: getCheck(),
        experiencingSatisfied: getCheck(),
        displayingConcernsListenedTo: getCheck(),
        displayingSatisfied: getCheck(),
        procedures: getProcedures(),
        conclusion: getConclusion()
    };
}

export function randomAction() {
    return getRandomElement(constants.actions);
}

function getStaffMember() {
    return getRandomElement(constants.staff);
}

function getStaff() {
    return getRandomElements(constants.staff);
}

function getPupils() {
    return getRandomElements(constants.pupils);
}

function getLocation() {
    return getRandomElement(constants.locations);
}

function getTypeOfOffence() {
    return getRandomElement(constants.typesOfOffence);
}

function getConclusion() {
    return getRandomElement(constants.conclusions);
}

function getPerson() {
    return getRandomElement(reporters);
}

function getDetail() {
    return getRandomElement(details);
}

function getProcedures() {
    return getRandomElement(procedures);
}

function getCheck() {
    return Math.random() > .4;
}

function getRandomElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomElements(arr) {
    const cp = [...arr];
    const val = [];
    for (let i = 0; i < arr.length; i++) {
        if (Math.random() < .4) {
            break;
        }

        const idx = Math.floor(Math.random() * cp.length);
        const [el] = cp.splice(idx, 1);
        val.push(el);
    }
    return val;
}

function formatDate(date) {
    return dateFormatter.format(date);
}

function getDate() {
    const date = new Date()
    date.setDate(Math.floor(Math.random() * 28))
    return date
}
