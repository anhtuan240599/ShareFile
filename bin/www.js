const server = require("../index")
const app = require("http").createServer(server)

app.listen(process.env.PORT || 3000,()=>{
    console.log("LISTEN http://localhost:3000")
})