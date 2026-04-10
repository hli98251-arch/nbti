import { loadPersistedState, persistState, clearPersistedState } from '../storage/persistence.js';

export function createAppState() {
  const persistedState = loadPersistedState();

  return {
    answers: persistedState.answers,
    result: persistedState.result,
    setAnswers(nextAnswers) {
      this.answers = nextAnswers;
      persistState({ answers: this.answers, result: this.result });
    },
    setResult(nextResult) {
      this.result = nextResult;
      persistState({ answers: this.answers, result: this.result });
    },
    reset() {
      this.answers = {};
      this.result = null;
      clearPersistedState();
    },
  };
}
