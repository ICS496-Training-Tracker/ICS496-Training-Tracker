import { Meteor } from 'meteor/meteor';
import { MRDSS } from '../../api/table/TableCollection';
/* eslint-disable no-console */

// Initialize the database with a default data document.
function addMRDSS(data) {
  console.log(`  Adding: ${data.trainingTitle} (${data.missing}) (${data.validating}) (${data.completed}) (${data.owner})`);
  MRDSS.define(data);
}

if (MRDSS.count() === 0) {
  if (Meteor.settings.defaultData) {
    console.log('Creating default training type mrdss data.');
    Meteor.settings.defaultData.map(data => addMRDSS(data));
  }
}
