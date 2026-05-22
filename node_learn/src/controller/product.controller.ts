import type { IncomingMessage, ServerResponse } from "http";
import { readProduct } from "../service/product.service";
import type { IProduct } from "../types/product.type";
import { parseBody } from "../utility/parseBody";

export const productController = async(req: IncomingMessage, res: ServerResponse) => {
    const products = readProduct()
    const url = req.url
    const urlParts = url?.split("/");
//   console.log(urlParts);
    const method = req.method

    const id = urlParts && urlParts[1] === "products" ? Number(urlParts[2]) : null;
    // console.log(id)

    if (url === '/products' && method === "GET"){
        res.writeHead(200, {"content-type": "application/json"})
        res.end(JSON.stringify({Message:   "this is Products page", data : products}))
        
    
    }
    else if (method === "GET" && id !== null)  {
      const products = readProduct();
      const product = products.find((p: IProduct) => p.id === id);
      res.end(JSON.stringify({Message:  "this is Product page", data : product}))
    
    }else if (method === "POST" && url === "/products") {
    // Created Product by Post Method
    const body = await parseBody(req);
    console.log("Body", body);
    res.writeHead(200, {"content-type": "application/json"})
    res.end(JSON.stringify({Message: "product created"}))

    // const products = readProduct(); // [{},{},{}]
    // const newProduct = {
    //   id: Date.now(),
    //   ...body,
    // };
    }
    
};