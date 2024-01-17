const express=require("express");
var myrouter=express.Router();

var connection=require("../db/dbconnect");
const { urlencoded } = require("body-parser");

myrouter.get("/student",function(req,resp){
    connection.query("select * from student",(err,data,fields)=>{
        if(err){
            resp.status(500).send("no data found");
        }
        else{
            resp.render("index",{studdata:data});
        }
    });
});

myrouter.get("/addstudent",function(req,resp){
    resp.render("add-stud");
});

myrouter.post("/insertstudent",function(req,resp){
    connection.query("insert into student values(?,?,?)",[req.body.studid,req.body.name,req.body.city],(err,result)=>{
        if(err){
            resp.status(500).send("no data inserted");
        }
        else{
            resp.redirect("/student");
        }
    });
});

myrouter.get("/deletestudent/:studid",function(req,resp){
    console.log(urlencoded);
    connection.query("delete from student where studid=?",[req.params.studid],(err,result)=>{
        if(err){
            resp.status(500).send("no data found"+err);
        }
        else{
            resp.redirect("/student");
        }
    });
});

myrouter.get("/updatestudent/:studid",function(req,resp){
    connection.query("select * from student where studid=?",[req.params.studid],(err,data)=>{
        if(err){
            resp.status(500).send("no data found");
        }
        else{
            resp.render("update-stud",{studdata:data});
        }
    });
});

myrouter.post("/updatestudent",function(req,resp){
    connection.query("update student set name=?,city=? where studid=?",[req.body.name,req.body.city,req.body.studid],(err,result)=>{
        if(err){
            resp.status(500).send("no data updated");
        }
        else{
            resp.redirect("/student");
        }
    });
});



module.exports=myrouter;

