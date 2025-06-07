import { gql } from '@apollo/client';

export const GET_BOOKS = gql`
  query GetBooks($limit: Int, $offset: Int) {
    books(limit: $limit, offset: $offset) {
      id
      title
      description
      published_date
      authors {
        name
        biography
        birthdate
      }
    }
  }
`;

export const GET_BOOK = gql`
  query GetBook($id: ID!) {
    getBook(id: $id) {
      id
      title
      description
      published_date
      authors {
        id
        name
        biography
        birthdate
      }
    }
  }
`;

export const ADD_BOOK = gql`
  mutation AddBook($title: String!, $description: String!, $published_date: String!, $author_id: String!) {
    addBook(title: $title, description: $description, published_date: $published_date, author_id: $author_id) {
      id
      title
      description
      published_date
    }
  }
`;

export const UPDATE_BOOK = gql`
  mutation UpdateBook($id: ID!, $title: String, $description: String, $published_date: String, $author_id: String) {
    updateBook(id: $id, title: $title, description: $description, published_date: $published_date, author_id: $author_id) {
      id
      title
      description
      published_date
    }
  }
`;

export const DELETE_BOOK = gql`
  mutation DeleteBook($id: ID!) {
    deleteBook(id: $id)
  }
`;

export const GET_AUTHORS = gql`
  query GetAuthors($limit: Int, $offset: Int) {
    authors(limit: $limit, offset: $offset) {
      id
      name
      biography
      books {
        id
        title
      }
    }
  }
`;

export const GET_AUTHOR = gql`
  query GetAuthor($id: ID!) {
    getAuthor(id: $id) {
      id
      name
      biography
      birthdate
      books {
        id
        title
      }
    }
  }
`;

export const ADD_AUTHOR = gql`
  mutation AddAuthor($name: String!, $biography: String!, $birthdate: String!, $book_id: String) {
    addAuthor(name: $name, biography: $biography, birthdate: $birthdate, book_id: $book_id) {
      id
      name
      biography
      birthdate
    }
  }
`;

export const UPDATE_AUTHOR = gql`
  mutation UpdateAuthor($id: ID!, $name: String, $biography: String, $birthdate: String, $book_id: String) {
    updateAuthor(id: $id, name: $name, biography: $biography, birthdate: $birthdate, book_id: $book_id) {
      id
      name
      biography
      birthdate
    }
  }
`;

