import SimpleSchema from 'simpl-schema';
import BaseProfileCollection from './BaseProfileCollection';
import { ROLE } from '../role/Role';
import { Users } from './UserCollection';
import BaseCollection from "../base/BaseCollection";

class arcnetCollection extends BaseCollection {
  constructor() {
    super('arcnetCollection', new SimpleSchema({}));
  }

  /**
   * Defines the profile associated with an User and the associated Meteor account.
   * @param trainingTitle The title associated with the training.
   * @param trainedDate The date associated with the training.
   * @param trainingCategory the category associated with the training.
   * @param firstName The first name.
   * @param lastName The last name.
   */
  define({ trainingTitle, trainedDate, trainingCategory, dueDate, firstName, lastName }) {
    // if (Meteor.isServer) {
    const user = this.findOne({ trainingTitle, dueDate, firstName, lastName, });
    if (!user) {
      const trainingID = this._collection.insert({ trainingTitle, dueDate, trainedDate, firstName, lastName });
      // this._collection.update(profileID, { $set: { userID } });
      return trainingID;
    }

    return user._id;
    // }
    // return undefined;
  }

  /**
   * Updates the UserProfile. You cannot change the email or role.
   * @param docID the id of the UserProfile
   * @param trainedDate the date of the training completed.
   * @param trainingTitle the title of the training completed
   * @param firstName new first name (optional).
   * @param lastName new last name (optional).
   */
  update(docID, { trainingTitle, dueDate, trainedDate, firstName, lastName }) {
    this.assertDefined(docID);
    const updateData = {};
    if (trainingTitle) {
      updateData.trainingTitle = trainingTitle;
    }
    if (trainedDate) {
      updateData.trainedDate = trainedDate;
    }
    if (dueDate) {
      updateData.dueDate = dueDate;
    }
    if (firstName) {
      updateData.firstName = firstName;
    }
    if (lastName) {
      updateData.lastName = lastName;
    }

    this._collection.update(docID, { $set: updateData });
  }
  
  /**
   * Returns an object representing the UserProfile docID in a format acceptable to define().
   * @param docID The docID of a UserProfile
   * @returns { Object } An object representing the definition of docID.
   */
  dumpOne(docID) {
    const doc = this.findDoc(docID);
    const trainingTitle = doc.trainingTitle;
    const trainedDate = doc.trainedDate;
    const trainingCategory = doc.trainingCategory;
    const firstName = doc.firstName;
    const lastName = doc.lastName;
    return { trainingTitle, trainedDate, firstName, lastName }; // CAM this is not enough for the define method. We lose the password.
  }
}

/**
 * Profides the singleton instance of this class to all other entities.
 * @type {arcnetCollection}
 */
export const mrdssCollection = new arcnetCollection();
