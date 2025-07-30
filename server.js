const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const cors = require("cors");
const connectDB = require("./config/mongo.js");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const path = require("path");
app.use(express.static(path.join(__dirname, "../public")));
dotenv.config();
app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", require("./authRouter.js"));
app.use(
  cors({
    origin: (origin, callback) => {
      callback(null, true);
    },
    credentials: true,
  })
);
connectDB();


// app.get("/users/:id", (req, res) => {
//   res.send(users);
// });

// app.post("/users/:id", async (req, res) => {
//   try {
//     const salt = await bcrypt.genSalt();
//     const hashedPassword = await bcrypt.hash(req.body.password, salt);
//     console.log(salt);
//     console.log(hashedPassword);
//     const user = {
//       name: req.body.name,
//       email: req.body.email,
//       password: hashedPassword,
//     };
//     users.push(user);
//     res.status(201).json(user);
//   } catch {
//     res.status(500).send();
//   }
// });
// app.post("/users/Login/:id", async (req, res) => {
//   const user = users.find((user) => user.email == req.body.email);
//   if (user == null) {
//     return res.status(400).send("Cannot find user");
//   }
//   try {
//     if (await bcrypt.compare(req.body.password, user.password)) {
//       res.send("Login successful");
//     } else {
//       res.send("Password incorrect");
//     }
//   } catch {
//     res.status(500).send();
//   }
// });

app.listen(5050, () => {
  console.log("Server running on port 5050");
});
