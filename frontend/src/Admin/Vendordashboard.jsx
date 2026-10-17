
import { useState } from "react";

import {
    useDeleteVendorMutation,
    useGetAllVendorQuery,
} from "../redux/features/vendorSlice";

import {
    useGetAllUsersQuery,
    useUpdateUserMutation,
} from "../redux/features/userSlice";

import {
    useGetAllServicesQuery,
} from "../redux/features/serviceSlice";

import { toast } from "react-toastify";

import DeleteModal from "../Components/Modals/DeleteModal";
import CreateVendorModal from "../Components/Modals/AddVendorModal";
import VendorTable from "../Components/Vendor/VendorTable";
import { useCreateVendorMutation } from "../redux/features/vendorServices";

const Vendordashboard = () => {

    // Fetch vendors
    const {
        data,
        isLoading,
        error,
    } = useGetAllVendorQuery();

    const [updateUser] = useUpdateUserMutation();

    // Fetch users and services for dropdowns
    const {
        data: usersData,
    } = useGetAllUsersQuery();

    const {
        data: servicesData,
    } = useGetAllServicesQuery();

    // Create vendor mutation
    const [
        createVendor,
        { isLoading: creating },
    ] = useCreateVendorMutation();

    // Delete modal state
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedVendor, setSelectedVendor] = useState(null);
    const [vendorName, setVendorName] = useState(null);

    // Create vendor modal state
    const [openAddVendorModal, setOpenAddVendorModal] = useState(false);

    // Delete vendor mutation
    const [
        deleteVendor,
        { isLoading: deleting },
    ] = useDeleteVendorMutation();

    // Extract data
    const vendors = data?.vendors || [];
    const users = usersData?.users || [];
    const services = servicesData?.services || [];

    // Open delete modal
    const handleVendorDelete = (vendor) => {
        setSelectedVendor(vendor.id);
        setVendorName(vendor.name);
        setShowDeleteModal(true);
    };

    // Delete vendor
    const removeVendor = async () => {
        try {
            const res = await deleteVendor(selectedVendor).unwrap();

            toast.success(
                res?.message || "Vendor deleted successfully"
            );

            setShowDeleteModal(false);
            setSelectedVendor(null);
            setVendorName(null);
        } catch (err) {
            toast.error(
                err?.data?.message || "Unable to delete vendor"
            );
        }
    };

    // Create vendor
    const handleCreateVendor = async (vendorData) => {
        console.log("Vendor data:", vendorData);
        console.log("Selected user ID:", vendorData.user_id);
        try {
            const res = await createVendor(vendorData).unwrap();
            const userRes = await updateUser({
                id: vendorData.user_id,
                role: "vendor",
            }).unwrap();

            console.log("User role update response:", userRes);

            toast.success(
                res?.message || "Vendor created successfully"
            );

            setOpenAddVendorModal(false);
        
        } catch (err) {
            console.error("Vendor creation/update error:", err);
            console.error("Backend response:", err?.data);

            toast.error(
                err?.data?.message || "Unable to complete the operation"
            );

            throw err;
        }
    
};
const availableUsers = users.filter(
    (user) => user.role?.toLowerCase() === "user"
);

// Loading state
if (isLoading) {
    return (
        <div className="flex min-h-[400px] items-center justify-center">
            <p className="text-gray-500">
                Loading vendors...
            </p>
        </div>
    );
}

// Error state
if (error) {
    return (
        <div className="m-6 rounded-xl bg-red-50 p-6 text-red-600">
            Failed to load vendors.
        </div>
    );
}

return (
    <>
        <div className="p-6">

            {/* Header */}
            <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

                {/* Title and Description */}
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">
                        Vendors
                    </h1>

                    <p className="mt-1 text-sm text-gray-500">
                        Manage all registered service vendors
                    </p>
                </div>

                {/* Total Vendors */}
                <div className="rounded-xl border border-gray-200 bg-white px-6 py-3 shadow-sm">
                    <p className="text-xs font-medium text-gray-500">
                        Total Vendors
                    </p>

                    <p className="mt-1 text-xl font-bold text-gray-800">
                        {data?.count || 0}
                    </p>
                </div>

                {/* Add Vendor Button */}
                <button
                    type="button"
                    onClick={() => setOpenAddVendorModal(true)}
                    className="whitespace-nowrap rounded-xl bg-[#14282B] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#1D3A3E] focus:outline-none focus:ring-2 focus:ring-[#14282B] focus:ring-offset-2"
                >
                    + Add Vendor
                </button>

            </div>

            {/* Vendor Table */}
            <VendorTable
                vendors={vendors}
                onDelete={handleVendorDelete}
            />

        </div>

        {/* Delete Confirmation Modal */}
        {showDeleteModal && (
            <DeleteModal
                onCancel={() => {
                    setShowDeleteModal(false);
                    setSelectedVendor(null);
                    setVendorName(null);
                }}
                onConfirm={removeVendor}
                itemName={vendorName}
                loading={deleting}
                type="vendor"
            />
        )}

        {/* Create Vendor Modal */}
        {openAddVendorModal && (
            <CreateVendorModal
                users={availableUsers}
                services={services}
                onClose={() => setOpenAddVendorModal(false)}
                onSubmit={handleCreateVendor}
                isLoading={creating}
            />
        )}
    </>
);
};

export default Vendordashboard;
