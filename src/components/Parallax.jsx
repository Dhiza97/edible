import React from "react";
import PropTypes from "prop-types";

const Parallax = ({ image, text, textStyle }) => {
  return (
    <div
      className="parallax"
      style={{
        backgroundImage: `url(${image})`,
      }}
    >
      <p className={textStyle}>{text}</p>
    </div>
  );
};

Parallax.propTypes = {
  image: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  textStyle: PropTypes.string,
};

export default Parallax;
