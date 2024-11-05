import { test, expect } from "@playwright/test";
import { PageFactory } from "../src/pages/pageFactory";
import { VideoPage } from "../src/pages/videoPage";
import { videoPlayerLocator, videoTitleLocator } from "../src/const/common";

test.describe('Ui test of video page on dzen.ru', ()=>{
    let videoPage: VideoPage;

    test.beforeAll(async({browser})=>{

        const page = await browser.newPage();
    
        videoPage = PageFactory.getPage(page,"VideoPage") as VideoPage;
      
        await videoPage.viewPage();
      });


test("Check title text", async () => {

    const titleText = await videoPage.getTitleText();
    expect(titleText).toContain('Дзен');

  });

  test("select a topic and go to its tab", async () => {
    await videoPage.getPopularTopics("Спорт");
    const titleOfChosenTopic = await videoPage.getTitleText();
    expect(titleOfChosenTopic).toContain("Спорт: статьи и видео о всех видах спорта | Дзен");
    
  });

  test("should search and open a random video", async ({ browser }) => {
    await videoPage.viewPage();
    await videoPage.searchVideo("Dota 2");
    await videoPage.turnOnRandomVideo();

    const context = await browser.newContext();
    const page = await context.newPage();

      await page.waitForLoadState();
  
      const videoPlayer = await page.locator(videoPlayerLocator);
      await expect(videoPlayer).toBeTruthy();
      
      const videoTitle = await page.locator(videoTitleLocator);
      await expect(videoTitle).toBeTruthy(); 
    
  });
  
});