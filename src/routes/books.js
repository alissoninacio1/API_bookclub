const express = require("express");
const router = express.Router();

const booksController = require("../controllers/books");

router.get("/", booksController.getAllBooks);

router.get("/:id", booksController.findBookById);

router.get("/:title", booksController.findBookByTitle);

router.get("/:author", booksController.findBookByAuthor);

router.post("/", booksController.addBook);

router.put("/:id", booksController.updateBook);

router.delete("/:id", booksController.deleteBook);

module.exports = router;