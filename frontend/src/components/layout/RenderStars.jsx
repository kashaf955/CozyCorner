import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const RenderStars = ({ rating = 0 }) => {
  const stars = [];
  const value = Number(rating) || 0;

  for (let i = 1; i <= 5; i++) {
    if (value >= i) {
      stars.push(<FaStar key={i} className="text-amber-400" />);
    } else if (value >= i - 0.5) {
      stars.push(<FaStarHalfAlt key={i} className="text-amber-400" />);
    } else {
      stars.push(<FaRegStar key={i} className="text-amber-400/40" />);
    }
  }

  return <>{stars}</>;
};

export default RenderStars;
