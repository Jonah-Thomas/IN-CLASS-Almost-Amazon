// for merged promises

import { deleteSingleAuthor, getAuthorBooks, getSingleAuthor } from './authorData';
import { deleteBook, getSingleBook } from './bookData';

// TODO: Get data for viewBook
const getBookDetails = (firebaseKey) => new Promise((resolve, reject) => {
  // GET SINGLE BOOK
  getSingleBook(firebaseKey).then((bookObject) => { // returns single book object
    console.warn('Book Object', bookObject);
    getSingleAuthor(bookObject.author_id) // we nest this promise so that we can use the book object
      .then((authorObject) => resolve({ ...bookObject, authorObject }));
  }).catch(reject);
});

// GET AUTHOR
// Create an object that has book data and an object named authorObject
const getAuthorDetails = async (authorfirebaseKey) => {
  const authorObject = await getSingleAuthor(authorfirebaseKey);
  const authorBooks = await getAuthorBooks(authorfirebaseKey);

  return { ...authorObject, books: authorBooks };
};

const deleteAuthorBooksRelationship = (firebaseKey) => new Promise((resolve, reject) => {
  getAuthorBooks(firebaseKey).then((authorBooksArray) => {
    const deleteBookPromises = authorBooksArray.map((book) => deleteBook(book.firebaseKey));

    Promise.all(deleteBookPromises).then(() => {
      deleteSingleAuthor(firebaseKey).then(resolve);
    });
  }).catch(reject);
});

export { deleteAuthorBooksRelationship, getAuthorDetails, getBookDetails };
