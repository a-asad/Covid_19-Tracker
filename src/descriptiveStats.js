import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import cx from 'classnames';
import CountUp from 'react-countup';
import as from './as.gif';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  pad: {
    padding: "20px",
  },
  active:{
      borderTop: "2px solid #9e5c5c",
      borderBottom: "2px solid #9e5c5c",
      color:"black",
  },
    total:{
        borderTop: "2px solid #ccc",
        borderBottom: "2px solid #ccc",
        color:"black",
    },
    recovered:{
        borderTop: "2px solid #114701",
        borderBottom: "2px solid #114701",
        color:"black",
    },
    death:{
        borderTop: "2px solid #a60000",
        borderBottom: "2px solid #a60000",
        color:"black",
    },
    deathToday:{
        borderTop: "2px solid #802828",
        borderBottom: "2px solid #802828",
        color:"black",
    }
}));

function DescitptiveStats() {
    let [dt, setDt] = useState({total:0, recovered:0, active:0, totalDeath:0, deathToday:0});
    useEffect(()=>{
        async function fetchData(){
            let resp = await fetch('https://api.thevirustracker.com/free-api?global=stats');
            resp = await resp.json();
            setDt({total:resp.results[0].total_cases, recovered:resp.results[0].total_recovered, active:resp.results[0].total_unresolved,
                 totalDeath:resp.results[0].total_deaths, deathToday:resp.results[0].total_new_deaths_today});
                 console.log(resp.results[0]);
        }
        fetchData();
    },[]);

    const classes = useStyles();

    if(!dt.total){
        return(
            <Grid container justify="center" direction="column" alignItems="center" className={classes.pad}>
                <Grid container justify="center" alignItems="center" className={classes.pad}>
                    <Grid item >
                        <Typography variant="h4">C</Typography>
                    </Grid>
                    <Grid item>
                        <img src={as} alt="O" width="50px" style={{marginTop:"0px"}}/>
                    </Grid>
                    <Grid item>
                        <Typography variant="h4">VID-19 TRACKER</Typography>
                    </Grid>
                </Grid>
                <Grid item>
                    <Typography variant="h5" className={classes.pad}>LOADING DATA...</Typography>
                </Grid>
            </Grid>
            
        );
    }
  return (
    <div className={classes.pad}>
        <Grid container justify="center" alignItems="center" className={classes.pad}>
            <Grid item >
                <Typography variant="h4">C</Typography>
            </Grid>
            <Grid item>
                <img src={as} alt="O" width="50px" style={{marginTop:"0px"}}/>
            </Grid>
            <Grid item>
                <Typography variant="h4">VID-19 TRACKER</Typography>
            </Grid>
        </Grid>
      <div className={classes.root}>
      <Grid container spacing={2} alignItems="center" justify="center" className={classes.pad}>
        <Grid item xs={12} sm={3} md={2}>
          <Paper elevation="3" className={cx(classes.paper,classes.total)}>
              <Typography variant="h6">TOTAL CASES</Typography>
              <CountUp start={0} end={dt.total} duration={3} separator=","/>
              <Typography>TOTAL</Typography>
              </Paper>
        </Grid>
        <Grid item xs={12} sm={3} md={2}>
          <Paper elevation="3" className={cx(classes.paper,classes.active)}>
              <Typography variant="h6">INFECTED NOW</Typography>
              <CountUp start={0} end={dt.active} duration={3} separator=","/>
              <Typography>ACTIVE</Typography>
              </Paper>
        </Grid>
        <Grid item xs={12} sm={3} md={2}>
          <Paper elevation="3" className={cx(classes.paper,classes.recovered)}>
              <Typography variant="h6">RECOVERED</Typography>
              <CountUp start={0} end={dt.recovered} duration={3} separator=","/>
              <Typography>RECOVERED</Typography>
              </Paper>
        </Grid>
        <Grid item xs={12} sm={3} md={2}>
          <Paper elevation="3" className={cx(classes.paper,classes.death)}>
              <Typography variant="h6">TOTAL DEATHS</Typography>
              <CountUp start={0} end={dt.totalDeath} duration={3} separator=","/>
              <Typography>TOTAL DEATHS</Typography>
            </Paper>
        </Grid> 
        <Grid item xs={12} sm={3} md={2}>
          <Paper elevation="3" className={cx(classes.paper,classes.deathToday)}>
              <Typography variant="h6">DEATHS TODAY</Typography>
              <CountUp start={0} end={dt.deathToday} duration={3} separator=","/>
              <Typography>DEATHS TODAY</Typography>
              </Paper>
        </Grid>
      </Grid>
    </div>
    </div>
  );
}

export default DescitptiveStats;
