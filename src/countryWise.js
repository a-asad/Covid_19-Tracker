import React, { useEffect, useState } from 'react';
import {Grid, makeStyles, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import cx from 'classnames';

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
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    select:{
        width:200,
    },
}));

function CountryWise(props){
    const classes = useStyles();
    let [countries,setCountries] = useState({});
    let [isLoading, setLoading] = useState(true);
    let [cCode, setCcode] = useState('G');
    let setData = props.setData;
    useEffect(()=>{
        async function fetchData(){
            let resp = await fetch('https://api.thevirustracker.com/free-api?countryTotals=ALL');
            resp = await resp.json();
            setCountries(resp.countryitems[0]);
            setLoading(false);
        }
        fetchData();
    },[])

    function getCountry(event){
        let c = event.target.value;
        setCcode(c);
        async function fetchData(){
            if(c === 'G'){
                let resp = await fetch('https://api.thevirustracker.com/free-api?global=stats');
                resp = await resp.json();
                setData({total:resp.results[0].total_cases, recovered:resp.results[0].total_recovered,
                     totalDeath:resp.results[0].total_deaths, deathToday:resp.results[0].total_new_deaths_today});
            }
            else{
                let resp = await fetch('https://api.thevirustracker.com/free-api?countryTotal='+c);
                resp = await resp.json();
                setData({total:resp.countrydata[0].total_cases, recovered:resp.countrydata[0].total_recovered,
                    totalDeath:resp.countrydata[0].total_deaths, deathToday:resp.countrydata[0].total_new_deaths_today});
            }
        }
        fetchData();
    }
    if(isLoading){
        return <div style={{textAlign:"center"}}>Lading visual data...</div>
    }
    return(
        <div>
            <Grid container justify="center" alignItems="center" direction="column" className={classes.pad}>
                <Grid item>
                    <FormControl className={cx(classes.formControl,classes.select)}>
                        <InputLabel id="country">Country</InputLabel>
                        <Select labelId="country" id="countrySelect" value={cCode} onChange={getCountry}>
                        <MenuItem value="G">Global</MenuItem>
                        {Object.keys(countries).map((c,id)=> <MenuItem key={id} value={countries[c].code}>{countries[c].title}</MenuItem>)}
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>

        </div>
    )
}

export default CountryWise;