import React from 'react';
import { Col, Container, Row, Form } from 'react-bootstrap';
import { PAGE_IDS } from '../utilities/PageIDs';
import DragAndDrop from '../components/DragAndDrop';

const FileDrop = () => {
  const certificate = ['MRDSS', 'ARCNET', 'MyLearning'];
  let upload = certificate[0];

  const changeUpload = (e) => {
    upload = e.target.value;
  };

  const handleUpload = (f) => {
    console.log(`Uploading ${f.name} with value of ${upload}`);
  };

  return (
    <Container id={PAGE_IDS.REPORTS}>
      <Row>
        <Col>
          <Row>
            <h3 className="text-center">Upload Certificates</h3>
          </Row>
          <Row>
            <Container className="my-5 px-5">
              <h5 className="text-center">Training Type</h5>
              <Form.Select aria-label="Select Training" onChange={changeUpload}>
                {certificate.map((val) => (<option key={val} value={val}>{val}</option>))}
              </Form.Select>
            </Container>
          </Row>
          <Row />
          <Row>
            <DragAndDrop width="100%" height="200px" onUpload={handleUpload} />
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default FileDrop;
