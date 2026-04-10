import { describe, expect, test } from 'vitest';
import { archetypes } from '../../src/content/archetypes.js';
import { contentRules } from '../../src/content/content-rules.js';
import { questions } from '../../src/content/questions.js';

describe('content lint checks', () => {
  test('question ids and prompts are unique', () => {
    const idSet = new Set(questions.map((question) => question.id));
    const promptSet = new Set(questions.map((question) => question.prompt));

    expect(idSet.size).toBe(questions.length);
    expect(promptSet.size).toBe(questions.length);
  });

  test('all questions have 4 options', () => {
    questions.forEach((question) => {
      expect(question.options).toHaveLength(4);
    });
  });

  test('banned patterns do not appear in question or archetype copy', () => {
    const questionText = questions
      .map((question) => `${question.prompt} ${question.options.map((option) => option.text).join(' ')}`)
      .join(' ');

    const archetypeText = archetypes
      .map((archetype) => `${archetype.title} ${archetype.hook} ${archetype.systemRemark} ${archetype.friendshipWarning} ${archetype.selfAwareDisclaimer} ${archetype.shareSnippet}`)
      .join(' ');

    contentRules.bannedPatterns.forEach((pattern) => {
      expect(questionText.includes(pattern)).toBe(false);
      expect(archetypeText.includes(pattern)).toBe(false);
    });
  });
});
