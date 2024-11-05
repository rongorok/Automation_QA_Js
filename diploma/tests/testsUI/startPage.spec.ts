import { test, expect } from "@playwright/test";
import { StartPage } from "../../src/pages/startPage";
import { PageFactory } from "../../src/pages/pageFactory";
import { searchValueLocator } from "../../src/const/common";


test.describe("UI tests on start page", () => {
  let startPage:StartPage;

  test.beforeAll(async({browser})=>{

    const page = await browser.newPage();
    startPage = PageFactory.getPage(page,"StartPage") as StartPage;

    await startPage.viewPage();
  });

  test("Check title text", async () => {
    
    await startPage.clickAcceptCookie();

    const titleText = await startPage.getTitleText();
    expect(titleText).toContain('Онлайн-гипермаркет 21vek.by');
  });

  test("Navigate in menu",async () => {
   
    await startPage.navigationBar.navigateInMenuByText("Мебель");

    const titleText = await startPage.getTitleText();
    expect(titleText).toContain("Мебель");
  });

  test('should search for "Креатин" and check results', async ({ browser }) => {
    
    await startPage.search('Креатин');

    const context = await browser.newContext();
    const page = await context.newPage();

    const searchingValue = await page.locator(searchValueLocator);
    await expect(searchingValue).toBeTruthy();

  });

  test('should try to logIn with incorect info and push error', async () => {
    await startPage.viewPage();
    await startPage.selectTimeOut();
    await startPage.clickAcceptCookie();
    await startPage.logIn('qwerweqtq');
    const errorMsg = await startPage.getErrorMessage();

    expect(errorMsg).toContain("Неправильный формат электронной почты");
  });

  test('should check the operation of the subscription to mail advertising with invalid email', async () => {
    await startPage.inputEmailForSub('sDfwsfs');
    const errorMsg = await startPage.getErrorMessageSub();

    expect(errorMsg).toContain("Неправильный формат электронной почты");
  });

  test('should try to select a non-existent location and push error', async () => {
    await startPage.viewPage();
    await startPage.selectLocation('qwdqwdfqfqfqfq');
    const errorMsg = await startPage.getErrorMessage();

    expect(errorMsg).toContain("Выберите населенный пункт из списка");
  });

});
