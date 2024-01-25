/* eslint-disable react/jsx-key */
import { useState } from "react";
import PropTypes from "prop-types";

const containerStyle = {
  display: "flex",
  alignItems: "center",
  padding: "2px",
};

const starContainerStyle = {
  display: "flex",
  gap: "6px",
};

StarRating.propTypes = {
  maxRating: PropTypes.number,
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
  messages: PropTypes.array,
  defaultRating: PropTypes.number,
  onSetRating: PropTypes.func,
};

export default function StarRating({
  maxRating = 10,
  color = "#1C2D36",
  size = 28,
  className = "",
  defaultRating = 0,
  onSetRating,
}) {
  const [rating, setRating] = useState(defaultRating);
  const [tempRating, setTempRating] = useState(0);

  function handleRating(rating) {
    setRating(rating);
    onSetRating(rating);
  }

  const textStyle = {
    color,
    fontSize: `${size / 1.5}px`,
    lineHeight: "1",
    margin: "0",
  };

  return (
    <div style={containerStyle} className={className}>
      <div style={starContainerStyle}>
        {Array.from({ length: maxRating }, (_, i) => (
          <span>
            <Star
              key={i}
              onRate={() => handleRating(i + 1)}
              onHoverIn={() => setTempRating(i + 1)}
              onHoverOut={() => setTempRating(0)}
              full={tempRating ? tempRating >= i + 1 : rating >= i + 1}
              color={color}
              size={size}
            />
          </span>
        ))}
      </div>
      <p style={textStyle}></p>
    </div>
  );
}

function Star({ onRate, full, onHoverIn, onHoverOut, color, size }) {
  const starStyle = {
    width: `${size}px`,
    height: `${size}px`,
    display: "block",
    cursor: "pointer",
  };

  return (
    <span
      role="button"
      style={starStyle}
      onClick={onRate}
      onMouseEnter={onHoverIn}
      onMouseLeave={onHoverOut}
    >
      {full ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill={color}
          stroke={color}
        >
          <path d="M9.93573 0.956291C10.0891 0.503524 10.7295 0.503524 10.8829 0.956291L12.5937 6.00666C12.8 6.61562 13.3715 7.02538 14.0144 7.02538H19.4592C19.9486 7.02538 20.1466 7.6558 19.7451 7.93561L15.4129 10.9545C14.8651 11.3363 14.6356 12.0341 14.8498 12.6665L16.5213 17.6007C16.6761 18.0577 16.1578 18.4472 15.7619 18.1713L11.2669 15.039C10.7515 14.6798 10.067 14.6798 9.55169 15.039L5.05668 18.1713C4.6608 18.4472 4.14244 18.0577 4.29725 17.6007L5.96877 12.6665C6.183 12.0341 5.95346 11.3363 5.40568 10.9545L1.07347 7.9356C0.671948 7.6558 0.869937 7.02538 1.35934 7.02538H6.80416C7.44712 7.02538 8.01857 6.61562 8.22486 6.00666L9.93573 0.956291Z" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke={color}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="{2}"
            d="M10.2444 1.0969C10.4744 0.417749 11.435 0.417749 11.665 1.0969L13.6702 7.01602C13.7734 7.3205 14.0591 7.52538 14.3806 7.52538H20.8007C21.5348 7.52538 21.8318 8.47101 21.2295 8.89071L16.0901 12.4722C15.8162 12.663 15.7014 13.0119 15.8085 13.3281L17.7842 19.1601C18.0164 19.8457 17.2388 20.4299 16.645 20.0161L11.3835 16.3496C11.1258 16.17 10.7836 16.17 10.5259 16.3496L5.26438 20.0161C4.67056 20.4299 3.89301 19.8457 4.12523 19.1601L6.10089 13.3281C6.208 13.0119 6.09324 12.663 5.81934 12.4722L0.679924 8.89071C0.0776414 8.47101 0.374627 7.52538 1.10872 7.52538H7.52884C7.85032 7.52538 8.13604 7.3205 8.23919 7.01602L10.2444 1.0969Z"
          />
        </svg>
      )}
    </span>
  );
}
