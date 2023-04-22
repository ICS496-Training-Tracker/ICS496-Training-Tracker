import React, { useState } from "react";
import { useTracker } from "meteor/react-meteor-data";
import {
  Col,
  Container,
  Row,
  Table,
  Dropdown,
  ButtonGroup,
  SplitButton,
} from "react-bootstrap";
import { MRDSS } from "../../api/mrdss/TableCollection";
import TableMrdssItems from "../components/TableMrdssItems";
import LoadingSpinner from "../components/LoadingSpinner";
import { PAGE_IDS } from "../utilities/PageIDs";
import { Roles } from "meteor/alanning:roles";
import { ROLE } from "../../api/role/Role";

const Tables = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { mrdssItems, ready } = useTracker(() => {
    // Get access to Stuff documents.
    const subscription = MRDSS.subscribeMrdssTable();
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Stuff documents
    const items = MRDSS.find().fetch();
    return {
      ready: rdy,
      mrdssItems: items,
    };
  }, []);

  return (ready ? (
    <Container style={{ marginTop: 200 }}>
      <div style={{ marginLeft: 600, paddingBottom: 50 }}>
        {/* Create a dropdown of trainingTypes */}
        TrainingType
      </div>
      <Row xs={2} md={16} lg={10}>
        <Col>
          <div>
            <h5>MRDSS</h5>
          </div>
          <div className="table-responsive">
            <Table
              style={{ marginTop: 10, fontSize: "10px" }}
              size="md"
              striped
            >
              <thead>
                <tr>
                    <th>Name</th>
                    <th>Missing</th>
                    <th>Validating</th>
                    <th>Completed</th>
                </tr>
              </thead>
              <tbody>
              {mrdssItems.map((items) => <TableMrdssItems key={items._id} items={items} />)}
              </tbody>
            </Table>
          </div>
        </Col>
        <Col>
          <div className="table-responsive">
            <h5>Arcnet</h5>
          </div>
          <div>
            <Table
              style={{ marginTop: 10, fontSize: "10px" }}
              size="md"
              striped
            >
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Missing</th>
                  <th>Validating</th>
                  <th>Completed</th>
                </tr>
              </thead>
              <tbody>
                {/* Map Data here */}
              </tbody>
            </Table>
          </div>
        </Col>
      </Row>
    </Container>
  ) :
    <LoadingSpinner /> );
};

export default Tables;
