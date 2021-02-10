import React, { useEffect, useRef, useState } from "react";
import { Chart } from "chart.js";
import "../styles/chart-container.scss";

const ChartContainer = ({ state, rtaData }) => {
  const context = useRef(null);
  const chartRef = useRef(null);
  const [validData, setValidData] = useState();
  let chart;
  // TODO: Handle num battles case

  useEffect(() => {
    const { selectedCat, selectedSubcat } = state;
    if (selectedCat && selectedSubcat) {
      const data = rtaData[selectedCat][selectedSubcat];

      if (data) {
        setValidData({ title: selectedSubcat, data });
      }
    }
  }, [state, rtaData]);

  useEffect(() => {
    if (chartRef.current && validData) {
      console.log("updating chart with: ", validData);
      const labels = [];
      const data = [];

      // Num Battles
      validData.data.forEach((obj) => {
        labels.push(Object.keys(obj)[0]);
        data.push(Object.values(obj)[0]);
      });
      chartRef.current.data.labels = labels;
      chartRef.current.data.datasets[0].data = data;
      chartRef.current.data.datasets[0].label = validData.title;

      // TODO: This needs a more robust solution
      // if (validData.title.match("League")) {
      //   validData.data.forEach((obj) => {
      //     labels.push(obj.league);
      //     data.push(obj.count);
      //   });
      //   chartRef.current.data.labels = labels;
      //   chartRef.current.data.datasets[0].data = data;
      //   chartRef.current.data.datasets[0].label = validData.title;
      // }

      chartRef.current.update({
        duration: 500,
      });
    }
  }, [validData, chart]);

  if (context.current && !chartRef.current) {
    chartRef.current = new Chart(context.current, {
      type: "bar",
      data: {
        labels: [],
        datasets: [
          {
            label: "",
            data: [],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    });
  }

  return (
    <section className="chart-container">
      <canvas ref={context} id="chart" width="400" height="400"></canvas>
    </section>
  );
};

export default ChartContainer;
