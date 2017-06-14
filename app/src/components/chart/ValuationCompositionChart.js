/**
 * Created by raylenmargono on 6/9/17.
 */
import React from 'react';
const ReactHighcharts = require('react-highcharts');
var clone = require('clone');

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

class ValuationCompositionChart extends React.Component {
  constructor(props){
    super(props);
    const currentAsset = props.currentAsset;
    const fundamentalValue = parseFloat(currentAsset.fundamentalValue);
    const price = parseFloat(currentAsset.price);
    this.localConfig = clone(config);
    this.localConfig.series.push({
      name: "Price",
      data: [price]
    });
    this.localConfig.series.push({
      name: "Fundamental Value",
      data: [fundamentalValue]
    });
    this.localConfig.series.push({
      name: "Latent Demand Value",
      data: [price - fundamentalValue]
    });
  }
  render() {
    return (
      <ReactHighcharts config={this.localConfig} />
    );
  }
}

ValuationCompositionChart.displayName = 'ValuationCompositionChart';

export default ValuationCompositionChart;

