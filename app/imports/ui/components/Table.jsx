import React from "react";
import { ResponsivePie } from "@nivo/pie";
import { mockPieData as data } from "../../api/members/MembersData";

const PieChart = ({ isDashboard = false }) => {
  return (
    <Container style={{ marginTop: 200 }}>
      <div style={{marginLeft: 600, paddingBottom: 50}}>
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
  );
};

export default PieChart;
