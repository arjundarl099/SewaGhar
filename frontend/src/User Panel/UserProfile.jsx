import { useState } from "react";
import { toast } from "react-toastify";
import {
    useGetMeQuery,
    useUpdateUserMutation,
} from "../redux/features/userSlice";

const formatDate = (value) => {
    if (!value) return "-";
    return new Date(value).toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
};

const roleStyles = {
    admin: "bg-amber-100 text-amber-800",
    vendor: "bg-emerald-100 text-emerald-800",
    user: "bg-sky-100 text-sky-800",
};

const Field = ({ label, children }) => (
    <div className="grid grid-cols-1 gap-1 py-4 sm:grid-cols-3 sm:gap-4">
        <dt className="text-sm text-gray-500">{label}</dt>
        <dd className="text-sm font-medium text-gray-900 sm:col-span-2">
            {children}
        </dd>
    </div>
);

const inputClass =
    "w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-[#14282B] focus:outline-none focus:ring-2 focus:ring-[#14282B]/20";

const UserProfile = () => {
    const { data, isLoading, error } = useGetMeQuery();
    const [updateUser, { isLoading: saving }] = useUpdateUserMutation();

    const [editing, setEditing] = useState(false);
    const [form, setForm] = useState({ username: "", email: "", phone: "" });

    const user = data?.loggedUserInfo;

    const startEditing = () => {
        setForm({
            username: user.username || "",
            email: user.email || "",
            phone: user.phone || "",
        });
        setEditing(true);
    };

    const handleChange = (e) =>
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

    const handleSave = async (e) => {
        e.preventDefault();

        if (!form.username.trim() || !form.email.trim()) {
            toast.error("Name and email are required");
            return;
        }

        try {
            const res = await updateUser({
                id: user.id,
                username: form.username.trim(),
                email: form.email.trim(),
                phone: form.phone.trim(),
            }).unwrap();

            toast.success(res?.message || "Profile updated");
            setEditing(false);
        } catch (err) {
            toast.error(err?.data?.message || "Unable to update profile");
        }
    };

    if (isLoading) {
        return (
            <div className="flex min-h-[400px] items-center justify-center">
                <p className="text-gray-500">Loading your profile...</p>
            </div>
        );
    }

    if (error || !user) {
        return (
            <div className="m-6 rounded-xl bg-red-50 p-6 text-red-600">
                We couldn't load your profile. Please log in again.
            </div>
        );
    }

    const initials = user.username
        .split(" ")
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();

    const role = user.role?.toLowerCase();

    return (
        <div className="mx-auto max-w-4xl p-4 sm:p-6">
            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm md:grid md:grid-cols-[260px_1fr]">

                {/* Identity panel */}
                <aside className="flex flex-col items-center bg-[#14282B] px-6 py-10 text-center text-white">
                    <div
                        className="flex h-24 w-24 items-center justify-center rounded-full bg-white/10 text-3xl font-semibold ring-4 ring-white/20"
                        aria-hidden="true"
                    >
                        {initials}
                    </div>

                    <h1 className="mt-5 break-all text-xl font-semibold">
                        {user.username}
                    </h1>

                    <p className="mt-1 break-all text-sm text-white/70">
                        {user.email}
                    </p>

                    <span
                        className={`mt-4 rounded-full px-3 py-1 text-xs font-semibold capitalize ${roleStyles[role] || "bg-gray-100 text-gray-800"
                            }`}
                    >
                        {user.role}
                    </span>

                    <p className="mt-8 text-xs text-white/60">Member since</p>
                    <p className="text-sm font-medium">
                        {formatDate(user.created_at)}
                    </p>
                </aside>

                {/* Details */}
                <section className="p-6 sm:p-8">
                    <div className="flex items-start justify-between gap-4">
                        <div>
                            <h2 className="text-lg font-bold text-gray-800">
                                Profile details
                            </h2>
                            <p className="mt-1 text-sm text-gray-500">
                                Your personal information on this account.
                            </p>
                        </div>

                        {!editing && (
                            <button
                                type="button"
                                onClick={startEditing}
                                className="whitespace-nowrap rounded-xl bg-[#14282B] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#1D3A3E] focus:outline-none focus:ring-2 focus:ring-[#14282B] focus:ring-offset-2"
                            >
                                Edit profile
                            </button>
                        )}
                    </div>

                    {editing ? (
                        <form onSubmit={handleSave} className="mt-6 space-y-5">
                            <div>
                                <label
                                    htmlFor="username"
                                    className="mb-1 block text-sm text-gray-600"
                                >
                                    Username
                                </label>
                                <input
                                    id="username"
                                    name="username"
                                    value={form.username}
                                    onChange={handleChange}
                                    className={inputClass}
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="email"
                                    className="mb-1 block text-sm text-gray-600"
                                >
                                    Email
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    className={inputClass}
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="phone"
                                    className="mb-1 block text-sm text-gray-600"
                                >
                                    Phone
                                </label>
                                <input
                                    id="phone"
                                    name="phone"
                                    value={form.phone}
                                    onChange={handleChange}
                                    className={inputClass}
                                />
                            </div>

                            <div className="flex gap-3 pt-2">
                                <button
                                    type="submit"
                                    disabled={saving}
                                    className="rounded-xl bg-[#14282B] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#1D3A3E] focus:outline-none focus:ring-2 focus:ring-[#14282B] focus:ring-offset-2 disabled:opacity-60"
                                >
                                    {saving ? "Saving..." : "Save changes"}
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setEditing(false)}
                                    disabled={saving}
                                    className="rounded-xl border border-gray-300 px-5 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    ) : (
                        <dl className="mt-4 divide-y divide-gray-100">
                            <Field label="Username">{user.username}</Field>
                            <Field label="Email">{user.email}</Field>
                            <Field label="Phone">{user.phone || "Not added"}</Field>
                            <Field label="Account type">
                                <span className="capitalize">{user.role}</span>
                            </Field>
                            <Field label="Last updated">
                                {formatDate(user.updated_at)}
                            </Field>
                        </dl>
                    )}
                </section>
            </div>
        </div>
    );
};

export default UserProfile;