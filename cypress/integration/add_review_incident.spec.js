const { getAddParameters, getReviewParameters, getAddParameters2, randomAction } = require("../support")

describe('Add and review incident forms', () => {
    it('should create a record in the system when submitted', () => {
        cy.visit('http://localhost:4200/')

        cy.contains('Add Incident').click()

        cy.url().should('include', '/add')

        const { reportedTo, location, incidentDate, reportedBy, pupilsExperiencing, staffExperiencing,
            pupilsDisplaying, staffDisplaying, nature, detail } = getAddParameters();

        cy.get('select[formcontrolname="reportedTo"]').select(reportedTo)

        cy.get('select[formcontrolname="location"]').select(location)

        cy.get('button[type="button"]').click()

        cy.get(`div[aria-label="${incidentDate}"]`).click()

        cy.get('textarea[formcontrolname="reportedBy"]').type(reportedBy)

        if (pupilsExperiencing.length) cy.get('select[formcontrolname="pupilsExperiencing"]').select(pupilsExperiencing)

        if (staffExperiencing.length) cy.get('select[formcontrolname="staffExperiencing"]').select(staffExperiencing)

        if (pupilsDisplaying.length) cy.get('select[formcontrolname="pupilsDisplaying"]').select(pupilsDisplaying)

        if (staffDisplaying.length) cy.get('select[formcontrolname="staffDisplaying"]').select(staffDisplaying)

        cy.get('select[formcontrolname="nature"]').select(nature)

        cy.get('textarea[formcontrolname="detail"]').type(detail)

        cy.get('button[type="submit"]').click()

        cy.url().should('include', '/list')


        cy.get('tbody').contains('Review').click()

        cy.url().should('include', '/review')

        const { reviewer, completeDate, experiencingConcernsListenedTo, experiencingSatisfied,
            displayingConcernsListenedTo, displayingSatisfied, procedures, conclusion } = getReviewParameters();

        cy.get('select[formcontrolname="reviewer"]').select(reviewer)

        cy.get('button[type="button"]').click()

        cy.get(`div[aria-label="${completeDate}"]`).click()

        if (experiencingConcernsListenedTo) cy.get('input[formcontrolname="experiencingConcernsListenedTo"]').check()

        if (experiencingSatisfied) cy.get('input[formcontrolname="experiencingSatisfied"]').check()

        if (displayingConcernsListenedTo) cy.get('input[formcontrolname="displayingConcernsListenedTo"]').check()

        if (displayingSatisfied) cy.get('input[formcontrolname="displayingSatisfied"]').check()

        cy.get('textarea[formcontrolname="procedures"]').type(procedures)

        cy.get('select[formcontrolname="conclusion"]').select(conclusion)

        const partiesCount = pupilsExperiencing.length + staffExperiencing.length + pupilsDisplaying.length + staffDisplaying.length;

        for (let i = 0; i < partiesCount; i++) {
            if (Math.random() > .6) {
                continue;
            }

            cy.get('select.action').eq(i).select(randomAction())
        }

        cy.get('button[type="submit"]').click()

        cy.url().should('include', '/list')
    })
})
