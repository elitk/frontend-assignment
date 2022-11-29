import React from 'react';
import Highcharts from 'highcharts/highcharts-gantt';
import HighchartsReact from 'highcharts-react-official';
import gantt from '../../../data/gantt.json';
import HC_more from 'highcharts/highcharts-more';
HC_more(Highcharts);

require('highcharts/modules/draggable-points')(Highcharts);

const GanttChart = () => {
  const ganttData = [];
  const categories = [];
  gantt.forEach((data, index) => {
    const tempObj = {};
    tempObj.name = data.recipe;
    tempObj.id = data.recipe;
    tempObj.y = index;

    const start = new Date(data.start);
    const end = new Date(data.end);
    tempObj.start = Date.UTC(
      start.getFullYear(),
      start.getMonth(),
      start.getDate()
    );
    tempObj.end = Date.UTC(end.getFullYear(), end.getMonth(), end.getDate());
    ganttData.push(tempObj);
    categories.push(data.machine);
  });
  return (
    <HighchartsReact
      highcharts={Highcharts}
      constructorType={'ganttChart'}
      options={{
        title: {
          text: 'Gantt chart',
        },
        rangeSelector: {
          enabled: true,
          selected: 0,
          buttons: [
            {
              type: 'day',
              count: 1,
              text: '1d',
              title: 'View 1 day',
            },
            {
              type: 'week',
              count: 1,
              text: '1w',
              title: 'View 1 week',
            },
            {
              type: 'week',
              count: 3,
              text: '3w',
              title: 'View 3 week',
            },
            {
              type: 'all',
              text: 'All',
              title: 'View all',
            },
          ],
        },
        yAxis: {
          type: 'category',
          categories: categories,
          accessibility: {
            description: 'Organization departments',
          },
        },

        plotOptions: {
          series: {
            dragDrop: {
              draggableX: true,
              draggableY: true,
            },
            dataLabels: {
              enabled: true,
              format: '{point.name}',
              style: {
                cursor: 'default',
                pointerEvents: 'none',
              },
            },
          },
        },

        series: [
          {
            name: 'Project',
            data: ganttData,
            dragDrop: {
              draggableY: true,
              draggableX: true,
            },
          },
        ],
      }}
    />
  );
};

export default GanttChart;
