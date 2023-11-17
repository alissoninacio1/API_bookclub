const mongodb = require("./database/db.connection");
const Book = require("../models/books.model.js");
const ObjectId = require("mongodb").ObjectId;

//get all books from books collection
const getAllBooks = async (req, res) => {
  const result = await mongodb
    .getDb()
    .db("bookclub")
    .collection("books")
    .find();
    console.log("queried database")
  result.toArray().then((lists) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(lists);
  });
};

//get book by ID
const findBookById = async (req, res) => {
    const bookId = new ObjectId(req.params.id);
    if (!bookId) {
      res.status(400).send({ message: "Book ID cannot be empty!" });
      return;
    }
    console.log(bookId);
    const response = await mongodb
      .getDb()
      .db("bookclub")
      .collection("books")
      .findOne({ _id: docId });
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(response);
  };

//get book by Title
const findBookByTitle = async (req, res) => {
    const bookTitle = new ObjectId(req.params.title);
    if (!bookTitle) {
      res.status(400).send({ message: "Book Title cannot be empty!" });
      return;
    }
    console.log(bookTitle);
    const response = await mongodb
      .getDb()
      .db("bookclub")
      .collection("books")
      .findOne({ title: bookTitle });
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(response);
};
  
const findBookByAuthor = async (req, res) => {
    const bookAuthor = new ObjectId(req.params.author);
    if (!bookAuthor) {
      res.status(400).send({ message: "Author cannot be empty!" });
      return;
    }
    console.log(bookAuthor);
    const response = await mongodb
      .getDb()
      .db("bookclub")
      .collection("books")
      .find({ author: bookAuthor });
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(response);
  };

const addBook = async (req, res) => {
  try {
    const bookData = req.body;
    const newBook = new Book(bookData);
    await newBook.save();

  res.status(201).json(newBook); // Respond with the created Book
    } catch (error) {
        res.status(500).json({ error: error.message }); // Handle errors and respond with an error status
    }
};
    // console.log(req.params.id);
    // const book = {
    //   title: req.body.title,
    //   author: req.body.author,
    //   description: req.body.description,
    //   genre: req.body.genre,
    //   category: req.body.category,
    //   pages: req.body.pages,
    //   year: req.body.year,
    //   createdAt: req.body.createdAt,
    //   updatedAt: req.body.updatedAt
    // }
  const response = await mongodb
    .getDb()
    .db("bookclub")
    .collection("books")
    .insertOne(book);
  if (response.acknowledged) {
    res.status(201).json(book);
    console.log("book added");
  } else {
    res
      .status(500)
      .json(response.error || "Errors occured while adding the book");
};

const updateBook = async (req, res) => {
    const bookId = new ObjectId(req.params);
    const book = {
      title: req.body.title,
      author: req.body.author,
      description: req.body.description,
      genre: req.body.genre,
      category: req.body.category,
      pages: req.body.pages,
      year: req.body.year,
      createdAt: req.body.createdAt,
      updatedAt: req.body.updatedAt
    }
  console.log(book);
  const response = await mongodb
    .getDb()
    .db("bookclub")
    .collection("books")
    .replaceOne({ _id: bookId }, book);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || "An error occurred while updating the book.");
  }
};
const deleteBook = async (req, res) => {
  //const result = await idSchema.validateAsync(req.params.id);
  const bookId = new ObjectId(req.params.id);

  console.log(bookId);
  const response = await mongodb
    .getDb()
    .db("bookclub")
    .collection("books")
    .deleteOne({ _id: bookId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || "An error occurred while deleting the book");
  }
};


module.exports = {
    getAllBooks,
    findBookById,
    findBookByTitle,
    findBookByAuthor,
    addBook,
    updateBook,
    deleteBook

}