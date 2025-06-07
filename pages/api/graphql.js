import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { query } from '../../lib/database';
import Book from '../../models/Book';
import Author from '../../models/Author';

const typeDefs = `#graphql

  scalar DateTime

  type Book {
    id: ID!
    title:  String!
    description: String!
    published_date: DateTime!
    created_at: String!
    updated_at: String!
    authors: [Author]
  }

  scalar DateTime

  type Author {
    id: ID!
    name: String!
    biography: String!
    birthdate: DateTime!
    created_at: String!
    updated_at: String!
    books: [Book]
  }

  type Query {
    authors(limit: Int, offset: Int): [Author!]!
    getAuthor(id: ID!): Author
    
    books(limit: Int, offset: Int): [Book!]!
    getBook(id: ID!): Book
  }

  type Mutation {
    addAuthor(name: String!, biography: String!, birthdate: String!, book_id: String): Author
    updateAuthor(id: ID!, name: String, biography: String, birthdate: String, book_id: String): Author
    deleteAuthor(id: ID!): Boolean!

    addBook(title: String!, description: String!, published_date: String!, author_id: String!): Book
    updateBook(id: ID!, title: String, description: String, published_date: String, author_id: String): Book
    deleteBook(id: ID!): Boolean!
  }
`;

const resolvers = {
  Query: {
    authors: async (parents, args, context) => {
      const { limit, offset } = args;
      const authors = await Author.findAll({
        limit: limit,
        offset: offset || 0,
        order: [['updated_at', 'DESC']],
        raw: true
      });
      return authors;
    },

    getAuthor: async (parents, args, context) => {
      const author = await Author.findByPk(args.id, { raw: true });
      return author;
    },

    books: async (parents, args, context) => {
      const { limit, offset } = args;
      const books = await Book.findAll({
        limit: limit,
        offset: offset || 0,
        order: [['updated_at', 'DESC']],
        raw: true
      });
      return books;
    },

    getBook: async (parents, args, context) => {
      const book = await Book.findByPk(args.id, { raw: true });
      return book;
    },
  },

  Book : {
    authors: async (parent) => {
      const author = await Author.findByPk(parent.author_id, { raw: true });
      return author ? [author] : [];
    },
  },
  

  Author : {
    books: async (parent) => {
      const books = await Book.findAll({
        where: { author_id: parent.id },
        raw: true
      });
      return books;
    },
  },

  Mutation: {
    addBook: async (parents, args, context) => {
      const { title, description, published_date, author_id } = args;
      const book = await Book.create({
        title,
        description,
        published_date,
        author_id
      });
      return book.toJSON();
    },

    updateBook: async (parents, args, context) => {
      const { id, title, description, published_date, author_id } = args;
      
      // Build update object with only defined fields
      const updateData = {};
      if (title !== undefined) updateData.title = title;
      if (description !== undefined) updateData.description = description;
      if (published_date !== undefined) updateData.published_date = published_date;
      if (author_id !== undefined) updateData.author_id = author_id;

      const [updatedRowsCount] = await Book.update(updateData, {
        where: { id },
        returning: true
      });

      // Get the updated book
      const updatedBook = await Book.findByPk(id, { raw: true });
      return updatedBook;
    },

    deleteBook: async (parents, args, context) => {
      const deletedCount = await Book.destroy({
        where: { id: args.id }
      });
      return deletedCount > 0;
    },

    addAuthor: async (parents, args, context) => {
      const { name, biography, birthdate, book_id } = args;
      
      const author = await Author.create({
        name,
        biography,
        birthdate
      });

      // If book_id is provided, update the book's author
      if (book_id !== undefined) {
        await Book.update(
          { author_id: author.toJSON().id },
          { where: { id: book_id } }
        );
      }

      return author.toJSON();
    },

    updateAuthor: async (parents, args, context) => {
      const { id, name, biography, birthdate, book_id } = args;
      
      // Build update object with only defined fields
      const updateData = {};
      if (name !== undefined) updateData.name = name;
      if (biography !== undefined) updateData.biography = biography;
      if (birthdate !== undefined) updateData.birthdate = birthdate;

      const [updatedRowsCount] = await Author.update(updateData, {
        where: { id },
        returning: true
      });

      // Get the updated author
      const updatedAuthor = await Author.findByPk(id);

      // If book_id is provided, update the book's author
      if (book_id !== undefined) {
        await Book.update(
          { author_id: id },
          { where: { id: book_id } }
        );
      }

      return updatedAuthor.toJSON();
    },

    deleteAuthor: async (parents, args, context) => {
      const deletedCount = await Author.destroy({
        where: { id: args.id }
      });
      return deletedCount > 0;
    },
  },
};


const server = new ApolloServer({
  resolvers,
  typeDefs,
});

export default startServerAndCreateNextHandler(server);

