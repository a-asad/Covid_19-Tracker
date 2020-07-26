import React, { useEffect, useState } from 'react';
import {Grid, makeStyles, FormControl, InputLabel, Select } from '@material-ui/core';
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
    let [countries,setCountries] = useState();
    let [isLoading, setLoading] = useState(true);
    let [cCode, setCcode] = useState('G');
    let setData = props.setData;
    useEffect(()=>{
        async function fetchData(){
            let resp = await fetch('https://covid19.mathdro.id/api/countries');
            resp = await resp.json();
            setCountries(resp.countries);
            setLoading(false);
        }
        fetchData();
    },[])

    function getCountry(event){
        let c = event.target.value;
        setCcode(c);
        async function fetchData(){
            if(c === 'G'){
                props.setCountry('');
                let resp = await fetch('https://covid19.mathdro.id/api');
                resp = await resp.json();
                setData({total:resp.confirmed.value, recovered:resp.recovered.value,
                     totalDeath:resp.deaths.value});
            }
            else{
                props.setCountry(c);
                let resp = await fetch('https://covid19.mathdro.id/api/countries/'+c);
                resp = await resp.json();
                setData({total:resp.confirmed.value, recovered:resp.recovered.value,
                    totalDeath:resp.deaths.value});
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
                        <InputLabel htmlFor="countrySelect">Country</InputLabel>
                        <Select native inputProps={{  name: 'age',  id: 'countrySelect',}} value={cCode} onChange={getCountry}>
                        <option value="G">Global</option>
                        {countries.map((c,id)=> <option key={id} value={c.iso2}>{c.name}</option>)}
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>

        </div>
    )
}

export default CountryWise;