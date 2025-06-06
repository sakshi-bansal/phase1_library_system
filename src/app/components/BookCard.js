import Link from 'next/link';
import { useMutation } from '@apollo/client';
import { DELETE_BOOK, GET_BOOKS } from '../../../lib/queries';

export default function BookCard({ book }) {
  const [deleteBook, { loading }] = useMutation(DELETE_BOOK, {
    refetchQueries: [{ query: GET_BOOKS }],
  });

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        await deleteBook({ variables: { id: book.id } });
      } catch (error) {
        console.error('Error deleting book:', error);
        alert('Error deleting book. Please try again.');
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="aspect-w-3 aspect-h-4 bg-gray-200">
        {book.coverImage ? (
          <img
            src={book.coverImage}
            alt={book.title}
            className="w-full h-48 object-cover"
          />
        ) : (
          <div className="w-full h-48 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
            <span className="text-4xl">📖</span>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">
          {book.title}
        </h3>
        <p className="text-sm text-gray-600 mb-2">
        {book.authors.map((author) => (
          <span className="text-xs text-gray-500"> {author.name} </span>
        ))}
        </p>
        <p className="text-sm text-gray-500 mb-3 line-clamp-2">
          {book.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">{book.published_date}</span>
        </div>
    
        <div className="mt-4 flex space-x-2">
          <Link
            href={`/books/${book.id}`}
            className="flex-1 bg-blue-600 text-white text-center py-2 px-3 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            View Details
          </Link>
          <Link
            href={`/books/${book.id}/edit`}
            className="flex-1 bg-gray-600 text-white text-center py-2 px-3 rounded-md text-sm font-medium hover:bg-gray-700 transition-colors"
          >
            Edit
          </Link>
          <button
            onClick={handleDelete}
            disabled={loading}
            className="px-3 py-2 bg-red-600 text-white rounded-md text-sm font-medium hover:bg-red-700 transition-colors disabled:opacity-50"
          >
            {loading ? '...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
}
