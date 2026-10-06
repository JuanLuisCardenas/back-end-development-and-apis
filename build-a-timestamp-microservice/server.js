import express from "express";
import cors from "cors";

const app = express();

app.use(cors({ optionsSuccessStatus: 200 }));

app.use(express.static("public"));

app.get("/", (_req, res) => {
  res.sendFile(import.meta.dirname + "/views/index.html");
});
// Do not change code above this line

app.get("/api{/:date}", (req, res) => {
  const dateP = req.params.date || "";
  //console.log(dateP);
  if(!dateP) {
    const currDate = new Date();;
    return res.json({ unix: currDate.valueOf(),
      utc: currDate.toUTCString()
    });
  }
  if(!dateP.includes("-") && !dateP.includes(" ") && !dateP.includes("/")){
    const milli = Number(dateP);
    const milliStr = new Date(milli);
    if(isNaN(milliStr.getTime())){
      //console.log(dateP);
      return res.json({ error:"Invalid date" });
    }
    //console.log("Not -, mill:", milli);
    return res.json({ unix: milli, utc: milliStr.toUTCString()});
  }
  const dateS = new Date(dateP);
  if(isNaN(dateS.getTime())){
      //console.log(dateP);
      return res.json({ error:"Invalid date" });
  }
  //console.log("Getting date..");
  return res.json({
    unix: dateS.valueOf(),
    utc: dateS.toUTCString()
  });

});



// Do not change code below this line
const PORT = 8000;
const listener = app.listen(PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
