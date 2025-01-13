import { RouterInterface } from '@alivecode/core/router';
import React from 'react';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
// import { Navigate } from 'react-router-dom';
import Capteurs from '../pages/Capteurs/Capteurs';
import Serres from '../pages/Serres';
import Capteur from '../pages/Capteurs/Capteur';
import { Navigate } from 'react-router-dom';
import Languages from '../pages/Languages';


const Home = React.lazy(() => import('../pages/Home'));
const Overview = React.lazy(() => import('../pages/Overview'));
const Detection = React.lazy(() => import('../pages/Detection/Detection'));

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
      languages: {
        path: '/languages',
        exact: true,
        component: <Languages />,
        pageTitle: 'Langauges',
      },
    },
    auth: {
      detection: {
        path: '/detection',
        exact: true,
        component: <Detection />,
      },
      serres: {
        path: 'serres',
        exact: true,
        component: <Serres />
      },
      capteurs: {
        path: '/capteurs',
        exact: true,
        component: <Capteurs />,
      },
      capteur: {
        path: '/capteurs/:capteurId',
        exact: true,
        component: <Capteur />,
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
    authRouteWhenNonAuth: <Navigate to="/signin" replace/>,
    nonAuthRouteWhenAuth: <Navigate to="/serres" replace/>,
    // authRouteWhenNonAuth: <></>,
    // nonAuthRouteWhenAuth: <></>
  },
} satisfies RouterInterface;

export default router;
// export type MyRoutesType = TypedRoutes<typeof router>;