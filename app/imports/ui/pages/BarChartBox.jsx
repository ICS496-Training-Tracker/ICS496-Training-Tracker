import React from "react";
import { Box } from "@mui/material";
import PieChart from "../components/PieChart";
import { Col, Container, Row } from "react-bootstrap";

const BarChartBox = () => {
  return (
    <Container fluid="md ">
      <Row style={{ marginTop: "10vh",marginLeft: "35vh", height: 3000 }}>
        <Col style={{height: 600 }}>
          <PieChart />
        </Col>
      </Row>
    </Container>
  );
};

export default BarChartBox;
