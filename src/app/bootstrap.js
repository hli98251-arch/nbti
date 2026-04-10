import { createAppState } from './app-state.js';
import { ensureRoute, getCurrentRoute, subscribeToRouteChanges } from './router.js';
import { renderLanding } from '../ui/landing.js';
import { renderQuizShell } from '../ui/quiz.js';
import { renderResultShell } from '../ui/result.js';

export function bootstrapApp() {
  const rootElement = document.querySelector('#app');

  if (!rootElement) {
    throw new Error('Expected #app root element to exist.');
  }

  const appState = createAppState();

  function renderCurrentRoute() {
    const route = getCurrentRoute();

    switch (route) {
      case '/quiz':
        renderQuizShell(rootElement, appState);
        return;
      case '/result':
        renderResultShell(rootElement, appState);
        return;
      default:
        renderLanding(rootElement, appState);
    }
  }

  ensureRoute(appState);
  subscribeToRouteChanges(() => {
    ensureRoute(appState);
    renderCurrentRoute();
  });
  renderCurrentRoute();
}
