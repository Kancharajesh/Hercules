import { test } from "@playwright/test";
import { Mobile_Homepage_withoutlogin } from "../pages/Mobile_Homepage_withoutlogin.js";

test.describe("Mobile web public and authenticated flows", () => {
  test("TC01 - Mobile public homepage shows hero and auth buttons", async ({
    page,
  }) => {
    const mobile = new Mobile_Homepage_withoutlogin(page);

    await mobile.launchTheBrowser();
    await mobile.verifyMobileHomePage();
    await mobile.verifyLoginButton();
    await mobile.verifySignupButton();
  });

  test("TC02 - Mobile Try it for free exposes public prompt builder", async ({
    page,
  }) => {
    const mobile = new Mobile_Homepage_withoutlogin(page);

    await mobile.launchTheBrowser();
    await mobile.verifyPublicPromptBuilder();
  });

  test("TC03 - Mobile login page opens with expected fields", async ({
    page,
  }) => {
    const mobile = new Mobile_Homepage_withoutlogin(page);

    await mobile.launchTheBrowser();
    await mobile.clickLogin();
    await mobile.verifyLoginPageFields();
  });

  test("TC04 - Mobile signup page opens with expected fields", async ({
    page,
  }) => {
    const mobile = new Mobile_Homepage_withoutlogin(page);

    await mobile.launchTheBrowser();
    await mobile.clickSignup();
    await mobile.verifySignupPageFields();
  });

  test.describe("after login", () => {
    test.beforeEach(async ({ page }) => {
      const mobile = new Mobile_Homepage_withoutlogin(page);

      await mobile.launchTheBrowser();
      await mobile.mobileLogin();
    });

    test("TC05 - Mobile authenticated home and prompt controls are visible", async ({
      page,
    }) => {
      const mobile = new Mobile_Homepage_withoutlogin(page);

      await mobile.verifyAfterLoginHome();
      await mobile.verifyAuthenticatedPromptControls();
    });

    test("TC06 - Mobile dashboard survey cards and search work", async ({
      page,
    }) => {
      const mobile = new Mobile_Homepage_withoutlogin(page);

      await mobile.verifyMobileDashboardSurveyCards();
      await mobile.verifyMobileDashboardSearch();
    });

    test("TC07 - Mobile dashboard survey card menu opens", async ({
      page,
    }) => {
      const mobile = new Mobile_Homepage_withoutlogin(page);

      await mobile.verifyMobileSurveyCardMenu();
    });

    test("TC08 - Mobile Survey Resources cards and filters are visible", async ({
      page,
    }) => {
      const mobile = new Mobile_Homepage_withoutlogin(page);

      await mobile.verifyMobileSurveyResources();
    });

    test("TC09 - Mobile Research Templates filters switch template cards", async ({
      page,
    }) => {
      const mobile = new Mobile_Homepage_withoutlogin(page);

      await mobile.verifyMobileResearchTemplatesFunctionality();
    });

    test("TC10 - Mobile Saved Audiences card opens saved audience area", async ({
      page,
    }) => {
      const mobile = new Mobile_Homepage_withoutlogin(page);

      await mobile.verifyMobileSavedAudiencesFunctionality();
    });

    test("TC11 - Mobile profile menu shows account actions", async ({
      page,
    }) => {
      const mobile = new Mobile_Homepage_withoutlogin(page);

      await mobile.verifyMobileProfileMenu();
    });
  });
});
