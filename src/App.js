import React, { useState } from 'react';
import DescitptiveStats from './descriptiveStats';
import CountryWise from './countryWise';
import Chart from './chart'
import { Header } from './Header';

function App() {
  let [data, setData] = useState({total:0, recovered:0, totalDeath:0});
  let [country, setCountry] = useState('');
  return (
    <div>
      <Header/>
      <DescitptiveStats data = {data} setData = {setData}/>
      <CountryWise setData = {setData} setCountry={setCountry}/>
      <Chart data = {data} country = {country}/>
    </div>
  );
}
export default App;
