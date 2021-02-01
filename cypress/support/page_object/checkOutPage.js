

export class CheckOutPage {

    fillOutTheCheckoutForm(firstName, lastName, postalCode) {
        cy.get('#first-name')
            .type(firstName)
        cy.get('#last-name')
            .type(lastName)
        cy.get('#postal-code')   
            .type(postalCode)     
        
        }

    clickOnTheContinue() {
        cy.get('[class="btn_primary cart_button"]').click()
    }    
        
    
    
    
    }
    export const onCheckOutPage = new CheckOutPage()