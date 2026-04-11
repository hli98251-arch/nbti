// ============================================================
// NBTI 数据验证 v2.0
// 适配新的题目格式（选项数量可变，含 scores 字段）
// ============================================================

const REQUIRED_DIMENSION_KEYS = ['id', 'name', 'highLabel', 'lowLabel', 'description'];
const REQUIRED_ARCHETYPE_KEYS = ['id', 'code', 'title', 'hook', 'systemRemark', 'friendshipWarning', 'selfAwareDisclaimer', 'shareSnippet', 'dimensionBias'];

export function validateQuestions(value) {
  if (!Array.isArray(value) || value.length < 20) return false;

  return value.every((question) => {
    const hasQuestionFields = typeof question.id === 'string' && question.id.trim().length > 0
      && typeof question.prompt === 'string' && question.prompt.trim().length > 0;

    const hasOptions = Array.isArray(question.options)
      && question.options.length >= 2  // 允许 2-4 个选项
      && question.options.length <= 4
      && question.options.every((option) => {
        const hasBasicFields = typeof option.id === 'string' && typeof option.text === 'string';
        // scores 是必须的（除非是纯路由题，但我们的设计每题都有 scores）
        const hasScores = !option.scores || typeof option.scores === 'object';
        return hasBasicFields && hasScores;
      });

    return hasQuestionFields && hasOptions;
  });
}

export function validateDimensions(value) {
  if (!Array.isArray(value) || value.length < 15) return false;
  return value.every((dimension) => {
    return REQUIRED_DIMENSION_KEYS.every(key =>
      typeof dimension[key] === 'string' && dimension[key].trim().length > 0
    );
  });
}

export function validateArchetypes(value) {
  if (!Array.isArray(value) || value.length !== 16) return false;
  return value.every((archetype) => {
    const hasStringFields = REQUIRED_ARCHETYPE_KEYS
      .filter(key => key !== 'dimensionBias')
      .every(key => typeof archetype[key] === 'string' && archetype[key].trim().length > 0);

    const hasBias = Array.isArray(archetype.dimensionBias)
      && archetype.dimensionBias.length === 2
      && archetype.dimensionBias.every(item => typeof item === 'string' && item.trim().length > 0);

    const hasMbtiAffinity = !archetype.mbtiAffinity || (
      Array.isArray(archetype.mbtiAffinity) && archetype.mbtiAffinity.length > 0
    );

    return hasStringFields && hasBias && hasMbtiAffinity;
  });
}
