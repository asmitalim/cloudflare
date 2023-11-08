import logo from './logo.svg';
import './App.css';
import { Helmet } from 'react-helmet';

import Organization from './organization';
import WhoAmI from './whoami';
import HomePage from './homepage';

import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';



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
    <BrowserRouter>
      <div className="Lim">

        <Helmet>
          <html lang="en" />
          <title> Cloudflare Challange</title>
          <meta name="description" content="Helmet supported header" />
          <meta name="theme-color" content="#E6E6FA" />
          <body className="limdark" />
        </Helmet>

        <header className="App-header">
        <p> Organization Chart </p>
        <Chart 
            chartType = "OrgChart"
            data={data}
            options={options}
            width="75%"
            height="200px"
        />

          <p> some meaningful text here </p>

          <nav>
            <Link className="App-link" to="/orgchart">Organization Chart</Link>
            <Link className="App-link" to="/me">self json</Link>
            <Link className="App-link" to="/organization-chart">Organization Chart Json</Link>
          </nav>
        <Routes>
          <Route exact path="/" element={<HomePage></HomePage>}></Route>
          <Route exact path="/orgchart" element={<HomePage></HomePage>}></Route>
          <Route exact path="/organization-chart" element={<Organization></Organization>}></Route>
          <Route exact path="/me" element={<WhoAmI></WhoAmI>}></Route>
        </Routes>

        </header>



      </div>

    </BrowserRouter>
  );
}

export default App;
