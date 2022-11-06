// Local Storage
const myLocalStorageKey = "MY_STORAGE";

// Input Data
const title = document.getElementById("input-book-title");
const titleError = document.getElementById("title-error-display")

const author = document.getElementById("input-book-author");
const authorError = document.getElementById("author-error-display")

const year = document.getElementById("input-book-year");
const yearError = document.getElementById("year-error-display")

const isFinished = document.getElementById("is-finished");

// Search Data
const searchByBookTitle = document.getElementById("search-by-book-title");

// Button
const addButton = document.getElementById("add-btn");
const searchButton = document.getElementById("search-btn");

// Global Variables
let inputCheck = true;

// CREATE Data to Web Storage
function addBook(book) {
  let bookList = [];

  if (localStorage.getItem(myLocalStorageKey) === null) {
    localStorage.setItem(myLocalStorageKey, []);
  } else {
    bookList = JSON.parse(localStorage.getItem(myLocalStorageKey));
  }
  bookList.unshift(book);
  localStorage.setItem(myLocalStorageKey, JSON.stringify(bookList));
}

// READ Data from Web Storage
function getBooks() {
  return JSON.parse(localStorage.getItem(myLocalStorageKey));
}

// SHOW Data
function showBooks(books = []) {
  const readingBooks = document.querySelector(".reading-books");
  const finishedBooks = document.querySelector(".finished-books");

  readingBooks.innerHTML = "";
  finishedBooks.innerHTML = "";

  books.forEach(book => {
    if (book.isFinished == false) {
      let ele = `
        <div class="card book-card d-flex space-between">
          <div class="book-detail">
            <h3 class="book-title">${book.title}</h3>
            <p class="book-author">${book.author}</p>
            <p class="book-year">${book.year}</p>
          </div>
          <div class="book-btn-group d-flex flex-direction-column">
          <button class="btn btn-book" onClick={toFinishedBook(${book.id})}>Finished</button>
          <button class="btn btn-book btn-book__edit" onClick={updateData(${book.id})}>Edit</button>
          <button class="btn btn-book btn-book__delete" onClick={deleteBook(${book.id})}>Delete</button>
          </div>
        </div>
        `
      readingBooks.innerHTML += ele;
    } else {
      let ele = `
        <div class="card book-card d-flex space-between">
          <div class="book-detail">
            <h3 class="book-title">${book.title}</h3>
            <p class="book-author">${book.author}</p>
            <p class="book-year">${book.year}</p>
          </div>
          <div class="book-btn-group d-flex flex-direction-column">
            <button class="btn btn-book" onClick={toReadingBook(${book.id})}>Read Again</button>
            <button class="btn btn-book btn-book__edit" onClick={updateData(${book.id})}>Edit</button>
            <button class="btn btn-book btn-book__delete" onClick={deleteBook(${book.id})}>Delete</button>
          </div>
        </div>
        `
      finishedBooks.innerHTML += ele;
    }
  })
}

// UPDATE Data
function updateData(id) {
  const book = getBooks().filter(book => book.id == id)
  title.value = book[0].title
  author.value = book[0].author
  year.value = book[0].year
  book[0].isFinished ? isFinished.checked = true : isFinished.checked = false

  addButton.innerHTML = "Edit Book"
  addButton.value = book[0].id
}

// DELETE Data
function deleteBook(id) {
  const confirmation = confirm("You want delete this book?");
  if (confirmation == true) {
    const book = getBooks().filter(book => book.id != id)
    localStorage.setItem(myLocalStorageKey, JSON.stringify(book));
    location.reload();
  }
}

// Form Add Data
addButton.addEventListener("click", (e) => {
  e.preventDefault();

  if (addButton.value == "") {
    title.classList.remove("error-input");
    author.classList.remove("error-input");
    year.classList.remove("error-input");

    titleError.classList.add("error-display");
    authorError.classList.add("error-display");
    yearError.classList.add("error-display");

    if (title.value == "") {
      title.classList.add("error-input");
      titleError.classList.remove("error-display");
      inputCheck = false;
    }
    if (author.value == "") {
      author.classList.add("error-input");
      authorError.classList.remove("error-display");
      inputCheck = false;
    }
    if (year.value == "") {
      year.classList.add("error-input");
      yearError.classList.remove("error-display");
      inputCheck = false;
    } else {
      inputCheck = true;
    }

    if (inputCheck === true) {
      const newBook = {
        id: +new Date(),
        title: title.value.trim(),
        author: author.value.trim(),
        year: year.value.trim(),
        isFinished: isFinished.checked
      }
      addBook(newBook);
      title.value = "";
      author.value = "";
      year.value = "";
      isFinished.checked = false;
      location.reload();
    }
  } else {
    const books = getBooks().filter(book => book.id != addButton.value)
    localStorage.setItem(myLocalStorageKey, JSON.stringify(books))

    const newBook = {
      id: addButton.value,
      title: title.value.trim(),
      author: author.value.trim(),
      year: year.value.trim(),
      isFinished: isFinished.checked
    }
    addBook(newBook);
    title.value = "";
    author.value = "";
    year.value = "";
    isFinished.checked = false;
    location.reload();
    alert("Book edited successfully!")
  }
})

// Search Book by Title
searchButton.addEventListener("click", (e) => {
  e.preventDefault();
  const searchResult = document.querySelector(".search-result");

  const theBook = getBooks().filter(book => book.title === searchByBookTitle.value.trim());
  if (theBook == false) {
    searchResult.innerHTML += `<p>Book not found<p>`;
  } else {
    console.log(theBook)
    searchResult.innerHTML = ""
    let ele = `
      <div class="card book-card d-flex space-between">
        <div class="book-detail">
          <h3 class="book-title">${theBook[0].title}</h3>
          <p class="book-author">${theBook[0].author}</p>
          <p class="book-year">${theBook[0].year}</p>
          <p class="book-status">${theBook[0].isFinished ? "Finished" : "On Progress"}</p>
        </div>
      </div>
        `
    searchResult.innerHTML += ele;
  }
})

// Change Status Book to Finished Book
function toFinishedBook(id) {
  let confirmation = confirm("Have you finished reading the book?");

  if (confirmation == true) {
    const bookList = getBooks().filter(book => book.id == id);
    const newBook = {
      id: bookList[0].id,
      title: bookList[0].title,
      author: bookList[0].author,
      year: bookList[0].year,
      isFinished: !bookList[0].isFinished
    }

    const books = getBooks().filter(book => book.id != id)
    localStorage.setItem(myLocalStorageKey, JSON.stringify(books))

    addBook(newBook);
    location.reload()
  }
}

// Change Status Book to Reading Book
function toReadingBook(id) {
  let confirmation = confirm("do you want read this book again?")

  if (confirmation == true) {
    const bookList = getBooks().filter(book => book.id == id);
    const newBook = {
      id: bookList[0].id,
      title: bookList[0].title,
      author: bookList[0].author,
      year: bookList[0].year,
      isFinished: !bookList[0].isFinished
    }

    const books = getBooks().filter(book => book.id != id)
    localStorage.setItem(myLocalStorageKey, JSON.stringify(books))

    addBook(newBook);
    location.reload()
  }
}

// Check Web Storage when Load Page
window.addEventListener("load", () => {
  const statusDirectory = localStorage.getItem(myLocalStorageKey);
  if (statusDirectory != null) {
    showBooks(getBooks());
  }
})