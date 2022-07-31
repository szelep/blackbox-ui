import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import { Dashboard } from '../pages/Dashboard';
import { PageWrapper } from '../pages/PageWrapper';
import { AccessDenied } from '../pages/AccessDenied';

/**
 * Router switch with configured routes.
 *
 * @returns {RouterSwitch}
 */
export function RouterSwitch() {
  /**
   * Authenticated routes available only after login.
   * Extra `access` can be configured.
   */
  const routes = [
    {
      path: '/dashboard',
      component: <Dashboard />,
    },
    {
      path: '/404',
      component: <AccessDenied />,
    },
    {
      path: '/e/:id',
      component: <Dashboard />,
    },
    {
      path: '/v/:id',
      component: <Dashboard preview />,
    },
    {
      path: '/',
      component: <Dashboard />,
    },
    {
      path: '/n',
      component: <Navigate to="/" />,
    },
  ];

  return (
    <BrowserRouter>
      <Routes>
        {[
          <Route
            key="wildcard"
            path="*"
            element={<Navigate to="/404" />}
          />,
          ...routes
            .map(({
              path, component,
            }) => (
              <Route
                key={`page-${path}`}
                path={path}
                exact
                element={(
                  <PageWrapper>
                    {component}
                  </PageWrapper>
                )}
              />
            )),
        ]}
      </Routes>
    </BrowserRouter>
  );
}
