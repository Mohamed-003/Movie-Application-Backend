const express = require("express");
const app = express();
const loginRoutes = require("./Routes/login");
const registerRoutes = require("./Routes/register");
const movieRoutes = require("./Routes/movie");
const cors = require('cors');

app.use(cors());

app.use("/register", registerRoutes);
app.use("/login", loginRoutes);
app.use("/movie", movieRoutes);
app.get("/", (req, res) => {
    res.send("Server Running!");
});
app.listen((3000), () => {
    console.log("Server Running on PORT 3000")
})

//    RESET DB:
//    npx prisma migrate reset

