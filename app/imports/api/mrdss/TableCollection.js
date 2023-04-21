import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import SimpleSchema from "simpl-schema";
import BaseCollection from "../base/BaseCollection";
import { Roles } from 'meteor/alanning:roles';
import { ROLE } from '../role/Role';


export const tableMrdssPublications = {
  tableMrdssItems: 'TableMrdssPublications'
};


class TableCollection extends BaseCollection {
  constructor() {
    super('TableCollection', new SimpleSchema({
      trainingType: String,
      missing: Number,
      validating: Number,
      completed: Number,
    }));
  }


  define({ trainingType, missing, validating, completed }) {
    const docID = this._collection.insert({ trainingType, missing, validating, completed });
    return docID;
  }


  update(docID, { trainingType, missing, validating, completed }) {
    const updateData = {};
    if (trainingType) {
      updateData.trainingType = trainingType;
    }
    if (missing) {
      updateData.missing = missing;
    }
    if (validating) {
      updateData.validating = validating;
    }
    if (completed) {
      updateData.completed = completed;
    }
    this._collection.update(docID, { $set: updateData });
  }

  publish() {
    if (Meteor.isServer) {
      const instance = this;
      /** This subscription publishes all documents regardless of user, but only if the logged in user is the Admin. */
      Meteor.publish(tableMrdssPublications.tableMrdssItems, function publish() {
        if (this.userId && Roles.userIsInRole(this.userId, ROLE.ADMIN)) {
          return instance._collection.find();
        }
        return this.ready();
      });
    }
  }
  /**
 * Subscription method for admin users.
 * It subscribes to the entire collection.
 */
  subscribeMrdssAdmin() {
    if (Meteor.isClient) {
      return Meteor.subscribe(tableMrdssPublications.tableMrdssItems);
    }
    return null;
  }

  /**
* Default implementation of assertValidRoleForMethod. Asserts that userId is logged in as an Admin or User.
* This is used in the define, update, and removeIt Meteor methods associated with each class.
* @param userId The userId of the logged in user. Can be null or undefined
* @throws { Meteor.Error } If there is no logged in user, or the user is not an Admin or User.
*/
  assertValidRoleForMethod(userId) {
    this.assertRole(userId, [ROLE.ADMIN, ROLE.USER]);
  }

  dumpOne(docID) {
    const doc = this.findDoc(docID);
    const trainingType = doc.trainingType;
    const missing = doc.name;
    const validating = doc.quantity;
    const completed = doc.condition;
    return { trainingType, missing, validating, completed };
  }

}

/**
 * Profides the singleton instance of this class to all other entities.
 * @type {tableCollection}
 */
export const tableCollection = new TableCollection();