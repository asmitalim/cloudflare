import React from 'react';
import { Helmet } from 'react-helmet';
import {useState, useEffect } from 'react' ; 


import { Chart } from 'react-google-charts' ;
import loadorgdata from './api/organization-chart/data'






export const dataStub = [
    [  "Org" , "",  "TBD" ],
    [  "m1", "Org", "Depart1" ],
    [  "m2", "Org", "Depart2" ],
    [  "e1", "m1", "" ],
    [  "e2", "m1", "" ],
    [  "e3", "m1", "" ],
    [  "e4", "m1", "" ],
    [  "x1", "m2", "" ],
    [  "x2", "m2", "" ],
    [  "x3", "m2", "" ],
 ];

export const options = {
    allowHtml: true,
};


const Organization = () => {

    const [orgData, setOrgData ] = useState ([]) ;
    const [graphData, setGraphData ] = useState ([]) ;
    const [departments, setDepartments ] = useState ([]) ;

    const processOrgJson = (orgjson) => {
        let deptjson = orgjson.organization.departments ;
        setDepartments(deptjson);

    }

    useEffect(() => {
        //fetch('https://orgapi.asmita-879.workers.dev/organization-chart')
        fetch('api/organization-chart')
            .then((response) => response.json())
            .then((data) => {
                console.log("Fetch successful",data);

                processOrgJson(data)
                setOrgData(data);
            })
            .catch((err) => {
                console.log("Handling the error" ,err.message);
                processOrgJson(loadorgdata)
                setOrgData(loadorgdata);
            });
    },[]);

    console.log("orgData",loadorgdata);



    return (
        <div>
            <Helmet>
                <title> The Organization Chart </title>

            </Helmet>

            {"     "}   the Ammi the pammi will murmur or badbad here about the org chart
            
        <Chart 
            chartType = "OrgChart"
            data={dataStub}
            options={options}
            width="75%"
            height="200px"
        />

        {/*JSON.stringify(orgData)*/}
        {/*JSON.stringify(departments)*/}
        <div>
            <h3> Departments </h3>
            { departments.map(d => (
                <div key={d.name}>
                    <li>{d.name}</li>
                </div>
               ))}
        </div>
                        



        </div>

    ) ;

}


export default Organization; 
