/**
 * Created by raylenmargono on 6/9/17.
 */

import React from 'react';
const ReactHighcharts = require('react-highcharts');

const config = {
    chart: {
        type: 'column'
    },
    title: {
        text: 'Latent Demand Breakdown'
    },
    subtitle: {
        text: 'By Top 5 Investors'
    },
    xAxis: {
        categories: [],
        crosshair: true
    },
    yAxis: {
        title: {
            text: 'Latent Demand'
        }
    },
    tooltip: {
        headerFormat: '<span style="font-size:10px"></span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
    },
    plotOptions: {
        column: {
            pointPadding: 0.2,
            borderWidth: 0
        }
    },
    series: []
};

class LatentDemandBreakdownChart extends React.Component {
  constructor(props){
    super(props);
    props.currentAsset.investors.forEach((data)=> {
      config.series.push({
        name: data.investorName,
        data: [parseFloat(data.latentDemand)]
      });
    });
  }
  render() {
    return (
      <ReactHighcharts config={config} />
    );
  }
}

LatentDemandBreakdownChart.displayName = 'LatentDemandBreakdownChart';

export default LatentDemandBreakdownChart;
