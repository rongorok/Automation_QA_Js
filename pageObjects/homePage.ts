import { By, Key, until, WebDriver } from "selenium-webdriver";
import { BasePage } from "./basePage";
import { BASE_URL, searchProductId, textDailyDeals, textDeals, timeout10} from "../const/common";
import { driver } from "../driver";


export class HomePage extends BasePage {
    
    constructor(driver:WebDriver){
        super(driver)
        this.url = BASE_URL
    }

    async getTitleText(){
        const titleText = await this.driver.getTitle();
        return titleText
    }

    async searchForProduct(product:string) {
        const searchBox = await this.driver.findElement(By.id(searchProductId));
        await searchBox.sendKeys(product, Key.RETURN);
    }

    async goToDailyDeals() {
        const dailyDealsLink = await this.driver.findElement(By.linkText(textDailyDeals));
        await dailyDealsLink.click();
        await driver.wait(until.titleContains(textDeals), timeout10);

        const dealsHeader = await driver.findElement(By.xpath('//div[@class="ebayui-dne-banner-text"]/h2/span'));
        return await dealsHeader.getText();
    }


}

export const homePage = new HomePage(driver)


