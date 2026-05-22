import type { IncomingMessage, ServerResponse } from "http";
import { insertProduct, readProduct } from "../service/product.service";
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
    // console.log("Body", body);
    const products = readProduct(); // [{},{},{}]
    const newProduct = {
      id: Date.now(),
      ...body,
    };

    // console.log(newProduct);
    products.push(newProduct); // [{},{},{},{new}]
    // console.log(products);
    insertProduct(products);

    res.writeHead(200, { "content-type": "application/json" });
    res.end(
      JSON.stringify({message: "Product created successfully", data: newProduct}));
    }else if (method === "PUT" && id !== null) {
    // Updated product by PUT method
    const body = await parseBody(req);
    const products = readProduct();

    const index = products.findIndex((p: IProduct) => p.id === id);
    // console.log(index);
    if (index < 0) {
      res.writeHead(404, { "content-type": "application/json" });
      res.end(JSON.stringify({ message: "Product not found!", data: null, }));
    }

    // console.log(products[index]);
    products[index] = { id: products[index].id, ...body };

    insertProduct(products);

    res.writeHead(200, { "content-type": "application/json" });
    res.end( JSON.stringify({ message: "Product updated successfully!", data: products[index], }));
  } 
    
};