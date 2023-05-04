import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import SimpleSchema from 'simpl-schema';
import { Roles } from 'meteor/alanning:roles';
import BaseCollection from '../base/BaseCollection';
import { ROLE } from '../role/Role';

export const mrdssPublications = {
  tableMrdssPublications: 'TableMrdssPublications',
};

class TableCollection extends BaseCollection {
  constructor() {
    super('MRDSS', new SimpleSchema({
      name: String,
      missing: Number,
      validating: Number,
      completed: Number,
    }));
  }

  /**
   * Defines a new Stuff item.
   * @param name the name of the item.
   * @param missing how many.
   * @param validating the owner of the item.
   * @param completed the condition of the item.
   * @return {String} the docID of the new document.
   */
  define({ name, missing, validating, completed }) {
    const docID = this._collection.insert({ name, missing, validating, completed });
    return docID;
  }

  /**
   * Updates the given document.
   * @param docID the id of the document to update.
   * @param name the new name (optional).
   * @param missing the new quantity (optional).
   * @param validating the new condition (optional).
   * @param completed the new condition (optional).
   */

  update(docID, { missing, validating, completed }) {
    const updateData = {};
    if (name) {
      updateData.name = name;
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

  /**
   * A stricter form of remove that throws an error if the document or docID could not be found in this collection.
   * @param { String | Object } type A document or docID in this collection.
   * @returns true
   */
  removeIt(name) {
    const doc = this.findDoc(name);
    check(doc, Object);
    this._collection.remove(doc._id);
    return true;
  }

  publish() {
    if (Meteor.isServer) {
      const instance = this;
      /** This subscription publishes all documents regardless of user, but only if the logged in user is the Admin. */
      Meteor.publish(mrdssPublications.tableMrdssPublications, function publish() {
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
  subscribeMrdssTable() {
    if (Meteor.isClient) {
      return Meteor.subscribe(mrdssPublications.tableMrdssPublications);
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
    this.assertRole(userId, [ROLE.ADMIN]);
  }

  /**
   * Returns an object representing the definition of docID in a format appropriate to the restoreOne or define function.
   * @param docID
   * @return {{ missing: *, validating: *, completed: *, name}}
   */
  dumpOne(docID) {
    const doc = this.findDoc(docID);
    const name = doc.name;
    const missing = doc.missing;
    const validating = doc.validating;
    const completed = doc.completed;
    return { name, missing, validating, completed };
  }

}

/**
 * Profides the singleton instance of this class to all other entities.
 */
export const MRDSS = new TableCollection();
