import React, { useState } from 'react';
import { Button, Col, Container, Row, Table, Form, Card } from 'react-bootstrap';
import { PAGE_IDS } from '../utilities/PageIDs';
import DragAndDrop from '../components/DragAndDrop';

const Reports = () => {
  const [file, setFile] = useState(null);

  const trainings = () => {
    const list = ['MRDSS', 'ARCNET', 'MyLearning'];
    return (
      <Form.Select aria-label="Select Training">
        {list.map((val) => (<option value={val}>{val}</option>))}
      </Form.Select>
    );
  };

  const handleUpload = (f) => {
    setFile(f);
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
              {trainings()}
            </Container>
          </Row>
          <Row />
          <Row>
            <Card className="file-upload-wrapper">
              {file ? file.name : null}
            </Card>
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
              {trainings()}
            </Container>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Reports;
