const express = require("express");
const app = express();
// const { PORT } = require("./config/constants");
const PORT = 4005;

const corsMiddleWare = require("cors");
const bodyParserMiddleWare = express.json();
const authMiddleWare = require("./auth/middleware");
const authRouter = require("./routers/auth");
const spaceRouter = require("./routers/space")

app.use(corsMiddleWare());
app.use(bodyParserMiddleWare);

app.use("/auth", authRouter);
app.use("/spaces",spaceRouter)

// app.post("/authorized_post_request", authMiddleWare, (req, res) => {
//   // accessing user that was added to req by the auth middleware
//   const user = req.user;
//   // don't send back the password hash
//   delete user.dataValues["password"];

//   res.json({
//     youPosted: {
//       ...req.body,
//     },
//     userFoundWithToken: {
//       ...user.dataValues,
//     },
//   });
// });

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
