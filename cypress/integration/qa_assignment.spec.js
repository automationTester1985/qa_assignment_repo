import { onHomePage } from "../support/page_object/home_page"
import { onAfterLoginPage } from "../support/page_object/afterLoginPage"
import { onCartPage } from "../support/page_object/cartPage"
import { onCheckOutPage } from "../support/page_object/checkOutPage"
import { onCheckOutPageStep2 } from "../support/page_object/checkoutStep2Page"



describe("QA_assignment - tasks of the recruitment process", () => {

    beforeEach("Open application under tests + verification if main logo is visible after loaded page", () => {
        
        cy.visit('https://www.saucedemo.com/index.html') 
        
        cy.get('.login_logo').should('exist') 
    })
    
    
    it("TC01: Login form validation", () => {
        /* The goal of the test is to verify whether the statement is correctly displayed when the
           user doesn't provide the credentials in Login Form
        */
        onHomePage.clickOnTheLoginButton()  

        cy.get('h3')
          .should('contains.text', 'Username is required')

    })

    it("TC02: Success Login", () => {
        /* Goal of the test is verification if the user can successfully login to application by using correct credentials
            * test case contains verification of user_name input field
            * verification whether LOGIN button is enabled  
            * verification whether session storage: user_name has correct value: standard_user
            * verification whether url has changed 
        */
         
        var currentUrl = "https://www.saucedemo.com/index.html"
        // enter data on the Login Form
        onHomePage.fillOutTheLoginForm('standard_user', 'secret_sauce')
        
        //verification whether LOGIN button is enabled
        onHomePage.verificationOfLoginButton()
        
        // assertion whether the user name is correct
        onHomePage.verificationOfInpudField()
        
        // click on the Login button
        onHomePage.clickOnTheLoginButton()

        // verification whether session storage: user_name has correct value: standard_user
        onAfterLoginPage.sessionStorageVerification()
          
        // verification whether url has changed 
          cy.url().should('not.eq', currentUrl)
          cy.url().should('include', 'inventory.html')
    })

    it('TC03: Success Order', () => {
        // The goal of the test is to bverify whether the user can order item withou any problem

        
        var currentUrl = "https://www.saucedemo.com/index.html"
        
        onHomePage.fillOutTheLoginForm('standard_user', 'secret_sauce')
        
        onHomePage.verificationOfLoginButton()
        
        onHomePage.verificationOfInpudField()
        
        onHomePage.clickOnTheLoginButton()

        onAfterLoginPage.sessionStorageVerification()
          
        cy.url().should('not.eq', currentUrl)
        cy.url().should('include', 'inventory.html')

        onAfterLoginPage.addItemToTheBasket('Sauce Labs Backpack')
        onAfterLoginPage.checkingItemsInBasket(1)
        onAfterLoginPage.navigateToCart()

        cy.get('.inventory_item_price').should('exist')

        onCartPage.clickOnCheckout()
        cy.url().should('contain', 'checkout-step-one.html')
        cy.get('.checkout_info').find('input').should('have.length', '3')

        onCheckOutPage.fillOutTheCheckoutForm('Test', 'Tester', '000')
        onCheckOutPage.clickOnTheContinue()
        cy.url().should('contain', 'checkout-step-two.html')
        
        onCheckOutPageStep2.clickOnTheFinishButton()
        
        cy.get('.complete-header').should('contain', 'THANK YOU FOR YOUR ORDER')

    })

   
})