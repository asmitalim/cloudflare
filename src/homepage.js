import React from 'react';
import { Helmet } from 'react-helmet';
import './homepage.css' ;
import {Image} from 'react' ;
import {Card} from 'react-bootstrap' ;


const HomePage = () => {
    return (
        <div className="homepage">
            <Helmet>
                <title> Summary </title>
            </Helmet>

            <div className="dark">
                <p>
                {" "}   <code style={{color:"#ffff00"}}> This application is written using cloudflare workers and pages. All core functionality along with extra credit has been implemented. Extra features: Implementation of an visual organization chart (double click to expand) which gets updated on posting a new org chart JSON, along with a search feature which lets you search using regex, which also gets updated after POST of a new org chart JSON.</code>

                </p>
            </div>
            <Card> 
                <Card.Img src="https://images.unsplash.com/photo-1699006599430-4ba35169ff8b" />
                <Card.Title> The Cleveland Museum of Art </Card.Title>
                <Card.Subtitle>  - Unsplash image   </Card.Subtitle>
                <Card.Text> <code>javascript,react,cloudflare,npm etc. </code> </Card.Text>
            </Card> 
        </div>

    ) ;

}


export default HomePage; 
/*
                <Card>
                         <Image src="https://images.unsplash.com/photo-1699006599430-4ba35169ff8b" />
                </Card>
*/
