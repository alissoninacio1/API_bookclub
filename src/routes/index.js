const express = require("express");
const router = express.Router();

router.use("/books", require("./books"));
router.use("/clubs", require("./clubs"));
router.use("/meetings", require("./meetings"));
router.use("/members", require("./members"));

module.exports = router;