import React from "react";
import { Box } from "@mui/material";
import PieChart from "../components/PieChart";
import { blue } from "@mui/material/colors";

const BarChartBox = () => {
  return (
    <Box sx={{
        m: '20px', ml: 175, width: 550}}>
        
        <Box height="75vh">
            <PieChart />
        </Box>
    </Box>
  );
};

export default BarChartBox;
