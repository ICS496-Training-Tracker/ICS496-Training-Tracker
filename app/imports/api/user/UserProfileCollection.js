import SimpleSchema from 'simpl-schema';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import BaseProfileCollection, { profilePublications } from './BaseProfileCollection';
import { ROLE } from '../role/Role';
import { Users } from './UserCollection';

class UserProfileCollection extends BaseProfileCollection {
  constructor() {
    super('UserProfile', new SimpleSchema({}));
  }

  /**
   * Defines the profile associated with an User and the associated Meteor account.
   * @param email The email associated with this profile. Will be the username.
   * @param password The password for this user.
   * @param firstName The first name.
   * @param lastName The last name.
   */
  define({ email, firstName, lastName, password, role, unit, rank, afsc, status }) {
    // if (Meteor.isServer) {
    const username = email;
    const user = this.findOne({ email, firstName, lastName });
    if (!user) {
      const userID = Users.define({ username, role, password });
      const profileID = this._collection.insert({ email, firstName, lastName, userID, role, unit, rank, afsc, status });
      // this._collection.update(profileID, { $set: { userID } });
      return profileID;
    }
    return user._id;
    // }
    // return undefined;
  }

  /**
   * Updates the UserProfile. You cannot change the email or role.
   * @param docID the id of the UserProfile
   * @param firstName new first name (optional).
   * @param lastName new last name (optional).
   */
  update(docID, { firstName, lastName, afsc, rank, status, unit }) {
    this.assertDefined(docID);
    const updateData = {};
    if (firstName) {
      updateData.firstName = firstName;
    }
    if (lastName) {
      updateData.lastName = lastName;
    }
    if (unit) {
      updateData.unit = unit;
    }
    if (afsc) {
      updateData.afsc = afsc;
    }
    if (rank) {
      updateData.rank = rank;
    }
    if (status) {
      updateData.status = status;
    }
    this._collection.update(docID, { $set: updateData });
  }

  /**
   * Removes this profile, given its profile ID.
   * Also removes this user from Meteor Accounts.
   * @param profileID The ID for this profile object.
   */
  removeIt(profileID) {
    if (this.isDefined(profileID)) {
      return super.removeIt(profileID);
    }
    return null;
  }

  /**
   * TODO CAM: Update this documentation since we want to be able to sign up new users.
   * Implementation of assertValidRoleForMethod. Asserts that userId is logged in as an Admin or User.
   * This is used in the define, update, and removeIt Meteor methods associated with each class.
   * @throws { Meteor.Error } If there is no logged in user, or the user is not an Admin or User.
   */
  assertValidRoleForMethod() {
    // this.assertRole(userId, [ROLE.ADMIN, ROLE.USER]);
    return true;
  }

  /**
   * Returns an array of strings, each one representing an integrity problem with this collection.
   * Returns an empty array if no problems were found.
   * Checks the profile common fields and the role..
   * @returns {Array} A (possibly empty) array of strings indicating integrity issues.
   */
  checkIntegrity() {
    const problems = [];
    this.find().forEach((doc) => {
      if (doc.role !== ROLE.User) {
        problems.push(`UserProfile instance does not have ROLE.USER: ${doc}`);
      }
    });
    return problems;
  }

  /**
   * Returns an object representing the UserProfile docID in a format acceptable to define().
   * @param docID The docID of a UserProfile
   * @returns { Object } An object representing the definition of docID.
   */
  dumpOne(docID) {
    const doc = this.findDoc(docID);
    const email = doc.email;
    const firstName = doc.firstName;
    const lastName = doc.lastName;
    return { email, firstName, lastName }; // CAM this is not enough for the define method. We lose the password.
  }

  publish() {
    if (Meteor.isServer) {
      // get the StuffCollection instance.
      const instance = this;
      /** This subscription publishes only the profile associated with the logged in user */
      Meteor.publish(profilePublications.profilesMember, function publish() {
        if (this.userId) {
          const userID = this.userId;
          return instance._collection.find({ userID: userID });
        }
        return this.ready();
      });

      /** This subscription publishes only the profiles associated with the members associated with the unit trainer's unit,
       * must be logged in as a UNIT_TRAINER */
      Meteor.publish(profilePublications.profilesTrainer, function publish() {
        if (this.userId && Roles.userIsInRole(this.userId, ROLE.UNIT_TRAINER)) {
          const unit = instance._collection.findOne({ userID: this.userID }).unit;
          return instance._collection.find({ unit: unit });
        }
        return this.ready();
      });

      /** This subscription publishes all profiles regardless of user, but only if the logged in user is the Admin. */
      Meteor.publish(profilePublications.profilesAdmin, function publish() {
        if (this.userId && Roles.userIsInRole(this.userId, ROLE.ADMIN)) {
          return instance._collection.find();
        }
        return this.ready();
      });
    }
  }

  /**
   * Subscription method for profile owned by the current user.
   */
  subscribeProfile() {
    if (Meteor.isClient) {
      return Meteor.subscribe(profilePublications.profilesMember);
    }
    return null;
  }

  /**
   * Subscription method for unit trainers.
   * It subscribes to the entire collection.
   */
  subscribeProfilesTrainer() {
    if (Meteor.isClient) {
      return Meteor.subscribe(profilePublications.profilesTrainer);
    }
    return null;
  }

  /**
   * Subscription method for admin users.
   * It subscribes to the entire collection.
   */
  subscribeProfilesAdmin() {
    if (Meteor.isClient) {
      return Meteor.subscribe(profilePublications.profilesAdmin);
    }
    return null;
  }
}

/**
 * Profides the singleton instance of this class to all other entities.
 * @type {UserProfileCollection}
 */
export const UserProfiles = new UserProfileCollection();
