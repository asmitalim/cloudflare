import React from 'react';
import { Helmet } from 'react-helmet';
import {useState, useEffect } from 'react' ; 


import {Card,Image,Button,Badge,Row,Col} from 'react-bootstrap' ;
/*
import Image from 'react-bootstrap/Image' ;
import Button from 'react-bootstrap/Button' ;
import Badge from 'react-bootstrap/Badge' ;
import Row from 'react-bootstrap/Row' ;
*/




const Employee = (props) => {

    let pemployee = props.employee ; 

    //console.log("Employee getting constructerd properties",props);


    const [empl, setEmpl ] = useState({});


    useEffect(()=> {
        setEmpl(pemployee);
    },[]);

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


   const SkillItem = (skill) => {
        return <div><Badge bg="success">{skill}</Badge><span> </span></div> ;
   }
   const SalaryItem = (sal) => {
        return <div><Badge bg="secondary">{sal}</Badge><span> </span></div> ;
   }

    return (
        <div>
            <Helmet>
                <title> Employee </title>
            </Helmet>

            <Card>
                <Card.Body>
                    <Card.Title>{empl?.name}{SalaryItem(empl?.salary)}</Card.Title>
                    <Card.Subtitle>{ managerString(empl) }</Card.Subtitle>
                    <Card.Text className="small">{empl?.department}</Card.Text>
                    <Col>
                    {empl?.skills?.map( s => SkillItem(s))}
                    </Col>
                </Card.Body>
            </Card>
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
