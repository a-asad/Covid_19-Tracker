import React from 'react';
import {Pie} from 'react-chartjs-2';
import { Grid } from '@material-ui/core';

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
      <div>
        <Grid container justify="center">
          <Grid item xs={8} sm={4}>
            <Pie data={data} width={100} height={100}/>
          </Grid>
        </Grid>
      </div>
    )
  }

export default Chart;