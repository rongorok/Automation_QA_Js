import { Page } from "@playwright/test";
import { NavigationBar } from "../elements/navigationBar";

export class BasePage{
    protected url!:string

    public navigationBar:NavigationBar
    searchButton: any;
    searchInput: any;

    constructor(protected page:Page){
        this.navigationBar = new NavigationBar(page)
    }

    public async viewPage(){
        return  await this.page.goto(this.url)
    }

    public async getElement(locator:string)
    {
        return await this.page.$(locator)
    }

    public async search(query: string){
        const searchInput = await this.page.locator('input[type="text"]');
        await searchInput.fill(query);
        await searchInput.press("Enter");
        await this.page.waitForTimeout(3000); 
      }

    public async closePage(){
        return await this.page.close();
    }

    public async getPageTitle(){
        return this.page.title();
    }
}