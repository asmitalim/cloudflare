import amidata from './whoami/data' 

export function onRequestGet() {
    return Response.json(amidata)
}
