import { getAuthors, getSingleAuthor } from '../api/authorData';
import { deleteBook, getBooks, getSingleBook } from '../api/bookData';
import { deleteAuthorBooksRelationship, getAuthorDetails, getBookDetails } from '../api/mergedData';
import addAuthorForm from '../components/forms/addAuthorForm';
import addBookForm from '../components/forms/addBookForm';
import { showAuthors } from '../pages/authors';
import { showBooks } from '../pages/books';
import viewAuthors from '../pages/viewAuthor';
import viewBook from '../pages/viewBook';

const domEvents = () => {
  document.querySelector('#main-container').addEventListener('click', (e) => {
    // TODO: CLICK EVENT FOR DELETING A BOOK
    if (e.target.id.includes('delete-book')) {
      // eslint-disable-next-line no-alert
      if (window.confirm('Want to delete?')) {
        const [, firebaseKey] = e.target.id.split('--');
        deleteBook(firebaseKey).then(() => {
          getBooks().then(showBooks);
        });
      }
    }

    // TODO: CLICK EVENT FOR SHOWING FORM FOR ADDING A BOOK
    if (e.target.id.includes('add-book-btn')) {
      addBookForm();
    }

    // TODO: CLICK EVENT EDITING/UPDATING A BOOK
    if (e.target.id.includes('edit-book-btn')) {
      const [, firebaseKey] = e.target.id.split('--');

      getSingleBook(firebaseKey).then((bookObj) => addBookForm(bookObj));
      // getSingleBook(firebaseKey).then(addBookForm); // using the callback method
    }
    // TODO: CLICK EVENT FOR VIEW BOOK DETAILS
    if (e.target.id.includes('view-book-btn')) {
      const [, firebaseKey] = e.target.id.split('--');

      getBookDetails(firebaseKey).then(viewBook);
    }

    // CLICK EVENT FOR VIEW AUTHOR DETAILS
    if (e.target.id.includes('view-author-btn')) {
      const [, firebaseKey] = e.target.id.split('--');

      getAuthorDetails(firebaseKey).then(viewAuthors);
    }

    // FIXME: ADD CLICK EVENT FOR DELETING AN AUTHOR
    if (e.target.id.includes('delete-author-btn')) {
      // eslint-disable-next-line no-alert
      if (window.confirm('Want to delete?')) {
        const [, firebaseKey] = e.target.id.split('--');
        deleteAuthorBooksRelationship(firebaseKey).then(() => {
          getAuthors().then(showAuthors);
        });
      }
    }

    // FIXME: ADD CLICK EVENT FOR SHOWING FORM FOR ADDING AN AUTHOR
    if (e.target.id.includes('add-author-btn')) {
      addAuthorForm();
    }
    // FIXME: ADD CLICK EVENT FOR EDITING AN AUTHOR
    if (e.target.id.includes('update-author')) {
      const [, firebaseKey] = e.target.id.split('--');

      // getSingleAuthor(firebaseKey).then((authorObj) => addAuthorForm(authorObj));
      getSingleAuthor(firebaseKey).then(addAuthorForm); // using the callback method
    }
  });
};

export default domEvents;
