import { Page } from "@playwright/test";
import { StartPage } from "./startPage";
import { TVPage } from "./tvPage";


export class PageFactory{
    static getPage(page:Page,pageName:string)
    {
        switch(pageName)
        {
            case("StartPage"):
            return new StartPage(page)

            case("TVPage"):
            return new TVPage(page)
        }
    }
}