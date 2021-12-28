const { Router } = require("express");

const router = new Router();

const auth = require("../auth/middleware");
const Space = require("../models").space;
const Story = require("../models").story;
const User = require("../models").user;

//allspaces with stories
router.get("/", async (req, res, next) => {
  try {
    const allSpaces = await Space.findAll({
      include: [{ model: Story }],
    });
    if (!allSpaces) {
      res.status(404).send("Spaces not found");
    } else {
      res.json(allSpaces);
    }
  } catch (e) {
    next(e);
  }
});

// POST a new story to space with corresponding `id`
router.post("/:id/stories", auth, async (req, res, next) => {
  try {
    const space = await Space.findByPk(req.params.id);
    console.log(space);

    if (space === null) {
      return res.status(404).send("This space does not exist");
    }

    if (!space.userId === req.user.id) {
      return res
        .status(403)
        .send("You are not authorized to update this space");
    }

    const { name, imageUrl, content } = req.body;

    if (!name) {
      return res.status(400).send("A story must have a name");
    }

    const story = await Story.create({
      name,
      imageUrl,
      content,
      spaceId: space.id,
    });

    return res.status(201).send("Story created", story);
  } catch (e) {
    next(e);
  }
});

// PATCH - update space details
router.patch("/:id", auth, async (req, res) => {
  try {
    const space = await Space.findByPk(req.params.id);
    if (!space.userId === req.user.id) {
      return res
        .status(403)
        .send({ message: "You are not authorized to update this space" });
    }

    const { title, description, backgroundColor, color } = req.body;

    await space.update({ title, description, backgroundColor, color });

    return res.status(200).send({ space });
  } catch (e) {
    next(e);
  }
});




router.delete("/:spaceId/stories/:storyId", auth, async (req, res, next) => {
  try {
    const { spaceId, storyId } = req.params;
    const story = await Story.findByPk(storyId, { include: [Space] });
    if (!story) {
      return res.status(404).send("Story not found");
    }

    // Check if this user is the owner of the space
    if (story.space.userId !== req.user.id) {
      return res.status(401).send("You're not authorized to delete this story");
    }

    await story.destroy();

    res.send({ message: "ok", storyId });
  } catch (e) {
    next(e);
  }
}); 

module.exports = router;
