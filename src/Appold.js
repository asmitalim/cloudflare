import logo from './logo.svg';
import './App.css';
import { Chart } from 'react-google-charts' ;


export const data = [
    [  "Org" , "",  "TBD" ],
    [  "m1", "Org", "Depart1" ],
    [  "m2", "Org", "Depart2" ],
    [  "e1", "m1", "" ],
    [  "e2", "m1", "" ],
    [  "e3", "m1", "" ],
    [  "e4", "m1", "" ],
    [  "x1", "m2", "" ],
    [  "x2", "m2", "" ],
    [  "x3", "m2", "" ],
 ];

export const options = {
    allowHtml: true,
};

function App() {
  return (
    <div className="App">
      <header className="App-header1">
        <Chart 
            chartType = "OrgChart"
            data={data}
            options={options}
            width="100%"
            height="300px"
        />
      </header>
    </div>
  );
}

export default App;
