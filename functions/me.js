import me from './me/data' 

export async function onRequestGet(context) {
    let request = context.request 
    let env = context.env
    console.log("Request is ",request);
    console.log("Environment is ",env);
    return await handleRequestMe(request, env);
}


var handleRequestMe = async (request, env) => {
   const getKV = (key) => env.KVSPACE.get(key);
   const mekey = `me`;
   let data;
   let localdata = await getKV(mekey);
   data = JSON.parse(localdata);
   console.log(data);
   const body = JSON.stringify(data);
   return new Response(
     body,
     { headers: { "Content-Type": "text/json", "Access-Control-Allow-Origin": "*" }, status: 200 }
   );
   console.log("responding to Me request");
   return new Response("Me", { status: 200 });
 };

