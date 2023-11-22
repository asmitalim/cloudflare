import me from './me/data' 

export function onRequestGet() {
    return Response.json(me)
}
