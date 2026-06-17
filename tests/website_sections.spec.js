import { test } from "@playwright/test";
import { WebsiteSections_model } from "../pages/WebsiteSections_model.js";

test.describe("Full website public section checks", () => {
  test("TC01 - AI homepage header, hero, and prompt sections are visible", async ({
    page,
  }) => {
    const website = new WebsiteSections_model(page);

    await website.openAiPage();
    await website.verifyAiHeaderHeroAndPromptSection();
  });

  test("TC02 - AI homepage about, library, templates, and footer sections are visible", async ({
    page,
  }) => {
    const website = new WebsiteSections_model(page);

    await website.openAiPage();
    await website.verifyAiAboutLibraryTemplatesAndFooterSections();
  });

  test("TC03 - Research page shows case studies and CTA links", async ({
    page,
  }) => {
    const website = new WebsiteSections_model(page);

    await website.openResearchPage();
    await website.verifyResearchCaseStudiesSection();
    await website.verifyResearchCtaLinks();
  });

  test("TC04 - Pricing page shows plans and feature details", async ({
    page,
  }) => {
    const website = new WebsiteSections_model(page);

    await website.openPricingPage();
    await website.verifyPricingPlansSection();
    await website.verifyPricingFeatureDetailsSection();
  });

  test("TC05 - About page shows story, team, and footer sections", async ({
    page,
  }) => {
    const website = new WebsiteSections_model(page);

    await website.openAboutPage();
    await website.verifyAboutStoryTeamAndFooterSections();
  });

  test("TC06 - Public website pages expose valid main link href values", async ({
    page,
  }) => {
    const website = new WebsiteSections_model(page);

    await website.openAiPage();
    await website.verifyMainLinksHaveValidHref();

    await website.openResearchPage();
    await website.verifyMainLinksHaveValidHref();

    await website.openPricingPage();
    await website.verifyMainLinksHaveValidHref();

    await website.openAboutPage();
    await website.verifyMainLinksHaveValidHref();
  });
});
