import { Page } from "@playwright/test";
import { BasePage } from "./basePage";
import { acceptCookieButtonLocator, popularFilterLocator, searchInputLocator, timeOut10, timeout5, TV_URL, tvItemsLocator } from "../const/common";

export class TVPage extends BasePage{
    constructor(page:Page) {
        super(page);
        this.url = TV_URL;
      };
      

     public async getTitleText(){
        const title = await this.page.$('title');
        return await title?.textContent();
      };

      public async clickAcceptCookie () {
        await this.page.waitForTimeout(timeout5)
        const cookieButton = await this.page.locator(acceptCookieButtonLocator); 
        await cookieButton.click(timeOut10)
      }

      public async getLocator(){
        const locator = await this.page.$('title');
        return await locator?.textContent();
      };

      public async getPopularFilters(text:string):Promise<void>{
    
        const arrayOfElement = await this.page.locator(popularFilterLocator).locator(`text=${text}`).first();     
       
        await arrayOfElement.click(timeOut10);
        await this.page.waitForSelector("//header", timeOut10);        
      };

      public async searchTV (query: string){
        const searchInput = await this.page.locator(searchInputLocator);
        await searchInput.fill(query);
        await searchInput.press('Enter');
        await this.page.waitForSelector(tvItemsLocator);
      };

      public async chooseRandomTV () {
        const tvItems = await this.page.locator(tvItemsLocator).all();
        const randomTVIndex = Math.floor(Math.random() * tvItems.length);
        const randomTV= tvItems[randomTVIndex];

        await randomTV.click();
      };
      
};