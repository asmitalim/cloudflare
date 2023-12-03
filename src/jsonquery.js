import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { useState, useEffect } from 'react';


//import Card from 'react-bootstrap/Card' ;
import { Form, Button, Row, Col, Container } from 'react-bootstrap';
import { Card } from 'react-bootstrap/Card';

import './jsonquery.css';
import { Employee } from './employee.js';


const EmployeeTableAlt = (props) => {

    let employees = props.employees;

    return (
        <div className="container">
            <h3 className="p-3 text-center"> Employees </h3>
            <table className="table table-stripped table-bordered">
                <thead>
                    <tr>
                        <th> Department </th>
                        <th> Name </th>
                        <th> IsManager </th>
                        <th> Salary </th>
                        <th> office </th>
                        <th> skills </th>
                    </tr>
                </thead>
                <tbody>
                    {employees && employees.map(e =>
                        <tr key={e.name}>
                            <td>{e.department}</td>
                            <td>{e.name}</td>
                            {e.isManager ? <td> Manager </td> : <td> </td>}
                            <td>{e.salary}</td>
                            <td>{e.office}</td>
                            <td>{e.skills && e.skills.map((s) =>
                                <li>{s}</li>
                            )}</td>
                        </tr>
                    )}

                </tbody>
            </table>
        </div>
    );
}


const EmployeeTable = (props) => {

    let employees = props.employees;

    const eItem = employees.map((e, ei) => <li key={`${e.name}-${ei}`}><Employee ekey={`${e.name}-${ei}`} employee={e}></Employee> </li>);



    return (
        <ul className="griddisplay">
            {eItem}
        </ul>
    );

}




const JsonQuery = () => {

    const [name, setName] = useState(".*");
    const [department, setDepartment] = useState(".*");
    const [office, setOffice] = useState(".*");
    const [minSalary, setMinSalary] = useState(0);
    const [maxSalary, setMaxSalary] = useState(5000);
    const [skill, setSkill] = useState(".*");

    const [employees, setEmployees] = useState([]);


    useEffect(() => {

        //let x = fetch('https://orgapi.asmita-879.workers.dev/employee',
        let x = fetch('employee', {
            method: 'POST',
            body: JSON.stringify({ name, department, office, minSalary, maxSalary, skill }),
            headers: {
                //'Content-type':'application/json; charset=UTF-8',
            },
        });
        x.then((response) => response.json())
            .then((data) => {
                console.table(data.employees);
                setEmployees(data.employees);
            })
            .catch((err) => {
                console.error(err.message);
            });


    }, []);

    const onFormSubmit = (e) => {
        e.preventDefault();

        let formData = new FormData(e.target);

        //let x = fetch('https://orgapi.asmita-879.workers.dev/employee',
        let x = fetch('employee', {
            method: 'POST',
            //body: JSON.stringify(values),
            body: JSON.stringify({ name, department, office, minSalary, maxSalary, skill }),
            headers: {
                //'Content-type':'application/json; charset=UTF-8',
            },
        });
        x.then((response) => response.json())
            .then((data) => {
                console.table(data.employees);
                setEmployees(data.employees);
            })
            .catch((err) => {
                console.error(err.message);
            });
    };

    const onFormChange = (e) => {
        e.preventDefault();

        if (e.target.name === "name") {
            setName(e.target.value);
        }
        if (e.target.name === "department") {
            setDepartment(e.target.value);
        }
        if (e.target.name === "office") {
            setOffice(e.target.value);
        }
        if (e.target.name === "minSalary") {
            setMinSalary(e.target.value);
        }
        if (e.target.name === "maxSalary") {
            setMaxSalary(e.target.value);
        }
        if (e.target.name === "skill") {
            setSkill(e.target.value);
        }
    };

    const handleReset = (e) => {
        e.preventDefault();
        setName(".*");
        setDepartment(".*");
        setOffice(".*");
        setMinSalary(0);
        setMaxSalary(5000);
        setSkill(".*");
    }

    return (
        <div className="JsonQuery">
            <Helmet>
                <title> Employees - Search </title>
            </Helmet>

            <div>
                <p> </p>
                <Container>
                    <Form onSubmit={onFormSubmit}>
                        <Col>
                            <Button size="lg" variant="secondary" onClick={handleReset}>Reset</Button>
                            <span>     </span>
                            <Button size="lg" type="submit" variant="primary">Submit</Button>
                            <p></p>
                            <p></p>
                        </Col>

                        <Form.Group as={Row} className="mb-2" controlId="formName">
                            <Form.Label column sm="3" className="label">Name</Form.Label>
                            <Col sm="9">
                                <Form.Control className="control" size="sm" type="text" value={name}
                                    onChange={onFormChange}
                                    name="name" placeholder="Enter name matching regExp" />
                            </Col>

                        </Form.Group>

                        <Form.Group as={Row} className="mb-2" controlId="formDepartment">
                            <Form.Label column sm="3" className="label">Department</Form.Label>
                            <Col sm="9">
                                <Form.Control className="control" size="sm" type="text" value={department}
                                    onChange={onFormChange}
                                    name="department" placeholder="Enter department name matching regExp"
                                />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-2" controlId="formOffice">
                            <Form.Label column sm="3" className="label">Office</Form.Label>
                            <Col sm="9">
                                <Form.Control className="control" size="sm" type="text" value={office}
                                    onChange={onFormChange}
                                    name="office" placeholder="Enter Office name matching regExp"
                                />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-2" controlId="formMinSalary">
                            <Form.Label column sm="3" className="label">Minimum Salary</Form.Label>
                            <Col sm="9">
                                <Form.Control className="control" size="sm" type="text" value={minSalary}
                                    onChange={onFormChange}
                                    name="minSalary" placeholder="Enter bottom of the salary range "
                                />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-2" controlId="formMaxSalary">
                            <Form.Label column sm="3" className="label">Maximum Salary</Form.Label>
                            <Col sm="9">
                                <Form.Control className="control" size="sm" type="text" value={maxSalary}
                                    onChange={onFormChange}
                                    name="maxSalary" placeholder="Enter top of the salary range "
                                />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-2" controlId="formSkill">
                            <Form.Label column sm="3" className="label">Skill</Form.Label>
                            <Col sm="9">
                                <Form.Control className="control" size="sm" type="text" value={skill}
                                    onChange={onFormChange}
                                    name="skill" placeholder="Enter RegExp for Skill"
                                />
                            </Col>
                        </Form.Group>

                        <p></p>
                        <p></p>
                    </Form>



                    {/*
                        <span>
                        {JSON.stringify(employees,["name","department"],'\t')}
                        <hr />
                        <h4> One employee </h4>{ JSON.stringify(employees[0],null,'\t')}
                        </span>
                        <EmployeeTable className="griddiplay" employees={employees}> </EmployeeTable>
                        */}

                    <EmployeeTableAlt employees={employees}> </EmployeeTableAlt>

                </Container>
            </div>
        </div>
    );

};


export default JsonQuery; 
