import { test, expect } from "@playwright/test";

test.describe("Abel Solutions website", () => {
  test("home page shows brand and primary CTAs", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("link", { name: /Abel Solutions — home/i })).toBeVisible();
    await expect(
      page.getByRole("heading", {
        name: /Technology and construction solutions you can depend on/i,
      }),
    ).toBeVisible();
    await expect(page.getByRole("link", { name: "Request a Quote" }).first()).toBeVisible();
  });

  test("primary navigation reaches service pages", async ({ page }) => {
    await page.goto("/technology-services");
    await expect(page.getByRole("heading", { name: "Technology Services" })).toBeVisible();

    await page.goto("/construction-services");
    await expect(page.getByRole("heading", { name: "Construction Services" })).toBeVisible();

    await page.goto("/about");
    await expect(page.getByRole("heading", { name: "About Abel Solutions" })).toBeVisible();
  });

  test("quote form validates required fields", async ({ page }) => {
    await page.goto("/quote");
    await page.getByRole("button", { name: /Submit quote request/i }).click();
    await expect(page.getByText(/Please correct the highlighted fields/i)).toBeVisible();
  });

  test("contact form validates required fields", async ({ page }) => {
    await page.goto("/contact");
    await page.getByRole("button", { name: /Send message/i }).click();
    await expect(page.getByText(/Please correct the highlighted fields/i)).toBeVisible();
  });

  test("404 page renders for unknown routes", async ({ page }) => {
    const response = await page.goto("/this-page-does-not-exist");
    expect(response?.status()).toBe(404);
    await expect(page.getByRole("heading", { name: "Page not found" })).toBeVisible();
  });

  test("skip link is present for keyboard users", async ({ page }) => {
    await page.goto("/");
    await page.keyboard.press("Tab");
    const skip = page.getByRole("link", { name: /Skip to main content/i });
    await expect(skip).toBeFocused();
  });
});
