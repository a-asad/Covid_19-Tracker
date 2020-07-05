import React, { useState } from 'react';
import DescitptiveStats from './descriptiveStats';
import CountryWise from './countryWise';
import Chart from './chart'

function App() {
  let [data, setData] = useState({total:0, recovered:0, totalDeath:0, deathToday:0});
  return (
    <div>
      <DescitptiveStats data = {data} setData = {setData}/>
      <CountryWise setData = {setData}/>
      <Chart data = {data}/>
    </div>
  );
}

export default App;
