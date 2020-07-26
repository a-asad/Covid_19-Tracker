import React, { useState, useEffect } from 'react';
import {Pie, Line} from 'react-chartjs-2';
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
    let [dailyData, setDailyData] = useState([]);
    let [isLoaded, setIsLoaded] = useState(false);
    useEffect(()=>{
      async function fetchData(){
          setIsLoaded(true);
          let resp = await(await fetch('https://covid19.mathdro.id/api/daily')).json();
          setDailyData(resp.map(({ confirmed, deaths, reportDate: date }) => ({ confirmed: confirmed.total, deaths: deaths.total, date })));
          setIsLoaded(true);
      }
      fetchData();
    },[])

    const lineChart = (
      isLoaded ? (
        <Line
          data={{
            labels: dailyData.map(({ date }) => date),
            datasets: [{
              data: dailyData.map((data) => data.confirmed),
              label: 'Infected',
              borderColor: '#3333ff',
              fill: true,
            }, {
              data: dailyData.map((data) => data.deaths),
              label: 'Deaths',
              borderColor: 'red',
              backgroundColor: 'rgba(255, 0, 0, 0.5)',
              fill: true,
            },
            ],
          }}
         />
      ) : null
    );
    return (
      <div>
        <Grid container justify="center" style={{marginBottom:'35px'}}>
        {props.country?
          <Grid item xs={8} sm={4}>
            <Pie data={data} width={100} height={100}/>
          </Grid>:
          <Grid item xs={10} sm={6}>
            {lineChart}
          </Grid>}
        </Grid>
      </div>
    )
  }

export default Chart;