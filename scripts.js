console.log("Hello World!")

const myLibrary = [];

function Book(title, author, pages, read, id) {
    if (!new.target) {
        throw Error("You must use the 'new' operator to call the constructor")
    }

    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = id;

    this.newBook = function () {
        return(`${this.title} by author ${this.author} is ${this.pages} pages and I ${this.read} it.`)
    };
};

function addBookToLibrary () {
    const title = prompt("enter book title:");
    const author = prompt("enter author name:");
    const pages = prompt("enter number of pages:");
    const read = prompt("have you read the book?");
    const id = crypto.randomUUID();

    const newBook = new Book(title, author, pages, read, id);
    myLibrary.push(newBook);

    displayLibrary();
}

function displayLibrary () {
    const libraryDiv = document.getElementById("library");
    libraryDiv.textContent = ""; // clears all cards safely

    myLibrary.forEach((book) => {
        const card = document.createElement("div");
        card.classList.add("book-card");

        card.innerHTML = `
        <div class="book-title">${book.title}</div>
        <div class="book-details">Author: ${book.author}</div>
        <div class="book-details">Pages: ${book.pages}</div>
        <div class="book-details">Read: ${book.read}</div>
        `;

        libraryDiv.appendChild(card);
    });
}

document.getElementById("addButton").addEventListener("click", addBookToLibrary);

myLibrary.push(new Book("Dune", "Frank Herbert", 672, "have read", 1));
displayLibrary();