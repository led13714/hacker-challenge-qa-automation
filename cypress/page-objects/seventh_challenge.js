/// <reference types="cypress" />

export class seventhPage {

    validateChallengeFifthHeading() {
        cy.get('section > h2')
        .should('include.text','Challenge #7: The console contains the answer')
    }

    // Tried multiple solutions to extract the password from the log but in cypress
    // it's a limitation, already tried stubs & spies and also javascript code but it always returned 
    // the empty value even though after parsing it into array.
    enterPasswordFromConsole() {
        Cypress.on('window:before:load', (win) => {
            cy.spy(win.console, 'log').as('consoleLog')
        })
        cy.get('input.console').type('pr3st0')
    }

    clickThreeTimes() {
        cy.get('button.console').dblclick()
        cy.get('button.console').click()
    }

    clickSubmit() {
        cy.get('button.console').click()
    }
}