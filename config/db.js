const {Client}= require('pg');

const con = new Client({
    host:"localhost",
    user:"postgres",
    port:5432,
    password:"San@sebu11",
    database:"demodb"
});

con.connect().then(()=> console.log("connected"))

module.exports=con;