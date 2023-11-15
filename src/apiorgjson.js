import React from 'react';
import { Helmet } from 'react-helmet';
import {useState, useEffect } from 'react' ; 


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
    allowCollapse: true,
    compactRows: true,
    nodeClass: "googleNode",
    size: 'small',
};


const Organization = () => {

    const [orgData, setOrgData ] = useState ([]) ;
    const [graphData, setGraphData ] = useState ([]) ;
    const [departments, setDepartments ] = useState ([]) ;

    const processOrgJson = (orgjson) => {
        let deptjson = orgjson.organization.departments ;
        setDepartments(deptjson);

        let tempData = []
        tempData.push(["Org", "", "TBD"])
        
        deptjson.map(d => {
            let mgrArray=[d.managerName,"Org",d.name]
            tempData.push(mgrArray)
            d.employees.map( e => {
                let tempe = [e.name,d.managerName,e.office]
                tempData.push(tempe)
            })
        });
        console.log(tempData);
        setGraphData(tempData);
            

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
        "hello"
    );

export default Organization; 
