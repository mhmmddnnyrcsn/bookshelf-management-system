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

// Button
const addButton = document.getElementById("add-btn");

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

// Form Add Data
addButton.addEventListener("click", (e) => {
  e.preventDefault();

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
  }
})

// Check Web Storage when Load Page
window.addEventListener("load", () => {
  console.log(localStorage.getItem(myLocalStorageKey));
})