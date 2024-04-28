const app = require("./app");
const dotenv = require('dotenv');
const connectDatabase = require("./config/database")
// config
dotenv.config({path:"backend/config/config.env"});

// connect database
connectDatabase();

app.get("/",(req,res)=>{
    res.send("ecommerce app")
})

const server = app.listen(process.env.PORT,()=>{
    console.log(`server is running on http://localhost:${process.env.PORT}`)
})

// uncaught error handling

process.on("uncaughtException",(err)=>{
    console.log(`error: ${err.message}`)
    console.log("shutting down the server due to unhandled Promise Rejection")
    process.exit(1);
})
// console.log(youtube) //error = youtube is not define


// unhandled promise rejection
process.on("unhandledRejection",(err)=>{
    console.log(`error: ${err.message}`)
    console.log("shutting down the server due to unhandled Promise Rejection")
    server.close(()=>{
        process.exit(1);
    });
});