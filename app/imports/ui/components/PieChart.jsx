import React from "react";
import { ResponsivePie } from "@nivo/pie";
import { mockPieData as data } from "../../api/members/MembersData";
import { Table, Container, Row, Col } from "react-bootstrap";

const PieChart = ({ isDashboard = false }) => {
  return (
    <Container style={{ marginTop: 200 }}>
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
                <tr>
                  <td>Air Force Ancillary</td>
                  <td style={{ backgroundColor: "#c73732" }}>23</td>
                  <td style={{ backgroundColor: "#ded362" }}>23</td>
                  <td style={{ backgroundColor: "#7ccf78" }}>23</td>
                </tr>
                <tr>
                  <td>Air Force Ancillary</td>
                  <td style={{ backgroundColor: "#c73732" }}>23</td>
                  <td style={{ backgroundColor: "#ded362" }}>23</td>
                  <td style={{ backgroundColor: "#7ccf78" }}>23</td>
                </tr>
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
                <tr>
                  <td>Air Force Ancillary</td>
                  <td style={{ backgroundColor: "#c73732" }}>23</td>
                  <td style={{ backgroundColor: "#ded362" }}>23</td>
                  <td style={{ backgroundColor: "#7ccf78" }}>23</td>
                </tr>
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
                <tr>
                  <td>Air Force Ancillary</td>
                  <td style={{ backgroundColor: "#c73732" }}>23</td>
                  <td style={{ backgroundColor: "#ded362" }}>23</td>
                  <td style={{ backgroundColor: "#7ccf78" }}>23</td>
                </tr>
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
                <tr>
                  <td>Air Force Ancillary</td>
                  <td style={{ backgroundColor: "#c73732" }}>23</td>
                  <td style={{ backgroundColor: "#ded362" }}>23</td>
                  <td style={{ backgroundColor: "#7ccf78" }}>23</td>
                </tr>
              </tbody>
            </Table>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default PieChart;
