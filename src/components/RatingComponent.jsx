import React, { useState } from 'react';
import { RiStarFill, RiStarHalfFill, RiStarLine } from 'react-icons/ri';

const RatingComponent = ({ rating = 0, maxStars = 5, size = 16, interactive = false, onChange }) => {
  const [hoverRating, setHoverRating] = useState(0);

  const getStars = () => {
    const stars = [];
    const activeRating = hoverRating || rating;

    for (let i = 1; i <= maxStars; i++) {
      if (activeRating >= i) {
        stars.push(
          <RiStarFill
            key={i}
            className={`cursor-pointer text-amber-400`}
            style={{ fontSize: size }}
            onMouseEnter={interactive ? () => setHoverRating(i) : undefined}
            onMouseLeave={interactive ? () => setHoverRating(0) : undefined}
            onClick={interactive && onChange ? () => onChange(i) : undefined}
          />
        );
      } else if (activeRating >= i - 0.5) {
        stars.push(
          <RiStarHalfFill
            key={i}
            className={`cursor-pointer text-amber-400`}
            style={{ fontSize: size }}
            onMouseEnter={interactive ? () => setHoverRating(i) : undefined}
            onMouseLeave={interactive ? () => setHoverRating(0) : undefined}
            onClick={interactive && onChange ? () => onChange(i) : undefined}
          />
        );
      } else {
        stars.push(
          <RiStarLine
            key={i}
            className={`cursor-pointer text-slate-300 dark:text-slate-600`}
            style={{ fontSize: size }}
            onMouseEnter={interactive ? () => setHoverRating(i) : undefined}
            onMouseLeave={interactive ? () => setHoverRating(0) : undefined}
            onClick={interactive && onChange ? () => onChange(i) : undefined}
          />
        );
      }
    }
    return stars;
  };

  return <div className="flex items-center gap-0.5">{getStars()}</div>;
};

export default RatingComponent;
