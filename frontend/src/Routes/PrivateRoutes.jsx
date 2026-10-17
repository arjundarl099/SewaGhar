
import Dashboard from '../Admin/Dashboard';
import ServicePostDashboard from '../Admin/servicePostDashboard';
import Userdashboard from '../Admin/Userdashboard';
import Vendordashboard from '../Admin/Vendordashboard';
import PrivateLayouts from '../Layouts/PrivateLayouts';
import ProfilePage from '../Pages/ProfilePage';
import { AdminRouter } from '../router/AdminRouter';
import { UserRouter } from '../router/UserRouter';
import Guard from './Guard';
const AuthRoutes = {
  element: <Guard />,
  children: [{
    element: <PrivateLayouts />,
    children: [
      ...AdminRouter,
      ...UserRouter,
    ]

  }]

}

export default AuthRoutes;