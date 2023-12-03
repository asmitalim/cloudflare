import orgdata from './organization-chart/data' 

export async function onRequest(context) {


    let request = context.request  ;
    let env = context.env ;

    const { method } = request ; 

    console.log("Request is ",request);
    console.log("Environment is ",env);
    console.log("Method is ",method);

    const putKV = (key, val) => env.KVSPACE.put(key, val);
    const getKV = (key) => env.KVSPACE.get(key);
    const orgkey = `log-generic`;

    await putKV(orgkey,('Request(Generic)'+JSON.stringify(request)));

    if( method === "POST") 
        return await handlePostRequestOrg(request,env);
    else if ( method === "GET") 
        return await handleGetRequestOrg(request, env);
    else 
        return new Response(`${method} on /organization-chart is not supported`,
  { headers: { "Content-Type": "text/json", "Access-Control-Allow-Origin": "*" }, status: 404 }
  );

}


export async function onRequestgety(context) {
    let request = context.request  ;
    let env = context.env ;
    console.log("Request is ",request);
    console.log("Environment is ",env);
    const putKV = (key, val) => env.KVSPACE.put(key, val);
    const getKV = (key) => env.KVSPACE.get(key);
    const orgkey = `logget`;

    await putKV(orgkey,('Get'+request));

    return await handleGetRequestOrg(request, env);
}

export async function onRequestposty(context) {
    const putKV = (key, val) => env.KVSPACE.put(key, val);
    const getKV = (key) => env.KVSPACE.get(key);
    const orgkey = `logput`;


    let request = context.request  ;
    let env = context.env ;
    console.log("Request is ",request);
    console.log("Environment is ",env);
    await putKV(orgkey,('Post'+request));
    return await handlePostRequestOrg(request,env);
}



// src/worker.js
import {parse} from 'csv-parse/browser/esm/sync' ; 


var handleGetRequestOrg = async (request, env) => {
  console.log("responding to get Org request");
  let orgJson;
  return await getOrganization(request, env);
  return new Response("organization", { status: 200 });
};



var handlePostRequestOrg = async (request, env) => {
  console.log("responding to  put request");
  let body = await request.text();
  console.log(body);
  let orgJson = JSON.parse(body);
  console.log(orgJson.organizationData);
  let csvData = orgJson.organizationData;
  var newOrgJson = {};
  let x = await toEmployeesJson(csvData, newOrgJson);
  console.log("x is ",x);
  return await postOrganization(request,env,JSON.stringify(x) );
  let y = await postOrganization(request,env,JSON.stringify(x) );
  return new Response("processing organization.......", { status: 200 });
};



var getOrganization = async (request, env) => {
  const getKV = (key) => env.KVSPACE.get(key);
  const orgkey = `organization`;
  let data;
  const localkvdata = await getKV(orgkey);
  data = await JSON.parse(localkvdata);
  const body = JSON.stringify(data);
  return new Response(
    body,
    { headers: { "Content-Type": "text/json", "Access-Control-Allow-Origin": "*" }, status: 200 }
  );
};


var postOrganization = async ( request, env, orgValue ) => {

const putKV = (key, val) => env.KVSPACE.put(key, val);
const getKV = (key) => env.KVSPACE.get(key);
  const orgkey = `organization`;
  let data;
  await putKV(orgkey,orgValue);
  console.log("Data stored in kvspace",orgValue)
  let localkvdata = await getKV(orgkey);
  data = await JSON.parse(localkvdata);
  const body = JSON.stringify(data);
  return new Response(
    body,
    { headers: { "Content-Type": "text/json", "Access-Control-Allow-Origin": "*" }, status: 200 }
  );

}



var  gorgJsonData ; 




function toNum(s) {
    
    let x = parseInt(s);
    if( x.toString() === s ) {
        //console.log(`returning ${s} ${x} as an integer`);
        return x;
    }
    //console.log(`catch:Trying as float:  not int  -${s}- ${x} trying as a float backtostring:${x.toString()}`);
    x = parseFloat(s);
    if( x.toString() === s || parseFloat(x.toString()) === x ) {
      //console.log(`returning -${s}- ${x} as a float`);
      return x;
    }
    //console.log(`catch:Trying <not float> and  <not int>  -${s}- ${x} ${x.toString()}`);
    x = -1;
    //console.log(`returning ${s}  ${x} as a -1`);
    return x;
}




function toBool(s) {
  const lowercased = s.trim().toLowerCase();
  if (lowercased === 'true') {
    return true;
  } else if (lowercased === 'false') {
    return false;
  } else {
    // any invalid syntax is not true
    return false;
  }
}




//------------------------------------------------------------------------------------------------------


async function syncwait(j,f) {
    var x =   await toEmployeesJson(j,f);
    console.table(x);
    return x ; 
}

