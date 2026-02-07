import { test, expect } from "@playwright/test";

test.describe("Todo CRUD flow (dummy JSON server)", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000");
    await expect(page.getByTestId("add-todo-trigger")).toBeVisible({
      timeout: 10000,
    });
  });

  test("creates a todo (local state only)", async ({ page }) => {
    const text = `Test Todo ${Date.now()}`;

    await page.getByTestId("add-todo-trigger").click();
    await page.getByTestId("todo-input").fill(text);

    await page.waitForFunction(() => {
      const btn = document.querySelector(
        '[data-testid="user-combobox-trigger"]',
      ) as HTMLButtonElement | null;
      return !!btn && !btn.disabled;
    });

    await page.getByTestId("user-combobox-trigger").click();
    await page
      .getByTestId(/^user-option-/)
      .first()
      .click();
    await page.getByTestId("add-todo-btn").click();

    await expect(page.getByTestId("todo-input")).toBeHidden({ timeout: 10000 });

    await expect(async () => {
      const list = await page
        .locator('[data-testid="todo-item"]')
        .allTextContents();
      if (!list.some((t) => t.includes(text)))
        throw new Error("Todo not found yet");
    }).toPass({ timeout: 15000 });
  });

  test("creates and deletes a todo safely (local state only)", async ({
    page,
  }) => {
    const text = `Disposable Todo ${Date.now()}`;

    await page.getByTestId("add-todo-trigger").click();
    await page.getByTestId("todo-input").fill(text);

    await page.waitForFunction(() => {
      const btn = document.querySelector(
        '[data-testid="user-combobox-trigger"]',
      ) as HTMLButtonElement | null;
      return !!btn && !btn.disabled;
    });

    await page.getByTestId("user-combobox-trigger").click();
    await page
      .getByTestId(/^user-option-/)
      .first()
      .click();
    await page.getByTestId("add-todo-btn").click();
    await expect(page.getByTestId("todo-input")).toBeHidden({ timeout: 10000 });

    await expect(async () => {
      const list = await page
        .locator('[data-testid="todo-item"]')
        .allTextContents();
      if (!list.some((t) => t.includes(text)))
        throw new Error("Todo not found yet");
    }).toPass({ timeout: 15000 });

    const newItem = page
      .locator('[data-testid="todo-item"]')
      .filter({ hasText: text });

    await newItem.getByTestId("delete-todo-trigger").click();
    await page.getByTestId("delete-btn").click();

    await expect(async () => {
      const list = await page
        .locator('[data-testid="todo-item"]')
        .allTextContents();
      if (list.some((t) => t.includes(text)))
        throw new Error("Todo still exists");
    }).toPass({ timeout: 15000 });
  });
});
