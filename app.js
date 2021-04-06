const express=require("express");
const bodyparser=require("body-parser");
const https =require("https");
// const request=require("request");


const app=express();

app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended:true}));
app.get("/",function(req,res){
  res.sendFile(__dirname+"/signup.html")
});

// app.post("/instagram",function(req,res){
//   res.sendFile(__dirname+"/signup.html")
// });


app.post("/",function(req,res){
  const email=req.body.email;
  const username = req.body.username;
  const password=req.body.password;
  const data = {
    members : [
      {
        email_address : email,
        status : "subscribed",
        merge_fields:{
          FNAME: username,
          LNAME: password,
        }
      }
    ]
  }
  const jsonData =JSON.stringify(data);
  const url= "https://us1.api.mailchimp.com/3.0/lists/9dca86e539"
  const option ={
    method :"POST",
    auth:"Sumit:8d41a0b0766f89ee3caabb306ed2eb3a-us1"
  }
  const request=https.request(url,option,function(response){
    if(response.statusCode===200){
      res.sendFile(__dirname+"/success.html")
    }
    else{
      res.sendFile(__dirname+"/failure.html")
    }
    response.on("data",function(data){
      console.log(JSON.parse(data));

    });
});
request.write(jsonData);
request.end();
});



app.listen(process.env.PORT || 3000,function(){
  console.log("port at 3000");

});


//
// api key
// 9a98e1914c3a06de31cd4f5675744f65-us1
// list id
// 0a86bedb06
