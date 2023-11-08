import logo from './logo.svg';
import './App.css';
import { Helmet } from 'react-helmet';

import Organization from './organization';
import WhoAmI from './whoami';
import HomePage from './homepage';

import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';






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
