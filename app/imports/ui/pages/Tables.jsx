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
import { tableCollection } from "../../api/mrdss/TableCollection";
import LoadingSpinner from "../components/LoadingSpinner";
import { PAGE_IDS } from "../utilities/PageIDs";

const Tables = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, mrdssItems } = useTracker(() => {
    // Get access to Stuff documents.
    const subscription = tableCollection.subscribeMrdssAdmin();
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Stuff documents
    const items = tableCollection.find({}).fetch();
    return {
      mrdssItems: items,
      ready: rdy,
    };
  }, []);

  const [currentVal, setCurrentVal] = useState("");
  const onClick = (value) => {
    if (value === 1) {
      setCurrentVal("Individual Training");
    } else if (value === 2) {
      setCurrentVal("ITRM Training");
    }
  };

  return ready ? (
    <Container id={PAGE_IDS.DASHBOARD} style={{ marginTop: 200 }}>
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
                  <th>Training Type</th>
                  <th>Missing</th>
                  <th>Validating</th>
                  <th>Completed</th>
                </tr>
              </thead>
              <tbody>
                {mrdssItems.map((mrdss) => <TableItems key={mrdss._id} mrdss={mrdss} />)}
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
                  <th>Training Type</th>
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
      <Row>
        <Col>
          <div>
            <h5>MyLearning</h5>
          </div>
          <div>
            <Table
              style={{ marginTop: 10, fontSize: "10px" }}
              size="md"
              striped
            >
              <thead>
                <tr>
                  <th>Training Type</th>
                  <th>Missing</th>
                  <th>Validating</th>
                  <th>Completed</th>
                </tr>
              </thead>
              <tbody>
                {/* Map data here */}
              </tbody>
            </Table>
          </div>
        </Col>
        <Col md={6}>
          <div>
            <h5>MyTraining</h5>
          </div>
          <div>
            <Table
              style={{ marginTop: 10, fontSize: "10px" }}
              size="md"
              striped
            >
              <thead>
                <tr>
                  <th>Training Type</th>
                  <th>Missing</th>
                  <th>Validating</th>
                  <th>Completed</th>
                </tr>
              </thead>
              <tbody>
                {/* Map data here */}
              </tbody>
            </Table>
          </div>
        </Col>
      </Row>
    </Container>
  ) : (
    <LoadingSpinner />
  );
};

export default Tables;
