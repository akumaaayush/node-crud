const express = require("express");
const blogController = require("../controller/blogController");
const router = express.Router();

//blogs viewer routes
router.get("/", blogController.blog_index);

//create-blog route
router.get("/create", blogController.blog_create_get);

//post request to submit form data
router.post("/", blogController.blog_create_post);

//get request for particular id
router.get("/:id", blogController.blog_details);

//delete request
router.delete("/:id", blogController.blog_delete);

module.exports = router;
