import { By } from "selenium-webdriver";
import { BasePage } from "./basePage";
import { driver } from "../driver";


export class SearchResultsPage extends BasePage {
    async getResults() {
        const results = await this.driver.findElements(By.css('.s-item'));
        return results;
    }

    async getNoResultsMessage() {
        const noResultsMessage = await this.driver.findElement(By.css('.srp-controls__count-heading'));
        return await noResultsMessage.getText();
    }
}

export const resultsPage = new SearchResultsPage(driver)
