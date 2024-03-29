import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { useTracker } from 'meteor/react-meteor-data';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import Landing from '../pages/Landing';
import NotFound from '../pages/NotFound';
import SignUp from '../pages/SignUp';
import SignOut from '../pages/SignOut';
import NavBar from '../components/NavBar';
import SignIn from '../pages/SignIn';
import NotAuthorized from '../pages/NotAuthorized';
import { ROLE } from '../../api/role/Role';
import LoadingSpinner from '../components/LoadingSpinner';
import Profiles from '../pages/Profiles';
import Profile from '../pages/Profile';
import Reports from '../pages/Reports';
import Tables from '../pages/Tables';
import FileDrop from '../pages/FileDrop';

/** Top-level layout component for this application. Called in imports/startup/client/startup.jsx. */
const App = () => {
  const { ready } = useTracker(() => {
    const rdy = Roles.subscription.ready();
    return {
      ready: rdy,
    };
  });

  return ready ? (
    <div className="d-flex flex-column min-vh-100">
      {Meteor.user() ? (
        <div className="app">
          <Router>
            <main className="content">
              <NavBar />
              <Routes>
                <Route exact path="/" element={<Navigate to="/dashboard" />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/signout" element={<SignOut />} />
                <Route
                  path="/dashboard"
                  element={(
                    <ProtectedRoute>
                      <Tables />
                    </ProtectedRoute>
                  )}
                />
                <Route
                  path="/profiles"
                  element={(
                    <ProtectedRoute>
                      <Profiles />
                    </ProtectedRoute>
                  )}
                />
                <Route
                  path="/profile/:userID"
                  element={(
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  )}
                />
                <Route
                  path="/reports"
                  element={(
                    <ProtectedRoute>
                      <Reports />
                    </ProtectedRoute>
                  )}
                /><Route
                  path="/fileDrop"
                  element={(
                    <ProtectedRoute>
                      <FileDrop />
                    </ProtectedRoute>
                  )}
                />
                <Route path="/notauthorized" element={<NotAuthorized />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </Router>
        </div>
      ) : (
        <Router>
          <NavBar />
          <Routes>
            <Route exact path="/" element={<Landing />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signout" element={<SignOut />} />
            <Route
              path="/home"
              element={(
                <ProtectedRoute>
                  <Landing />
                </ProtectedRoute>
              )}
            />
            <Route path="/notauthorized" element={<NotAuthorized />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      )}
    </div>
  ) : null;
};

/*
 * ProtectedRoute (see React Router v6 sample)
 * Checks for Meteor login before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const ProtectedRoute = ({ children }) => {
  const isLogged = Meteor.userId() !== null;
  console.log('ProtectedRoute', isLogged);
  return isLogged ? children : <Navigate to="/signin" />;
};

/**
 * AdminProtectedRoute (see React Router v6 sample)
 * Checks for Meteor login and admin role before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const AdminProtectedRoute = ({ ready, children }) => {
  const isLogged = Meteor.userId() !== null;
  if (!isLogged) {
    return <Navigate to="/signin" />;
  }
  if (!ready) {
    return <LoadingSpinner />;
  }
  const isAdmin = Roles.userIsInRole(Meteor.userId(), [ROLE.ADMIN]);
  console.log('AdminProtectedRoute', isLogged, isAdmin);
  return isLogged && isAdmin ? children : <Navigate to="/notauthorized" />;
};

// Require a component and location to be passed to each ProtectedRoute.
ProtectedRoute.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
};

ProtectedRoute.defaultProps = {
  children: <Landing />,
};

// Require a component and location to be passed to each AdminProtectedRoute.
AdminProtectedRoute.propTypes = {
  ready: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
};

AdminProtectedRoute.defaultProps = {
  ready: false,
  children: <Landing />,
};

export default App;
