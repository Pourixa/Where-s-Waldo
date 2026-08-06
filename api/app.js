const express = require("express");
const gameRouter = require("./routes/game");
const app = express();


app.use(express.json())


app.use("/game",gameRouter)
app.use((err, req, res, next) => {
    console.error(err);

    res.status(err.code || 500).json({
        message: err.message || "Something went wrong."
    });
});
app.listen(8585,(err) => {
    if(err) 
        console.log("App can not run")
    console.log("App running on 8585")
} )