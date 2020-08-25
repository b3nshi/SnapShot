import React from "react";
import PropTypes from "prop-types";

import styles from "./Image.module.css";

const Image = ({ url, title, onClick, $hover }) => {
  return (
    <li
      className={$hover ? styles.imageHover : styles.image}
      onClick={onClick(url)}
    >
      <img src={url} alt={title} />
    </li>
  );
};

Image.propTypes = {
  url: PropTypes.string.isRequired,
  title: PropTypes.string,
  onClick: PropTypes.func,
};

export default Image;
