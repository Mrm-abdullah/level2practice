import type { IncomingMessage, ServerResponse } from "http";
import { productController } from "../controller/product.controller";

export const routeHandler = (req: IncomingMessage, res: ServerResponse) => {

    // console.log(req.url);
    // console.log(req.method);
    const url = req.url
    const method = req.method
    if (url === '/' && method === "GET") {
        // res.writeHead(200, {"content-type": "text/plain"})
        // res.end("this is hone page")

        res.writeHead(200, {"content-type": "application/json"})
        res.end(JSON.stringify({Message:   "this is hone page"})) 
    }else if (url?.startsWith("/product")) {
        productController(req, res);
    }
    
    else{
        res.writeHead(404, {"content-type": "text/plain"})
        res.end("Content not found")
    }
};