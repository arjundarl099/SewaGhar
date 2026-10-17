import React from "react";

const CreateVendorModal = ({
    users = [],
    services = [],
    onClose,
    onSubmit,
    isLoading = false,
}) => {
    const [formData, setFormData] = React.useState({
        name: "",
        address: "",
        number: "",
        user_id: "",
        service_id: "",
    });

    const [error, setError] = React.useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (
            !formData.name.trim() ||
            !formData.address.trim() ||
            !formData.number.trim() ||
            !formData.user_id ||
            !formData.service_id
        ) {
            setError("Please fill in all fields.");
            return;
        }

        try {
            await onSubmit({
                name: formData.name.trim(),
                address: formData.address.trim(),
                number: formData.number.trim(),
                user_id: Number(formData.user_id),
                service_id: Number(formData.service_id),
            });

            onClose();
        } catch (err) {
            setError(
                err?.data?.message ||
                err?.message ||
                "Unable to create vendor."
            );
        }
    };

    return (

        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
            onClick={onClose}
        >
            <div
                className="w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-xl bg-white shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
                    <div>
                        <h2 className="text-lg font-semibold text-gray-900">
                            Create Vendor
                        </h2>
                        <p className="mt-1 text-sm text-gray-500">
                            Enter vendor details below.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-md px-3 py-1 text-xl text-gray-500 hover:bg-gray-100"
                    >
                        &times;
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4 p-5">

                    {/* Vendor Name */}
                    <div className="grid grid-cols-[120px_minmax(0,1fr)] items-center gap-3">
                        <label className="text-sm font-medium text-gray-700">
                            Vendor Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter vendor name"
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-[#E0912B] focus:ring-1 focus:ring-[#E0912B]"
                        />
                    </div>

                    {/* Address */}
                    <div className="grid grid-cols-[120px_minmax(0,1fr)] items-center gap-3">
                        <label className="text-sm font-medium text-gray-700">
                            Address
                        </label>
                        <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            placeholder="Enter address"
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-[#E0912B] focus:ring-1 focus:ring-[#E0912B]"
                        />
                    </div>

                    {/* Phone */}
                    <div className="grid grid-cols-[120px_minmax(0,1fr)] items-center gap-3">
                        <label className="text-sm font-medium text-gray-700">
                            Phone Number
                        </label>
                        <input
                            type="tel"
                            name="number"
                            value={formData.number}
                            onChange={handleChange}
                            placeholder="Enter phone number"
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-[#E0912B] focus:ring-1 focus:ring-[#E0912B]"
                        />
                    </div>

                    {/* User */}
                    <div className="grid grid-cols-[120px_minmax(0,1fr)] items-center gap-3">
                        <label className="text-sm font-medium text-gray-700">
                            Select User
                        </label>
                        <select
                            name="user_id"
                            value={formData.user_id}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-[#E0912B] focus:ring-1 focus:ring-[#E0912B]"
                        >
                            <option value="">Choose a user</option>
                            {users.map((user) => (
                                <option key={user.id} value={user.id}>
                                    {user.username || user.name || user.email}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Service */}
                    <div className="grid grid-cols-[120px_minmax(0,1fr)] items-center gap-3">
                        <label className="text-sm font-medium text-gray-700">
                            Select Service
                        </label>
                        <select
                            name="service_id"
                            value={formData.service_id}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-[#E0912B] focus:ring-1 focus:ring-[#E0912B]"
                        >
                            <option value="">Choose a service</option>
                            {services.map((service) => (
                                <option key={service.id} value={service.id}>
                                    {service.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Error */}
                    {error && (
                        <p className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
                            {error}
                        </p>
                    )}

                    {/* Buttons */}
                    <div className="flex justify-end gap-3 border-t border-gray-100 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="rounded-lg bg-[#1F3A3D] px-5 py-2 text-sm font-medium text-white hover:bg-[#14282B] disabled:opacity-60"
                        >
                            {isLoading ? "Creating..." : "Create Vendor"}
                        </button>
                    </div>
                </form>
            </div>
        </div>

    );
};

export default CreateVendorModal;
