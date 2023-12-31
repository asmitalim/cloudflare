import logo from './logo.svg';
import orgchart from './orgchart512x512.png';
import './App.css';
import { Helmet } from 'react-helmet';
import { Image } from 'react-bootstrap';

import Organization from './organization';
import WhoAmI from './whoami';
import HomePage from './homepage';
import JsonQuery from './jsonquery';

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
        <p className="AppTitle"> Organization Chart Application </p>
            <Image className="App-logo" src={orgchart} ></Image>

          <nav className="App-nav">
            <Link className="App-link" to="/">Home </Link>
            <Link className="App-link" to="/orgchart">Organization Chart</Link>
            <Link className="App-link" to="/self">Self</Link>
            <Link className="App-link" to="/search">Search Employees</Link>
          </nav>

        <Routes>
          <Route exact path="/" element={<HomePage></HomePage>}></Route>
          <Route exact path="/orgchart" element={<Organization></Organization>}></Route>
          <Route exact path="/home" element={<HomePage></HomePage>}></Route>
          <Route exact path="/self" element={<WhoAmI></WhoAmI>}></Route>
          <Route exact path="/search" element={<JsonQuery></JsonQuery>}></Route>
        </Routes>

        </header>
      </div>
    </BrowserRouter>
  );
}

export default App;
