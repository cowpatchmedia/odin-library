console.log("Hello World!")

const myLibrary = [];

/* constructor for a book*/
function Book(title, author, pages, readStatus, id) {
    if (!new.target) {
        throw Error("You must use the 'new' operator to call the constructor")
    }

    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readStatus = readStatus;
    this.id = id;
};

/* add new book object to the library array*/
function addBookToLibrary (title, author, pages, readStatus) {
    const id = crypto.randomUUID();

    const newBook = new Book(title, author, pages, readStatus, id);

    myLibrary.push(newBook);

    /* after adding book reload the library display. */
    displayLibrary();
}

/* display books in array as cards*/
function displayLibrary () {
    const libraryDiv = document.getElementById("library");
    libraryDiv.textContent = ""; // clears all cards safely

    myLibrary.forEach((book) => {
        const card = document.createElement("div");
        card.classList.add("book-card");

        const title = document.createElement("div");
        title.textContent = `Title: ${book.title}`;

        const author = document.createElement("div");
        author.textContent = `Author: ${book.author}`;

        const pages = document.createElement("div");
        pages.textContent = `Pages: ${book.pages}`;

        const read = document.createElement("div");
        read.textContent = `Read Status: ${book.readStatus}`;

        card.append(title, author, pages, read)
        libraryDiv.appendChild(card);
    });
}

/* DOM elements*/
const addButton = document.getElementById("addButton");
const form = document.getElementById("bookForm");
const cancelButton = document.getElementById("cancelButton");

/* only show form once button is clicked.*/
addButton.addEventListener("click", () => {
    form.style.display="block";
    addButton.style.display="none";
});

/* handles form submission*/
form.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = document.getElementById("title").value.trim();
    const author = document.getElementById("author").value.trim();
    const pages = parseInt(document.getElementById("pages").value);
    const readStatus = document.querySelector("input[name='readStatus']:checked").value;

    /* adds book object to library array*/
    addBookToLibrary(title, author, pages, readStatus);

    /* reset and hide form*/
    form.reset();
    form.style.display= "none";
    addButton.style.display ="inline-block";
});

/* add listener to hide form for cancel button*/
cancelButton.addEventListener("click", () => {
    form.reset();
    form.style.display= "none";
    addButton.style.display ="inline-block";
});

/* default book when page reloads.*/
myLibrary.push(new Book("Dune", "Frank Herbert", 672, "have read", 1));
displayLibrary();