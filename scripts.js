/* class for a single book */
class Book { 
    /* constructor for book elements */
    constructor(title, author, pages, readStatus, id) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readStatus = readStatus;
    this.id = id;
    }

    /* toggle read status */
    toggleReadStatus() {
        this.readStatus = this.readStatus === "read" ? "unread" : "read";
    }
}

/* display books in array as cards*/
class Library {
    constructor() {
        this.books = [];

        /* dom elements */
        this.libraryDiv = document.getElementById("library");
        this.addButton = document.getElementById("addButton");
        this.form = document.getElementById("bookForm");
        this.cancelButton = document.getElementById("cancelButton");

        /* form inputs */
        this.titleInput = document.getElementById("title");
        this.authorInput = document.getElementById("author");
        this.pagesInput = document.getElementById("pages");

        /* initialize application*/
        this.bindEvents();
        this.loadInitialData();
    }

    /* attach event listeners for form through bindEvents function */
    bindEvents() {
        /* only show form once button is clicked.*/
        this.addButton.addEventListener("click", () => {
            this.form.style.display="block";
            this.addButton.style.display="none";
        });

        this.cancelButton.addEventListener("click", () => {
            this.hideForm();
        });

        this.form.addEventListener("submit", (e) => {
            e.preventDefault();
            this.handleFormSubmit();
        });
    }

    /* hideForm and handleFormSubmit activates in bindEvents function*/
    hideForm() {
        this.form.reset();
        this.form.style.display = "none";
        this.addButton.style.display = "inline-block";
    }

    handleFormSubmit() {
        const title = this.titleInput.value.trim();
        const author = this.authorInput.value.trim();
        const pages = parseInt(this.pagesInput.value);
        const readStatus = document.querySelector("input[name='readStatus']:checked").value;

        if (title && author && pages) {
            this.addBook(title, author, pages, readStatus);
            this.hideForm();
        } else {
            alert("Please fill out all fields.");
        }
    }

    addBook(title, author, pages, readStatus) {
        /* give random book ID*/
        const id = crypto.randomUUID();

        /* create new book */
        const newBook = new Book(title, author, pages, readStatus, id);
        this.books.push(newBook);

        /* after adding book reload the library display. */
        this.display();
    }

    /* remove book by ID using filter*/
    removeBook(bookId) {
        this.books = this.books.filter(book => book.id !== bookId);
        this.display();
    }

    display() {
        this.libraryDiv.textContent = "";

        this.books.forEach((book) => {
            const card = this.createBookCard(book);
            this.libraryDiv.appendChild(card);
        });
    }

    createBookCard(book) {
        const card = document.createElement("div");
        card.classList.add("book-card");
        card.dataset.bookId = book.id;

        /* delete button*/
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "✕";
        deleteButton.classList.add("delete-button");
        deleteButton.addEventListener("click", () => {
            this.removeBook(book.id);
        });

        /* book info*/
        const title = document.createElement("div");
        title.textContent = `${book.title}`;
        title.classList.add("book-title");

        const author = document.createElement("div");
        author.textContent = `Author: ${book.author}`;

        const pages = document.createElement("div");
        pages.textContent = `Pages: ${book.pages}`;

        const readButton = document.createElement("button");
        readButton.textContent = book.readStatus;
        readButton.classList.add("read-toggle", book.readStatus);
        readButton.style.cursor="pointer";

        readButton.addEventListener("click", () => {
            /* Toggle status */
            book.toggleReadStatus();

            /* Update classes */
            readButton.textContent = book.readStatus;
            readButton.classList.toggle("read");
            readButton.classList.toggle("unread");
        });

        card.append(deleteButton, title, author, pages, readButton)
        return card;
    }

    /* default book when page reloads.*/
    loadInitialData() {
        this.addBook("Dune", "Frank Herbert", 672, "read");
    }
}

const app = new Library();