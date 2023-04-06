import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import swal from 'sweetalert';
import { Card, Col, Container, Row, Button } from 'react-bootstrap';
import { AutoForm, ErrorsField, SubmitField, TextField } from 'uniforms-bootstrap5';
import { useTracker } from 'meteor/react-meteor-data';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { useParams } from 'react-router-dom';
import { updateMethod } from '../../api/base/BaseCollection.methods';
import LoadingSpinner from '../components/LoadingSpinner';
import { PAGE_IDS } from '../utilities/PageIDs';
import { ROLE } from '../../api/role/Role';
import { UserProfiles } from '../../api/user/UserProfileCollection';

const bridge = new SimpleSchema2Bridge(UserProfiles._schema);

const Profile = () => {
  const { userID } = useParams();
  const [viewOnly, setViewOnly] = useState(true);
  const { ready, doc } = useTracker(() => {
    let subscription;
    if (Roles.userIsInRole(Meteor.userId(), ROLE.ADMIN)) {
      subscription = UserProfiles.subscribeProfilesAdmin();
    } else if (Roles.userIsInRole(Meteor.userId(), ROLE.UNIT_TRAINER)) {
      subscription = UserProfiles.subscribeProfilesTrainer();
    } else if (Roles.userIsInRole(Meteor.userId(), ROLE.UNIT_MEMBER)) {
      subscription = UserProfiles.subscribeProfile();
    }
    const rdy = subscription.ready();
    const profile = UserProfiles.findDoc(userID);
    return {
      doc: profile,
      ready: rdy,
    };
  }, []);

  // On successful submit, insert the data.
  const submit = (data) => {
    const { firstName, lastName, email, afsc, rank, unit } = data;
    const collectionName = UserProfiles.getCollectionName();
    const updateData = { id: doc._id, firstName, lastName, email, afsc, rank, unit };
    updateMethod.callPromise({ collectionName, updateData })
      .catch(error => swal('Error', error.message, 'error'))
      .then(() => {
        swal('Success', 'Item updated successfully', 'success');
        setViewOnly(true);
      });
  };

  const editMode = () => {
    setViewOnly(false);
  };

  return ready ? (
    <Container id={PAGE_IDS.PROFILE} className="py-3">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center"><h2>Profile</h2></Col>
          <AutoForm schema={bridge} onSubmit={data => submit(data)} model={doc}>
            <Card>
              <Card.Body>
                <TextField name="email" disabled />
                <TextField name="role" disabled />
                <TextField name="firstName" disabled={viewOnly} />
                <TextField name="lastName" disabled={viewOnly} />
                <TextField name="afsc" disabled={viewOnly} />
                <TextField name="rank" disabled={viewOnly} />
                <TextField name="unit" disabled={viewOnly} />
                {viewOnly ? (<Button onClick={editMode}>Edit</Button>) : (<SubmitField value="Submit" />)}
                <ErrorsField />
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />;
};

export default Profile;
