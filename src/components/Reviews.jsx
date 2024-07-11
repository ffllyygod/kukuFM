/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import axios from "axios";
import StarRating from "./StarRating";

const Reviews = ({ reviews, id, setFlag, flag, watched, setWatched }) => {
  const [rating, setRating] = useState(0);
  const [newReview, setNewReview] = useState({
    id,
    review: {
      review: "",
      userRating: rating,
    },
  });
  const isWatched = watched.map((book) => book._id).includes(id);
  const base_URL = 'https://kukufm-41dv.onrender.com';
  // const base_URL = 'http://127.0.0.1:8080'
  // const watchedUserRating = watched.find(
  //   (book) => book._id === id
  // )?.userRating;

  const asyncFn = async function () {
    const res = await fetch(`${base_URL}/book/${id}`);
    if (!res.ok) throw new Error("Something went wrong!!");
    const data = await res.json();
    if (data.Response === "False") throw new Error("Movie not found");
    setWatched((watched) => [
      ...watched,
      { ...data, userRating: rating },
    ]);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewReview({
      ...newReview,
      review: { [name]: value, userRating: rating },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${base_URL}/book/review`, newReview);
      await asyncFn();
      setRating(0);
      setNewReview({
        id,
        review: {
          review: "",
          userRating: rating,
        },
      });
      setFlag(!flag);
    } catch (error) {
      console.error("Error posting review:", error);
    }
  };

  return (
    <div className="reviews">
      <h3>Reviews</h3>
      <ul>
        {reviews?.map((review, index) => (
          <li key={index} className="review-item">
            <p className="review-user">User</p>
            <p className="review-text">{review?.review}</p>
            <p className="review-rating">
              {Array.from({ length: review.userRating }, (_, i) => (
                <span key={i} className="star">
                  ⭐
                </span>
              ))}
            </p>
          </li>
        ))}
      </ul>
      {isWatched ? (
        <p className="rating">
          Thank you for rating us, The book has been added to your list
        </p>
      ) : (
        <form className="review-form rating" onSubmit={handleSubmit}>
          <textarea
            name="review"
            placeholder="Write your review"
            value={newReview.review.review}
            onChange={handleChange}
          ></textarea>
          <div>
            <>
              <StarRating
                newReview={newReview}
                setNewReview={setNewReview}
                onSetRating={setRating}
              />
            </>
          </div>

          <button type="submit">Submit Review</button>
        </form>
      )}
    </div>
  );
};

export default Reviews;
