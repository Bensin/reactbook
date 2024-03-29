import {normalize} from 'normalizr';
import {BOOKS_FETCHED,BOOK_CREATED} from '../types';
import api from '../api';
import {bookSchema} from '../schema.js';

const booksFetched = data =>({
    type:BOOKS_FETCHED,
    data
});

const bookCreated = data =>({
    type:BOOK_CREATED,
    data
});

export const createBook = data => (dispatch) =>
    api.books.create(data).then(book =>dispatch(bookCreated(normalize(book,bookSchema))));

export const fetchBooks = () => (dispatch) =>
    api.books.fetchAll().then(books =>dispatch(booksFetched(normalize(books,[bookSchema]))))