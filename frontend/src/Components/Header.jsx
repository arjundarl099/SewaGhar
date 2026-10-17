
import { NavLink, useNavigate } from 'react-router-dom'
import { useGetMeQuery } from '../redux/features/userSlice';

const NAV_NavLinkS = [
    { href: "/service", label: "Service" },
    { href: "/vendor", label: "Vendor" },
    { href: "/post", label: "Post" },
    { href: "/about", label: "About" },
];

const Header = () => {
    const { data, isLoading } = useGetMeQuery();
    const navigate = useNavigate();
    const handleProfileClick = () => {
        if (user?.role === "admin") {
            navigate("/admin/dashboard");
        } else if (user?.role === "vendor") {
            navigate("/vendor/dashboard");
        } else if (user?.role === "user") {
            navigate("/user/dashboard");
        }
    };

    const user = data?.loggedUserInfo;
    return (
        <header className="sticky top-0 z-20 border-b border-orange-100 bg-white">
            <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">

                <NavLink to="/">
                    <div className="flex items-center gap-2 text-lg font-bold text-slate-800">
                        SewaX
                    </div>
                </NavLink>

                <nav className="hidden gap-8 text-sm font-medium text-slate-500 md:flex">
                    {NAV_NavLinkS.map((link, index) => (
                        <NavLink
                            to={link.href}
                            key={index}
                            className={({ isActive }) =>
                                isActive
                                    ? "text-orange-600"
                                    : "hover:text-orange-500"
                            }
                        >
                            {link.label}
                        </NavLink>
                    ))}
                </nav>

                <div>
                    {user ? (
                        <button
                            type="button"
                            onClick={handleProfileClick}
                            className="flex items-center gap-2"
                        >
                            {user.profilePic ? (
                                <img
                                    src={user.profilePic}
                                    alt={user.username}
                                    className="h-9 w-9 rounded-full object-cover"
                                />
                            ) : (
                                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-500 font-semibold text-white">
                                    {user.username?.charAt(0).toUpperCase()}
                                </div>
                            )}

                            <span className="font-medium text-slate-700">
                                {user.username}
                            </span>
                        </button>
                    ) : (
                        <NavLink
                            to="/login"
                            className="rounded-lg bg-orange-500 px-4 py-2 text-sm font-medium text-white hover:bg-orange-600"
                        >
                            Login
                        </NavLink>
                    )}
                </div>

            </div>
        </header>
    );
};

export default Header;

