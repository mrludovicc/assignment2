///////////////////////////////
// Import Router
////////////////////////////////
const router = require("express").Router();
const User = require("../models/User");
const auth = require("./authMiddleware");

///////////////////////////////
// Router Specific Middleware
////////////////////////////////
router.use(auth);
router.use(async (req, res, next) => {
  req.user = await User.findById(req.session.user.id);
  next();
});

///////////////////////////////
// Router Routes
////////////////////////////////
router.get("/", async (req, res) => {
  const user = req.user;
  const hopes = user.hopes;
  res.render("hopes/index", {
    hopes,
  });
});

router.post("/", async (req, res) => {
  const user = req.user;
  user.hopes.push(req.body);
  user.save();
  res.redirect("/hopes/");
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const index = req.user.hopes.findIndex((hope) => `${hope._id}` === id);
  const hope = req.user.hopes[index];
  console.log(hope);
  res.render("hopes/show", {
    hope,
  });
});

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const index = req.user.hopes.findIndex((hope) => `${hope._id}` === id);
  req.user.hopes[index].text = req.body.text;
  req.user.save();
  res.redirect("/hopes");
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const index = req.user.hopes.findIndex((hope) => `${hope._id}` === id);
  req.user.hopes.splice(index, 1);
  req.user.save();
  res.redirect("/hopes");
});
///////////////////////////////
// Export Router
////////////////////////////////
module.exports = router;
