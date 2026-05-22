import type { IncomingMessage, ServerResponse } from "http";
import { readProduct } from "../service/product.service";

export const productController = (req: IncomingMessage, res: ServerResponse) => {
    const product = readProduct()
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