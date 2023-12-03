import React from 'react';
import { Helmet } from 'react-helmet';
import './homepage.css' ;
import {Image} from 'react' ;
import {Card} from 'react-bootstrap' ;
import {Row} from 'react-bootstrap' ;
import {Col} from 'react-bootstrap' ;


const HomePage = () => {
    return (
        <div className="homepage">
            <Helmet>
                <title> Summary </title>
            </Helmet>

            <div className="dark">
                <p>
                {" "}   <code> This application is written using cloudflare workers and pages. </code> 
                </p>
                <p>
                <code> All core functionality along with extra credit has been implemented. </code>
                </p>

                <p>
                <h5>Extra features:</h5>
                <i>
                Implementation of an visual organization chart (double click to expand) which gets updated on posting a new org chart JSON, along with a search feature which lets you search using regex, which also gets updated after POST of a new org chart JSON.</i>
                </p>

            </div>
            <Card className="limcard"> 
                <Card.Img className="HomeImage" src="https://images.unsplash.com/photo-1699006599430-4ba35169ff8b" />
                <Card.Title> The Cleveland Museum of Art </Card.Title>
                <Card.Subtitle>  - Unsplash image   </Card.Subtitle>
                <Card.Text> <i><b>javascript,react,cloudflare,npm etc. </b></i> </Card.Text>
            </Card> 
            {/*
            <Col>
            <Row>
            <Card> 
                <Card.Img src="orgchart512x512.jpg" />
                <Card.Title>  </Card.Title>
                <Card.Subtitle>  </Card.Subtitle>
                <Card.Text> <i></i> </Card.Text>
                <Card.Text> <i>javascript,react,cloudflare,npm etc. </i> </Card.Text>
            </Card> 
            </Row>
            </Col>
            */}
        </div>

    ) ;

}


export default HomePage; 
