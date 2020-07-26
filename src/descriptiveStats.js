import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import cx from 'classnames';
import CountUp from 'react-countup';
import as from './as.gif';
import guide from './covid.jpg';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(3),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  pad: {
    padding: "20px",
  },
  active:{
      borderTop: "3px solid #9e5c5c",
      borderBottom: "3px solid #9e5c5c",
      color:"black",
  },
    total:{
        borderTop: "3px solid #66f",
        borderBottom: "3px solid #66f",
        color:"black",
    },
    recovered:{
        borderTop: "3px solid #114701",
        borderBottom: "3px solid #114701",
        color:"black",
    },
    death:{
        borderTop: "3px solid #a60000",
        borderBottom: "3px solid #a60000",
        color:"black",
    },
    deathToday:{
        borderTop: "3px solid #802828",
        borderBottom: "3px solid #802828",
        color:"black",
    }
}));

function DescitptiveStats(props) {
    let dt = props.data;
    let setDt = props.setData;
    let [isLoading, setLoading] = useState(true);
    useEffect(()=>{
        async function fetchData(){
            let resp = await fetch('https://covid19.mathdro.id/api');
            resp = await resp.json();
            setDt({total:resp.confirmed.value, recovered:resp.recovered.value,
                 totalDeath:resp.deaths.value});
                 setLoading(false);
        }
        fetchData();
    },[])// eslint-disable-line react-hooks/exhaustive-deps
    const classes = useStyles();
    if(isLoading){
        return(
            <Grid container justify="center" direction="column" alignItems="center">
                <Grid container justify="center" alignItems="center">
                    <Grid item>
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
                    <Typography variant="h6" className={classes.pad}>LOADING DATA...</Typography>
                </Grid>
            </Grid>
            
        );
    }
  return (
    <div style={{paddingTop:20}}>
        <Grid container justify="center" alignItems="center">
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
        <Grid container justify="center" style={{paddingTop:20}}>
            <Grid item>
                <img src={guide} width={'100%'} alt='covid-19 information'/>
            </Grid>
        </Grid>
      <div className={cx(classes.root,classes.pad)}>
      <Grid container spacing={2} alignItems="center" justify="center" className={classes.pad}>
        <Grid item xs={12} sm={4}>
          <Paper elevation={3} className={cx(classes.paper,classes.total)}>
              <Typography variant="h6">TOTAL</Typography>
              <CountUp start={0} end={dt.total} duration={3} separator=","/>
              </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper elevation={3} className={cx(classes.paper,classes.recovered)}>
              <Typography variant="h6">RECOVERED</Typography>
              <CountUp start={0} end={dt.recovered} duration={3} separator=","/>
              </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper elevation={3} className={cx(classes.paper,classes.death)}>
              <Typography variant="h6">TOTAL DEATHS</Typography>
              <CountUp start={0} end={dt.totalDeath} duration={3} separator=","/>
            </Paper>
        </Grid> 
      </Grid>
    </div>
    </div>
  );
}

export default DescitptiveStats;
