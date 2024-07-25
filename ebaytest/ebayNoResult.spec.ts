import { searchInput, timeout30} from "../const/common";
import { homePage } from "../pageObjects/homePage"
import { resultsPage } from "../pageObjects/searchResults";

describe('Ebay test', ()=>{

    afterAll(async ()=>{
        await homePage.closePage();
    },timeout30);


    test('should handle search without results', async () => {
        await homePage.viewPage();
        await homePage.searchForProduct(searchInput);
        const noResultsText = await resultsPage.getNoResultsMessage();
        expect(noResultsText).toContain('0 results');
    }, timeout30);

})