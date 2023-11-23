import React from 'react';
import { Helmet } from 'react-helmet';
import {useState, useEffect } from 'react' ; 


import {Card,Image,Button,Badge,Row,Col} from 'react-bootstrap' ;

import './jsonquery.css' ;




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
                    <Card.Text className="small">Employee</Card.Text>
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

            <Card className="emplcard"> 
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



}


//export default Employee; 
export {Employee} ;
