import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button, Card, Col, Container, Image, Row } from 'react-bootstrap';
import { PAGE_IDS } from '../utilities/PageIDs';

/* A simple static component to render some text for the landing page. */
const Landing = () => (
  <Container
    id={PAGE_IDS.LANDING}
    className="py-3"
    style={
      {
        backgroundColor: '#d9d9d9',
        borderRadius: '10px',
      }
    }
  >
    <Row className="align-middle text-center">
      <Col>
        <Image src="/images/Logo4.png" width="150px" />
        <h1>Training Tracker</h1>
      </Col>

      <Col className="d-flex flex-column justify-content-center">
        <Card className="mx-5">
          <Card.Header>
            <h3>Getting Started</h3>
          </Card.Header>
          <Card.Body>
            <p>
              Track your own stats or manage your unit stats by signing in
            </p>
            <Button as={NavLink} to="/signin">
              Sign In
            </Button>
          </Card.Body>
        </Card>
      </Col>

    </Row>
  </Container>
);

export default Landing;
