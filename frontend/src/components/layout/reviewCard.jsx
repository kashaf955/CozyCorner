import RenderStars from "./RenderStars.jsx";

const ReviewCard = ({ review }) => {
  const avatarUrl =
    review.avatar?.url ||
    review.avatar ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(review.name || "User")}&background=3d6b54&color=fff`;

  const dateLabel = review.createdAt
    ? new Date(review.createdAt).toLocaleDateString()
    : null;

  return (
    <div className="flex flex-col gap-3 rounded-md border border-white/10 bg-[#15201c] p-4 text-mist">
      <div className="flex items-center gap-3">
        <img
          src={avatarUrl}
          alt={review.name}
          className="h-10 w-10 rounded-full object-cover"
        />
        <div className="flex flex-col gap-1">
          <p className="font-medium text-mist">{review.name}</p>
          <div className="flex items-center gap-1 text-sm">
            <RenderStars rating={review.rating} />
          </div>
        </div>
      </div>
      <p className="text-mist-70">{review.comment}</p>
      {dateLabel && <p className="text-xs text-mist-70">{dateLabel}</p>}
    </div>
  );
};

export default ReviewCard;
