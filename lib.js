
// initial display with sample book
let myLibrary = [];
myLibrary.push(new Book("Sample Title","Sample Author", 100, false));
render();

// book constructor
function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

    this.info = () => {
        let res = `${this.title}` + "\n";
        res += `by ${this.author}, ${this.pages} pages, `;
        return this.read ? res + 'already read.' : res + 'not read yet.';
    };
}

// display the shelf: book info + read button + 
// remove button for each book
function render(){

    let addButton = document.querySelector('#add-button');
    addButton.addEventListener("click", addBookToLibrary);

    let shelf = document.querySelector("#bookshelf");
    let numBooks = 0;
    
    myLibrary.forEach((book) => {
        // print out the book info
        book.id = numBooks;
        let newBook = document.createElement("div");
        newBook.innerText = book.info();
        newBook.id=`book${numBooks}`;
        newBook.classList="books";
        newBook.style.cssText = 
        "justify-self: stretch; font-size:18px;\
        line-height: 30px; text-align: left;\
        border-bottom: 3px dashed black;";
        shelf.appendChild(newBook);

        // create the read button
        let read = document.createElement("button");
        read.innerText = "Read";
        read.classList = "read-buttons";
        read.id=`read${numBooks}`;
        read.addEventListener('click',toggleRead);
        shelf.appendChild(read);
        
        // create the remove button
        let remove = document.createElement("button");
        remove.innerText = "Remove";
        remove.classList = "remove-buttons";
        remove.id=`remove${numBooks}`;
        remove.addEventListener('click',removeBook);
        shelf.appendChild(remove);
        
        numBooks++;
    })
}

// remove all books from shelf to
// prepare for rendering again
function clearShelf(){
    let shelf = document.querySelector("#bookshelf");
    let books = document.querySelectorAll(".books");
    let readButtons = document.querySelectorAll(".read-buttons");
    let removeButtons = document.querySelectorAll(".remove-buttons");

    books.forEach((book) => shelf.removeChild(book));
    readButtons.forEach((read) => shelf.removeChild(read));
    removeButtons.forEach((remove) => shelf.removeChild(remove));
}

// update shelf with new books
function reset(){
    clearShelf();
    render();
}


function addBookToLibrary(title,author,pages){
    if(myLibrary.length == 8){
        alert("Your library is full! Try reading a book you already have.");
        return;
    }
    // grab all the text field values
    let titleEntry = document.querySelector('#book-title');
    let authorEntry = document.querySelector('#book-author');
    let pagesEntry = document.querySelector('#book-pages');
    let bookTitle = titleEntry.value;
    let bookAuthor = authorEntry.value;
    let bookPages = pagesEntry.value;

    // create new book if input was valid
    // and create shelf
    if(bookTitle === "" || bookAuthor == "" || bookPages == ""){
        alert("Please fill in all the required fields\nbefore adding a book.");
    } else if(isNaN(bookPages)){
        alert("Please enter a valid number for book pages.");
    } else {
        myLibrary.push(new Book(bookTitle,bookAuthor,bookPages,false));
        reset();
        titleEntry.value = "";
        authorEntry.value = "";
        pagesEntry.value = "";
    }
}

// change read status on click
function toggleRead(){
    let bookID = this.id;
    bookID = bookID.slice(bookID.length-1);
    console.log(bookID);
    book = myLibrary.find(book => book.id == bookID);
    book.read = !book.read;
    reset();
}

// remove respective book from shelf
function removeBook(){
    let bookID = this.id;
    bookID = bookID.slice(bookID.length-1);
    myLibrary = myLibrary.filter(book => book.id != bookID);
    reset();
}






