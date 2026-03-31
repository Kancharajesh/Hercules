import { expect } from "@playwright/test";

export class settings {
    constructor(page){
        this.page = page;
 

    this.setting_profile = page.locator("body > div:nth-child(2) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(3) > div:nth-child(2)");
    this.profile_popup = page.locator("//div[@class='pt-4 w-full']");

    // Free credits.
    this.Get_free_credits = page.locator("//div[@class='pt-4 w-full']");
    this.Get_free_credits_popup = page.locator("//div[@role='dialog']");
    this.Get_free_credits_popup_close = page.locator("//img[@alt='close-modal']");
    
    //


}
}