import React from "react";
import { ResponsivePie } from "@nivo/pie";
import { mockPieData as data } from "../../api/members/MembersData";
import { Table } from "react-bootstrap";

const PieChart = ({ isDashboard = false }) => {
  return (
    <Table style={{ marginTop: 50 }} striped>
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
  );
};

export default PieChart;
