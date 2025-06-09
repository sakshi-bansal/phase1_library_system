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

export default typeDefs;