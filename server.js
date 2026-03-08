import express from "express";
import Pool from "pg";

const app=express();
app.use(express.json());

const pool=new Pool.Pool({
    host:"db",
    user:"postgres",
    database:"urlshortener",
    password:"password",
    port:5432
});


function generateShort(){
    return Math.random().toString(36).substring(2,8);
}
app.get("/", (req, res) => {
  res.send("DevOps URL Shortener API running 🚀");
});

app.post("/create",(req,res)=>{
    const {url}=req.body;
    const short=generateShort();
    pool.query('INSERT INTO urls(short, url) VALUES($1, $2)', [short, url], (err, res) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error saving URL');
        }
        res.json({short});
    });
});

app.get("/:short",(req,res)=>{
    const url=db[req.params.short];
    if(!url) return res.status(404).send("Not found");
    res.redirect(url);
});

app.listen(3000, "0.0.0.0", () => {
  console.log("Server running on port 3000");
});