import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { NavLink } from 'react-router-dom';
import { Roles } from 'meteor/alanning:roles';
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { BoxArrowRight, PersonFill, PersonPlusFill } from 'react-bootstrap-icons';
import { ROLE } from '../../api/role/Role';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';

const NavBar = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { currentUser } = useTracker(() => ({
    currentUser: Meteor.user() ? Meteor.user().username : '',
  }), []);
  const menuStyle = { marginBottom: '10px' };

  const getLinks = () => {
    if (Roles.userIsInRole(Meteor.userId(), [ROLE.ADMIN])) {
      return (
        [
          <Nav.Link id={COMPONENT_IDS.NAVBAR_DASHBOARD} as={NavLink} to="/dashboard" key="dash">Dashboard</Nav.Link>,
          <Nav.Link id={COMPONENT_IDS.NAVBAR_PROFILES} as={NavLink} to="/profiles" key="profile">Admin</Nav.Link>,
          <Nav.Link id={COMPONENT_IDS.NAVBAR_REPORTS} as={NavLink} to="/reports" key="report">Reports</Nav.Link>,
        ]
      );
    } if (Roles.userIsInRole(Meteor.userId(), [ROLE.UNIT_TRAINER])) {
      return (
        [
          <Nav.Link id={COMPONENT_IDS.NAVBAR_DASHBOARD} as={NavLink} to="/dashboard" key="dash">Dashboard</Nav.Link>,
          <Nav.Link id={COMPONENT_IDS.NAVBAR_PROFILES} as={NavLink} to="/profiles" key="profile">Profiles</Nav.Link>,
          <Nav.Link id={COMPONENT_IDS.NAVBAR_REPORTS} as={NavLink} to="/reports" key="report">Reports</Nav.Link>,
        ]
      );
    } if (Roles.userIsInRole(Meteor.userId(), [ROLE.UNIT_MEMBER])) {
      return (
        [
          <Nav.Link id={COMPONENT_IDS.NAVBAR_DASHBOARD} as={NavLink} to="/dashboard" key="dash">Dashboard</Nav.Link>,
          <Nav.Link id={COMPONENT_IDS.NAVBAR_PROFILES} as={NavLink} to="/profiles" key="profile">Profile</Nav.Link>,
        ]
      );
    }
    return null;

  };

  return (
    <Navbar expand="lg" style={menuStyle}>
      <Container>
        <Navbar.Brand id={COMPONENT_IDS.NAVBAR_LANDING_PAGE} as={NavLink} to="/"><h1>Training Tracker</h1></Navbar.Brand>
        <Navbar.Toggle aria-controls={COMPONENT_IDS.NAVBAR_COLLAPSE} />
        <Navbar.Collapse id={COMPONENT_IDS.NAVBAR_COLLAPSE}>
          <Nav className="me-auto justify-content-start">
            {getLinks()}
          </Nav>
          <Nav className="justify-content-end">
            {currentUser === '' ? (
              <NavDropdown id={COMPONENT_IDS.NAVBAR_LOGIN_DROPDOWN} title="Login">
                <NavDropdown.Item id={COMPONENT_IDS.NAVBAR_LOGIN_DROPDOWN_SIGN_IN} as={NavLink} to="/signin"><PersonFill />Sign in</NavDropdown.Item>
                <NavDropdown.Item id={COMPONENT_IDS.NAVBAR_LOGIN_DROPDOWN_SIGN_UP} as={NavLink} to="/signup"><PersonPlusFill />Sign up</NavDropdown.Item>
              </NavDropdown>
            ) : (
              <NavDropdown id={COMPONENT_IDS.NAVBAR_CURRENT_USER} title={currentUser}>
                <NavDropdown.Item id={COMPONENT_IDS.NAVBAR_SIGN_OUT} as={NavLink} to="/signout"><BoxArrowRight /> Sign out</NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
