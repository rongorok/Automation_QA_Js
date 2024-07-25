import { By, until } from "selenium-webdriver";
import { driver } from "../driver";
import { BasePage } from "./basePage";
import { timeout10 } from "../const/common";



export class SignInPage extends BasePage {
    async signIn(username:string) {
        const signInLink = await driver.wait(until.elementLocated(By.linkText('Sign in')), timeout10);
        await signInLink.click();
        
        await driver.wait(until.titleContains('Sign in or Register'), timeout10);

        const usernameField = await driver.wait(until.elementLocated(By.id('userid')), timeout10);
        const signInButton = await driver.findElement(By.id('signin-continue-btn'));

        await usernameField.sendKeys(username);
        await signInButton.click();
    }

    async getErrorMessage() {
        const errorMessage = await driver.wait(until.elementLocated(By.css('.inline-notice__main')), timeout10);
        return await errorMessage.getText();
    }
}

export const signInPage = new SignInPage(driver)
