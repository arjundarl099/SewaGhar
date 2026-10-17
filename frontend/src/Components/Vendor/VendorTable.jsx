import { Eye, Pencil, Trash2 } from 'lucide-react'
import React from 'react'

const VendorTable = ({ vendors, onDelete }) => {
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
                                Vendor
                            </th>

                            <th className="px-6 py-4 font-semibold text-gray-600">
                                Contact
                            </th>

                            <th className="px-6 py-4 font-semibold text-gray-600">
                                Address
                            </th>

                            <th className="px-6 py-4 font-semibold text-gray-600">
                                Service
                            </th>

                            <th className="px-6 py-4 text-center font-semibold text-gray-600">
                                Actions
                            </th>

                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-100">

                        {vendors.length === 0 ? (
                            <tr>
                                <td
                                    colSpan="6"
                                    className="px-6 py-10 text-center text-gray-500"
                                >
                                    No vendors found.
                                </td>
                            </tr>
                        ) : (
                            vendors.map((vendor) => (
                                <tr
                                    key={vendor.id}
                                    className="transition hover:bg-gray-50"
                                >

                                    {/* ID */}
                                    <td className="px-6 py-4">
                                        <span className="font-medium text-gray-500">
                                            #{vendor.id}
                                        </span>
                                    </td>

                                    {/* Vendor */}
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">

                                            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-50 font-semibold text-blue-600">
                                                {vendor.name?.charAt(0).toUpperCase()}
                                            </div>

                                            <div>
                                                <p className="font-semibold text-gray-800">
                                                    {vendor.name}
                                                </p>

                                                <p className="text-xs text-gray-400">
                                                    User ID: #{vendor.user_id}
                                                </p>
                                            </div>

                                        </div>
                                    </td>

                                    {/* Contact */}
                                    <td className="px-6 py-4">
                                        <span className="text-gray-600">
                                            {vendor.number || "N/A"}
                                        </span>
                                    </td>

                                    {/* Address */}
                                    <td className="max-w-[220px] px-6 py-4">
                                        <p
                                            className="truncate text-gray-600"
                                            title={vendor.address}
                                        >
                                            {vendor.address || "N/A"}
                                        </p>
                                    </td>

                                    {/* Service */}
                                    <td className="px-6 py-4">
                                        <span className="rounded-full bg-purple-50 px-3 py-1 text-xs font-medium text-purple-600">
                                            Service #{vendor.service_name}
                                        </span>
                                    </td>


                                    {/* Actions */}
                                    <td className="px-6 py-4">
                                        <div className="flex justify-center gap-2">

                                            <button
                                                title="View vendor"
                                                className="rounded-lg bg-blue-50 p-2 text-blue-600 transition hover:bg-blue-100"
                                            >
                                                <Eye size={17} />
                                            </button>

                                            <button
                                                title="Edit vendor"
                                                className="rounded-lg bg-orange-50 p-2 text-orange-600 transition hover:bg-orange-100"
                                            >
                                                <Pencil size={17} />
                                            </button>

                                            <button
                                                onClick={() => onDelete(vendor)}
                                                title="Delete vendor"
                                                className="rounded-lg bg-red-50 p-2 text-red-600 transition hover:bg-red-100"
                                            >
                                                <Trash2 size={17} />
                                            </button>

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

export default VendorTable