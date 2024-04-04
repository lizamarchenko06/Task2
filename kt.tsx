abstract class Publisher { // Абстрактный класс Publisher
    private title: string;
    private author: string;
    private pubYear: number;
    private copies: number;

    constructor(title: string, author: string, pubYear: number, copies: number) {
        this.title = title;
        this.author = author;
        this.pubYear = pubYear;
        this.copies = copies;
    }

    getTitle(): string {
        return this.title;
    }

    setTitle(title: string): void {
        this.title = title;
    }

    getAuthor(): string {
        return this.author;
    }

    setAuthor(author: string): void {
        this.author = author;
    }

    getPubYear(): number {
        return this.pubYear;
    }

    setPubYear(pubYear: number): void {
        this.pubYear = pubYear;
    }

    getCopies(): number {
        return this.copies;
    }

    setCopies(copies: number): void {
        this.copies = copies;
    }
}


class Book extends Publisher { // Подкласс Book
    private pages: number;

    constructor(title: string, author: string, pubYear: number, copies: number, pages: number) {
        super(title, author, pubYear, copies);
        this.pages = pages;
    }

    getPages(): number {
        return this.pages;
    }

    setPages(pages: number): void {
        this.pages = pages;
    }
}


class Magazine extends Publisher { // Подкласс Magazine
    private issue: number;

    constructor(title: string, author: string, pubYear: number, copies: number, issue: number) {
        super(title, author, pubYear, copies);
        this.issue = issue;
    }

    getIssue(): number {
        return this.issue;
    }

    setIssue(issue: number): void {
        this.issue = issue;
    }
}


interface Reception { // Интерфейс Reception
    delivery(): void;
    receive(): void;
}


class Reader { // Класс Reader
    private firstName: string;
    private lastName: string;
    private items: Publisher[] = [];

    constructor(firstName: string, lastName: string) {
        this.firstName = firstName;
        this.lastName = lastName;
    }

    getFirstName(): string {
        return this.firstName;
    }

    setFirstName(firstName: string): void {
        this.firstName = firstName;
    }

    getLastName(): string {
        return this.lastName;
    }

    setLastName(lastName: string): void {
        this.lastName = lastName;
    }

    getItems(): Publisher[] {
        return this.items;
    }

    
    delivery(item: Publisher): void { // Выдача издания
        if (item.getCopies() > 0 && this.items.length < 3) {
            item.setCopies(item.getCopies() - 1);
            this.items.push(item);
            console.log(`Выдано издание "${item.getTitle()}" читателю ${this.firstName} ${this.lastName}`);
        } else {
            console.log(`Издание "${item.getTitle()}" не может быть выдано`);
        }
    }

   
    receive(item: Publisher): void { // Возврат издания
        const index = this.items.indexOf(item);
        if (index !== -1) {
            this.items.splice(index, 1);
            item.setCopies(item.getCopies() + 1);
            console.log(`Издание "${item.getTitle()}" возвращено`);
        }
    }
}

// Класс Библиотека
class Library {
    private publications: Publisher[] = [];

    addPublication(publication: Publisher): void {
        this.publications.push(publication);
        console.log(`Издание "${publication.getTitle()}" добавлено  в библиотеку`);
    }

    removePublication(publication: Publisher): void {
        const index = this.publications.indexOf(publication);
        if (index !== -1) {
            this.publications.splice(index, 1);
            console.log(`Издание "${publication.getTitle()}" удалено  из библиотеки`);
        }
    }
}


const book1 = new Book("Harry Potter", "J.K. Rowling", 1997, 5, 400);
const book2 = new Book("1984", "George Orwell", 1949, 3, 328);
const magazine1 = new Magazine("National Geographic", "Various", 2000, 10, 150);
const reader1 = new Reader("John", "Doe");

const library = new Library();
library.addPublication
(book1);
library.addPublication(book2);
library.addPublication(magazine1);

reader1.delivery(book1);
reader1.delivery(book2);
reader1.delivery(magazine1);

reader1.receive(book1);
reader1.receive(book2);
reader1.receive(magazine1);

library.removePublication(book1);

console.log("Читатель:", reader1.getFirstName(), reader1.getLastName());
console.log("Издания на руках читателя:", reader1.getItems().map(item => item.getTitle()));