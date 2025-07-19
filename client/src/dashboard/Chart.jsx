import React from "react";
import { Chart } from "react-google-charts";

function ChartComponent() {
  const data = [
    ["Age Group", "Weight"],
    ["4 years", 16],
    ["8 years", 25],
    ["12 years", 40],
    ["16 years", 55],
    ["20 years", 70],
  ];

  const options = {
    title: "Average Weight by Age",
    pieHole: 0.3,
    legend: { position: "bottom" },
    chartArea: {
      width: "100%",
      height: "80%",
    },
  };

  return (
    <div className="w-full flex justify-center">
      <div className="w-[90vw] md:w-[70vw] lg:w-[50vw] xl:w-[40vw] min-h-[400px]">
        <Chart
          chartType="PieChart"
          width="100%"
          height="100%"
          data={data}
          options={options}
        />
      </div>
    </div>
  );
}

export default ChartComponent;
