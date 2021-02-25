import React, { useEffect, useRef, useState } from "react";
// import { BarChart, ColumnChart } from "@toast-ui/chart";
import { BarChart, PieChart, TreemapChart } from "@toast-ui/react-chart";
import "../styles/chart-container.scss";
import { PIE_CHART, SINGLE_DATA, TREEMAP_CHART } from "../util/miscUtil";

const ChartContainer = ({ state }) => {
  const [barchartCharacterList, setBarchartCharacterList] = useState([]);
  const [barchartSeriesCounts, setBarchartSeriesCounts] = useState([]);
  // TODO: Use resize event listener to resize chart probably

  useEffect(() => {
    if (Object.keys(state.rtaData).length && state.selection) {
      const { cat, subcat } = state.selection;

      const data = state.rtaData[cat][subcat];
      switch (state.dataType) {
        case SINGLE_DATA:
          const characters = [];
          const counts = [];
          let totalCount = 0; // Using reduce is better, except the unknown variable

          // TODO: Filter out anything less than 1%
          data.forEach((val) => {
            const { count, preban, postban, pick, firstPick } = val;

            // TODO: Find a more elegant way to check
            if (preban) {
              characters.push(preban);
            } else if (postban) {
              characters.push(postban);
            } else if (pick) {
              characters.push(pick);
            } else if (firstPick) {
              characters.push(firstPick);
            }
            counts.push(count);
            totalCount += count;
          });

          // As percentage
          // TODO: Option between percentage and number?
          const percentage = counts.map(
            (count) => Math.round(((100 * count) / totalCount) * 100) / 100
          );

          setBarchartCharacterList(characters);
          setBarchartSeriesCounts(percentage);
          break;
        default:
          // TODO: this lol
          // console.log(state.dataType);
          break;
      }
    }
  }, [state.rtaData, state.selection]);

  const barchartData = {
    categories: barchartCharacterList,
    series: [
      {
        name: "",
        data: barchartSeriesCounts,
      },
    ],
  };

  const treemapDataArr = barchartCharacterList.map((char, idx) => ({
    label: char,
    data: barchartSeriesCounts[idx],
  }));

  const treemapchartData = {
    series: treemapDataArr,
  };

  const pieDataArr = barchartCharacterList.map((char, idx) => ({
    name: char,
    data: barchartSeriesCounts[idx],
  }));

  const piechartData = {
    series: pieDataArr,
  };

  const genericOptions = {
    chart: { height: 1000, width: 1000 },
    series: {
      dataLabels: {
        visible: true,
      },
    },
    xAxis: {
      label: {
        formatter: (val) => `${val}%`,
      },
    },
    theme: {
      series: {
        hover: {
          // color: "#FF0000",
          borderWidth: 0,
        },
      },
    },
    tooltip: {
      // TODO: Use template to formate %?
    },
    exportMenu: {
      visible: true,
    },
    legend: {
      visible: false,
    },
  };

  const pieOptions = Object.assign({}, genericOptions, {
    series: {
      dataLabels: {
        visible: true,
        anchor: "outer",
        pieSeriesName: {
          visible: true,
          anchor: "outer",
        },
      },
    },
  });

  const barChart = Object.keys(barchartSeriesCounts).length ? (
    <BarChart data={barchartData} options={genericOptions} />
  ) : undefined;

  const treemapChart = Object.keys(barchartSeriesCounts).length ? (
    <TreemapChart data={treemapchartData} options={genericOptions} />
  ) : undefined;

  const pieChart = Object.keys(barchartSeriesCounts).length ? (
    <PieChart data={piechartData} options={pieOptions} />
  ) : undefined;

  let chart;

  switch (state.chartType) {
    case PIE_CHART:
      chart = pieChart;
      break;
    case TREEMAP_CHART:
      chart = treemapChart;
      break;
    default:
      chart = barChart;
      break;
  }

  return (
    <section className="chart">
      {chart}
      {/* {barChart}
      {pieChart}
      {treemapChart} */}
    </section>
  );
};

export default ChartContainer;
