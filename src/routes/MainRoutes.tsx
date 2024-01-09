import { lazy } from 'react';

// project-imports
import MainLayout from 'layout/MainLayout';
import CommonLayout from 'layout/CommonLayout';
import Loadable from 'components/Loadable';
import AuthGuard from 'utils/route-guard/AuthGuard';
import VillaShow from 'pages/villa/show';
import VillaSummary from 'pages/villa/components/summary';
import VillaReservation from 'pages/villa/components/reservation';
import VillaPrice from 'pages/villa/components/price';
import VillaGallery from 'pages/villa/components/gallery';
import VillaFile from 'pages/villa/components/file';
import ReservationList from 'pages/reservation/list';
import ReservationCalendar from 'pages/reservation/calendar';


// pages routing
const AuthLogin = Loadable(lazy(() => import('pages/auth/auth1/login')));


// ==============================|| MAIN ROUTES ||============================== //


const VillaList = Loadable(lazy(() => import('pages/villa/list')));

const MainRoutes = {
  path: '/',
  children: [
    {
        path: "villa",
        element: (
            <AuthGuard>
                <MainLayout />
            </AuthGuard>
        ),
        children:[
            {
                path:"list",
                element: <VillaList />
            },
            {
                path:"show/:id",
                element: <VillaShow />,
                children:[
                    {
                        path:"summary",
                        element: <VillaSummary />
                    },
                    {
                        path:"reservation",
                        element: <VillaReservation />
                    },
                    {
                        path:"price",
                        element: <VillaPrice />
                    },
                    {
                        path:"gallery",
                        element: <VillaGallery />
                    },
                    {
                        path:"file",
                        element: <VillaFile />
                    },
                ]
            }
        ]
    },
    {
        path: "reservation",
        element: (
            <AuthGuard>
                <MainLayout />
            </AuthGuard>
        ),
        children:[
            {
                path:"list",
                element: <ReservationList />
            },
            {
                path:"calendar",
                element: <ReservationCalendar />
            },
        ]
    },
    {
      path: '/auth',
      element: <CommonLayout />,
      children: [
        {
          path: 'login',
          element: <AuthLogin />
        },
      ]
    }
  ]
};

export default MainRoutes;
