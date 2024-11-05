import { Page } from "@playwright/test";
import { navigationBarButtonLocator, navigationBarLocator, timeOut10 } from "../const/common";

export class NavigationBar{
    constructor(protected readonly page:Page){
    }

    public async navigateInMenuByText(text:string):Promise<void>{
        
        const navBarButton = await this.page.locator(navigationBarButtonLocator); 
        await navBarButton.click(timeOut10)

        const arrayOfElement = await this.page.locator(navigationBarLocator).locator(`text=${text}`).first();     
       
        await arrayOfElement.click(timeOut10);
        await this.page.waitForSelector("//header", timeOut10);

    };
};