import { expect, test } from '@playwright/test';

async function completeQuiz(page) {
  await page.goto('/');
  await page.getByRole('button', { name: '开始测狠话' }).click();
  await expect(page.locator('fieldset')).toHaveCount(31);

  for (let index = 1; index <= 31; index += 1) {
    const questionId = `q${String(index).padStart(2, '0')}`;
    await page.locator(`input[name="${questionId}"]`).first().check();
  }
}

test('quiz flow tracks progress and blocks incomplete submission', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: '开始测狠话' }).click();

  await expect(page.locator('fieldset')).toHaveCount(31);
  await expect(page.getByTestId('quiz-progress')).toContainText('0 / 31');
  await expect(page.getByRole('button', { name: '还差 31 题' })).toBeDisabled();

  await page.locator('input[name="q01"]').first().check();
  await expect(page.getByTestId('quiz-progress')).toContainText('1 / 31');
});

test('quiz can be completed and reaches result page', async ({ page }) => {
  await completeQuiz(page);
  await expect(page.getByTestId('quiz-progress')).toContainText('31 / 31');
  await page.getByRole('button', { name: '提交并查看结果' }).click();
  await expect(page.getByTestId('result-poster')).toBeVisible();
});

test('result page supports copy share text', async ({ context, page }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await completeQuiz(page);
  await page.getByRole('button', { name: '提交并查看结果' }).click();

  await page.getByRole('button', { name: '复制结果文案' }).click();
  await expect(page.getByTestId('copy-status')).toContainText('复制成功');

  const copied = await page.evaluate(async () => navigator.clipboard.readText());
  expect(copied.includes('NBTI 结果：')).toBe(true);
});
