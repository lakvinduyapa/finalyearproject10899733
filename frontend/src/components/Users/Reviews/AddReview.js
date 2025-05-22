import { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { createReviewAction } from "../../../redux/slices/products/productSlices";
import { useTranslation } from "react-i18next";

export default function AddReview() {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const isTamil = i18n.language === "ta";
  const fontSize = isTamil ? "text-base" : "text-sm";

  const [formData, setFormData] = useState({
    rating: "",
    reviewmsg: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(createReviewAction({ productId: id, reviewData: formData }))
      .unwrap()
      .then(() => {
        setSuccessMessage(t("review_success"));
        setErrorMessage("");
        setTimeout(() => {
          navigate(`/products/${id}`);
        }, 2000);
      })
      .catch((err) => {
        setErrorMessage(t("review_error") + ": " + err);
        setSuccessMessage("");
      });
  };

  return (
    <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          {t("add_review")}
        </h2>
        <p className={`mt-2 text-center ${fontSize} text-gray-600`}>
          <span className="font-medium text-indigo-600">{t("reviewing")}:</span>{" "}
          <span className="text-gray-900">Product ID {id}</span>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {successMessage && (
            <div className="mb-4 text-green-600 font-semibold text-center bg-green-100 border border-green-300 p-2 rounded">
              {successMessage}
            </div>
          )}
          {errorMessage && (
            <div className="mb-4 text-red-600 font-semibold text-center bg-red-100 border border-red-300 p-2 rounded">
              {errorMessage}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleOnSubmit}>
            <div>
              <label htmlFor="rating" className="block text-sm font-medium text-gray-700">
                {t("rating")}
              </label>
              <select
                value={formData.rating}
                onChange={handleOnChange}
                name="rating"
                className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 border-2 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              >
                <option value="">{t("select_rating")}</option>
                {[1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5].map((rate) => (
                  <option key={rate} value={rate}>{rate}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="reviewmsg" className="block text-sm font-medium text-gray-700">
                {t("message")}
              </label>
              <textarea
                rows={4}
                name="reviewmsg"
                value={formData.reviewmsg}
                onChange={handleOnChange}
                className="block w-full rounded-md p-2 border-gray-300 border shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:ring-indigo-500">
                {t("submit_review")}
              </button>
            </div>

            <div>
              <button
                type="button"
                onClick={() => navigate(`/products/${id}`)}
                className="flex w-full justify-center rounded-md bg-red-600 py-2 px-4 text-sm font-medium text-white hover:bg-red-700 focus:ring-red-500">
                {t("cancel")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
