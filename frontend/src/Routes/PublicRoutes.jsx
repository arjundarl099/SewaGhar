
import PublicLayouts from "../Layouts/PublicLayouts";
import HomePages from "../Pages/HomePages";
import CreatePost from "../Components/Post";
const PublicRoutes = {
    element: <PublicLayouts />,
    children: [
        { path: '/', element: <HomePages /> },
        { path: '/post', element: <CreatePost /> },
    ]
}

export default PublicRoutes;