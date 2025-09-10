const express = require("express");
const app = express();
const path = require("path");
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, "public")));
const ejsmate = require("ejs-mate");
app.engine("ejs",ejsmate);

const port=8080;
app.listen(port,()=>{
    console.log(`app is listing on port ${port}`)
})
app.get("/",(req,res)=>{
    res.render("index.ejs");
})
app.get("/fcfs",(req,res)=>{
    res.render("fcfs.ejs");
})
app.get("/sstf",(req,res)=>{
    res.render("sstf.ejs");
})
app.get("/look",(req,res)=>{
    res.render("look.ejs");
})
app.get("/clook",(req,res)=>{
    res.render("clook.ejs");
})
app.get("/scan",(req,res)=>{
    res.render("scan.ejs");
})
app.get("/cscan",(req,res)=>{
    res.render("cscan.ejs");
})
app.get("/stimulate",(req,res)=>{
    res.render("form.ejs");
})