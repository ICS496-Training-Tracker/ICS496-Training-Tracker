import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Form } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const ProfileListItem = ({ profile, getCheckFunction, masterUncheck, searchTerm }) => {
  const [checked, setChecked] = useState(false);

  const viewHandler = () => {
    setChecked(true);
  };

  // do when checkbox value changes
  const checkHandler = (e) => {
    const isChecked = e.target.checked;
    setChecked(isChecked);
    if (!isChecked) {
      masterUncheck();
    }
  };

  // function sent to parent to toggle checkbox
  const checkToggle = (value) => {
    setChecked(value);
  };

  const prepareString = (str) => {
    if (searchTerm === '' || !searchTerm) {
      return str;
    }
    if (str) {
      const returnArr = [];
      const arr = str.split(searchTerm);
      for (let i = 0; i < arr.length; i++) {
        returnArr.push(arr[i]);
        returnArr.push((<mark key={i} className="mx-0 px-0">{searchTerm}</mark>));
      }
      returnArr.pop();
      return returnArr;
    }
    return '';
  };

  // sends function to toggle checkbox to parent
  getCheckFunction(checkToggle);

  return (
    <tr>
      <td>
        <Form className="d-flex">
          <Form.Check onChange={checkHandler} checked={checked} />
        </Form>
      </td>
      <td>{prepareString(profile.lastName)}</td>
      <td>{prepareString(profile.firstName)}</td>
      <td>{prepareString(profile.email)}</td>
      <td>{prepareString(profile.unit)}</td>
      <td>{prepareString(profile.rank)}</td>
      <td>{prepareString(profile.afsc)}</td>
      <td>{prepareString(`${profile.status}`)}</td>
      <td><Button onClick={viewHandler} as={NavLink} to={`/profile/${profile._id}`}>View</Button></td>
    </tr>
  );
};

ProfileListItem.propTypes = {
  profile: PropTypes.shape({
    email: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    status: PropTypes.number,
    afsc: PropTypes.string,
    rank: PropTypes.string,
    unit: PropTypes.string,
    role: PropTypes.string,
    userID: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
  getCheckFunction: PropTypes.func.isRequired,
  masterUncheck: PropTypes.func.isRequired,
  searchTerm: PropTypes.string.isRequired,
};

export default ProfileListItem;
