// Create Post Form for Admin Dashboard (Styled Like AddProduct)
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ErrorMsg from "../../ErrorMsg/ErrorMsg";
import LoadingComponent from "../../LoadingComp/LoadingComponent";
import SuccessMsg from "../../SuccessMsg/SuccessMsg";
import { createPostAction } from "../../../redux/slices/posts/postSlices";

export default function CreatePost() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    link: "",
    image: null,
  });

  const { title, description, link, image } = formData;
  const { loading, error, isAdded } = useSelector((state) => state?.posts);
  const user = useSelector((state) => state.users.userAuth.userInfo);

  if (!user?.userFound?.isAdmin && !user?.userFound?.isSeller) {
    return (
      <p className="text-center text-red-500 mt-6">
        Access Denied: Only Sellers and Admins can post.
      </p>
    );
  }

  const handleOnChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(createPostAction(formData));
    setFormData({ title: "", description: "", link: "", image: null });
  };

  return (
    <>
      {error && <ErrorMsg message={error?.message} />}
      {isAdded && <SuccessMsg message="Post Created Successfully" />}
      <div className="flex min-h-full flex-col justify-center sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Create Newsfeed Post
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-gray-100 py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleOnSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input
                  name="title"
                  value={title}
                  onChange={handleOnChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  type="text"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  name="description"
                  value={description}
                  onChange={handleOnChange}
                  rows={4}
                  className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Link (optional)</label>
                <input
                  name="link"
                  value={link}
                  onChange={handleOnChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  type="text"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Image</label>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleOnChange}
                  className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                  required
                />
              </div>

              <div>
                {loading ? (
                  <LoadingComponent />
                ) : (
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                    Submit Post
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
