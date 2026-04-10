import { describe, expect, test } from 'vitest';
import { buildResultFromAnswers } from '../../src/domain/scoring.js';
import {
  allAAnswers,
  allBAnswers,
  allCAnswers,
  allDAnswers,
  extremeCaseAnswers,
  incompleteAnswers,
  tieCaseAnswers
} from '../fixtures/answers.js';

describe('scoring engine', () => {
  test('builds a result from complete answers', () => {
    const result = buildResultFromAnswers(allAAnswers);

    expect(result.code).toBeTypeOf('string');
    expect(result.title).toBeTypeOf('string');
    expect(result.confidence.endsWith('%')).toBe(true);
    expect(Array.isArray(result.dimensions)).toBe(true);
    expect(result.dimensions).toHaveLength(15);
  });

  test('is deterministic for tie case inputs', () => {
    const firstResult = buildResultFromAnswers(tieCaseAnswers);
    const secondResult = buildResultFromAnswers(tieCaseAnswers);

    expect(secondResult.code).toBe(firstResult.code);
    expect(secondResult.confidence).toBe(firstResult.confidence);
  });

  test('rejects incomplete answers', () => {
    expect(() => buildResultFromAnswers(incompleteAnswers)).toThrowError('Expected 31 answers before building a result.');
  });

  test('produces valid output for extreme and single-option answer sets', () => {
    const samples = [allAAnswers, allBAnswers, allCAnswers, allDAnswers, extremeCaseAnswers];

    samples.forEach((sample) => {
      const result = buildResultFromAnswers(sample);
      expect(result.code.length > 0).toBe(true);
      expect(result.dimensions.every((dimension) => typeof dimension.score === 'number')).toBe(true);
    });
  });
});
