import { WebDriver } from "selenium-webdriver";

export class BasePage {
    protected url!: string;
    constructor (protected driver:WebDriver){}
    async viewPage(){
        return await this.driver.get(this.url);
    };
        
    async closePage(){
        return await this.driver.quit();
    };
}
