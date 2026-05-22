import type { IncomingMessage, ServerResponse } from "http";
import { insertProduct, readProduct } from "../service/product.service";
import type { IProduct } from "../types/product.type";
import { parseBody } from "../utility/parseBody";
import { sendResponse } from "../utility/sendResponse";

export const productController = async(req: IncomingMessage, res: ServerResponse) => {
    const products = readProduct()
    const url = req.url
    const urlParts = url?.split("/");
//   console.log(urlParts);
    const method = req.method

    const id = urlParts && urlParts[1] === "products" ? Number(urlParts[2]) : null;
    // console.log(id)

    if (url === '/products' && method === "GET"){
        try {
            const products = readProduct();
            return sendResponse(res, 200, true, "Products get successfully", products);
        } catch (error) {
            return sendResponse(res, 500, false, "Something went wrong!", error);
        }        
    }else if (method === "GET" && id !== null)  {
        try {
            const products = readProduct(); // [{}]
            const product = products.find((p: IProduct) => p.id === id); // id === id
            if (!product) {
                return sendResponse(res, 404, false, "Product not found!");
            }
            return sendResponse( res, 200, true, "Product get successfully", products);
        } catch (error) {
            return sendResponse(res, 500, false, "Something went wrong!", error);
        }    
    }else if (method === "POST" && url === "/products") {
        
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
  
    }else if (method === "DELETE" && id !== null) {
        const products = readProduct();
        const index = products.findIndex((p: IProduct) => p.id === id);
        if (index < 0) {
        res.writeHead(404, { "content-type": "application/json" });
        res.end(JSON.stringify({message: "Product not found!",data: null}));
        }

        products.splice(index, 1);
        // console.log(products);
        insertProduct(products);
        res.writeHead(200, { "content-type": "application/json" });
        res.end(JSON.stringify({ message: "Product deleted successfully!",data: null}));
    }
    
};