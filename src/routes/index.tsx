import { useRoutes } from 'react-router-dom';

// project-imports
import CommonLayout from 'layout/CommonLayout';
import ComponentsRoutes from './ComponentsRoutes';
import LoginRoutes from './LoginRoutes';
import MainRoutes from './MainRoutes';
// import AuthGuard from 'utils/route-guard/AuthGuard';
// import Default from 'pages/dashboard/default';

// ==============================|| ROUTES RENDER ||============================== //

export default function ThemeRoutes() {
  return useRoutes([
    {
      path: '/',
      element: <CommonLayout layout="landing" />,
      // element: (
      //   <AuthGuard>
      //     <Default />
      //   </AuthGuard>
      // ),
      children: []
    },
    LoginRoutes,
    ComponentsRoutes,
    MainRoutes
  ]);
}
