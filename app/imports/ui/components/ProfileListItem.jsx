import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Form } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const ProfileListItem = ({ profile, getCheckFunction, masterUncheck }) => {
  const [checked, setChecked] = useState(false);

  const viewHandler = () => {
    console.log(`view ${profile.userID}`);
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

  // sends function to toggle checkbox to parent
  getCheckFunction(checkToggle);

  return (
    <tr>
      <td>
        <Form className="d-flex">
          <Form.Check onChange={checkHandler} checked={checked} />
        </Form>
      </td>
      <td>{profile.lastName}</td>
      <td>{profile.firstName}</td>
      <td>{profile.rank}</td>
      <td>{profile.afsc}</td>
      <td>{profile.status}</td>
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
};

export default ProfileListItem;
