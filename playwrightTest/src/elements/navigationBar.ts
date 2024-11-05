import { Page } from "@playwright/test";
import { navigationBarLocator, timeOut10 } from "../const/common";

export class NavigationBar{
    constructor(protected readonly page:Page){
    }

    public async navigateInMenuByText(text:string):Promise<void>{
        const arrayOfElement = await this.page.$$(navigationBarLocator);
        const element =  arrayOfElement.find(async item => await item.textContent() === text);
       
        await element?.click(timeOut10);
        await this.page.waitForSelector("//header", timeOut10);
    };
};