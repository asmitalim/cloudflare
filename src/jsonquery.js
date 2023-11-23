import React, {Component} from 'react';
import { Helmet } from 'react-helmet';
import {useState, useEffect } from 'react' ; 


//import Card from 'react-bootstrap/Card' ;
import { Form,Button ,Row,Col, Container } from 'react-bootstrap' ;
import { Card } from 'react-bootstrap/Card' ;

import {Employee} from './employee.js' ;



const EmployeeTable = (props) => {

    let employees = props.employees ;

    const eItem = employees.map(e=><Employee key={e} employee={e}></Employee>);

    //console.log("Employees", employees);

    /*
    for ( let x of employees) {
        console.log("Employee is ",x);
    }
    */
        

    return (
        <table>
        <tr key={eItem}><Col>{eItem}</Col></tr>
        </table>
    );

}




const JsonQuery = () => {

    const [name,setName] = useState("K.*");
    const [department,setDepartment] = useState(".*");
    const [employees,setEmployees] = useState([]);


    useEffect(()=> {


        let x = fetch('https://orgapi.asmita-879.workers.dev/employee',{
            method:'POST',
            //body: JSON.stringify(values),
            body: JSON.stringify({name,department}),
            headers:{
                //'Content-type':'application/json; charset=UTF-8',
            },
        });
        x.then((response) => response.json())
            .then((data) => {
                console.table(data);
                setEmployees(data);
            })
            .catch((err) => {
                console.error(err.message);
            });


    },[]) ;

    const onFormSubmit = (e) => {
        e.preventDefault();
        console.log("OnFormSubmit:--->",e.target);
        let formData = new FormData(e.target);
        console.log("form Data ",formData);
        //console.log("Values = ",values);
        let x = fetch('https://orgapi.asmita-879.workers.dev/employee',{
            method:'POST',
            //body: JSON.stringify(values),
            body: JSON.stringify({name,department}),
            headers:{
                //'Content-type':'application/json; charset=UTF-8',
            },
        });
        x.then((response) => response.json())
            .then((data) => {
                console.table(data);
                setEmployees(data);
            })
            .catch((err) => {
                console.error(err.message);
            });
        //setName("A.*");
        //setDepartment("D.*");
    };

    const onFormChange = (e) => {
        //console.log("OnFormChange:",e.target.value);
        //console.log("E.Target:",e.target);
        if( e.target.name === "name") {
            setName(e.target.value);
        }
        if( e.target.name === "department") {
            setDepartment(e.target.value);
        }
    };

    const handleReset =(e) => {
        console.log("Reset");
        setName(".*");
        setDepartment(".*");
    }

            return (
                <div className="JsonQuery">
                    <Helmet>
                        <title> Employees - Search </title>
                    </Helmet>

                    <p> The header navigation stuff is coming </p>

                    <body>
                    <p> Search Box </p>
                    <Container>
                        <Form onSubmit={onFormSubmit}>
                            <Form.Group as={Row}  className="mb-3" controlId="formName">
                                    <Form.Label column sm="2"  className="label">Name</Form.Label>
                                    <Col sm="10">
                                    <Form.Control size="lg" type="text"  value={name}
                                        onChange={onFormChange}
                                        name="name" placeholder="Enter name matching regExp" required/>
                                    </Col>

                            </Form.Group>
                            <Form.Group as={Row} className="mb-3"  controlId="formDepartment">
                                    <Form.Label column sm="2" className="label">Department</Form.Label>
                                    <Col sm="10">
                                    <Form.Control size="lg" type="text"  value={department}
                                        onChange={onFormChange}
                                        name="department" placeholder="Enter department name matching regExp"
                                        required
                                    />
                                    </Col>
                            </Form.Group>
                            <p></p>
                            <p></p>
                           <Row>
                           <Button size="lg" variant="secondary" onClick={handleReset}>Reset</Button>
                           <Button size="lg" type="submit" variant="primary">Submit</Button>
                           </Row>
                        </Form>


                        
                        {/*
                        <span>
                        {JSON.stringify(employees,["name","department"],'\t')}
                        <hr />
                        <h4> One employee </h4>{ JSON.stringify(employees[0],null,'\t')}
                        </span>
                        */}

                        <EmployeeTable employees={employees}> </EmployeeTable>
                        {/*
                        <Employee employee={employees[0]}> </Employee>
                        <Employee employee={employees[1]}> </Employee>
                        <Employee employee={employees[2]}> </Employee>
                        <Employee employee={employees[3]}> </Employee>
                        */}

                    </Container>
                    </body>
                </div>
    ) ;

};


export default JsonQuery; 
/*
                    <p> The body stuff is here </p>

                    <Container>
                        <Form>
                                <Form.Group controlId="formName">
                                    <Form.Label className="label">Name</Form.Label>
                                    <Form.Control type="text" defaultValue=".*"
                                        name="name" placeholder="Enter name matching regExp"
                                        required
                                    />
                                </Form.Group>
                        </Form>
                    </Container>    
*/
