import type { IncomingMessage, ServerResponse } from "http";

export const productController = (req: IncomingMessage, res: ServerResponse) => {

    const url = req.url
    const method = req.method
    if (url === '/product' && method === "GET"){
        const product   = [
          {
            id: 1,
            name: "AnimationTimeline",
            role: "admin"
          }
        ]
        res.writeHead(200, {"content-type": "application/json"})
        res.end(JSON.stringify({Message:   "this is Product page", data : product}))
    }
    
};