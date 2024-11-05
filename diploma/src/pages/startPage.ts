import { Page } from "@playwright/test";
import { BasePage } from "./basePage";
import { acceptCookieButtonLocator, accountButton, BASE_URL, emailInputForSubLocator, enterButton, errorMessageLocator, errorMessageSubLocator, locationInputLocator, locationLink, locationSaveButtonLocator, logInButtonSubmit, timeOut10, timeout5, userEmailInputLocator, } from "../const/common";

export class StartPage extends BasePage{
    constructor(page:Page) {
        super(page);
        this.url = BASE_URL;
      }

      public async clickAcceptCookie () {
        await this.page.waitForTimeout(timeout5)
        const cookieButton = await this.page.locator(acceptCookieButtonLocator); 
        await cookieButton.click(timeOut10)
      }
      
      public async getTitleText() {
        const title = await this.page.$('title')
        return await title?.textContent();
      }

      public async logIn(query: string){
        await this.page.click(accountButton, timeOut10); 
        await this.page.click(enterButton, timeOut10);
        const usernameInput = await this.page.locator(userEmailInputLocator); 
        await usernameInput.fill(query, timeOut10);
        const loginButtonElem = await this.page.locator(logInButtonSubmit);
        await loginButtonElem.click(timeOut10)
      }

      public async getErrorMessage(){
        const errorMessage = await this.page.waitForSelector(errorMessageLocator); 
        return await errorMessage.textContent()
      }

      public async getErrorMessageSub(){
        const errorMessage = await this.page.waitForSelector(errorMessageSubLocator); 
        return await errorMessage.textContent()
      }

      public async selectLocation(query: string){
        await this.page.click(locationLink, timeOut10);
        const locationInput = await this.page.locator(locationInputLocator); 
        await locationInput.fill(query, timeOut10);
        const locationSaveButton = await this.page.locator(locationSaveButtonLocator);
        await locationSaveButton.click(timeOut10)
      }

      public async inputEmailForSub(query: string){
        const emailInputForSub = await this.page.locator(emailInputForSubLocator); 
        await emailInputForSub.fill(query, timeOut10);
        await emailInputForSub.press("Enter");
      }
}