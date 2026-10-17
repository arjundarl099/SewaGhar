import { Outlet } from "react-router-dom"
import Sidebar from "../Components/PrivateComponents/SideBar"

const PrivateLayouts = () => {
    return (
        <div className="min-h-screen bg-[#F7F6F2]">
            <Sidebar />

            <main className="ml-64 min-w-0 p-6">
                <Outlet />
            </main>
        </div>
    )
}

export default PrivateLayouts