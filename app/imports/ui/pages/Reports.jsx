import React from 'react';
import { Button, Col, Container, Row, Form } from 'react-bootstrap';
import { PAGE_IDS } from '../utilities/PageIDs';
import DragAndDrop from '../components/DragAndDrop';

const Reports = () => {
  const trainings = ['MRDSS', 'ARCNET', 'MyLearning'];
  let upload = trainings[0];
  let download = trainings[0];

  const changeUpload = (e) => {
    upload = e.target.value;
  };

  const changeDownload = (e) => {
    download = e.target.value;
  };

  const handleUpload = (f) => {
    console.log(`Uploading ${f.name} with value of ${upload}`);
  };

  const handleDownload = () => {
    console.log(`download with value of ${download}`);
  };

  return (
    <Container id={PAGE_IDS.REPORTS}>
      <Row>
        <Col className="border-end px-5">
          <Row>
            <h3 className="text-center">IMPORT EXCEL TO WEBSITE</h3>
          </Row>
          <Row>
            <Container className="my-5 px-5">
              <h5 className="text-center">Training Type</h5>
              <Form.Select aria-label="Select Training" onChange={changeUpload}>
                {trainings.map((val) => (<option key={val} value={val}>{val}</option>))}
              </Form.Select>
            </Container>
          </Row>
          <Row />
          <Row>
            <DragAndDrop width="100%" height="200px" onUpload={handleUpload} />
          </Row>
        </Col>
        <Col className="border-start px-5">
          <Row>
            <h3 className="text-center">EXPORT DATA TO EXCEL</h3>
          </Row>
          <Row>
            <Container className="my-5 px-5">
              <h5 className="text-center">Training Type</h5>
              <Form.Select aria-label="Select Training" onChange={changeDownload}>
                {trainings.map((val) => (<option key={val} value={val}>{val}</option>))}
              </Form.Select>
            </Container>
            <Button variant="light" onClick={handleDownload}>Click to Download</Button>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Reports;
