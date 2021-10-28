// Get the modal
var modal = document.getElementById("MyModal");

// Get the button that opens the modal
var btn = document.getElementById("btnBook");

// When the user clicks on the button, open the modal
btn.onclick = function () {
  modal.style.display = "block";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

class Book {
  constructor(idBook, name, author, pages, read) {
    this.idBook = idBook;
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
}

//UI Class: Handle UI Tasks
class UI {
  static displayBooks() {
    const library = Store.getBooks();

    library.forEach((book) => UI.addBookToList(book));
  }
  static addBookToList(book) {
    const list = document.querySelector("#book-list");

    const row = document.createElement("tr");

    row.innerHTML = `
    
    <td>${book.name}</td>
    <td>${book.author}</td>
    <td>${book.pages}</td>
    <td>${book.read}</td>
    <td>${book.idBook}</td>
    <td><button href="#" class="delete">X</button>
    </td>`;

    list.appendChild(row);
  }

  static deleteBook(el) {
    if (el.classList.contains("delete")) {
      el.parentElement.parentElement.remove();
    }
  }

  static clearFields() {
    document.querySelector("#name").value = " ";
    document.querySelector("#author").value = " ";
    document.querySelector("#pages").value = " ";
    document.querySelector("#read").value = " ";
    document.querySelector("#idBook").value = " ";
  }
}

//Store Class:Handles Storages the
class Store {
  static getBooks() {
    let library;
    if (localStorage.getItem("library") === null) {
      library = [];
    } else {
      library = JSON.parse(localStorage.getItem("library"));
    }
    return library;
  }

  static addBook(book) {
    const library = Store.getBooks();
    library.push(book);
    localStorage.setItem("library", JSON.stringify(library));
  }
  static removeBook(idBook) {
    const library = Store.getBooks();

    library.forEach((book, index) => {
      if (book.idBook === idBook) {
        library.splice(index, 1);
      }
    });
    localStorage.setItem("library", JSON.stringify(library));
  }
}
//Event: Display library
document.addEventListener("DOMContentLoaded", UI.displayBooks);

//Event: Add A book
document.querySelector("#book-form").addEventListener("submit", (e) => {
  //Prevent Actual Submitted
  e.preventDefault();

  //Get Form Values

  const name = document.querySelector("#name").value;
  const author = document.querySelector("#author").value;
  const pages = document.querySelector("#pages").value;
  const read = document.querySelector("#read").value;
  const idBook = document.querySelector("#idBook").value;

  // Validate the
  if (name === "" || author === "" || pages === "") {
    alert("please fill in all the fields");
  } else {
    // Instantiate Book
    const book = new Book(name, author, pages, read, idBook);
    // Add Book to UI
    UI.addBookToList(book);

    // Add book tp Store
    Store.addBook(book);

    // Book Added
    alert("Book Added");

    // Clear Fields
    UI.clearFields();
  }
});
//Event: Remove a book
document.querySelector("#book-list").addEventListener("click", (e) => {
  UI.deleteBook(e.target);

  // Remove book from the store
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

  // Show sucess message
  alert("Book Removed");
});

// onclick for read
