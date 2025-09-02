const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  let inp = path.join(__dirname,"..","inputs.txt")
  let out = path.join(__dirname,"..","result.txt")
  if (req.url=="/calculate"){

   fs.readFile(inp,"utf-8",(err,data)=>{
    if (err){
      res.writeHead(500)
      res.end("Unable to write result")
    }
    let num = data.split("\n")
    let a = Number(num[0])
    let b = Number(num[1])
    let c = num[2]
    let ans=0
    let x=0
    if (isNaN(a) || isNaN(b)){
      res.writeHead(400)
      res.end("Invalid Number")
    }
    else if (c=="add"){
      ans = a + b
    }
    else if (c=="subtract"){
      ans = a - b
    }
    else if (c=="multiply"){
      ans = a * b
    }
    else if (c=="divide"){
      
      if (b==0){
        x=1
      }
      else{

           ans = a / b
      }
    }
    else{
      x=2
    }


    fs.writeFile(out,ans.toString(),"utf-8",(err)=>{
      if (err){
        res.writeHead(500)
        res.end("Unable to write result")
      }
      
    else {
      if (x==1){
        res.writeHead(400)
        res.end("Division by zero")
      }
      else if (x==2){
      res.writeHead(400)
      res.end("Invalid Operator")

    }
    else {
      res.writeHead(200)
      res.end(ans.toString())

    }

    }
    
    })
    
  });
}
else {
  res.writeHead(404)
  res.end("Not Found")

}
});



// Do not modify this
server.listen(3000, () => {
  console.log('Server is listening on port 3000');
});

// Export for testing
module.exports = server;
