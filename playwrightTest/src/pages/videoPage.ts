import { Page } from "@playwright/test";
import { BasePage } from "./basePage";
import { searchInputLocator, VIDEO_URL, videoItemsLocator } from "../const/common";

export class VideoPage extends BasePage{
    constructor(page:Page) {
        super(page);
        this.url = VIDEO_URL;
      };

     public async getTitleText(){
        const title = await this.page.$('title');
        return await title?.textContent();
      };

      public async getLocator(){
        const locator = await this.page.$('title');
        return await locator?.textContent();
      };

      public async getPopularTopics(query: string){
        await this.page.getByText(query).click();          
      };

      public async getVideoOnPage (locator: string){
        await this.page.locator(locator).all();
      };

      public async searchVideo (query: string){
        const searchInput = await this.page.locator(searchInputLocator);
        await searchInput.fill(query);
        await searchInput.press('Enter');
        await this.page.waitForSelector(videoItemsLocator);
      };

      public async turnOnRandomVideo () {
        const videoItems = await this.page.locator(videoItemsLocator).all();
        const randomVideoIndex = Math.floor(Math.random() * videoItems.length);
        const randomVideo = videoItems[randomVideoIndex];

        await randomVideo.click();
      };
      
};