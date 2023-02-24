import React from "react";
import { ResponsivePie } from "@nivo/pie";
import { mockPieData as data } from "../../api/members/MembersData";

const PieChart = ({ isDashboard = false }) => {
  return (
    <ResponsivePie
      data={data}
      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      colors={["#c73732", "#ded362", "#7ccf78" ]}
      borderWidth={1}
      borderColor={{
        from: "color",
        modifiers: [["darker", 0.2]],
      }}
      arcLabelsSkipAngle={1}
      arcLabelsTextColor={{
        from: "color",
        modifiers: [["darker", 2]],
      }}
      enableArcLinkLabels={false}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          size: 2,
          padding: 20,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          rotation: -45,
          lineWidth: 0,
          spacing: 20,
        },
      ]}
      fill={[
        {
          match: {
            id: "miss",
          },
          id: "dots",
        },
        {
          match: {
            id: "validate",
          },
          id: "dots",
        },
        {
          match: {
            id: "complete",
          },
          id: "dots",
        },
        {
          match: {
            id: "python",
          },
          id: "dots",
        },
        {
          match: {
            id: "scala",
          },
          id: "lines",
        },
        {
          match: {
            id: "lisp",
          },
          id: "lines",
        },
        {
          match: {
            id: "elixir",
          },
          id: "lines",
        },
        {
          match: {
            id: "javascript",
          },
          id: "lines",
        },
      ]}
      legends={[
        {
          anchor: "bottom",
          direction: "row",
          justify: false,
          translateX: 0,
          translateY: 70,
          itemsSpacing: 100,
          itemWidth: 50,
          itemHeight: 20,
          itemTextColor: "#999",
          itemDirection: "left-to-right",
          itemOpacity: 1,
          symbolSize: 16,
          symbolShape: "circle",
          effects: [
            {
              on: "hover",
              style: {
                itemTextColor: "#000",
              },
            },
          ],
        },
      ]}
    />
  );
};

export default PieChart;
