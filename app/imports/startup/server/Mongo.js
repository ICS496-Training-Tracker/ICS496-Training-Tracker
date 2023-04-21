import { Meteor } from 'meteor/meteor';
import { tableCollection } from "../../api/mrdss/TableCollection";
/* eslint-disable no-console */

// Initialize the database with a default data document.
function addData(data) {
  console.log(`  Adding: ${data.trainingType} (${data.missing}) (${data.validating}) (${data.completed})`);
  tableCollection.define(data);
}

if(tableCollection.count() === 0) {
  if (Meteor.settings.defaultMrdssItems) {
    console.log('Creating default table mrdss data.');
    Meteor.settings.defaultMrdssItems.map(data => addData(data));
  }
}
