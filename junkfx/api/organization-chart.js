import orgdata from './organization-chart/data' 

export function onRequestGet() {
    return Response.json(orgdata)
}
