import { Meteor } from 'meteor/meteor';
import { ROLE } from '../../api/role/Role';
import { AdminProfiles } from '../../api/user/AdminProfileCollection';
import { UserProfiles } from '../../api/user/UserProfileCollection';
import { tableCollection } from "../../api/mrdss/TableCollection";

/* eslint-disable no-console */

function createUser(email, role, firstName, lastName, password, unit, rank, afsc, status) {
  console.log(`  Creating user ${email} with role ${role}.`);
  if (role === ROLE.ADMIN) {
    AdminProfiles.define({ email, firstName, lastName, password });
  } else { // everyone else is just a user.
    UserProfiles.define({ email, firstName, lastName, password, role, unit, rank, afsc, status });
  }
}

function createMrdss(trainingType, missing, validating, completed) {
  console.log(`  Creating trainingType ${trainingType} with the following missing: ${missing}.`);
  tableCollection.define({trainingType, missing, validating, completed});
}

// When running app for first time, pass a settings file to set up a default user account.
if (Meteor.users.find().count() === 0) {
  if (Meteor.settings.defaultAccounts) {
    console.log('Creating the default user(s)');
    Meteor.settings.defaultAccounts.map(({ email, password, role, firstName, lastName, unit, rank, afsc, status }) => createUser(email, role, firstName, lastName, password, unit, rank, afsc, status));
  } else {
    console.log('Cannot initialize the database!  Please invoke meteor with a settings file.');
  }
}