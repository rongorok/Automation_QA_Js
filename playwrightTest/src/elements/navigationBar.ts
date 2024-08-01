import { Page } from "@playwright/test";
import { navigationBarLocator } from "../const/common";

export class NavigationBar{
    constructor(protected readonly page:Page){
    }

    public async navigateInMenuByText(text:string):Promise<void>{
        
        const arrayOfElement = await this.page.$$(navigationBarLocator);
        const element =  arrayOfElement.find(async item => await item.textContent() === text);
    
        await element?.click();

        await this.page.waitForSelector("//header");
    };
};