const DEFAULT_ROUTE = '/';
const KNOWN_ROUTES = new Set(['/', '/quiz', '/result']);

function normalizeRoute(hashValue) {
  if (!hashValue || hashValue === '#') {
    return DEFAULT_ROUTE;
  }

  const routeValue = hashValue.replace(/^#/, '');
  return KNOWN_ROUTES.has(routeValue) ? routeValue : DEFAULT_ROUTE;
}

export function getCurrentRoute() {
  return normalizeRoute(window.location.hash);
}

export function navigateTo(route) {
  const targetRoute = KNOWN_ROUTES.has(route) ? route : DEFAULT_ROUTE;
  window.location.hash = targetRoute;
}

export function ensureRoute(appState) {
  const currentRoute = getCurrentRoute();

  if (currentRoute === '/result' && !appState.result) {
    navigateTo('/');
  }
}

export function subscribeToRouteChanges(listener) {
  window.addEventListener('hashchange', listener);
}
