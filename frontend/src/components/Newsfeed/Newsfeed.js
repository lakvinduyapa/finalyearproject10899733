import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostsAction, deletePostAction } from "../../redux/slices/posts/postSlices";

export default function Newsfeed() {
  const dispatch = useDispatch();
  const { posts, loading, error } = useSelector((state) => state.posts);
  const user = useSelector((state) => state.users.userAuth.userInfo);

  useEffect(() => {
    dispatch(fetchPostsAction());
  }, [dispatch]);

  const handleDelete = (postId) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      dispatch(deletePostAction(postId));
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold text-center mb-6">Latest Newsfeed Posts</h2>

      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-center text-red-500">{error.message}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {posts?.posts?.map((post) => (
          <div key={post._id} className="bg-white shadow rounded-lg overflow-hidden">
            {post.images && (
              <img
                src={post.images}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
              <p className="text-sm text-gray-600 mb-3">{post.description}</p>
              {post.link && (
                <a
                  href={post.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline text-sm"
                >
                  Read more
                </a>
              )}
              <p className="text-xs text-gray-400 mt-2">
                Posted by: {`${post.user?.firstname || ""} ${post.user?.lastname || ""}`.trim() || "Unknown"}
              </p>

              {/* Delete button for Admin or Owner */}
              {(user?.userFound?.isAdmin || user?.userFound?._id === post.user?._id) && (
                <button
                  onClick={() => handleDelete(post._id)}
                  className="mt-3 text-red-500 text-sm hover:underline"
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
