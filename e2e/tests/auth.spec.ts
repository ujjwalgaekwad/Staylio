import { test, expect } from "@playwright/test";
import dotenv from "dotenv";
dotenv.config();

const FRONTEND_URL = process.env.FRONTEND_URL as string;

test("Should allow the user to sign up", async ({ page }) => {
  await page.goto(`${FRONTEND_URL}/register`);

  await page.getByRole("button", { name: "Sign Up" }).click();
  await expect(page.getByRole("heading", { name: "Sign up" })).toBeVisible();
  await page.getByLabel("First name").fill("ujjwal");
  await page.getByLabel("Last name").fill("kumar");
  await page.getByLabel("Email").fill("test@gmail.com");
  await page.getByLabel("Password").fill("asdf");
  await page.getByLabel("Confirm Password").fill("asdf");

  await page.getByRole("button", { name: "Create an account" }).click();
});

test("Should allow user to sign in", async ({ page }) => {
  await page.goto(`${FRONTEND_URL}/login`);

  await page.getByRole("button", { name: "Sign Up" }).click();
  await expect(page.getByRole("heading", { name: "Sign In" })).toBeVisible();
  await page.getByLabel("Email").fill("test@gmail.com");
  await page.getByLabel("Password").fill("asdf");

  await page.getByRole("button", { name: "Sign In" }).click();
});
