const REQUIRED_DIMENSION_KEYS = ['id', 'name', 'highLabel', 'lowLabel', 'description'];
const REQUIRED_ARCHETYPE_KEYS = ['id', 'code', 'title', 'hook', 'systemRemark', 'friendshipWarning', 'selfAwareDisclaimer', 'shareSnippet', 'dimensionBias'];
const EXPECTED_DIMENSION_COUNT = 15;
const EXPECTED_ARCHETYPE_COUNT = 16;
const EXPECTED_QUESTION_COUNT = 31;
const EXPECTED_OPTION_COUNT = 4;

function hasRequiredStringFields(record, keys) {
  return keys.every((key) => typeof record[key] === 'string' && record[key].trim().length > 0);
}

export function validateQuestions(value) {
  return Array.isArray(value)
    && value.length === EXPECTED_QUESTION_COUNT
    && value.every((question) => {
      const hasQuestionFields = hasRequiredStringFields(question, ['id', 'prompt']);
      const hasOptions = Array.isArray(question.options)
        && question.options.length === EXPECTED_OPTION_COUNT
        && question.options.every((option) => hasRequiredStringFields(option, ['id', 'text']));

      return hasQuestionFields && hasOptions;
    });
}

export function validateDimensions(value) {
  return Array.isArray(value)
    && value.length === EXPECTED_DIMENSION_COUNT
    && value.every((dimension) => hasRequiredStringFields(dimension, REQUIRED_DIMENSION_KEYS));
}

export function validateArchetypes(value) {
  return Array.isArray(value)
    && value.length === EXPECTED_ARCHETYPE_COUNT
    && value.every((archetype) => {
      const hasStringFields = hasRequiredStringFields(archetype, REQUIRED_ARCHETYPE_KEYS.filter((key) => key !== 'dimensionBias'));
      const hasBias = Array.isArray(archetype.dimensionBias)
        && archetype.dimensionBias.length === 2
        && archetype.dimensionBias.every((item) => typeof item === 'string' && item.trim().length > 0);

      return hasStringFields && hasBias;
    });
}
