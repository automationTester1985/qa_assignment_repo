export class AfterLoginPage {

    sessionStorageVerification() {
        cy.window()
          .its("sessionStorage")
          .invoke("getItem", "session-username")
          .should("exist"); 
    }


    addItemToTheBasket(nameOfTheItem) {
        cy.contains('.inventory_item', nameOfTheItem)
          .find('button')
          .click()
          .invoke('prop', 'innerText').then( innerText => {
            cy.wrap(innerText)
              .should('contain', 'REMOVE')
          })
    }

    checkingItemsInBasket(number) {
      cy.get('.fa-layers-counter').invoke('prop', 'innerText').then( innerText => {
        cy.wrap(innerText)
          .should('contain', number)
      })
    }
   
    navigateToCart() {
      cy.get('#shopping_cart_container').click()
      
      
    }

    



}
export const onAfterLoginPage = new AfterLoginPage()