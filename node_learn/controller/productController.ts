import { createServer, IncomingMessage, ServerResponse } from "http"

export const productController = ((req: IncomingMessage, res: ServerResponse)=>{
        const url = req.url
        const method = req.method
        
    if (url === '/product' && method === "GET") {
        res.writeHead(200, {"content-type": "application/json"})
        res.end(JSON.stringify({Message:   "this is Product page", data:{}}))
    }
    
    else{
        res.writeHead(404, {"content-type": "text/plain"})
        res.end("Content not found")
    }
})