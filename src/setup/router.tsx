import { RouterInterface } from '@alivecode/core/router';
import React from 'react';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import { Navigate } from 'react-router-dom';

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
        pageTitle: 'Alive Culture',
        redirect: {
          action: "navigate",
          to: "/signin"
        }
      },
    },
    auth: {
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
    non_auth: {
      sign_in: {
        path: '/signin',
        exact: true,
        component: <SignIn />
      },
      sign_up: {
        path: '/signup',
        exact: true,
        component: <SignUp />
      }
    },
    error: {
      404: {
        path: '/404',
        component: <NotFound />,
        maintenanceExempt: true,
      },
    },
  },
  redirects: {
    authRouteWhenNonAuth: <Navigate to="/signin" replace />,
    nonAuthRouteWhenAuth: <></>,
  },
} satisfies RouterInterface;

export default router;
// export type MyRoutesType = TypedRoutes<typeof router>;