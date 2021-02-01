export class CartPage {

clickOnCheckout() {
    cy.get('.btn_action').click()
    
    }
    



}
export const onCartPage = new CartPage()