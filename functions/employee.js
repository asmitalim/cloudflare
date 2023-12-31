export async function onRequestPost(context) {
  let request = context.request
  let env = context.env
  console.log("Request is ", request);
  console.log("Environment is ", env);
  return await handleQuery(request, env);
}


import { parse } from 'csv-parse/browser/esm/sync';


var handleQuery = async (request, env) => {
  let body = await request.text();

  let queryJson = await JSON.parse(body);

  let namePattern = queryJson.name;
  let departmentPattern = queryJson.department;
  let officePattern = queryJson.office;
  let skillsPattern = queryJson.skill;
  let minSalary = queryJson.minSalary;
  let maxSalary = queryJson.maxSalary;

  if (minSalary) {
    minSalary = parseInt(minSalary);
    if (minSalary) {
      console.log("Min Salary = ", minSalary);
    } else {
      minSalary = 0;
      console.log("Min Salary = ", minSalary);
    }
  } else {
    minSalary = -1;
    console.log("Min Salary = ", minSalary);
  }
  if (maxSalary) {
    maxSalary = parseInt(maxSalary);
    if (maxSalary) {
      console.log("Max Salary = ", maxSalary);
    } else {
      maxSalary = 0;
      console.log("Max Salary = ", maxSalary);
    }
  } else {
    maxSalary = 1000001;
    console.log("maxSalary = ", maxSalary);
  }




  console.log(` name ${namePattern}, dept ${departmentPattern}`)
  console.log(` skills ${skillsPattern}, office ${officePattern}`)

  var namere = null;
  var deptre = null;
  var officere = null;
  var skillre = null;
  if (namePattern) {
    namere = new RegExp(namePattern);
    //console.log("namere is ",namere);
  }
  if (departmentPattern) {
    deptre = new RegExp(departmentPattern);
    //console.log("department re is ",deptre);
  }
  if (officePattern) {
    officere = new RegExp(officePattern);
    //console.log("office re is ",officere);
  }
  if (skillsPattern) {
    skillre = new RegExp(skillsPattern);
    //console.log("skills re is ",skillre);
  }

  const getKV = (key) => env.KVSPACE.get(key);
  const orgkey = `organization`;

  let data;
  const localkvdata = await getKV(orgkey);
  data = JSON.parse(localkvdata);

  let empls = [];

  for (let d of data.organization.departments) {
    d.employees.map(e => {
      let matched = true;
      if (namere !== null) {
        matched = matched && namere.test(e.name);
      }
      if (officere !== null) {
        matched = matched && officere.test(e.office);
      }
      if (deptre !== null) {
        matched = matched && deptre.test(e.department)
      }
      if (skillre !== null) {
        let skillmatch = false;
        for (let s of e.skills) {
          skillmatch = skillmatch || skillre.test(s);
        }
        matched = matched && skillmatch;
      }
      if (matched) {
        if ((e.salary <= maxSalary) && (e.salary >= minSalary)) {
          empls.push(e)
        }
        else { }

      } else {
        //console.log("skipping");
      }


    });
  }
  console.log("--------------------------- Interesting employees ------------------");
  console.table(empls);
  body = JSON.stringify({ "employees": empls });





  return new Response(
    body,
    { headers: { "Content-Type": "text/json", "Access-Control-Allow-Origin": "*" }, status: 200 }
  );
};


