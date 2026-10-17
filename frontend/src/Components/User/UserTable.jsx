import { Eye, Pencil, Trash2 } from 'lucide-react'
import React from 'react'

const UserTable = ({ users, onDelete, currentUserId }) => {
    return (

        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">

            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">

                    <thead className="border-b border-gray-200 bg-gray-50">
                        <tr>
                            <th className="px-6 py-4 font-semibold text-gray-600">
                                ID
                            </th>

                            <th className="px-6 py-4 font-semibold text-gray-600">
                                Username
                            </th>

                            <th className="px-6 py-4 font-semibold text-gray-600">
                                Email
                            </th>

                            <th className="px-6 py-4 font-semibold text-gray-600">
                                Role
                            </th>

                            <th className="px-6 py-4 font-semibold text-gray-600">
                                Phone
                            </th>

                            <th className="px-6 py-4 font-semibold text-gray-600">
                                Address
                            </th>

                            <th className="px-6 py-4 text-center font-semibold text-gray-600">
                                Actions
                            </th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-100">

                        {users.length === 0 ? (
                            <tr>
                                <td
                                    colSpan="7"
                                    className="px-6 py-10 text-center text-gray-500"
                                >
                                    No users found.
                                </td>
                            </tr>
                        ) : (
                            users.map((user) => (
                                <tr
                                    key={user.id}
                                    className="transition hover:bg-gray-50"
                                >

                                    <td className="px-6 py-4 font-medium text-gray-700">
                                        #{user.id}
                                    </td>

                                    <td className="px-6 py-4 font-medium text-gray-800">
                                        {user.username}
                                    </td>

                                    <td className="px-6 py-4 text-gray-600">
                                        {user.email}
                                    </td>

                                    <td className="px-6 py-4">
                                        <span
                                            className={`rounded-full px-3 py-1 text-xs font-medium ${user.role === "admin"
                                                ? "bg-purple-100 text-purple-700"
                                                : user.role === "vendor"
                                                    ? "bg-blue-100 text-blue-700"
                                                    : "bg-green-100 text-green-700"
                                                }`}
                                        >
                                            {user.role}
                                        </span>
                                    </td>

                                    <td className="px-6 py-4 text-gray-600">
                                        {user.phone || "N/A"}
                                    </td>

                                    <td className="max-w-[180px] truncate px-6 py-4 text-gray-600">
                                        {user.address || "N/A"}
                                    </td>

                                    {/* Actions */}
                                    <td className="px-6 py-4">
                                        <div className="flex  gap-2">

                                            <button
                                                title="View user"
                                                className="rounded-lg bg-blue-50 p-2 text-blue-600 transition hover:bg-blue-100"
                                            >
                                                <Eye size={17} />
                                            </button>
 
                                            <button
                                                title="Edit user"
                                                className="rounded-lg bg-orange-50 p-2 text-orange-600 transition hover:bg-orange-100"
                                            >
                                                <Pencil size={17} />
                                            </button>

                                            {/* Hide Delete Button for Logged-in User */}
                                            {user.id !== currentUserId && (
                                                <button
                                                    onClick={() => onDelete(user)}
                                                    title="Delete user"
                                                    className="rounded-lg bg-red-50 p-2 text-red-600 transition hover:bg-red-100"
                                                >
                                                    <Trash2 size={17} />
                                                </button>
                                            )}

                                        </div>
                                    </td>



                                </tr>
                            ))
                        )}

                    </tbody>

                </table>
            </div>

        </div>



    )
}

export default UserTable