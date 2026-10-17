import Dashboard from "../Admin/Dashboard";
import ServiceDashboard from "../Admin/ServiceDashboard";
import ServicePostDashboard from "../Admin/servicePostDashboard";
import Userdashboard from "../Admin/Userdashboard";
import Vendordashboard from "../Admin/Vendordashboard";
import VendorServicesDashboard from "../Admin/VendorServicesDashboard";


export const AdminRouter = [
    { path: '/admin/dashboard', element: <Dashboard /> },
    { path: '/admin/users', element: <Userdashboard /> },
    { path: '/admin/services', element: <ServiceDashboard /> },
    { path: '/admin/vendors', element: <Vendordashboard /> },
    { path: '/admin/vendor/services', element: <VendorServicesDashboard /> },
    { path: '/admin/posts', element: <ServicePostDashboard /> },



]