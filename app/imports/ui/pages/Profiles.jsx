import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Roles } from 'meteor/alanning:roles';
import _ from 'lodash';
import { Button, Col, Container, Row, Table, Form } from 'react-bootstrap';
import ProfileListItem from '../components/ProfileListItem';
import { PAGE_IDS } from '../utilities/PageIDs';
import { UserProfiles } from '../../api/user/UserProfileCollection';
import LoadingSpinner from '../components/LoadingSpinner';
import { ROLE } from '../../api/role/Role';

const Profiles = () => {
  const [searchVal, setSearchVal] = useState('');
  const [checked, setChecked] = useState(false);
  const [sortBy, setSortBy] = useState('lastName');
  const sortSelectedStyle = { backgroundColor: '#bcbcbc' };
  const checkFunctionArray = [];

  const { ready, profiles } = useTracker(() => {
    let subscription;
    if (Roles.userIsInRole(Meteor.userId(), ROLE.ADMIN)) {
      subscription = UserProfiles.subscribeProfilesAdmin();
    } else if (Roles.userIsInRole(Meteor.userId(), ROLE.UNIT_TRAINER)) {
      subscription = UserProfiles.subscribeProfilesTrainer();
    } else if (Roles.userIsInRole(Meteor.userId(), ROLE.UNIT_MEMBER)) {
      subscription = UserProfiles.subscribeProfile();
    }
    const rdy = subscription.ready();
    const profilesList = UserProfiles.find().fetch();
    return {
      profiles: profilesList,
      ready: rdy,
    };
  }, []);
  const filteredList = _.filter(profiles, function (profile) {
    let returnValue = false;
    if (profile.firstName) returnValue ||= profile.firstName.includes(searchVal);
    if (profile.lastName) returnValue ||= profile.lastName.includes(searchVal);
    if (profile.unit) returnValue ||= profile.unit.includes(searchVal);
    if (profile.afsc) returnValue ||= profile.afsc.includes(searchVal);
    if (profile.rank) returnValue ||= profile.rank.includes(searchVal);
    if (profile.email) returnValue ||= profile.email.includes(searchVal);
    if (profile.status) returnValue ||= profile.status.includes(searchVal);
    return returnValue;
  });
  const sortedList = _.sortBy(filteredList, sortBy);

  const searchButton = () => {
    console.log(searchVal);
  };

  const updateButton = () => {
    console.log('Update Button');
  };

  const filterButton = () => {
    console.log('Filter Button');
  };

  const notifyButton = () => {
    console.log('Notify Button');
  };

  const reportsButton = () => {
    console.log('Reports Button');
  };

  // check or uncheck all
  const handleCheck = (e) => {
    const isChecked = e.target.checked;
    setChecked(isChecked);
    for (let i = 0; i < checkFunctionArray.length; i++) {
      checkFunctionArray[i](isChecked);
    }
  };

  // uncheck master checkbox, called when one ProfileListItem is unchecked
  const masterUncheck = () => {
    setChecked(false);
  };

  // pushes function from child to an array
  const getCheckFunction = (f) => {
    checkFunctionArray.push(f);
  };

  const setSortByLastName = () => setSortBy('lastName');
  const setSortByFirstName = () => setSortBy('firstName');
  const setSortByAFSC = () => setSortBy('afsc');
  const setSortByRank = () => setSortBy('rank');
  const setSortByUnit = () => setSortBy('unit');
  const setSortByStatus = () => setSortBy('status');
  const setSortByEmail = () => setSortBy('email');

  return (ready ? (
    <Container
      id={PAGE_IDS.PROFILES}
      style={
        {
          backgroundColor: '#d9d9d9',
        }
      }
    >
      <Row className="m-3 py-2">
        <Col>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              value={searchVal}
              onChange={e => setSearchVal(e.target.value)}
            />
            <Button variant="outline-success" onClick={searchButton}>Search</Button>
          </Form>
        </Col>
        <Col>
          <Button className="mx-2" onClick={updateButton}>Update</Button>
          <Button className="mx-2" onClick={notifyButton}>Notify</Button>
          <Button className="mx-2" onClick={filterButton}>Filter</Button>
          <Button className="mx-2" onClick={reportsButton}>Reports</Button>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>
                <Form className="d-flex">
                  <Form.Check onChange={handleCheck} checked={checked} />
                </Form>
              </th>
              <th
                className="table-header-hover"
                style={(sortBy === 'lastName') ? sortSelectedStyle : {}}
                onClick={setSortByLastName}
              >
                Last Name
              </th>
              <th
                className="table-header-hover"
                style={(sortBy === 'firstName') ? sortSelectedStyle : {}}
                onClick={setSortByFirstName}
              >
                First Name
              </th>
              <th
                className="table-header-hover"
                style={(sortBy === 'email') ? sortSelectedStyle : {}}
                onClick={setSortByEmail}
              >
                Email
              </th>
              <th
                className="table-header-hover"
                style={(sortBy === 'unit') ? sortSelectedStyle : {}}
                onClick={setSortByUnit}
              >
                Unit
              </th>
              <th
                className="table-header-hover"
                style={(sortBy === 'rank') ? sortSelectedStyle : {}}
                onClick={setSortByRank}
              >
                Rank
              </th>
              <th
                className="table-header-hover"
                style={(sortBy === 'afsc') ? sortSelectedStyle : {}}
                onClick={setSortByAFSC}
              >
                AFSC
              </th>
              <th
                className="table-header-hover"
                style={(sortBy === 'status') ? sortSelectedStyle : {}}
                onClick={setSortByStatus}
              >
                Status (Missing)
              </th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {sortedList.map((profile) => (
              <ProfileListItem
                key={profile.userID}
                profile={profile}
                getCheckFunction={getCheckFunction}
                masterUncheck={masterUncheck}
                searchTerm={searchVal}
              />
            ))}
          </tbody>
        </Table>
      </Row>
    </Container>
  ) : <LoadingSpinner message="Loading Stuff" />);
};

export default Profiles;
