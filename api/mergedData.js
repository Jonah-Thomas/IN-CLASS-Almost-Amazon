// for merged promises

import { getSingleAuthor } from './authorData';
import { getSingleBook } from './bookData';

// TODO: Get data for viewBook
const getBookDetails = (firebaseKey) => new Promise((resolve, reject) => {
  // GET SINGLE BOOK
  getSingleBook(firebaseKey).then((bookObject) => { // returns single book object
    getSingleAuthor(bookObject.author_id) // we nest this promise so that we can use the book object
      .then((authorObject) => resolve({ ...bookObject, authorObject }));
  }).catch(reject);
  // GET AUTHOR
  // Create an object that has book data and an object named authorObject
  /*const getAuthorDetails = (firebaseKey) => new Promise((resolve, reject) => {
  // GET SINGLE BOOK
  getSingleAuthor(firebaseKey).then((authorObject) => { // returns single book object
    getSingleBook(authorObject.book_id) // we nest this promise so that we can use the book object
      .then((bookObject) => resolve({ ...authorObject, bookObject }));
  }).catch(reject);*/
  const getAuthorDetails = async (firebaseKey) => { // the async keyword let's JS know this is asynchronous function (promise) 
    const authorObject = await getSingleAuthor(firebaseKey); // await stops the code in this function and waits for the response. This is like using .then
    const bookObject = await getSingleBook(authorObject.author_id); // this function uses the data response from the bookObject
  
    return { ...bookObject, authorObject };
  };
});

export { getBookDetails, getAuthorDetails };
