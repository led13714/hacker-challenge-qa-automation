/// <reference types="cypress" />

export class eighthPage {

    validateChallengeEighthHeading() {
        cy.get('section > h2')
        .should('include.text','Challenge #8: Move the blocker')
    }

    removeBlocker() {
        cy.get('.blocker').invoke('remove');
    }

    nextChallengeLink() {
      return  cy.get('.button-style-link')
        .contains('Go to the next challenge')
    }
}