const mysql = require("mysql2")
const connection = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"123456",
    database:"sruthi"
})
connection.connect((err)=>{
    if(err){
        console.log(err.message)
    }else{
       
        console.log("server connected")
    }
    
})

module.exports=connection