const express = require("express");
const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");
const cors = require("cors")

const app = express();

app.use(cors({
  origin: '*'
}));

app.get("/test", (req, res) => {
  res.send("Hello world!");
});

// this is countires 
app.get("/healthcare", (req, res) => {
  const results = [];
  const csvFilePath = path.join(__dirname, "healthcare.csv");

  fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on("data", (data) => results.push(data))
    .on("end", () => {
      res.json(results);
    });
});

// this is for companies
app.get("/company",(req,res)=>{
    const results=[]
    const csvFilePath = path.join(__dirname, "company.csv");

    fs.createReadStream(csvFilePath)
      .pipe(csv())
      .on("data", (data) => results.push(data))
      .on("end", () => {
        res.json(results);
      });
    
})

app.listen(4000, () => {
  console.log("Server is running at port 4000...");
});
