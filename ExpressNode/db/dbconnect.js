const mysql=require("mysql");

var mysqlconnection=mysql.createConnection({
    host:'127.0.0.1',
    user:'root',
    password:'root',
    database:'endmodulexpress',
    port:3306
});


mysqlconnection.connect((err)=>{
    if(!err){
        console.log("Connected Successfully");
    }
    else{
        console.log("error in connection",err);
    }
});

module.exports=mysqlconnection;