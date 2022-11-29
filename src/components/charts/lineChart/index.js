import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import inventory from '../../../data/inventory.json';

const LineChart = () => {
  const convertToShortDate = (date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return day + '.' + month + '.' + year;
  };
  let timeStampKeys = [];
  const obj = {};
  for (const timeStamp in inventory) {
    const formatDate = convertToShortDate(new Date(timeStamp));
    timeStampKeys.push(formatDate);

    for (const key in inventory[timeStamp]) {
      if (obj[key]) {
        obj[key]?.data?.push(inventory[timeStamp][key]);
      } else {
        let tempObj = {
          name: key,
          data: [inventory[timeStamp][key]],
        };
        obj[key] = tempObj;
      }
    }
  }
  const series = Object.values(obj);
  return (
    <div>
      <HighchartsReact
        highcharts={Highcharts}
        options={{
          title: {
            text: 'Inventory chart',
          },
          rangeSelector: {
            enabled: true,
            selected: 0,
          },

          yAxis: {
            title: {
              text: 'Value',
            },
          },

          xAxis: {
            categories: timeStampKeys,
          },

          legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
          },
          series: series,
        }}
      />
    </div>
  );
};

export default LineChart;
