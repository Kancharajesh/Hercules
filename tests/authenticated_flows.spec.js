import { test } from "@playwright/test";
import { AuthenticatedFlows_model } from "../pages/AuthenticatedFlows_model.js";

test.describe("After login functionality checks", () => {
  test.beforeEach(async ({ page }) => {
    const app = new AuthenticatedFlows_model(page);
    await app.login();
  });

  test("TC01 - User lands on authenticated AI home after login", async ({
    page,
  }) => {
    const app = new AuthenticatedFlows_model(page);

    await app.verifyAuthenticatedHome();
  });

  test("TC02 - Prompt controls are visible and prompt input accepts text", async ({
    page,
  }) => {
    const app = new AuthenticatedFlows_model(page);

    await app.verifyPromptControlsAndInput();
  });

  test("TC03 - Profile menu shows account actions and free credits dialog works", async ({
    page,
  }) => {
    const app = new AuthenticatedFlows_model(page);

    await app.openProfileMenu();
    await app.verifyProfileMenuItems();
    await app.verifyFreeCreditsDialogOpensAndCloses();
  });

  test("TC04 - Settings opens from profile and tabs navigate correctly", async ({
    page,
  }) => {
    const app = new AuthenticatedFlows_model(page);

    await app.openProfileMenu();
    await app.openSettingsFromProfile();
    await app.verifySettingsTabs();
  });

  test("TC05 - Help opens from profile menu with help sections", async ({
    page,
  }) => {
    const app = new AuthenticatedFlows_model(page);

    await app.openProfileMenu();
    await app.openHelpFromProfile();
    await app.verifyHelpContent();
  });

  test("TC06 - Dashboard opens from profile menu", async ({ page }) => {
    const app = new AuthenticatedFlows_model(page);

    await app.openProfileMenu();
    await app.openDashboardFromProfile();
  });

  test("TC07 - Logout cancel keeps the user signed in", async ({ page }) => {
    const app = new AuthenticatedFlows_model(page);

    await app.openProfileMenu();
    await app.verifyLogoutCancelKeepsUserLoggedIn();
  });

  test("TC08 - Logout confirm returns to logged out state", async ({ page }) => {
    const app = new AuthenticatedFlows_model(page);

    await app.openProfileMenu();
    await app.verifyLogoutConfirmEndsSession();
  });

  test("TC09 - Dashboard survey cards and controls are visible", async ({
    page,
  }) => {
    const app = new AuthenticatedFlows_model(page);

    await app.verifyDashboardSurveyCards();
  });

  test("TC10 - Dashboard survey search filters matching cards", async ({
    page,
  }) => {
    const app = new AuthenticatedFlows_model(page);

    await app.verifyDashboardSearchFunctionality();
  });

  test("TC11 - Dashboard survey card menu opens", async ({ page }) => {
    const app = new AuthenticatedFlows_model(page);

    await app.verifyDashboardCardMenuOpens();
  });

  test("TC12 - Survey Resources cards and template filters are visible", async ({
    page,
  }) => {
    const app = new AuthenticatedFlows_model(page);

    await app.verifySurveyResourcesSection();
  });

  test("TC13 - Research Templates filters switch template cards", async ({
    page,
  }) => {
    const app = new AuthenticatedFlows_model(page);

    await app.verifyResearchTemplatesFunctionality();
  });

  test("TC14 - Saved Audiences card opens saved audience area", async ({
    page,
  }) => {
    const app = new AuthenticatedFlows_model(page);

    await app.verifySavedAudiencesFunctionality();
  });

  test("TC15 - Survey Resources View All remains navigable", async ({ page }) => {
    const app = new AuthenticatedFlows_model(page);

    await app.verifySurveyResourcesViewAllFunctionality();
  });
});
