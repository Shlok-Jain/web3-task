// const {Book, Library, LibraryTransaction, LibraryPatron} = require('./LibraryClass.js');

// const library = new Library("Central Library");
const library = new Library("Central Library");

//dummy data

const addpatron = ()=>{
    const name = document.getElementById('name').value;
    if(name === ""){
        const my_notification = new NotificationJS({  //a notification library made by me
            message: 'Enter valid name',
            type: 'error',
            duration: 5000,
            theme: 'dark',
        })
    
        my_notification.show(); 
        return;
    }
    const id = Date.now();  //since it will be unique every millisecond
    const patron = new LibraryPatron(name, id);
    library.addPatron(patron);
    displayPatrons();
}
const addbook = ()=>{
    const title = document.getElementById('booktitle').value;
    const author = document.getElementById('author').value;
    const quantity = document.getElementById('quantity').value;
    const  year = document.getElementById('year').value;
    if(title === "" || author === "" || quantity === ""){
        const my_notification = new NotificationJS({  //a notification library made by me
            message: 'Enter valid details',
            type: 'error',
            duration: 5000,
            theme: 'dark',
        })
        
        my_notification.show(); 
        return;
    }
    const book = new Book(title, author, year);
    library.addBook(book, quantity);
    console.log(library.books);
    displayBooks();
}
const displayPatrons = ()=>{
    const patronlist = document.getElementById('patronlist');
    console.log(library.patrons);
    patronlist.innerHTML = `<div class="patroncolumn" style="display: flex;">
    <div class="patronname mt-3" style="font-size: 20px; font-weight: bold; text-align: center;width: 50%;">Name
    </div>
    <div class="patronid mt-3" style="font-size: 20px; font-weight: bold; text-align: center;width: 50%;">ID</div>
  </div>`
    library.patrons.forEach(patron => {
        patronlist.innerHTML += `<div class="patroncolumn" style="display: flex;">
        <div class="patronname mt-3" style="text-align: center;width: 50%;">${patron.name}</div>
        <div class="patronid mt-3" style="text-align: center;width: 50%;">${patron.id}</div>
    </div>`
    });
}
const displayBooks = ()=>{
    const booklist = document.getElementById('booklist');
    booklist.innerHTML = `<div class="bookcolumn" style="display: flex;">
    <div class="booktitle mt-3" style="font-size: 20px; font-weight: bold; text-align: center;width: 25%;">Name</div>
    <div class="bookauthor mt-3" style="font-size: 20px; font-weight: bold; text-align: center;width: 25%;">Author</div>
    <div class="bookyear mt-3" style="font-size: 20px; font-weight: bold; text-align: center;width: 30%">Year</div>
    <div class="bookyear mt-3" style="font-size: 20px; font-weight: bold; text-align: center;width: 10%;">Available</div>
    <div class="bookyear mt-3" style="font-size: 20px; font-weight: bold; text-align: center;width: 10%;">Total</div>
    </div>`
    
    library.books.forEach(book => {
        booklist.innerHTML += `<div class="bookcolumn" style="display: flex;">
        <div class="booktitle mt-3" style="text-align: center;width: 25%;">${book.book.title}</div>
        <div class="bookauthor mt-3" style="text-align: center;width: 25%;">${book.book.author}</div>
        <div class="bookyear mt-3" style="text-align: center;width: 30%">${book.book.year}</div>
        <div class="bookyear mt-3" style="text-align: center;width: 10%;">${book.available}</div>
        <div class="bookyear mt-3" style="text-align: center;width: 10%;">${book.total}</div>`
    });
}
const givesuggestion = ()=>{
    const name = document.getElementById('issuebookname').value;
    const ul = document.getElementById('suggestions');
    // console.log(name);
    if(name==""){
        ul.innerHTML = `<li class="list-group-item">Type to get suggestions......</li>`;
    }
    else{
        ul.innerHTML = "";
        library.books.forEach(book => {
            if(book.book.title.toLowerCase().includes(name.toLowerCase())){
                ul.innerHTML += `<li class="list-group-item suggestion-class" onclick="setsuggestion('${book.book.title}')">${book.book.title}</li>`;
            }
        });
    }
}
const givesuggestionret = ()=>{
    const name = document.getElementById('returnbookname').value;
    const ul = document.getElementById('suggestionsret');
    // console.log(name);
    if(name==""){
        ul.innerHTML = `<li class="list-group-item">Type to get suggestions......</li>`;
    }
    else{
        ul.innerHTML = "";
        library.books.forEach(book => {
            if(book.book.title.toLowerCase().includes(name.toLowerCase())){
                ul.innerHTML += `<li class="list-group-item suggestion-class" onclick="setsuggestionret('${book.book.title}')">${book.book.title}</li>`;
            }
        });
    }
}
const setsuggestion = (name)=>{
    // console.log(name);
    document.getElementById('issuebookname').value = name;
    document.getElementById('suggestions').innerHTML = "";
}
const setsuggestionret = (name)=>{
    // console.log(name);
    document.getElementById('returnbookname').value = name;
    document.getElementById('suggestionsret').innerHTML = "";
}
const returnBook = ()=>{
    const bookname = document.getElementById('returnbookname').value;
    const patronid = document.getElementById('returnid').value;
    const book = library.books.find(b => b.book.title.toLowerCase() === bookname.toLowerCase());
    const patron = library.patrons.find(p => p.id == patronid);
    if(book && patron){
        const transaction = new LibraryTransaction();
        transaction.calculateCharge(patron, book.book);
        const message = library.returnBook(book.book, patron);
        if(message === "Book returned successfully"){
            const my_notification = new NotificationJS({  //a notification library made by me
                message: 'Book returned successfully',
                type: 'success',
                duration: 5000,
                theme: 'dark',
            })
            
            my_notification.show();
        }
        else{
            const my_notification = new NotificationJS({  //a notification library made by me
                message: message,
                type: 'alert',
                duration: 5000,
                theme: 'dark',
            })
            
            my_notification.show(); 
        }
    }
    else{
        const my_notification = new NotificationJS({  //a notification library made by me
            message: 'Book or patron not found',
            type: 'error',
            duration: 5000,
            theme: 'dark',
        })
        
        my_notification.show(); 
    }
    displayBooks();

}
const issue = ()=>{
    const bookname = document.getElementById('issuebookname').value;
    const patronid = document.getElementById('issueid').value;
    const book = library.books.find(b => b.book.title.toLowerCase() === bookname.toLowerCase());
    const patron = library.patrons.find(p => p.id == patronid);
    if(book && patron){
        const message = library.issueBook(book.book, patron);
        if(message === "Book issued successfully"){
            const my_notification = new NotificationJS({  //a notification library made by me
                message: 'Book issued successfully',
                type: 'success',
                duration: 5000,
                theme: 'dark',
            })
            
            my_notification.show();
        }
        else{
            const my_notification = new NotificationJS({  //a notification library made by me
                message: message,
                type: 'alert',
                duration: 5000,
                theme: 'dark',
            })
            
            my_notification.show(); 
        
        }
    }
    else{
        const my_notification = new NotificationJS({  //a notification library made by me
            message: 'Book or patron not found',
            type: 'error',
            duration: 5000,
            theme: 'dark',
        })
        
        my_notification.show(); 
    }
    displayBooks();
}
window.onload = ()=>{
const book1 = new Book("The Accursed God", "Vivek Dutta Mishra", 2018);
const book2 = new Book("The Count of Monte Cristo", "Alexandre Dumas", 1844);
const book3 = new Book("The Three Musketeers", "Alexandre Dumas", 1844);
const book4 = new Book("Introdunction to Algorithms", "Thomas H. Cormen", 1990);
const book5 = new Book("The Hobbit", "J. R. R. Tolkien", 1937);
const book6 = new Book("The Lord of the Rings", "J. R. R. Tolkien", 1954);
library.addBook(book1, 10);
library.addBook(book2, 5);
library.addBook(book3, 5);
library.addBook(book4, 10);
library.addBook(book5, 10);
library.addBook(book6, 10);

const patron1 = new LibraryPatron("Shivam", 1);
const patron2 = new LibraryPatron("Rahul", 2);
library.addPatron(patron1);
library.addPatron(patron2);

displayBooks();
displayPatrons();
}