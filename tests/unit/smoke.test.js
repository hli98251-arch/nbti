import { describe, expect, test } from 'vitest';
import { archetypes } from '../../src/content/archetypes.js';
import { dimensions } from '../../src/content/dimensions.js';
import { questions } from '../../src/content/questions.js';
import { validateArchetypes, validateDimensions, validateQuestions } from '../../src/domain/schemas.js';

describe('baseline content contracts', () => {
  test('question dataset has 31 complete entries', () => {
    expect(questions).toHaveLength(31);
    expect(validateQuestions(questions)).toBe(true);
  });

  test('dimension dataset has 15 complete entries', () => {
    expect(dimensions).toHaveLength(15);
    expect(validateDimensions(dimensions)).toBe(true);
  });

  test('archetype dataset has 16 complete entries', () => {
    expect(archetypes).toHaveLength(16);
    expect(validateArchetypes(archetypes)).toBe(true);
  });

  test('question validator rejects malformed records', () => {
    const malformedQuestions = [{ id: 'qx', prompt: '坏题', options: [{ id: 'a', text: '只有一个选项' }] }];
    expect(validateQuestions(malformedQuestions)).toBe(false);
  });

  test('dimension validator rejects malformed records', () => {
    const malformedDimensions = [{ id: 'spark' }];
    expect(validateDimensions(malformedDimensions)).toBe(false);
  });

  test('archetype validator rejects malformed records', () => {
    const malformedArchetypes = [
      {
        id: 'broken',
        code: 'BRKN',
        title: '坏掉的人设',
        hook: '这条数据不完整。',
        systemRemark: '验证应该失败。',
        friendshipWarning: '朋友会发现字段不够。',
        selfAwareDisclaimer: '这不该通过。',
        shareSnippet: '失败样本。',
        dimensionBias: ['spark'],
      },
    ];

    expect(validateArchetypes(malformedArchetypes)).toBe(false);
  });
});
