import { test, expect } from "@playwright/test";
import { StartPage } from "../src/pages/startPage";
import { PageFactory } from "../src/pages/pageFactory";


test.describe("UI tests on start page", ()=>{
  let startPage:StartPage;

  test.beforeAll(async({browser})=>{

    const page = await browser.newPage();
    startPage = PageFactory.getPage(page,"StartPage") as StartPage;

    await startPage.viewPage();
  });

  test("Check title text", async () => {

    const titleText = await startPage.getTitleText();
    expect(titleText).toContain('Дзен');
  });

  test("Navigate in menu",async ()=>{
   
    await startPage.navigationBar.navigateInMenuByText("Статьи");

    const titleText = await startPage.getTitleText();
    expect(titleText).toContain("Статьи и посты от любимых авторов");
  });

  test('should search for "Playwright" and check results', async () => {
    await startPage.navigationBar.navigateInMenuByText("Видеоигры");
    await startPage.search('Playwright');

    const titleText = await startPage.getTitleText();
    expect(titleText).toContain("Playwright");
  });

  test('should try to logIn with incorect info and push error', async ()=>{
    await startPage.viewPage();
    await startPage.logIn('qwerweqtq');
    const errorMsg = await startPage.getErrorMessage();

    expect(errorMsg).toContain("Нет такого аккаунта");
  });

});
