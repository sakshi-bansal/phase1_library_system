import Book from '../../models/Book';
import Author from '../../models/Author';

const resolvers = {
  Query: {
    authors: async (parents, args) => {
      const { limit, offset } = args;
      const authors = await Author.findAll({
        limit: limit,
        offset: offset || 0,
        order: [['updated_at', 'DESC']],
        raw: true
      });
      return authors;
    },

    getAuthor: async (parents, args) => {
      const author = await Author.findByPk(args.id, { raw: true });
      return author;
    },

    books: async (parents, args) => {
      const { limit, offset } = args;
      const books = await Book.findAll({
        limit: limit,
        offset: offset || 0,
        order: [['updated_at', 'DESC']],
        raw: true
      });
      return books;
    },

    getBook: async (parents, args) => {
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
    addBook: async (parents, args) => {
      const { title, description, published_date, author_id } = args;
      const book = await Book.create({
        title,
        description,
        published_date,
        author_id
      });
      return book.toJSON();
    },

    updateBook: async (parents, args) => {
      const { id, title, description, published_date, author_id } = args;
      
      // Build update object with only defined fields
      const updateData = {};
      if (title !== undefined) updateData.title = title;
      if (description !== undefined) updateData.description = description;
      if (published_date !== undefined) updateData.published_date = published_date;
      if (author_id !== undefined) updateData.author_id = author_id;

      await Book.update(updateData, {
        where: { id },
        returning: true
      });

      // Get the updated book
      const updatedBook = await Book.findByPk(id, { raw: true });
      return updatedBook;
    },

    deleteBook: async (parents, args) => {
      const deletedCount = await Book.destroy({
        where: { id: args.id }
      });
      return deletedCount > 0;
    },

    addAuthor: async (parents, args) => {
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

    updateAuthor: async (parents, args) => {
      const { id, name, biography, birthdate, book_id } = args;
      
      // Build update object with only defined fields
      const updateData = {};
      if (name !== undefined) updateData.name = name;
      if (biography !== undefined) updateData.biography = biography;
      if (birthdate !== undefined) updateData.birthdate = birthdate;

      await Author.update(updateData, {
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

    deleteAuthor: async (parents, args) => {
      const deletedCount = await Author.destroy({
        where: { id: args.id }
      });
      return deletedCount > 0;
    },
  },
};

export default resolvers;