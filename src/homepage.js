import React from 'react';
import { Helmet } from 'react-helmet';
import './homepage.css' ;
import {Image} from 'react' ;
import {Card} from 'react-bootstrap' ;


const HomePage = () => {
    return (
        <div className="homepage">
            <Helmet>
                <title> Home Page </title>
            </Helmet>

            <div className="dark">
                <p>
                {" "}   <code style={{color:"#ffff00"}}> This application is written using cloudflare workers and pages </code>
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
