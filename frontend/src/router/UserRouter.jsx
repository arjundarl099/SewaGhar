import MyPosts from "../User Panel/MyPosts";
import UserProfile from "../User Panel/UserProfile";

export const UserRouter = [
    { path: '/user/dashboard', element: <UserProfile /> },
    { path: '/my-posts', element: <MyPosts /> }
]