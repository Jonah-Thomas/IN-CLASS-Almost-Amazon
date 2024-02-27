import clearDom from '../utils/clearDom';
import renderToDOM from '../utils/renderToDom';

const viewAuthors = (obj) => {
  clearDom();
  let domString = '';
  domString += `
    <div class="card" style="width: 18rem;">
      <div class="card-body">
        <h5 class="card-title">${obj.first_name} ${obj.last_name}</h5>
        <h6 class="card-subtitle mb-2 text-muted">${obj.email}</h6>
        <hr>
        <i class="btn btn-success fas fa-eye" id="view-author-btn--${obj.firebaseKey}"></i>
        <i class="fas fa-edit btn btn-info" id="update-author--${obj.firebaseKey}"></i>
        <i class="btn btn-danger fas fa-trash-alt" id="delete-author-btn--${obj.firebaseKey}"></i>
      </div>
    </div>
    `;

  obj.books.forEach((item) => {
    domString += `
    <div class="mt-5 d-flex flex-wrap">
    <div class="d-flex flex-column">
     <img src=${item.image} alt=${item.title} style="width: 300px;">
     <div class="mt-5">
       <i id="edit-book-btn--${item.firebaseKey}" class="fas fa-edit btn btn-info"></i>
       <i id="delete-book--${item.firebaseKey}" class="btn btn-danger fas fa-trash-alt"></i>
     </div>
   </div>
    `;
  });
  renderToDOM('#store', domString);
};

export default viewAuthors;
