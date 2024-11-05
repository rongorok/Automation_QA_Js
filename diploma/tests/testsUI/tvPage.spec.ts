import { test, expect } from "@playwright/test";
import { PageFactory } from "../../src/pages/pageFactory";
import { TVPage } from "../../src/pages/tvPage";

test.describe('Ui test of video page on 21vek.by', ()=>{
    let tvPage: TVPage;

    test.beforeAll(async({browser})=>{

        const page = await browser.newPage();
        tvPage = PageFactory.getPage(page,"TVPage") as TVPage;
      
        await tvPage.viewPage();
      });


test("Check title text", async () => {

    const titleText = await tvPage.getTitleText();
    expect(titleText).toContain('Купить телевизор в Минске, телевизоры в рассрочку с доставкой');

  });

test("select a popular filter and search buy it", async () => {
    
    await tvPage.clickAcceptCookie();
    await tvPage.getPopularFilters("LCD");

    const titleOfChosenTopic = await tvPage.getTitleText();
    expect(titleOfChosenTopic).toContain("Купить LCD телевизор в Минске недорого, цены на LCD телики");
    
  });

test("should choose random tv and add to the cart", async () => {
    
    await tvPage.clickAcceptCookie();
    await tvPage.chooseRandomTV();
    
    const elementText = await tvPage.cartChanges()
    expect(elementText).toContain('1')
    
  });
  
});