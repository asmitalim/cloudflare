import React from 'react';
import { Helmet } from 'react-helmet';


import { Chart } from 'react-google-charts' ;






export const data = [
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
    return (
        <div>
            <Helmet>
                <title> The Organization Chart </title>

            </Helmet>

            {"     "}   the Ammi the pammi will murmur or badbad here about the org chart
            
        <Chart 
            chartType = "OrgChart"
            data={data}
            options={options}
            width="75%"
            height="200px"
        />


        </div>

    ) ;

}


export default Organization; 
