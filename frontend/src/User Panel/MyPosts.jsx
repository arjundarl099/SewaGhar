import { useGetAllPostsQuery } from "../redux/features/servicePostSlice";

const formatDate = (value) =>
    new Date(value).toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
        year: "numeric",
    });

const formatBudget = (value) =>
    `Rs. ${Number(value || 0).toLocaleString(undefined, {
        maximumFractionDigits: 0,
    })}`;

// Soft tints so the rows are easy to tell apart
const TINTS = [
    { bg: "bg-emerald-100", text: "text-emerald-700", bar: "bg-emerald-400" },
    { bg: "bg-sky-100", text: "text-sky-700", bar: "bg-sky-400" },
    { bg: "bg-amber-100", text: "text-amber-700", bar: "bg-amber-400" },
    { bg: "bg-rose-100", text: "text-rose-700", bar: "bg-rose-400" },
];

const PinIcon = () => (
    <svg
        viewBox="0 0 24 24"
        className="h-4 w-4 flex-shrink-0"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
    >
        <path d="M12 21s7-5.686 7-11a7 7 0 1 0-14 0c0 5.314 7 11 7 11z" />
        <circle cx="12" cy="10" r="2.5" />
    </svg>
);

const CalendarIcon = () => (
    <svg
        viewBox="0 0 24 24"
        className="h-4 w-4 flex-shrink-0"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
    >
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M16 3v4M8 3v4M3 10h18" />
    </svg>
);

const MyPosts = () => {
    const { data, isLoading, error } = useGetAllPostsQuery();

    const posts = data?.posts || [];
    const failed = error && error.status !== 404;

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#EAF5F0] to-[#F7FAF9] p-6">
            <div className="mx-auto max-w-5xl">
                <div className="mb-6 flex items-end justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">
                            My Posts
                        </h1>
                        <p className="mt-1 text-sm text-gray-500">
                            Everything you've asked for help with
                        </p>
                    </div>

                    <span className="rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-[#1D4D43] shadow-sm">
                        {posts.length} {posts.length === 1 ? "post" : "posts"}
                    </span>
                </div>

                {isLoading && (
                    <p className="text-gray-500">Loading posts...</p>
                )}

                {failed && (
                    <p className="text-red-600">Failed to load posts.</p>
                )}

                {!isLoading && !failed && posts.length === 0 && (
                    <p className="text-gray-500">No posts yet.</p>
                )}

                <div className="space-y-3">
                    {posts.map((post, index) => {
                        const tint = TINTS[index % TINTS.length];

                        return (
                            <article
                                key={post.id}
                                className="group relative flex flex-col gap-2 overflow-hidden rounded-2xl bg-white py-4 pl-6 pr-5 shadow-sm ring-1 ring-black/5 transition duration-200 hover:-translate-y-0.5 hover:shadow-md sm:flex-row sm:items-center sm:gap-4"
                            >
                                {/* Color bar */}
                                <span
                                    className={`absolute inset-y-0 left-0 w-1.5 ${tint.bar}`}
                                    aria-hidden="true"
                                />

                                {/* Avatar */}
                                <div
                                    className={`hidden h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-base font-bold sm:flex ${tint.bg} ${tint.text}`}
                                    aria-hidden="true"
                                >
                                    {post.title?.[0]?.toUpperCase() || "?"}
                                </div>

                                {/* Title + description */}
                                <div className="flex min-w-0 flex-1 items-baseline gap-3">
                                    <h2 className="flex-shrink-0 font-semibold capitalize text-gray-800 sm:max-w-[12rem] sm:truncate">
                                        {post.title}
                                    </h2>
                                    <p className="hidden min-w-0 flex-1 truncate text-sm text-gray-500 md:block">
                                        {post.description}
                                    </p>
                                </div>

                                {/* Location */}
                                <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1 text-sm capitalize text-gray-600 sm:flex-shrink-0">
                                    <PinIcon />
                                    {post.location}
                                </span>

                                {/* Date */}
                                <span className="inline-flex items-center gap-1.5 whitespace-nowrap text-xs text-gray-400 sm:flex-shrink-0">
                                    <CalendarIcon />
                                    {formatDate(post.created_at)}
                                </span>

                                {/* Budget */}
                                <span
                                    className={`w-fit whitespace-nowrap rounded-full px-3.5 py-1.5 text-sm font-bold sm:flex-shrink-0 ${tint.bg} ${tint.text}`}
                                >
                                    {formatBudget(post.budget)}
                                </span>
                            </article>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default MyPosts;