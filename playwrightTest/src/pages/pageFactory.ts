import { Page } from "@playwright/test";
import { StartPage } from "./startPage";
import { VideoPage } from "./videoPage";


export class PageFactory{
    static getPage(page:Page,pageName:string)
    {
        switch(pageName)
        {
            case("StartPage"):
            return new StartPage(page)

            case("VideoPage"):
            return new VideoPage(page)
        }
    }
}