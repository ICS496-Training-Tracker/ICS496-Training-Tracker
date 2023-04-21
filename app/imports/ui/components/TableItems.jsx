import React from 'react';
import PropTypes from 'prop-types';

const TableItems = ({ items }) => (
    <tr>
        <td>{items.trainingType}</td>
        <td>{items.missing}</td>
        <td>{items.validating}</td>
        <td>{items.completed}</td>
    </tr>
);

TableItems.propTypes = {
    items: PropTypes.shape({
        trainingType: PropTypes.string,
        missing: PropTypes.number,
        validating: PropTypes.number,
        completed: PropTypes.number,
        _id: PropTypes.string,
    }).isRequired,
};

export default TableItems;