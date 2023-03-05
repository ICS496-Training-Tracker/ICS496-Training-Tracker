import React, { useState } from 'react';
import { Button, Col, Container, Row, Table, Form } from 'react-bootstrap';
import { PAGE_IDS } from '../utilities/PageIDs';

const Profiles = () => {

  const [searchVal, setSearchVal] = useState('');

  const searchButton = () => {
    console.log(searchVal);
  };

  const updateButton = () => {
    console.log('Update Button');
  };

  const filterButton = () => {
    console.log('Filter Button');
  };

  const notifyButton = () => {
    console.log('Notify Button');
  };

  const reportsButton = () => {
    console.log('Reports Button');
  };

  return (
    <Container
      id={PAGE_IDS.PROFILES}
      style={
        {
          backgroundColor: '#d9d9d9',
        }
      }
    >
      <Row className="m-3">
        <Col>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              value={searchVal}
              onChange={e => setSearchVal(e.target.value)}
            />
            <Button variant="outline-success" onClick={searchButton}>Search</Button>
          </Form>
        </Col>
        <Col>
          <Button className="mx-2" onClick={updateButton}>Update</Button>
          <Button className="mx-2" onClick={notifyButton}>Notify</Button>
          <Button className="mx-2" onClick={filterButton}>Filter</Button>
          <Button className="mx-2" onClick={reportsButton}>Reports</Button>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>
                <Form className="d-flex">
                  <Form.Check />
                </Form>
              </th>
              <th>Last Name</th>
              <th>First Name</th>
              <th>Rank</th>
              <th>AFSC</th>
              <th>Status (Missing)</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody />
        </Table>
      </Row>
    </Container>
  );
};

export default Profiles;
