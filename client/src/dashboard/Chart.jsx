import React, { useMemo } from "react";
import { Chart } from "react-google-charts";
import { useAuth } from "../context/appContext";

function ChartComponent() {
  const { studentList } = useAuth();

  // Prepare chart data
  const chartData = useMemo(() => {
    if (!studentList || studentList.length === 0) return [["Class", "Students"]];

    const classCount = {};

    studentList.forEach((student) => {
      const className = student?.class?.className || "Unknown";
      classCount[className] = (classCount[className] || 0) + 1;
    });

    // Convert to [["Class", "Students"], ["CLASS I", 5], ["CLASS II", 3], ...]
    return [["Class", "Students"], ...Object.entries(classCount)];
  }, [studentList]);

  const options = {
    title: "Students per Class",
    pieHole: 0.3,
    legend: { position: "bottom" },
    chartArea: {
      width: "90%",
      height: "80%",
    },
    colors: ["#734af6", "#f39c12", "#27ae60", "#e74c3c", "#3498db", "#9b59b6"], // optional
  };

  return (
    <div className="w-full flex justify-center">
      <div className="w-[90vw] md:w-[70vw] lg:w-[50vw] xl:w-[40vw] min-h-[400px]">
        <Chart
          chartType="PieChart"
          width="100%"
          height="100%"
          data={chartData}
          options={options}
        />
      </div>
    </div>
  );
}

export default ChartComponent;
