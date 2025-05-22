import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { fetchProductAction } from "../../../redux/slices/products/productSlices";
import { StarIcon } from "@heroicons/react/20/solid";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Product() {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { product, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    if (id) dispatch(fetchProductAction(id));
  }, [dispatch, id]);

  if (loading) return <p className="text-center mt-8">Loading product...</p>;
  if (error) return <p className="text-center text-red-500 mt-8">{error.message || "Product not found"}</p>;
  if (!product?.product) return <p className="text-center mt-8">Product not found</p>;

  const item = product.product;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Image Carousel */}
        <div>
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={10}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            className="rounded overflow-hidden"
          >
            {item.images?.map((img, index) => (
              <SwiperSlide key={index}>
                <img
                  src={img}
                  alt={`Product ${index + 1}`}
                  className="w-full h-96 object-cover rounded"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Product Details */}
        <div>
          <h1 className="text-3xl font-bold mb-2">{item.name}</h1>
          <p className="text-gray-600 mb-4">Rs. {item.price}</p>

          {/* Average Rating */}
          <div className="flex items-center mb-4">
            {[0, 1, 2, 3, 4].map((rating) => (
              <StarIcon
                key={rating}
                className={classNames(
                  item.averageRating > rating ? "text-yellow-400" : "text-gray-300",
                  "h-5 w-5"
                )}
                aria-hidden="true"
              />
            ))}
            <p className="ml-2 text-sm text-gray-700">
              {item.averageRating || "No ratings yet"}
            </p>
          </div>

          {/* Description */}
          <p className="text-gray-700 mb-6">{item.description}</p>

          {/* Reviews Info */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-blue-600 mb-1">
              <Link to={`/add-review/${item._id}`}>Leave a review</Link>
            </h3>
            <p className="text-sm text-gray-500">
              {item.totalReviews || 0} reviews
            </p>
          </div>

          {/* Inventory */}
          <p className="text-sm text-green-700">
            Quantity left: {item.quantityleft}
          </p>
        </div>
      </div>

      {/* === Reviews Section === */}
      <div className="mt-10">
        <h2 className="text-xl font-bold mb-4">Customer Reviews</h2>
        {item.reviews && item.reviews.length > 0 ? (
          <ul className="space-y-4">
            {item.reviews.map((review) => (
              <li key={review._id} className="border p-4 rounded-md shadow-sm">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-indigo-600">Rating:</span>
                  <span>{review.rating} ⭐</span>
                </div>
                <p className="text-gray-700">{review.reviewmsg}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No reviews yet. Be the first to review!</p>
        )}
      </div>
    </div>
  );
}
