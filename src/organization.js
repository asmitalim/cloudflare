import React from 'react';
import { Helmet } from 'react-helmet';
import {useState, useEffect } from 'react' ; 
import './organization.css' ;


import { Chart } from 'react-google-charts' ;
import loadorgdata from './api/organization-chart/data'

import Card from 'react-bootstrap/Card' ;






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
    //compactRows: true,
    //nodeClass: "googleNode",
    size: 'small',
};

const deptFormat = (d) => {
    return d.managerName+'<div className="Organization-dept" style="color:green; font-size: 1.1vmin;font-style:italic">'+d.name+'</div>'
    //return <Card><Card.Body><Card.Title>d.manaferName</Card.Title></Card.Body></Card> ;

}
const deptRow = (d) => {
    return [{ 
        'v': d.managerName, 
        'f': deptFormat(d),
        },"Org",d.name] ;
}


const empFormat = (e) => {
    return '<div className="Organization-empl" style="color:brown;font-size: 1vmin;">'+e.name+'</div>' ;
}

const empRow = (e,d) => {
    return [{
        'v': e.name ,
        'f': empFormat(e),
        },d.managerName,e.office]
}


const Organization = () => {

    const [orgData, setOrgData ] = useState ([["Org","","Loading"]]) ;
    const [graphData, setGraphData ] = useState ([["Org","","Loading"]]) ;
    const [departments, setDepartments ] = useState ([]) ;

    const processOrgJson = (orgjson) => {
        let deptjson = orgjson.organization.departments ;
        setDepartments(deptjson);

        let tempData = []
        tempData.push(["Org", "", "TBD"])
        
        deptjson.map(d => {
            let mgrArray=[{'v':d.managerName, 'f':
                d.managerName+'<div style="color:red; font-size: 1.1vmin;font-style:italic">'+d.name+'</div>'
              },"Org",d.name]
            let x = deptRow(d);
            //tempData.push(mgrArray)
            tempData.push(x)
            d.employees.map( e => {
                let tempe = [{'v':e.name,'f':'<div style="color:darkblue;font-size: 1vmin;">'+e.name+'</div>'},d.managerName,e.office]
                let erow = empRow(e,d);
                tempData.push(tempe)
                //tempData.push(erow)
            })
        });
        console.log(tempData);
        setGraphData(tempData);
            

    }

    useEffect(() => {
        fetch('https://orgapi.asmita-879.workers.dev/organization-chart')
        //fetch('api/organization-chart')
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

    //Chart.collapse(1,true);


    return (
        <div className="Organization">
            <Helmet>
                <title> The Organization Chart </title>
            </Helmet>

        <Chart 
            chartType = "OrgChart"
            data={graphData}
            options={options}
        />

        <div>
        <p> Double click on any department to collapse/uncollapse </p>
            {
            /*
            width="100px"
            height="400px"
            */
            }
        </div>
        {/*JSON.stringify(orgData)*/}
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


export default Organization; 
