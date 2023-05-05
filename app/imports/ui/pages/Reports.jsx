import React, { useState } from 'react';
import { Button, Col, Container, Row, Form, Table } from 'react-bootstrap';
import * as XLSX from 'xlsx';
import { PAGE_IDS } from '../utilities/PageIDs';
import DragAndDrop from '../components/DragAndDrop';

const Reports = () => {
  const trainings = ['MRDSS', 'ARCNET', 'MyLearning'];
  let upload = trainings[0];
  let download = trainings[0];
  const [data, setData] = useState(null);

  const changeUpload = (e) => {
    upload = e.target.value;
  };

  const changeDownload = (e) => {
    download = e.target.value;
  };

  // able to handle both .xlsx and .csv
  const handleUpload = (f) => {
    console.log(`Uploading ${f.name} with value of ${upload}`);
    const reader = new FileReader();
    reader.onload = (evt) => {
      // get file in bytes
      const bitStr = evt.target.result;
      // read out first worksheet
      const wb = XLSX.read(bitStr, { type: 'binary' });
      const wsName = wb.SheetNames[0];
      // get first worksheet
      const ws = wb.Sheets[wsName];
      const jsonData = XLSX.utils.sheet_to_json(ws, { raw: false });
      setData(jsonData);
    };
    reader.readAsBinaryString(f);
  };

  const handleDownload = () => {
    console.log(`download with value of ${download}`);
  };

  // temporary function to help showcase .csv and .xlsx data parsing
  const temp = () => {
    if (!data) {
      return null;
    }
    const retArr = [];
    const keys = Object.keys(data[0]);
    let tempRows = [];
    for (let j = 0; j < keys.length; j++) {
      tempRows.push((<th key={`${keys[j]}Header`}>{keys[j]}</th>));
    }
    retArr.push((<thead key="tempHead"><tr>{tempRows}</tr></thead>));
    tempRows = [];
    for (let i = 0; i < data.length; i++) {
      const tempRow = [];
      for (let j = 0; j < keys.length; j++) {
        tempRow.push((<td key={keys[j]}>{data[i][keys[j]]}</td>));
      }
      tempRows.push((<tr key={i}>{tempRow}</tr>));
    }
    retArr.push((<tbody key="tempBody">{tempRows}</tbody>));
    return (<Table>{retArr}</Table>);
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
            <DragAndDrop width="100%" height="200px" onUpload={handleUpload} accept=".xlsx, .csv" />
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
      <Row>
        {temp()}
      </Row>
    </Container>
  );
};

export default Reports;
