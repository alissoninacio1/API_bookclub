// const mongodb = require("./database/db.connection");
// const Book = require("../models/books.model.js");
// const ObjectId = require("mongodb").ObjectId;

// //get all books from books collection
// const getAllBooks = async (req, res) => {
//   const result = await mongodb
//     .getDb()
//     .db("bookclub")
//     .collection("books")
//     .find();
//     console.log("queried database")
//   result.toArray().then((lists) => {
//     res.setHeader("Content-Type", "application/json");
//     res.status(200).json(lists);
//   });
// };

// //get book by ID
// const findBookById = async (req, res) => {
//     const bookId = new ObjectId(req.params.id);
//     if (!bookId) {
//       res.status(400).send({ message: "Book ID cannot be empty!" });
//       return;
//     }
//     console.log(bookId);
//     const response = await mongodb
//       .getDb()
//       .db("bookclub")
//       .collection("books")
//       .findOne({ _id: docId });
//     res.setHeader("Content-Type", "application/json");
//     res.status(200).json(response);
//   };

// //get book by Title
// const findBookByTitle = async (req, res) => {
//     const bookTitle = new ObjectId(req.params.title);
//     if (!bookTitle) {
//       res.status(400).send({ message: "Book Title cannot be empty!" });
//       return;
//     }
//     console.log(bookTitle);
//     const response = await mongodb
//       .getDb()
//       .db("bookclub")
//       .collection("books")
//       .findOne({ title: bookTitle });
//     res.setHeader("Content-Type", "application/json");
//     res.status(200).json(response);
// };
  
// const findBookByAuthor = async (req, res) => {
//     const bookAuthor = new ObjectId(req.params.author);
//     if (!bookAuthor) {
//       res.status(400).send({ message: "Author cannot be empty!" });
//       return;
//     }
//     console.log(bookAuthor);
//     const response = await mongodb
//       .getDb()
//       .db("bookclub")
//       .collection("books")
//       .find({ author: bookAuthor });
//     res.setHeader("Content-Type", "application/json");
//     res.status(200).json(response);
//   };

// const addBook = async (req, res) => {
//   try {
//     const bookData = req.body;
//     const newBook = new Book(bookData);
//     await newBook.save();

//   res.status(201).json(newBook); // Respond with the created Book
//     } catch (error) {
//         res.status(500).json({ error: error.message }); // Handle errors and respond with an error status
//     }
// };
//     // console.log(req.params.id);
//     // const book = {
//     //   title: req.body.title,
//     //   author: req.body.author,
//     //   description: req.body.description,
//     //   genre: req.body.genre,
//     //   category: req.body.category,
//     //   pages: req.body.pages,
//     //   year: req.body.year,
//     //   createdAt: req.body.createdAt,
//     //   updatedAt: req.body.updatedAt
//     // }
//   const response = await mongodb
//     .getDb()
//     .db("bookclub")
//     .collection("books")
//     .insertOne(book);
//   if (response.acknowledged) {
//     res.status(201).json(book);
//     console.log("book added");
//   } else {
//     res
//       .status(500)
//       .json(response.error || "Errors occured while adding the book");
// };

// const updateBook = async (req, res) => {
//     const bookId = new ObjectId(req.params);
//     const book = {
//       title: req.body.title,
//       author: req.body.author,
//       description: req.body.description,
//       genre: req.body.genre,
//       category: req.body.category,
//       pages: req.body.pages,
//       year: req.body.year,
//       createdAt: req.body.createdAt,
//       updatedAt: req.body.updatedAt
//     }
//   console.log(book);
//   const response = await mongodb
//     .getDb()
//     .db("bookclub")
//     .collection("books")
//     .replaceOne({ _id: bookId }, book);
//   console.log(response);
//   if (response.modifiedCount > 0) {
//     res.status(204).send();
//   } else {
//     res
//       .status(500)
//       .json(response.error || "An error occurred while updating the book.");
//   }
// };
// const deleteBook = async (req, res) => {
//   //const result = await idSchema.validateAsync(req.params.id);
//   const bookId = new ObjectId(req.params.id);

//   console.log(bookId);
//   const response = await mongodb
//     .getDb()
//     .db("bookclub")
//     .collection("books")
//     .deleteOne({ _id: bookId }, true);
//   console.log(response);
//   if (response.deletedCount > 0) {
//     res.status(204).send();
//   } else {
//     res
//       .status(500)
//       .json(response.error || "An error occurred while deleting the book");
//   }
// };


// module.exports = {
//     getAllBooks,
//     findBookById,
//     findBookByTitle,
//     findBookByAuthor,
//     addBook,
//     updateBook,
//     deleteBook

// }

// controllers/books.js
// controllers/books.js
const mongodb = require("../database/db.connection");
const Book = require("../models/books.model.js");
const ObjectId = require("mongodb").ObjectId;

// Get all books from the "books" collection
const getAllBooks = async (req, res) => {
  try {
    // Initialize the database
    await mongodb.initDb();

    const db = mongodb.getDb();
    const booksCollection = db.collection('books');
    const books = await booksCollection.find().toArray();

    res.json(books);
  } catch (error) {
    console.error('Error getting books:', error);
    res.status(500).send('Internal Server Error');
  }
};

// Get book by ID
const findBookById = async (req, res) => {
  try {
    // Initialize the database
    await mongodb.initDb();

    const db = mongodb.getDb();
    const booksCollection = db.collection('books');

    const bookId = new ObjectId(req.params.id);

    if (!bookId) {
      res.status(400).send({ message: 'Book ID cannot be empty!' });
      return;
    }

    const response = await booksCollection.findOne({ _id: bookId });

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(response);
  } catch (error) {
    console.error('Error finding book by ID:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get book by Title
const findBookByTitle = async (req, res) => {
  try {
    const bookTitle = req.params.title;
    if (!bookTitle) {
      res.status(400).send({ message: "Book Title cannot be empty!" });
      return;
    }

    const response = await mongodb
      .getDb()
      .collection("books")
      .findOne({ title: bookTitle });

    res.setHeader("Content-Type", "application/json");
    res.status(200).json(response);
  } catch (error) {
    console.error('Error finding book by title:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get books by Author
const findBookByAuthor = async (req, res) => {
  try {
    const bookAuthor = req.params.author;
    if (!bookAuthor) {
      res.status(400).send({ message: "Author cannot be empty!" });
      return;
    }

    const response = await mongodb
      .getDb()
      .collection("books")
      .find({ author: bookAuthor })
      .toArray();

    res.setHeader("Content-Type", "application/json");
    res.status(200).json(response);
  } catch (error) {
    console.error('Error finding books by author:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Add a new book
const addBook = async (req, res) => {
  try {
    const bookData = req.body;
    const newBook = new Book(bookData);
    await newBook.save();
    res.status(201).json(newBook); // Respond with the created Book
  } catch (error) {
    console.error('Error adding book:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Update a book
const updateBook = async (req, res) => {
  try {
    const bookId = new ObjectId(req.params.id);
    const updatedBookData = req.body;
    const response = await mongodb
      .getDb()
      .collection("books")
      .updateOne({ _id: bookId }, { $set: updatedBookData });

    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Book not found' });
    }
  } catch (error) {
    console.error('Error updating book:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Delete a book
const deleteBook = async (req, res) => {
  try {
    const bookId = new ObjectId(req.params.id);
    const response = await mongodb
      .getDb()
      .collection("books")
      .deleteOne({ _id: bookId });

    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Book not found' });
    }
  } catch (error) {
    console.error('Error deleting book:', error);
    res.status(500).json({ message: 'Internal server error' });
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
};

