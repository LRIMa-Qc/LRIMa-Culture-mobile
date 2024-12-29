import { RouterInterface } from '@alivecode/core/router';
import React from 'react';

const Home = React.lazy(() => import('../pages/Home'));
const Capteurs = React.lazy(() => import('../pages/Capteurs'));
const Overview = React.lazy(() => import('../pages/Overview'));

const NotFound = React.lazy(() => import('../pages/NotFound'));

const router = {
  routes: {
    public: {
      home: {
        path: '/',
        exact: true,
        component: <Home />,
      },
      capteurs: {
        path: '/capteurs',
        exact: true,
        component: <Capteurs />,
      },
      overview: {
        path: '/overview',
        exact: true,
        component: <Overview />,
      },
    },
    auth: {},
    non_auth: {},
    error: {
      404: {
        path: '/404',
        component: <NotFound />,
        maintenanceExempt: true,
      },
    },
  },
  redirects: {
    authRouteWhenNonAuth: <></>,
    nonAuthRouteWhenAuth: <></>,
  },
} satisfies RouterInterface;

export default router;
// export type MyRoutesType = TypedRoutes<typeof router>;