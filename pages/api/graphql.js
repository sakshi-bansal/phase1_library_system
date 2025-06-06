import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { query } from '../../lib/database';


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
    authors(limit: Int!, offset: Int!): [Author!]!
    getAuthor(id: ID!): Author
    authorsByName(name: String!, limit: String!, offset: String!): [Author]
    
    books(limit: Int!, offset: Int!): [Book!]!
    getBook(id: ID!): Book
    booksByTitle(title: String!, limit: String!, offset: String!): [Book]
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
      const result = await query(
        `SELECT * FROM authors LIMIT ${limit} OFFSET ${offset}`
      );
      return result.rows;
    },

    authorsByName: async (parents, args, context) => {
      const result = await query(
        `SELECT * FROM authors where name = '${args.name}' 
        limit ${args.limit} offset ${args.offset}`
      );
      return result.rows;
    },

    getAuthor: async (parents, args, context) => {
      const result = await query(
        `SELECT * FROM authors where id = '${args.id}'`
      );
      return result.rows[0];
    },

    books: async (parents, args, context) => {
      const { limit, offset } = args;
      const result = await query(
        `SELECT * FROM books LIMIT ${limit} OFFSET ${offset}`
      );
      return result.rows;
    },

    booksByTitle: async (parents, args, context) => {
      const result = await query(
        `SELECT * FROM books where title = '${args.title}' 
        limit ${args.limit} offset ${args.offset}`
      );
      return result.rows;
    },

    getBook: async (parents, args, context) => {
      const result = await query(
        `SELECT * FROM books where id = '${args.id}'`
      );
      return result.rows[0];
    },
  },

  Book : {
    authors: async (parent) => {
      const result = await query(
        `SELECT * FROM authors where id = ${parent.author_id}`
      );
      return result.rows;
    },
  },

  Author : {
    books: async (parent) => {
      const result = await query(
        `SELECT * FROM books where author_id = ${parent.id}`
      );
      return result.rows;
    },
  },

  Mutation: {
    addBook: async (parents, args, context) => {
      const { title, description, published_date, author_id } = args;
      const result = await query(
        `INSERT INTO books (title, description, published_date, author_id, created_at, updated_at) 
         VALUES ($1, $2, $3, $4, now(), now()) RETURNING *`,
        [title, description, published_date, author_id]
      );

      return result.rows[0];
    },

    updateBook: async (parents, args, context) => {
      const { title, description, published_date, author_id } = args;
      const updateFields = [];
      const values = [];
      let paramCount = 1;

      if (title !== undefined) {
        updateFields.push(`title = $${paramCount}`);
        values.push(title);
        paramCount++;
      }

      if (description !== undefined) {
        updateFields.push(`description = $${paramCount}`);
        values.push(description);
        paramCount++;
      }

      if (published_date !== undefined) {
        updateFields.push(`published_date = $${paramCount}`);
        values.push(published_date);
        paramCount++;
      }

      if (author_id !== undefined) {
        updateFields.push(`author_id = $${paramCount}`);
        values.push(author_id);
        paramCount++;
      }

      const result = await query(
         `UPDATE books SET ${updateFields.join(', ')} WHERE id = ${args.id} RETURNING *`,
          values
      );

      return result.rows[0];
    },

    deleteBook: async (parents, args, context) => {
      const result = await query(
        `DELETE FROM books where id = ${args.id}`,
      );

      return true;
    },

    addAuthor: async (parents, args, context) => {
      const { name, biography, birthdate, book_id } = args;
      const result = await query(
        `INSERT INTO authors (name, biography, birthdate, created_at, updated_at) 
         VALUES ($1, $2, $3, now(), now()) RETURNING *`,
        [name, biography, birthdate]
      );

      if (book_id != undefined) {
        await query(
         `UPDATE books SET author_id = ${result.rows[0].id} WHERE id = ${book_id}`
        );
      }

      return result.rows[0];
    },

    updateAuthor: async (parents, args, context) => {
      const { name, biography, birthdate, book_id } = args;
      const updateFields = [];
      const values = [];
      let paramCount = 1;

      if (name !== undefined) {
        updateFields.push(`name = $${paramCount}`);
        values.push(name);
        paramCount++;
      }

      if (biography !== undefined) {
        updateFields.push(`biography = $${paramCount}`);
        values.push(biography);
        paramCount++;
      }

      if (birthdate !== undefined) {
        updateFields.push(`birthdate = $${paramCount}`);
        values.push(birthdate);
        paramCount++;
      }

      const result = await query(
        `UPDATE authors SET ${updateFields.join(', ')} WHERE id = ${args.id} RETURNING *`,
        values
      );

      if (book_id != undefined) {
        await query(
         `UPDATE books SET author_id = ${result.rows[0].id} WHERE id = ${book_id}`
        );
      }

      return result.rows[0];
    },

    deleteAuthor: async (parents, args, context) => {
      const result = await query(
        `DELETE FROM authors where id = ${args.id}`,
      );

      return true;
    },
  },
};


const server = new ApolloServer({
  resolvers,
  typeDefs,
});

export default startServerAndCreateNextHandler(server);

