const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const postsController = require("../controllers/posts");
const { ensureAuth } = require("../middleware/auth");

//Post Routes - simplified for now
router.get("/:id", ensureAuth, postsController.getPost);
// router.get("/search", ensureAuth, postsController.doSearch);


router.post("/createPost", upload.single("file"), postsController.createReview);
router.post("/createRec", postsController.createRec);
router.post("/comments", postsController.createComment);


router.put("/likePost/:id", postsController.likePost);
router.put("/likePostInNewsfeed/:id", postsController.likePostInNewsfeed);

router.delete("/deletePost/:id", postsController.deletePost);

module.exports = router;
