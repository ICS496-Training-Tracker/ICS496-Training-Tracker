import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { Button, Form } from 'react-bootstrap';

const ProfileListItem = ({ profile, checked }) => {
  const [isChecked, setIsChecked] = useState(checked);

  const viewHandler = () => {
    console.log(`view ${profile.userID}`);
  };

  const checkHandler = (e) => {
    console.log(e.target.checked);
  };

  return (
    <tr>
      <td>
        <Form className="d-flex">
          <Form.Check onChange={checkHandler} defaultChecked={isChecked} />
        </Form>
      </td>
      <td>{profile.lastName}</td>
      <td>{profile.firstName}</td>
      <td>{profile.rank}</td>
      <td>{profile.afsc}</td>
      <td>{profile.status}</td>
      <td><Button onClick={viewHandler}>View</Button></td>
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
  }).isRequired,
  checked: PropTypes.bool.isRequired,
};

export default ProfileListItem;
