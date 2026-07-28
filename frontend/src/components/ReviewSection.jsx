import { useEffect, useState } from "react";
import axios from "axios";
import { FaStar } from "react-icons/fa";

const ReviewSection = () => {
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    fetchReviews();
  }, []);

 const fetchReviews = async () => {
  try {
    const response = await axios.get("/api/reviews");

    console.log("Review API:", response.data);

    const reviewList = Array.isArray(response.data)
      ? response.data
      : response.data.data || [];

    setReviews(reviewList);

    if (reviewList.length > 0) {
      const total = reviewList.reduce(
        (sum, review) => sum + review.rating,
        0
      );

      setAverageRating((total / reviewList.length).toFixed(1));
    } else {
      setAverageRating(0);
    }
  } catch (err) {
    console.error("Review API Error:", err);
  }
};

  return (
    <section className="max-w-7xl mx-auto py-16 px-6">

      <div className="text-center mb-12">

        <h2 className="text-4xl font-bold">
          ❤️ Loved by Our Customers
        </h2>

        <div className="flex justify-center items-center mt-4 gap-2">

          {[1,2,3,4,5].map((star)=>(
            <FaStar
              key={star}
              className="text-yellow-500 text-xl"
            />
          ))}

        </div>

        <h3 className="text-3xl font-bold mt-3">
          {averageRating} / 5
        </h3>

        <p className="text-gray-500">
          Based on {reviews.length} Reviews
        </p>

      </div>

      <div className="grid md:grid-cols-3 gap-6">

        {reviews.slice(0,6).map((review)=>(

          <div
            key={review._id}
            className="bg-white rounded-xl shadow-lg p-6"
          >

            <div className="flex mb-3">

              {[...Array(review.rating)].map((_,i)=>(
                <FaStar
                  key={i}
                  className="text-yellow-500"
                />
              ))}

            </div>

            <p className="text-gray-700 italic">
              "{review.review}"
            </p>

            <h4 className="font-semibold mt-4">
              {review.name}
            </h4>

          </div>

        ))}

      </div>

    </section>
  );
};

export default ReviewSection;