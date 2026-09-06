import React from "react";
import RenderStars from "./RenderStars.jsx";

const ReviewCard = ({ review }) => {
  return (
    <div className="flex flex-col gap-4 bg-white p-4 rounded-md shadow-md">
      <div className="flex items-center gap-2">
        <p>{review.name}</p>
        <RenderStars rating={review.rating} />
      </div>
      <p>{review.comment}</p>
      <p>{review.createdAt.toLocaleDateString()}</p>
    </div>
  );
};

export default ReviewCard;