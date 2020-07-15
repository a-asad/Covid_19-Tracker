import React, { useState } from 'react';
import DescitptiveStats from './descriptiveStats';
import CountryWise from './countryWise';
import Chart from './chart'
import { Header } from './Header';

function App() {
  let [data, setData] = useState({total:0, recovered:0, totalDeath:0});
  return (
    <div>
      <Header/>
      <DescitptiveStats data = {data} setData = {setData}/>
      <CountryWise setData = {setData}/>
      <Chart data = {data}/>
    </div>
  );
}
export default App;
