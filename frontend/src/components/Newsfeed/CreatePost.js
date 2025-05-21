import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPostAction } from "../../redux/slices/posts/postSlices";

export default function CreatePost() {
  const dispatch = useDispatch();
  const [form, setForm] = useState({ title: "", description: "", link: "", image: null });
  const { loading, error, isAdded } = useSelector((state) => state.posts);
  const user = useSelector((state) => state.users.userAuth.userInfo);

  if (!user?.userFound?.isAdmin && !user?.userFound?.isSeller) {
    return <p className="text-center text-red-500 mt-6">Access Denied: Only Sellers and Admins can post.</p>;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFile = (e) => {
    setForm((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createPostAction(form));
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Create Newsfeed Post</h2>
      {error && <p className="text-red-500 text-sm mb-2">{error.message}</p>}
      {isAdded && <p className="text-green-600 mb-2">Post added successfully!</p>}
      <form onSubmit={handleSubmit}>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          className="w-full border p-2 rounded mb-3"
          placeholder="Title"
          required
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          className="w-full border p-2 rounded mb-3"
          placeholder="Description"
          rows={4}
          required
        />
        <input
          name="link"
          value={form.link}
          onChange={handleChange}
          className="w-full border p-2 rounded mb-3"
          placeholder="Link (optional)"
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleFile}
          className="mb-4"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Posting..." : "Post"}
        </button>
      </form>
    </div>
  );
}