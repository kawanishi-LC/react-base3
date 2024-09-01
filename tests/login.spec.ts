import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto("http://localhost:5173/login/");
  await page.locator('input[type="email"]').click();
  await page.locator('input[type="email"]').fill("test1234@react.test");
  await page.locator('input[type="password"]').click();
  await page.locator('input[type="password"]').fill("1234");
  await page.getByRole("button", { name: "ログイン" }).click();
  await expect(page).toHaveTitle("ログイン");
});