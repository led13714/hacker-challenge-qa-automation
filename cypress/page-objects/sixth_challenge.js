/// <reference types="cypress" />
import "cypress-localstorage-commands";

export class sixthPage {

    loginstoraged(){
            
        cy.getLocalStorage('password').then((value) => {
            cy.log('Extracted Value:', value);
    
            cy.get('body > div.main > section > div > div.form > input').type(value);
           // Assert that the input field has the expected value
           //cy.get('#inputField').should('have.value', value);
        });
    }

    validateChallengeFifthHeading() {
        cy.get('section > h2')
        .should('include.text','Challenge #6: Find the password in Local Storage')
    }

    getValueFromLocalStorage() {
       return cy.getLocalStorage('password').then((value) => {
            cy.log('Extracted Value:', value);
            cy.get('body > div.main > section > div > div.form > input').type(value);
        });
    }

    clickStorageSubmit() {
        cy.get('button.storage').click()
    }
}