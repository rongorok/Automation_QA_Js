import { Builder, WebDriver } from "selenium-webdriver";


export const driver:WebDriver = new Builder().forBrowser('chrome').build()



