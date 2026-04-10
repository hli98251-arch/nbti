import { questions } from '../../src/content/questions.js';

export function buildAnswerSet(optionId) {
  return questions.reduce((accumulator, question) => {
    accumulator[question.id] = optionId;
    return accumulator;
  }, {});
}

export const allAAnswers = buildAnswerSet('a');
export const allBAnswers = buildAnswerSet('b');
export const allCAnswers = buildAnswerSet('c');
export const allDAnswers = buildAnswerSet('d');

export const tieCaseAnswers = questions.reduce((accumulator, question, index) => {
  accumulator[question.id] = index % 2 === 0 ? 'a' : 'b';
  return accumulator;
}, {});

export const extremeCaseAnswers = questions.reduce((accumulator, question, index) => {
  accumulator[question.id] = index < 12 ? 'c' : 'd';
  return accumulator;
}, {});

export const incompleteAnswers = (() => {
  const fullAnswers = buildAnswerSet('a');
  const clone = { ...fullAnswers };
  delete clone.q31;
  return clone;
})();
