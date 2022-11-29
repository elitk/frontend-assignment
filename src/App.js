import React from 'react';
import './App.css';
import GanttChart from "./components/charts/ganttChart"
import LineChart from './components/charts/lineChart';


function App() {


    return (
      <div>
        <LineChart/>
       <GanttChart/>
      </div>

  );
}

export default App;
