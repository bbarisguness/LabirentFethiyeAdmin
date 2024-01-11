import { useRoutes } from 'react-router-dom';

// project-imports
//import CommonLayout from 'layout/CommonLayout';
import ComponentsRoutes from './ComponentsRoutes';
import LoginRoutes from './LoginRoutes';
import MainRoutes from './MainRoutes';
import AuthGuard from 'utils/route-guard/AuthGuard';
import MainLayout from 'layout/MainLayout';
//import DashboardAnalytics from 'pages/dashboard/analytics';
import DashboardDefault from 'pages/dashboard/default';

// ==============================|| ROUTES RENDER ||============================== //

export default function ThemeRoutes() {
  return useRoutes([
    {
      path: '/',
      //element: <CommonLayout layout="landing" />,
      element: (
        <AuthGuard>
          <MainLayout />
        </AuthGuard>
      ),
      children: [
        {
          path: '/',
          element: <DashboardDefault />
        }
      ]
    },
    LoginRoutes,
    ComponentsRoutes,
    MainRoutes
  ]);
}
