import { timeout30  } from "../const/common";
import { homePage } from "../pageObjects/homePage"


describe('Ebay test', ()=>{

    afterAll(async ()=>{
        await homePage.closePage();
    },timeout30);


    test('should navigate to Daily Deals', async () => {
        await homePage.viewPage();
        const headerText = await homePage.goToDailyDeals();
        expect(headerText).toContain('FEATURED DEALS');
    }, timeout30);
})