/**
 * Created by raylenmargono on 6/9/17.
 */

import React from 'react';
const ReactHighcharts = require('react-highcharts');
const clone = require('clone');


const config = {
    chart: {
        type: 'column'
    },
    title: {
        text: 'Latent Demand Breakdown'
    },
    xAxis: {
        categories: [],
        crosshair: true
    },
    yAxis: {
        title: {
            text: 'Latent Demand (Billions)'
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
    this.localConfig = clone(config);
    props.currentAsset.investors.forEach((data)=> {
      this.localConfig.series.push({
        name: data.investorName,
        data: [parseFloat(data.latentDemand)]
      });
    });
  }
  render() {
    return (
      <ReactHighcharts config={this.localConfig} />
    );
  }
}

LatentDemandBreakdownChart.displayName = 'LatentDemandBreakdownChart';

export default LatentDemandBreakdownChart;
