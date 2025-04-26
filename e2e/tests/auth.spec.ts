import { test, expect } from '@playwright/test';

const FRONTEND_URL="http://localhost:5173/"

test('Should allow the user to sign up', async ({ page }) => {
   await page.goto(FRONTEND_URL);

   await page.getByRole("button", {name: "Sign Up"}).click();
   await expect(page.getByRole("heading", {name: "Sign up"})).toBeVisible();
   await page.locator("[name=First name]").fill("ujjwal");
   await page.locator("[name=Last name]").fill("kumar");
   await page.locator("[name=email]").fill("ujjwalsinghgaekw@gmail.com");
   await page.locator("[name=password]").fill("asdf");

   await page.getByRole("button", {name: "Create an account"}).click();

   await expect(page.getByText("Registration Successful!")).toBeVisible();
   await expect(page.getByRole("link", {name: "Booking"})).toBeVisible();
   await expect(page.getByRole("link", {name: "Hotels"})).toBeVisible();
   await expect(page.getByRole("button", {name: "Log out"})).toBeVisible();
});


test("Should allow user to login", async({page}) => {
  await 
})