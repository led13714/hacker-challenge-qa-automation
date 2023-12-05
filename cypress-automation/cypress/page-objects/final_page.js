/// <reference types="cypress" />

export class finalPage {

    finalMessage() {
        cy.get('section > p')
        .should('include.text','Congratulations! You have completed the hacker challenge');
    }

    restartButton() {
        cy.get('.button-style-link')
        .contains('Restart challenge');
    }

}
