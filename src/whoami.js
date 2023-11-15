import React from 'react';
import { Helmet } from 'react-helmet';
import {useState, useEffect } from 'react' ; 


import Card from 'react-bootstrap/Card' ;
import Image from 'react-bootstrap/Image' ;
import Button from 'react-bootstrap/Button' ;
import Badge from 'react-bootstrap/Badge' ;


import loadamidata from './api/me/data'



const WhoAmI = () => {

    const [amiData, setAmiData ] = useState (loadamidata) ;

    useEffect(() => {
        fetch('https://orgapi.asmita-879.workers.dev/me')
            .then((response) => {
                let xyz = response.json()
                console.log("response great8 ",xyz)
                return xyz;
            })
            .then((data) => {
                //console.log("Fetch successful",data);
                console.log("Fetch successful");
                setAmiData(data);
            })
            .catch((err) => {
                console.log("Handling the error" ,err.message);
                setAmiData(loadamidata);
            });

    },[]);



    return (
        <div>
            <Helmet>
                <title> Who Am I </title>
            </Helmet>

            <Card style={{ width:'18rem'}}>
                <Card.Img variant="top" src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba" />
                <Card.Body>
                    <Card.Title>{amiData.name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{amiData.interestingFact}</Card.Subtitle>
                        {/*
                    <Card.Text className="small">{amiData.interestingFact}</Card.Text>
                        */}
                    <Card.Link className="h6 text-muted" href={amiData.githubURL}>Github</Card.Link>
                    <Card.Link className="h6 text-muted" href={amiData.homepage}>HomePage</Card.Link>
                    <Button variant="primary"> Skills 
                    <div>
                    <Badge bg="success">{amiData?.skills[0]}</Badge><span> </span>
                    <Badge bg="success">{amiData?.skills[1]}</Badge><span> </span>
                    <Badge bg="success">{amiData?.skills[2]}</Badge><span> </span>
                    <Badge bg="success">{amiData?.skills[3]}</Badge><span> </span>
                    <Badge bg="success">{amiData?.skills[4]}</Badge><span> </span>
                    </div>
                    </Button>
                </Card.Body>
            </Card>

        {/*JSON.stringify(amiData)*/}
        {/*JSON.stringify(departments)*/}
        {/*<div>
            <h3> Departments </h3>
            { departments.map(d => (
                <div key={d.name}>
                    <li>{d.name}</li>
                </div>
               ))}
        </div>
        */}
                        




        </div>

    ) ;

}


export default WhoAmI; 
