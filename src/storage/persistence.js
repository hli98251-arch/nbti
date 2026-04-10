const STORAGE_KEY = 'nbti-app-state-v1';

const EMPTY_STATE = {
  answers: {},
  result: null,
};

export function loadPersistedState() {
  try {
    const rawValue = window.localStorage.getItem(STORAGE_KEY);

    if (!rawValue) {
      return EMPTY_STATE;
    }

    const parsedValue = JSON.parse(rawValue);

    return {
      answers: parsedValue.answers ?? {},
      result: parsedValue.result ?? null,
    };
  } catch (error) {
    console.error('Failed to load persisted state.', error);
    return EMPTY_STATE;
  }
}

export function persistState(state) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function clearPersistedState() {
  window.localStorage.removeItem(STORAGE_KEY);
}
