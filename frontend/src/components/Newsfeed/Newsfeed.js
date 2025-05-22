import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostsAction, deletePostAction } from "../../redux/slices/posts/postSlices";
import { useTranslation } from "react-i18next";

export default function Newsfeed() {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const isTamil = i18n.language === "ta";
  const fontSizeClass = isTamil ? "text-sm" : "text-base";

  const { posts, loading, error } = useSelector((state) => state.posts);
  const user = useSelector((state) => state.users.userAuth.userInfo);

  const [sortOrder, setSortOrder] = useState("newest");

  useEffect(() => {
    dispatch(fetchPostsAction());
  }, [dispatch]);

  const handleDelete = (postId) => {
    if (window.confirm(t("confirm_delete"))) {
      dispatch(deletePostAction(postId));
    }
  };

  const sortedPosts = [...(posts?.posts || [])]?.sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
    return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
  });

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className={`text-2xl font-bold ${fontSizeClass}`}>
          {t("latest_posts")}
        </h2>
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="border border-gray-300 px-3 py-1 rounded text-sm"
        >
          <option value="newest">{t("sort_newest")}</option>
          <option value="oldest">{t("sort_oldest")}</option>
        </select>
      </div>

      {loading && <p className="text-center">{t("loading")}</p>}
      {error && <p className="text-center text-red-500">{error.message}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {sortedPosts.map((post) => (
          <div key={post._id} className="bg-white shadow rounded-lg overflow-hidden">
            {post.images && (
              <img
                src={post.images}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4">
              <h3 className={`text-lg font-semibold mb-2 ${fontSizeClass}`}>{post.title}</h3>
              <p className={`text-gray-600 mb-3 ${fontSizeClass}`}>{post.description}</p>
              {post.link && (
                <a
                  href={post.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline text-sm"
                >
                  {t("read_more")}
                </a>
              )}

              <p className="text-xs text-gray-500 mt-2 pb-2">
                {t("posted_by")}: {`${post.user?.firstname || ""} ${post.user?.lastname || ""}`.trim() || t("unknown")}
              </p>
              <p className="text-xs text-gray-400">
                {t("date")}: {new Date(post.createdAt).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </p>

              {(user?.userFound?.isAdmin || user?.userFound?._id === post.user?._id) && (
                <button
                  onClick={() => handleDelete(post._id)}
                  className="mt-3 text-red-500 text-sm hover:underline"
                >
                  {t("delete")}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
