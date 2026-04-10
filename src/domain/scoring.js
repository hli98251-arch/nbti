import { archetypes } from '../content/archetypes.js';
import { dimensions } from '../content/dimensions.js';

const EXPECTED_ANSWER_COUNT = 31;

const OPTION_DIMENSION_MAP = {
  a: ['spark', 'gravity', 'venom', 'leak'],
  b: ['mask', 'spite', 'bunker', 'judge'],
  c: ['chaos', 'absurdity', 'speed', 'pride'],
  d: ['orbit', 'filter', 'trap', 'leak']
};

function createEmptyDimensionScores() {
  return dimensions.reduce((accumulator, dimension) => {
    accumulator[dimension.id] = 0;
    return accumulator;
  }, {});
}

function scoreAnswers(answers) {
  const scores = createEmptyDimensionScores();

  Object.entries(answers).forEach(([, optionId]) => {
    const mappedDimensions = OPTION_DIMENSION_MAP[optionId];

    if (!mappedDimensions) {
      return;
    }

    mappedDimensions.forEach((dimensionId) => {
      scores[dimensionId] += 1;
    });
  });

  return scores;
}

function buildArchetypeCandidate(archetype, dimensionScores) {
  const [primaryBias, secondaryBias] = archetype.dimensionBias;
  const primaryScore = dimensionScores[primaryBias] ?? 0;
  const secondaryScore = dimensionScores[secondaryBias] ?? 0;

  return {
    archetype,
    total: primaryScore + secondaryScore,
    primaryScore,
    secondaryScore
  };
}

function selectArchetype(dimensionScores) {
  const candidates = archetypes.map((archetype) => buildArchetypeCandidate(archetype, dimensionScores));

  candidates.sort((left, right) => {
    if (right.total !== left.total) {
      return right.total - left.total;
    }

    if (right.primaryScore !== left.primaryScore) {
      return right.primaryScore - left.primaryScore;
    }

    if (right.secondaryScore !== left.secondaryScore) {
      return right.secondaryScore - left.secondaryScore;
    }

    return left.archetype.id.localeCompare(right.archetype.id);
  });

  return {
    top: candidates[0],
    second: candidates[1] ?? candidates[0]
  };
}

function buildConfidence(topScore, secondScore) {
  const spread = Math.max(0, topScore - secondScore);
  const value = Math.min(99, 72 + spread * 4);
  return `${value}%`;
}

function validateCompleteAnswers(answers) {
  const answeredCount = Object.keys(answers).length;
  return answeredCount === EXPECTED_ANSWER_COUNT;
}

function buildDimensionBreakdown(dimensionScores) {
  return dimensions.map((dimension) => ({
    id: dimension.id,
    name: dimension.name,
    score: dimensionScores[dimension.id] ?? 0,
    highLabel: dimension.highLabel,
    lowLabel: dimension.lowLabel
  }));
}

export function buildResultFromAnswers(answers) {
  // Validate that SOME answers exist, but relax strict count due to branching
  if (Object.keys(answers).length < 10) {
    throw new Error('Please complete the test (at least 10 answers required).');
  }

  const dimensionScores = scoreAnswers(answers);
  const selected = selectArchetype(dimensionScores);
  const confidence = buildConfidence(selected.top.total, selected.second.total);

  return {
    code: selected.top.archetype.code,
    title: selected.top.archetype.title,
    hook: selected.top.archetype.hook,
    confidence,
    systemRemark: selected.top.archetype.systemRemark,
    friendshipWarning: selected.top.archetype.friendshipWarning,
    selfAwareDisclaimer: selected.top.archetype.selfAwareDisclaimer,
    shareSnippet: selected.top.archetype.shareSnippet,
    dimensions: buildDimensionBreakdown(dimensionScores),
    totalAnswers: Object.keys(answers).length,
    summary: `${selected.top.archetype.systemRemark} 当前分维结果已生成，可直接分享。`
  };
}

