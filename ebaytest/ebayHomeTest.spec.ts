import { productValue, timeout30, titleTextuHomePage } from "../const/common";
import { homePage } from "../pageObjects/homePage"
import { resultsPage } from "../pageObjects/searchResults";

describe('Ebay test', ()=>{

    afterAll(async ()=>{
        await homePage.closePage();
    },timeout30);

    it('Check title text', async ()=>{
        await homePage.viewPage();
        const titleText = await homePage.getTitleText();
        expect(titleText).toBe(titleTextuHomePage);
    },timeout30);

    test('should search for a product', async () => {
        await homePage.searchForProduct(productValue);
        const searchResults = await resultsPage.getResults();
        expect(searchResults.length).toBeGreaterThan(0);
    }, timeout30);

})