import { test, expect } from '@playwright/test';

test('should emit searchTasks event with search value', async ({ page }) => {
    await page.goto('http://localhost:5173');
    const searchInput = page.locator('input[type="search"]');
    const taskList = page.locator('.list');

    // Assuming some tasks are already present in the list, including at least one containing 'groceries'
    const initialTasks = await taskList.locator('li');
    const initialTaskCount = await initialTasks.count();

    // Wait for the searchTasks event to be emitted
    const searchTasksPromise = page.evaluateHandle(() => {
        return new Promise(resolve => {
            const listener = (event: CustomEvent) => {
                if (event.type === 'searchTasks') {
                    window.removeEventListener('searchTasks', listener);
                    resolve(event.detail);
                }
            };
            window.addEventListener('searchTasks', listener);
        });
    });

    // Type in the search input
    await searchInput.type('groceries');

    // Wait for the searchTasks event to be emitted and get the search value
    const searchTasksEventHandle = await searchTasksPromise;
    const searchTasksEvent: any = await searchTasksEventHandle.jsonValue();
    const searchValue = searchTasksEvent.data;

    // Verify that the searchTasks event was emitted with the correct search value
    await expect(searchValue).toBe('groceries');

    // Verify that only the matching tasks are visible
    const filteredTasks = await taskList.locator('li', { hasText: 'groceries' });
    const filteredTaskCount = await filteredTasks.count();

    // Assertion based on the assumption that at least one task contains 'groceries'
    await expect(filteredTaskCount).toBeGreaterThan(0);
    await expect(filteredTaskCount).toBeLessThan(initialTaskCount);

    // Clear the search input
    await searchInput.fill('');

    // Wait for the searchTasks event to be emitted with an empty search value
    const clearSearchPromise = page.evaluateHandle(() => {
        return new Promise(resolve => {
            const listener = (event: CustomEvent) => {
                if (event.type === 'searchTasks') {
                    window.removeEventListener('searchTasks', listener);
                    resolve(event.detail);
                }
            };
            window.addEventListener('searchTasks', listener);
        });
    });

    const clearSearchEventHandle = await clearSearchPromise;
    const clearSearchEvent: any = await clearSearchEventHandle.jsonValue();
    const clearSearchValue = clearSearchEvent.data;

    // Verify that the searchTasks event was emitted with an empty search value
    await expect(clearSearchValue).toBe('');

    // Verify that all tasks are visible again
    const allTasks = await taskList.locator('li');
    await expect(allTasks).toHaveCount(initialTaskCount);
});
