
import { useState } from 'react';
import ServicePostTable from '../Components/postService/ServicePostTable'
import { useDeletePostMutation, useGetAllPostsQuery } from '../redux/features/servicePostSlice'
import DeleteModal from '../Components/Modals/DeleteModal';
import { toast } from 'react-toastify';


const ServicePostDashboard = () => {
    const { data, isLoading, error } = useGetAllPostsQuery();
    const [deletePost, { isLoading: deleting, error: deleteError }] = useDeletePostMutation();
    const [postId, setPostId] = useState(null);
    const [title, setTitle] = useState(null);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const handleDeleteClick = (post) => {
        setOpenDeleteModal(true);
        setPostId(post.id);
        setTitle(post.title)
    }

    const handleDeletePost = async () => {
        try {
            const res = await deletePost(postId).unwrap();
            toast.success(res.message);
            setPostId(null);
            setTitle(null);
            setOpenDeleteModal(false);
        }
        catch (err) {
            toast.error(err?.data?.message || 'failed to delete post');
        }
    }


    if (isLoading) {
        return <div className="p-6">Loading service posts...</div>
    }

    if (error) {
        return (
            <div className="p-6 text-red-500">
                Failed to load service posts.
            </div>
        )
    }

    const posts = data?.posts || [];

    return (
        <>
            <div className="p-6">

                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">
                        Service Posts
                    </h1>

                    <p className="text-gray-500 mt-1">
                        Manage all service requests posted by users
                    </p>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">

                    <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                        <h2 className="font-semibold text-gray-700">
                            All Service Posts
                        </h2>

                        <span className="text-sm text-gray-500">
                            {posts.length} Posts
                        </span>
                    </div>
                    <ServicePostTable posts={posts} onDelete={handleDeleteClick} />


                    {posts.length === 0 && (
                        <div className="p-8 text-center text-gray-500">
                            No service posts found.
                        </div>
                    )}

                </div>
            </div>
            <div>
                {
                    openDeleteModal
                    &&
                    <DeleteModal
                        onCancel={() => setOpenDeleteModal(false)}
                        onConfirm={handleDeletePost}
                        itemName={title}
                        type='post'
                        loading={deleting}

                    />
                }
            </div>
        </>
    )
}

export default ServicePostDashboard

