import React from 'react';
import { Helmet } from 'react-helmet';
import {useState, useEffect } from 'react' ; 


import Card from 'react-bootstrap/Card' ;
import Image from 'react-bootstrap/Image' ;
import Button from 'react-bootstrap/Button' ;
import Badge from 'react-bootstrap/Badge' ;




const Employee = (props) => {

    console.log("Employee getting constructerd properties",props);

    const pemployee = props.employee ; 

    const [empl, setEmpl ] = useState(pemployee);

    const managerString = (e) => {
        if( e?.isManager) {
            return (
                    <Card.Text className="small">Manager</Card.Text>
            );

        } else {

            return (
                <span></span>
            );

        }
   };

    return (
        <div>
        <hr/>
            {JSON.stringify(empl)}
            <hr/>
        </div>
        );
    return (
        <div>
            <Helmet>
                <title> Employee </title>
            </Helmet>

            <Card style={{ width:'12rem'}}>
                <Card.Img variant="top" src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba" />
                <Card.Body>
                    <Card.Title>{empl?.name}</Card.Title>
                    { managerString(empl) }
                    <Card.Text className="small">Department:{empl?.department}</Card.Text>

                    <Button variant="primary"> Skills 
                    <div>
                    <Badge bg="success">{empl?.skills[0]}</Badge><span> </span>
                    <Badge bg="success">{empl?.skills[1]}</Badge><span> </span>
                    <Badge bg="success">{empl?.skills[2]}</Badge><span> </span>
                    <Badge bg="success">{empl?.skills[3]}</Badge><span> </span>
                    <Badge bg="success">{empl?.skills[4]}</Badge><span> </span>
                    </div>
                    </Button>
                </Card.Body>
            </Card>

        </div>

    ) ;

}


//export default Employee; 
export {Employee} ;
