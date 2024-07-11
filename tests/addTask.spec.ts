// tests/addTask.spec.js
import { test, expect } from '@playwright/test';

test('should add a task', async ({ page }) => {
    await page.goto('http://localhost:5173');
    const taskInput = page.locator('input[type="text"]');
    const addButton = page.locator('button');
    const taskList = page.locator('.list');

    await taskInput.type('Buy groceries');
    await addButton.click();

    const taskItem = await taskList.locator('li', { hasText: 'Buy groceries' }).last();
    await expect(taskItem).toBeVisible();

    const successToast = page.locator('.Vue-Toastification__toast--success');
    await expect(successToast).toContainText('Task Added Successfully.');
  });
test('should not add an empty task', async ({ page }) => {
  await page.goto('http://localhost:5173');

  const taskInput = page.locator('input[type="text"]');
  const addButton = page.locator('button');

  // Click the add button without entering any text
  await addButton.click();

  // Verify that no task was added
  const taskList = page.locator('.taskList');
  const taskItem = taskList.locator('.taskItem');
  await expect(taskItem).not.toBeVisible();

  // Verify that the error toast was displayed
  const errorToast = page.locator('.Vue-Toastification__toast--error');
  await expect(errorToast).toContainText('Task cannot be empty!!!');
});

test('should not add a task with only whitespaces', async ({ page }) => {
  await page.goto('http://localhost:5173');

  const taskInput = page.locator('input[type="text"]');
  const addButton = page.locator('button');

  // Type whitespaces into the input field
  await taskInput.type('     ');

  // Click the add button
  await addButton.click();

  // Verify that no task was added
  const taskList = page.locator('.taskList');
  const taskItem = taskList.locator('.taskItem');
  await expect(taskItem).not.toBeVisible();

  // Verify that the error toast was displayed
  const errorToast = page.locator('.Vue-Toastification__toast--error');
  await expect(errorToast).toContainText('Whitespaces are not allowed!!!');
});