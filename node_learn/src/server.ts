
import console from "console"
import {createServer, Server, IncomingMessage, ServerResponse} from "http"
import { routeHandler } from "./routes/route"

const server : Server = createServer((req: IncomingMessage, res: ServerResponse)=>{
    routeHandler(req, res);   
    
})

server.listen(5000,()=>{
    console.log("server in run for 5000")
})
