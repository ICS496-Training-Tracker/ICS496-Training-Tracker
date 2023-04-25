import React, { useState } from "react";
import { useTracker } from "meteor/react-meteor-data";
import {
  Col,
  Container,
  Row,
  Table,
  Dropdown,
  DropdownMenu,
  ButtonGroup,
  SplitButton,
  DropdownButton,
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

  const [currentTraining, setCurrentTraining] = useState("");
  const onClick = (value) => {
    if (value === 1) {
      setCurrentTraining("Individual Training");
    } else if (value === 2) {
      setCurrentTraining("ITRM Training");
    }
  };

  let professions = [
    "Administration",
    "Bioenvironmental Engineer Technician",
    "Medic",
    "Nurse",
    "Physician",
    "Physician Assistant",
  ];

  const [currentProfession, setCurrentProfession] = useState("");
  const onProfessionClick = (value) => {
    switch (value) {
      case 1:
        setCurrentProfession("Nurse");
        break;
    }
  };

  return ready ? (
    <Container>
      <Row style={{ paddingBottom: 30 }} className="justify-content-center">
        <Col xs={2}>
          <Dropdown as={ButtonGroup}>
            <SplitButton
              title={currentTraining === "" ? "Dropdown" : currentTraining}
            >
              <Dropdown.Item onClick={() => onClick(1)} eventKey={1}>
                Individual Training
              </Dropdown.Item>
              <Dropdown.Item onClick={() => onClick(2)} eventKey={2}>
                ITRM Training
              </Dropdown.Item>
            </SplitButton>
          </Dropdown>
        </Col>
        <Col xs={2}>
          {/* List of professions here */}
          <DropdownButton title={currentProfession}>
            {professions.map((prof) => (
              <Dropdown.Item title={prof} onClick={(val) => setCurrentProfession(val.target.title)}>{prof}</Dropdown.Item>
            ))}
          </DropdownButton>
        </Col>
      </Row>
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
                {mrdssItems.map((items) => (
                  <TableMrdssItems key={items._id} items={items} />
                ))}
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
              <tbody>{/* Map Data here */}</tbody>
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
