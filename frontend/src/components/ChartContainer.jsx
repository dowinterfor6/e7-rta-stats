import React, { useEffect, useState } from "react";
import { BarChart, PieChart, TreemapChart } from "@toast-ui/react-chart";
import {
  formatServerName,
  MULTI_SELECT,
  OBJ_MULTI_SELECT,
  PIE_CHART,
  SINGLE_DATA,
  TREEMAP_CHART,
} from "../util/miscUtil";

const ChartContainer = ({ state }) => {
  const [barchartCharacterList, setBarchartCharacterList] = useState([]);
  const [barchartSeriesCounts, setBarchartSeriesCounts] = useState([]);
  // TODO: Use resize event listener to resize chart probably

  useEffect(() => {
    if (Object.keys(state.rtaData).length && state.selection) {
      const { cat, subcat } = state.selection;

      const data = state.rtaData[cat][subcat];

      // TODO: This needs major refactoring
      switch (state.dataType) {
        case SINGLE_DATA:
          const characters = [];
          const counts = [];
          let totalCount = 0; // Using reduce is better, except the unknown variable

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
          const percentages = counts.map(
            (count) => Math.round(((100 * count) / totalCount) * 100) / 100
          );

          const threshold = 1;
          let thresholdIdx = percentages.length;

          for (let i = 0; i < percentages.length; i++) {
            if (percentages[i] < threshold) {
              thresholdIdx = i;
              break;
            }
          }

          const otherCount = percentages
            .slice(thresholdIdx)
            .reduce((acc, curr) => (acc += curr), 0);

          setBarchartCharacterList([
            ...characters.slice(0, thresholdIdx),
            `< ${threshold}%`,
          ]);
          setBarchartSeriesCounts([
            ...percentages.slice(0, thresholdIdx),
            Math.round(100 * otherCount) / 100,
          ]);
          break;
        case MULTI_SELECT:
          const regionOrLeagues = [];
          const playerCounts = [];
          let totalPlayerCount = 0; // Using reduce is better, except the unknown variable

          const sortedData = subcat.match("Region")
            ? data.sort((a, b) => b.count - a.count)
            : data;

          sortedData.forEach((val) => {
            const { count, server, league } = val;

            // TODO: Find a more elegant way to check
            if (server) {
              regionOrLeagues.push(formatServerName(server));
            } else if (league) {
              regionOrLeagues.push(
                `${league[0].toUpperCase()}${league.slice(1)}`
              );
            }
            playerCounts.push(count);
            totalPlayerCount += count;
          });

          // As percentage
          // TODO: Option between percentage and number?
          const playerPercentages = playerCounts.map(
            (count) =>
              Math.round(((100 * count) / totalPlayerCount) * 100) / 100
          );

          setBarchartCharacterList(regionOrLeagues);
          setBarchartSeriesCounts(playerPercentages);
          break;
        case OBJ_MULTI_SELECT:
          const multiCharacters = [];
          const multiCounts = [];
          let multiTotalCount = 0; // Using reduce is better, except the unknown variable

          data[state.filter].forEach((val) => {
            const { count, preban, postban, pick, firstPick } = val;

            // TODO: Find a more elegant way to check
            if (preban) {
              multiCharacters.push(preban);
            } else if (postban) {
              multiCharacters.push(postban);
            } else if (pick) {
              multiCharacters.push(pick);
            } else if (firstPick) {
              multiCharacters.push(firstPick);
            }
            multiCounts.push(count);
            multiTotalCount += count;
          });

          // As percentage
          // TODO: Option between percentage and number?
          const multiPercentages = multiCounts.map(
            (count) => Math.round(((100 * count) / multiTotalCount) * 100) / 100
          );

          const multiThreshold = 1;
          let multiThresholdIdx = multiPercentages.length;

          for (let i = 0; i < multiPercentages.length; i++) {
            if (multiPercentages[i] < multiThreshold) {
              multiThresholdIdx = i;
              break;
            }
          }

          const multiOtherCount = multiPercentages
            .slice(multiThresholdIdx)
            .reduce((acc, curr) => (acc += curr), 0);

          setBarchartCharacterList([
            ...multiCharacters.slice(0, multiThresholdIdx),
            `< ${multiThreshold}%`,
          ]);
          setBarchartSeriesCounts([
            ...multiPercentages.slice(0, multiThresholdIdx),
            Math.round(100 * multiOtherCount) / 100,
          ]);
          break;
        default:
          // TODO: this lol
          console.log(state.dataType);
          break;
      }
    }
  }, [state.rtaData, state.selection, state.filter]);

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
