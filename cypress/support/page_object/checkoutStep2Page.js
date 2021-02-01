export class CheckOutPageStep2 {

   clickOnTheFinishButton(){

    cy.get('[class="btn_action cart_button"]').click()
   }    
        
    
    
    
    }
    export const onCheckOutPageStep2 = new CheckOutPageStep2()