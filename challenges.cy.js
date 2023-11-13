describe('Path_1', () => {

    it('request verification', () => {
//check network request
        cy.intercept({
            method: 'GET', 
            url: 'https://api.spacexdata.com/v3/rockets'})
            .as('getRockets')

        cy.visit('https://csb-x6dpt1.netlify.app/')

        cy.wait('@getRockets').then((interception) => {
            expect(interception.response.body).to.be.an('array').and.to.have.lengthOf(4);
        
        const flights = interception.response.body;
        flights.forEach((flight) => {

        // Convert the 'first_flight' string to a Date object
        const firstFlight = new Date(flight.first_flight);
        //check if date is older than 2005

        expect(firstFlight.getFullYear()).to.be.greaterThan(2005);
         });   
       });
     });

describe('Page search', () => {
    //load browser
    beforeEach(() => {
        cy.visit('https://csb-x6dpt1.netlify.app/')
    })
     it('Path_One_Challenge', () => {
            //check pagination length
            cy.get('.search-input').click().type('crs')
            cy.get('.pagination').within(() => {
                cy.get('div').should('have.length', 3)
            })
            //go to page 2
            cy.get('.pagination').within(() => {
            cy.get('div').eq(1).click()
            })
            // mark CRS-13 as favorite
            cy.contains('CRS-13')
            cy.get('.launch-card').eq(2).within(() => {
            cy.get('svg').click()
            })
  
            cy.get('.tabs').within(() => {
            cy.get('div').eq(1).click()
            })

            // Reload the page
            cy.reload()

            // Perform assertions after the refresh to check if favorite remains
            cy.get('.tabs').within(() => {
            cy.get('div').eq(1).click()
            })
            cy.get('.launch-card').should('contain', 'CRS-13')
     });

     it('Path_Two_Challenge', () => {
        //search "crx"
        cy.get('.search-input').click().type('crx')
        //no result should be displayed
        cy.get('.launch-card').should('not.exist')
        //click X button in search input
        cy.get('.close-icon').click()
        cy.get('.launches-list-container').should('exist')
        //check that 12 pages are being displayed
        cy.get('.pagination').within(() => {
            cy.get('div').should('have.length', 12)
        })
        //site reload
        cy.reload()
        //check that 12 pages are being displayed
        cy.get('.pagination').within(() => {
            cy.get('div').should('have.length', 12)
        })
     })
   });
});
