import logo from './logo.svg';
import './App.css';
import StageProfile from "./components/StageProfile";
import { highlights, stages } from "../src/data/tdf/stages"
import {useEffect, useState} from "react";
import axios from "axios";

function App() {
    const search = window.location.search;
    const params = new URLSearchParams(search);
    const [stage, setStage] = useState(stages[params.get("stage")]);
    const [liveData, setLiveData] = useState({});

    useEffect(() => {
        const interval = setInterval(() => {
            axios.get(`https://tracker.helmuga.cloud/resources/livetracker/${1472 + parseInt(params.get("stage"))}/update.json`).then((res) => {
                setLiveData(res);

            })
        }, 60000)

        return () => clearInterval(interval)
    }, [])

    /*
    const stage = stage21.features[0].geometry.coordinates.map((feature, idx) => {
        return {id: idx, coordinates: [feature[0], feature[1]], elevation: feature[2]};
    })

    stage[0].distanceTraveled = 0

    let previousPoint = null;

    for (const point of stage) {
        if (previousPoint !== null) {
            // Calculate distance between current point and previous point
            const distance = haversine(
                previousPoint.coordinates,
                point.coordinates
            ) / 1000;
            point.distanceTraveled = distance + previousPoint.distanceTraveled;
        }

        previousPoint = point;
    }

    console.log(stage)
     */

  return (
    <div className="App">
      <div className="w-full h-screen p-20">
          <div className="font-bold">
          Tour De France 2023
          </div>
          <select defaultValue={params.get("stage")} onChange={(e) => {window.location.assign("/tour?stage="+e.target.value)}}>
              <option value="0">Stage 1</option>
              <option value="1">Stage 2</option>
              <option value="2">Stage 3</option>
              <option value="3">Stage 4</option>
              <option value="4">Stage 5</option>
              <option value="5">Stage 6</option>
              <option value="6">Stage 7</option>
              <option value="7">Stage 8</option>
              <option value="8">Stage 9</option>
              <option value="9">Stage 10</option>
              <option value="10">Stage 11</option>
              <option value="11">Stage 12</option>
              <option value="12">Stage 13</option>
              <option value="13">Stage 14</option>
              <option value="14">Stage 15</option>
              <option value="15">Stage 16</option>
              <option value="16">Stage 17</option>
              <option value="17">Stage 18</option>
              <option value="18">Stage 19</option>
              <option value="19">Stage 20</option>
              <option value="20">Stage 21</option>
          </select>
          <div>To be viewed on desktop, click to calculate slope percentages</div>
          <StageProfile stage={stage} highlights={highlights} index={params.get("stage")}/>
      </div>
    </div>
  );
}

export default App;
