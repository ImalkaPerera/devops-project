import express from "express";

const app=express();
app.use(express.json());

const db={};


function generateShort(){
    return Math.random().toString(36).substring(2,8);
}

app.post("/create",(req,res)=>{
    const {url}=req.body;
    const short=generateShort();
    db[short]=url;
    res.json({short});
})

app.get("/:short",(req,res)=>{
    const url=db[req.params.short];
    if(!url) return res.status(404).send("Not found");
    res.redirect(url);
});

app.listen(3000,()=>{
    console.log("Server running on port 3000");
});