import React from "react";
import PropTypes from "prop-types";

/** Renders a single row in the List Stuff (Admin) table. See pages/ListStuffAdmin.jsx. */
const TableMrdssItems = ({ items }) => (
  <tr>
    <td >{items.name}</td>
    <td style={{ backgroundColor: "#c73732" }}>{items.missing}</td>
    <td style={{ backgroundColor: "#ded362" }}>{items.validating}</td>
    <td style={{ backgroundColor: "#7ccf78" }}>{items.completed}</td>
  </tr>
);

// Require a document to be passed to this component.
TableMrdssItems.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string,
    missing: PropTypes.number,
    validating: PropTypes.number,
    completed: PropTypes.number,
    _id: PropTypes.string,
  }).isRequired,
};

export default TableMrdssItems;
