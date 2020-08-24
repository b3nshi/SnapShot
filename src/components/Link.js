import React, { useContext } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { SearchContext } from "../context/SearchContext";

const Link = ({ to, children }) => {
  const history = useHistory();
  const { setSearchEntry } = useContext(SearchContext);
  const onClickLink = (e) => {
    e.preventDefault();
    setSearchEntry("");
    history.push(to);
  };

  return (
    <a href={to} onClick={onClickLink}>
      {children}
    </a>
  );
};

Link.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
};

export default Link;
