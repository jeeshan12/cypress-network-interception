/// <reference types="cypress" />
describe('Network Intreception', () => {
    it('Intercept the XHR', () => {
        cy.visit('https://cat-fact.herokuapp.com/#/');
        cy.intercept('/facts?animal_type=cat', req => {
            return req.reply({
                fixture: 'cat.json',
                statusCode: 200,
                headers: 'application/json',
            })
        }).as('facts');
        cy.contains('button', 'Open App').click();
        cy.wait('@facts').its('response').then(res => {
            expect(res.body.length).to.eq(1);
            expect(res.statusCode).to.eq(200);
            expect(res.body[0].text).to.eq('Cats make about 100 different sounds.');
        });
    })
})