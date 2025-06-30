import React from "react";
import { Chart } from "react-google-charts";

function ChartComponent(props) {
  return (
    <Chart
      chartType="PieChart"
      width="50vw" 
      height="80vh" 
      data={[
        ["Age Group", "Weight"],
        ["4 years", 16],
        ["8 years", 25],
        ["12 years", 40],
        ["16 years", 55],
        ["20 years", 70],
      ]}
      options={{
        title: "Average Weight by Age",
      }}
      legendToggle
    />
  );
}

export default ChartComponent;