/*
function writeToJsonFile(pjsonData,pjsonFilePath) {
    console.log("saving jsonData",pjsonData,"To file:",pjsonFilePath);
      // Write the organization structure to a JSON file
    jsonfile.writeFileSync(pjsonFilePath, pjsonData, { encoding: 'utf-8', spaces: 4 });
}
*/






//async function toEmployeesJson(csvFilePath, jsonFilePath) {
async function toEmployeesJson(csvOrgData, jsonOrgData) {

    return new Promise((resolve,reject) => {


  const employees = [];
  const departments = [];
  let organization = null;
  var gorgJson ; 

  var empJson = {};
  var deptJson = {};
  var orgJson = {};

      let count = 0;
      let managerCount = 0;
      let empCount = 0;


  //const csvReadStream = fs.createReadStream(csvFilePath, { encoding: 'utf-8' });
  //let csvReadStream = csvOrgData("csvData").stream() ; 

/*
  csvReadStream
    .pipe(parse())
    .on('readable', (row) => 
*/

const records = parse(csvOrgData,{columns:true});

for  (let row of records)  {

      console.log("--------------> ondata");

        // Your original logic for processing each row goes here

        // ...

        console.log("processing the row",row);
        count ++ ; 

        let e = row ;


        let empl = {};
        empl['name'] = e['name'];
        empl['department'] = e['department'];
        empl['salary'] = toNum(e['salary']);
        empl['office'] = e['office'];
        empl['isManager'] = toBool(e['isManager']);
        empl['skills'] = [e['skill1'], e['skill2'], e['skill3']];
        employees.push(empl);
        //console.log(empl);
    
        let dept = empl['department'];
        //console.log("department is ", dept);
        let found = false;
    
    
        if (empl['isManager']) {
            managerCount += 1;
            let manager = empl['name'];
            console.log(empl['name'], " is MANAGER                 ");
    
            let found = false;





            let deptRecord ;
            for (const d of departments) {
                if (d['name'] === dept) {
                    // console.log(`department is already there: ${d}`);
                    const existingName = d['managerName'] || null;
             
                    if (existingName === null) {
                        // console.log("department's manager is assigned to myself");
                        d['managerName'] = manager;
                    } else {
                        // printf("duplicate manager name will not come depart exists but manager name is there");
                        // console.log("??????????????????????????????? can I replace existing name:", manager, existingName);
                    }
            
                    deptRecord = d;
                    found = true;
                    break;
                }
            }
            
            if (!found) {
                deptRecord = { 'name': dept, 'managerName': manager, 'employees': [empl] };
                departments.push(deptRecord);
                // console.log(" - ( dept was not there hence added new ) - and myself as manager )");
                // console.log(deptRecord);
            } else {
                deptRecord['employees'].push(empl);
                // console.log(" - ( dept was there hence checking ) - myself is there or not ");
                // console.log(deptRecord);
                // pass
            }
        } else {
            let deptRecord ; 
            // handle non manager case ( I.e employee ) 

            empCount += 1;


            // console.log(empl['name'], " is not a manager", end=" ");

            let found = false;
            for (const d of departments) {
                     if (d['name'] === dept) {
                         // console.log("department is already there", d);
                         deptRecord = d;
                         found = true;
                         break;
                     }
            }

            if (!found) {
                deptRecord = { 'name': dept, 'managerName': null, 'employees': [empl] };
                // console.log(`- new dept with None Manager emplo is added ${deptRecord}`);
                departments.push(deptRecord);
            } else {
                deptRecord['employees'].push(empl);
                // console.log(`- existing department is added ${deptRecord['name']}`);
            }
        }

    /*
    */
    }
    //.on('end', () => 
    {
      console.log("--------------> end");
      empJson['employees'] = employees;
      deptJson['departments'] = departments;
      orgJson['organization'] = deptJson;

      var gorgJson ; 

      // Output organization structure to the console
      console.log('\n\n================================= Organization');
      const od = orgJson['organization'];
      const dx = od['departments'];
      for (const d of dx) {
        console.log('------------');
        console.log('Name: ', d['name']);
        console.log('managerName: ', d['managerName']);
        console.log('Employees: ');
        let ec = 0;
        for (const e of d['employees']) {
          //console.log(e);
          ec += 1;
        }
        console.log(`Total ${ec} \n`);
      }
      console.table(orgJson);
      console.table(orgJson.organization);
      console.table(orgJson.organization.departments);
      gorgJson = orgJson ; 
      console.table(gorgJson);
      resolve(gorgJson);

      // Write the organization structure to a JSON file
      //jsonfile.writeFileSync(jsonFilePath, orgJson, { encoding: 'utf-8', spaces: 4 });
    /*
     ----
    .on('error', (error) => ---

      console.error('Error reading CSV file:', error.message);
      reject(error);
      ----
    -----
    */
  }
});
}






