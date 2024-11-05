import { Page } from "@playwright/test";
import { BasePage } from "./basePage";
import { BASE_URL, errorMessageLocator, logInButton, logInButtonElemLocator, logInButtonText, timeOut10, userNameInputLocator } from "../const/common";

export class StartPage extends BasePage{
    constructor(page:Page) {
        super(page);
        this.url = BASE_URL;
      }

      public async getTitleText() {
        const title = await this.page.$('title')
        return await title?.textContent();
      }

      public async logIn(query: string){
        await this.page.click(logInButton, timeOut10); 
        await this.page.click(logInButtonText, timeOut10);

        const usernameInput = await this.page.locator(userNameInputLocator); 
        await usernameInput.fill(query, timeOut10);
        const loginButtonElem = await this.page.locator(logInButtonElemLocator);
        await loginButtonElem.click(timeOut10) 
    }

      public async getErrorMessage(){
        const errorMessage = await this.page.waitForSelector(errorMessageLocator); 
        return await errorMessage.textContent()
  }
}