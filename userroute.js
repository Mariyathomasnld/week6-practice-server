const express = require("express");
const app = express();
// const { PORT } = require("./config/constants");
const PORT = 4007;

const User = require("./models").user;
const Space = require("./models").space;
const Story = require("./models").story;





app.get("/users/:userId", async (req, res, next) => {
  try {
    const userId = parseInt(req.params.userId);
    const userById = await User.findByPk(userId, {
      include: [{ model: Space, include: { model: Story } }],
    });
    if (!userById) {
      res.status(404).send("User not found");
    } else {
      res.json(userById);
    }
  } catch (e) {
    next(e);
  }
});

app.put("/users/:userId", async (req, res, next) => {
  try {
    const userId = parseInt(req.params.userId);
    const userToUpdate = await User.findByPk(userId);
    if (!userToUpdate) {
      res.status(404).send("User not found");
    } else {
      const updatedUser = await userToUpdate.update(req.body);
      res.json(updatedUser);
    }
  } catch (e) {
    next(e);
  }
});

app.delete("/users/:userId", async (req, res, next) => {
  try {
    const UserId = parseInt(req.params.userId);
    const toDelete = await User.findByPk(UserId);
    if (!toDelete) {
      res.status(404).send("User not found");
    } else {
      const deleted = await toDelete.destroy();
      res.json(deleted);
    }
  } catch (e) {
    next(e);
  }
});



app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
