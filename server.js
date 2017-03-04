//Creating a Simple Web File Server in Node JS
//Require the core module http
var http = require("http");
//Require fs core module
var fs = require("fs");
//Always create a 404 response

function send404response(response) {
    response.writeHead(404, { "Content-Type": "text/plain" });
    response.write("Error 404: File not Found");
    response.end();

}

//Create on request response
//Handle a user request

function onRequest(request, response) {

    //Check for user request for homepage
    if (request.method == "GET" && request.url == "/")
    {
        response.writeHead(200, { "Content-Type": "text/html" }); //Change Content-Type or Context-Type to html to send html
        //Send file as a stream
        fs.createReadStream("./index.html").pipe(response); //Read to stream
       
    }
  else if(request.method == "GET" && request.url == "/picture=cat")
  {
          response.writeHead(200, { "Content-Type": "text/html" }); //Change Content-Type or Context-Type to html to send html
          response.write("<img src='https://s-media-cache-ak0.pinimg.com/736x/07/c3/45/07c345d0eca11d0bc97c894751ba1b46.jpg'/>");
          response.end();
  }
    else
    {
        send404response(response);
    }
}

http.createServer(onRequest).listen(process.env.PORT || 8888);

//Server status log
console.log("Server is running...");

