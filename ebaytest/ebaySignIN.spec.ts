import { errorSignIn, timeout30, userNameLogIn } from "../const/common";
import { homePage } from "../pageObjects/homePage";
import { signInPage } from "../pageObjects/signIn";

describe('Ebay test', ()=>{

    afterAll(async ()=>{
        await homePage.closePage();
    },timeout30);


    test('should attempt to sign in and verify error message', async () => {
        await homePage.viewPage();
        await signInPage.signIn(userNameLogIn);

        const errorText = await signInPage.getErrorMessage();
        expect(errorText).toContain(errorSignIn);
    }, timeout30);
})