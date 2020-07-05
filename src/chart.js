import React from 'react';
import {Pie} from 'react-chartjs-2';

function Chart(props) {
    const data = {
        labels: [
            'Total',
            'Recovered',
            'Deaths'
        ],
        datasets: [{
            data : [props.data.total,props.data.recovered,props.data.totalDeath],
            backgroundColor: [
            '#bf676a',
            '#32701d',
            '#780d11'
            ],
            hoverBackgroundColor: [
            '#de8588',
            '#3c8a21',
            '#ab0f15'
            ]
        }]
    };
    return (
      <div style={{maxWidth:"70%",margin:"auto", marginTop:"20px",marginBottom:"20px"}}>
        <Pie data={data} />
      </div>
    )
  }

export default Chart;