import { useRoutes } from 'react-router-dom';

// project-imports
import CommonLayout from 'layout/CommonLayout';
import ComponentsRoutes from './ComponentsRoutes';
import LoginRoutes from './LoginRoutes';
import MainRoutes from './MainRoutes';

// ==============================|| ROUTES RENDER ||============================== //

export default function ThemeRoutes() {
  return useRoutes([
    {
      path: '/',
      element: <CommonLayout layout="landing" />,
      children: [
        
      ]
    },
    LoginRoutes,
    ComponentsRoutes,
    MainRoutes
  ]);
}
