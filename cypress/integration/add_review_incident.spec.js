describe('Add and review incident forms', () => {
    it('should create a record in the system when submitted', () => {
        cy.visit('http://localhost:4200/')

        cy.contains('Add Incident').click()

        cy.url().should('include', '/add')

        cy.get('select[formcontrolname="reportedTo"]').select('Rubeus Hagrid')

        cy.get('select[formcontrolname="location"]').select('The Burrow')

        cy.get('button[type="button"]').click()

        cy.get('div[aria-label="Monday, September 7, 2020"]').click()

        cy.get('textarea[formcontrolname="reportedBy"]').type('Newt Scamander')

        cy.get('select[formcontrolname="pupilsExperiencing"]').select(['Harry Potter', 'Ronald Weasley'])

        cy.get('select[formcontrolname="pupilsDisplaying"]').select(['Draco Malfoy', 'Terry Boot'])

        cy.get('select[formcontrolname="nature"]').select('Trip up')

        cy.get('textarea[formcontrolname="detail"]').type('Poor Harry!')

        cy.get('button[type="submit"]').click()

        cy.url().should('include', '/list')


        cy.get('tbody').contains('Review').click()

        cy.url().should('include', '/review')

        cy.get('select[formcontrolname="reviewer"]').select('Severus Snape')

        cy.get('button[type="button"]').click()

        cy.get('div[aria-label="Tuesday, September 8, 2020"]').click()

        cy.get('input[formcontrolname="experiencingConcernsListenedTo"]').check()

        cy.get('input[formcontrolname="displayingSatisfied"]').check()

        cy.get('textarea[formcontrolname="procedures"]').type('Had a fatherly talk with the pupils.')

        cy.get('select[formcontrolname="conclusion"]').select('Resolved')

        cy.get('select.action').eq(0).select('Counselling')

        cy.get('select.action').eq(3).select('Peer Support')

        cy.get('button[type="submit"]').click()

        cy.url().should('include', '/list')
    })
})
