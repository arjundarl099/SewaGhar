import { useState } from "react";
import { useDeleteUserMutation, useGetAllUsersQuery, useGetMeQuery } from "../redux/features/userSlice";
import DeleteModal from "../Components/Modals/DeleteModal";
import { toast } from "react-toastify";
import UserTable from "../Components/User/UserTable";

const Userdashboard = () => {
    const { data, isLoading, error } = useGetAllUsersQuery();
    const { data: getMeData } = useGetMeQuery();
    const [deleteUser, { isLoading: isDeleting, error: deleteEror }] = useDeleteUserMutation();
    const [name, setName] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);
    const [deleteModal, setDeleteModal] = useState(false);
    const handleDeleteClick = (user) => {
        setName(user.username);
        setSelectedUser(user.id);
        setDeleteModal(true);
    };
    const currentUser = getMeData?.loggedUserInfo;


    const handleRemove = async () => {
        try {
            const res = await deleteUser(selectedUser).unwrap();
            toast.success(res.message);
            setDeleteModal(false);
            setName(null);
            setSelectedUser(null);
        }
        catch (err) {
            toast.error(err?.data?.message || 'failed to delete ')
        }



    }

    if (isLoading) {
        return (
            <div className="flex min-h-[400px] items-center justify-center">
                <p className="text-gray-500">Loading users...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="rounded-xl bg-red-50 p-6  text-red-600">
                Failed to load users.
            </div>
        );
    }

    const users = data?.users || [];

    return (
        <>
            <div className="p-6 ">

                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="mb-6 ">
                        <h1 className="text-2xl font-bold text-gray-800">
                            Users
                        </h1>

                        <p className="mt-1 text-sm text-gray-500">
                            Manage all registered users
                        </p>
                    </div>

                    <div className="rounded-lg bg-gray-50 px-4 py-2">
                        <p className="text-xs text-gray-500">
                            Total users
                        </p>

                        <p className="text-lg font-semibold text-gray-800">
                            {data?.count || 0}
                        </p>
                    </div>
                </div>
            </div>
            <UserTable
                users={users}
                onDelete={handleDeleteClick}
                currentUserId={currentUser?.id}
            />

            <div>
                {
                    deleteModal
                    &&
                    <DeleteModal
                        itemName={name}
                        onCancel={(e) => setDeleteModal(false)}
                        onConfirm={handleRemove}
                        loading={isDeleting} />
                }
            </div>
        </>

    );
};

export default Userdashboard;