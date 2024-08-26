import { Page } from "@playwright/test";
import { NavigationBar } from "../elements/navigationBar";
import { cartValueLocator, searchInputBase, timeout3 } from "../const/common";

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

    public async selectTimeOut(){
        await this.page.waitForTimeout(timeout3);
    }

    public async getElement(locator:string)
    {
        return await this.page.$(locator)
    }

    public async search(query: string){
        const searchInput = await this.page.locator(searchInputBase);
        await searchInput.fill(query);
        await searchInput.press("Enter");
        await this.page.waitForTimeout(timeout3); 
      }

    public async closePage(){
        return await this.page.close();
    }

    public async cartChanges(){
        await this.page.waitForTimeout(timeout3);
        const numberInTheCartSymbol = await this.page.waitForSelector(cartValueLocator); 
        return await numberInTheCartSymbol.textContent()
    }

    public async getPageTitle(){
        return this.page.title();
    }
}