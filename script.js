// Local Storage
const myLocalStorageKey = "MY_STORAGE";

// Input Data
const title = document.getElementById("input-book-title");
const author = document.getElementById("input-book-author");
const year = document.getElementById("input-book-year");
const isFinished = document.getElementById("is-finished");

// Button
const addButton = document.getElementById("add-btn");

// CREATE Data to Web Storage
function addBook() {
  const newBook = {
    id: +new Date(),
    title: title.value.trim(),
    author: author.value.trim(),
    year: year.value.trim(),
    isFinished: isFinished.checked
  }
  console.log(newBook);
}

// Form Add Data
addButton.addEventListener("click", (e) => {
  e.preventDefault();

  addBook();
})

// Check Web Storage when Load Page
window.addEventListener("load", () => {
  console.log(localStorage.getItem(myLocalStorageKey));
})