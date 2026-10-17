import { useState } from "react";
import { useGetMeQuery, useLogoutMutation } from "../../redux/features/userSlice";
import { NavLink, useNavigate } from "react-router-dom";
import { FileText, LayoutDashboard, LogOut, Settings, Store, StoreIcon, Users, Wrench } from "lucide-react";
import LogoutModal from "../Modals/LogoutModal";
import { toast } from "react-toastify";

const Sidebar = () => {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [logout] = useLogoutMutation();

    const { data } = useGetMeQuery();
    const role = data?.loggedUserInfo?.role?.toLowerCase();

    const navItems = {
        admin: [
            { name: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
            { name: "Users", path: "/admin/users", icon: Users },
            { name: "Vendors", path: "/admin/vendors", icon: Store },
            { name: "Services", path: "/admin/services", icon: Wrench },
            { name: "Vendor Services", path: "/admin/vendor/services", icon: StoreIcon },
            { name: "Service Posts", path: "/admin/posts", icon: FileText },
            { name: "Settings", path: "/admin/settings", icon: Settings },
        ],

        vendor: [
            { name: "Dashboard", path: "/vendor/dashboard", icon: LayoutDashboard },
            { name: "My Services", path: "/vendor/services", icon: Wrench },
            { name: "Customer Requests", path: "/vendor/requests", icon: FileText },
            { name: "My Profile", path: "/profile", icon: Users },
            { name: "Settings", path: "/vendor/settings", icon: Settings },
        ],

        user: [
            { name: "My Profile", path: "/user/dashboard", icon: Users },
            { name: "My Posts", path: "/my-posts", icon: FileText },
            { name: "Settings", path: "/settings", icon: Settings },
        ],
    };

    const handleLogout = async () => {
        try {
            const res = await logout().unwrap();
            toast.success(res.message);
            localStorage.removeItem("user");
            setShowModal(false);
            navigate("/login");
        } catch (err) {
            toast.error(err?.data?.message || "Logout Failed");
        }
    };

    const items = navItems[role] || [];

    return (
        <>
            <aside className="fixed left-0 top-0 h-screen w-64 bg-[#1F3A3D] text-white">

                {/* Logo */}
                <div className="flex h-20 items-center border-b border-white/10 px-6">
                    <NavLink to="/">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E0912B] text-xl font-bold">
                            S
                        </div>
                    </NavLink>

                    <div className="ml-3">
                        <h1 className="text-xl font-bold">
                            sewa<span className="text-[#E0912B]">X</span>
                        </h1>
                        <p className="text-xs capitalize text-white/40">
                            {role || "Loading..."} Panel
                        </p>
                    </div>
                </div>

                {/* Dynamic Navigation */}
                <nav className="px-4 py-6">
                    <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-white/30">
                        Main Menu
                    </p>

                    <div className="space-y-1">
                        {items.map(({ name, path, icon: Icon }) => (
                            <NavLink
                                key={path}
                                to={path}
                                className={({ isActive }) =>
                                    `flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition ${isActive
                                        ? "bg-[#E0912B] text-white"
                                        : "text-white/60 hover:bg-white/10 hover:text-white"
                                    }`
                                }
                            >
                                <Icon size={19} />
                                {name}
                            </NavLink>
                        ))}
                    </div>
                </nav>

                {/* Logout */}
                <div className="absolute bottom-0 left-0 w-full border-t border-white/10 p-4">
                    <button
                        onClick={() => setShowModal(true)}
                        className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-white/60 transition hover:bg-red-500/10 hover:text-red-400"
                    >
                        <LogOut size={19} />
                        Logout
                    </button>
                </div>
            </aside>

            {showModal && (
                <LogoutModal
                    onConfirm={handleLogout}
                    onCancel={() => setShowModal(false)}
                />
            )}
        </>
    );
};

export default Sidebar;
