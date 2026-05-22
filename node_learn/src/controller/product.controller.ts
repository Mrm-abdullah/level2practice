import type { IncomingMessage, ServerResponse } from "http";
import { readProduct } from "../service/product.service";
import type { IProduct } from "../types/product.type";

export const productController = async(req: IncomingMessage, res: ServerResponse) => {
    const products = readProduct()
    const url = req.url
    const urlParts = url?.split("/");
//   console.log(urlParts);
    const method = req.method

    const id = urlParts && urlParts[1] === "product" ? Number(urlParts[2]) : null;
    // console.log(id)

    if (url === '/product' && method === "GET"){
        res.writeHead(200, {"content-type": "application/json"})
        res.end(JSON.stringify({Message:   "this is Products page", data : products}))
        
    
    }
    else if (method === "GET" && id !== null)  {
      const products = readProduct();
      const product = products.find((p: IProduct) => p.id === id);
      res.end(JSON.stringify({Message:   "this is Product page", data : product}))
    }
    
};