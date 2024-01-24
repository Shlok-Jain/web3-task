class Book{
    constructor(title, author, year){
        this.title = title;
        this.author = author;
        this.year = year;
    }
}
class Library{
    constructor(name){
        this.name = name;
        this.books = [];
        this.patrons = [];
    }
    addBook(book, quantity){
        this.books.push({book: book, available: quantity, total: quantity});
    }
    addPatron(patron){
        this.patrons.push(patron);
    }
    issueBook(book,patron){
        if(this.patrons.includes(patron)){
            let foundBook = this.books.find(b => b.book == book);
            // if(foundBook){
            //     console.log("Book found");
            // }
            if(foundBook){
                if(foundBook.available > 0){
                    foundBook.available--;
                    patron.addBook(foundBook.book);
                    return "Book issued successfully";
                }
                else{
                    return "Book not available";
                }
            }
        }
        else{
            return "Patron not found";
        }
    }
    returnBook(book,patron){
        if(this.patrons.includes(patron)){
            let foundbook = this.books.find(b => b.book === book);
            let foundbook2 =patron.books.find(b => b.book === book);
            if(foundbook2){
                foundbook.available++;
                patron.removeBook(book);
                return "Book returned successfully";
            }
            else{
                return "This book is not issued to this patron";
            }
        }
        else{
            return "Patron not found";
        }
    }
}

class LibraryTransaction{
    constructor(){
        this.issueCharge = 2; //issuance charge
        this.returntime = 10;   //due days after issue
        this.chargeafter = 1;   //charge after due days(1 day)
    }
    calculateCharge(book, patron){
        let foundBook = patron.books.find(b => b.book === book);
        let foundPatron = library.patrons.find(p => p === patron);
        if(foundBook && foundPatron){
            let days = Math.floor((new Date() - foundBook.date) / (1000*60*60*24));
            if(days > this.returntime){
                return {base: this.issueCharge, extra: (days - this.returntime) * this.chargeafter};
            }
            else{
                return {base: this.issueCharge, extra: 0};
            }
        }
        else{
            console.log("Book or Patron not found");
        }
    }
}

class LibraryPatron{
    constructor(name, id){
        this.name = name;
        this.id = id;
        this.books = [];
    }
    addBook(book){
        this.books.push({book, date: new Date()});
    }
    removeBook(book){
        let foundBook = this.books.find(b => b.book === book);
        if(foundBook){
            this.books.splice(this.books.indexOf(foundBook),1);
        }
    }
    getIssuedBooks(){
        return this.books;
    }
}

// export {Book, Library, LibraryTransaction, LibraryPatron};