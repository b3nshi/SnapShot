import React from "react";
import PropTypes from "prop-types";

import styles from "./Popup.module.css";

const Popup = ({ url, onClose }) =>
  url ? (
    <div className={styles.popup}>
      <div className={styles.popupContent}>
        <button className={styles.popupClose} onClick={onClose}>
          Close
        </button>
        <img src={url} alt={url} />
      </div>
    </div>
  ) : null;

Popup.propTypes = {
  url: PropTypes.string,
  onClose: PropTypes.func,
};

export default Popup;
