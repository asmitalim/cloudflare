import me from './me1/data' 

export function onRequestGet() {
    return Response.json(me)
}
