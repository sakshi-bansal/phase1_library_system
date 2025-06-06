import Link from 'next/link';
import { useMutation } from '@apollo/client';
import { GET_AUTHORS } from '../../../lib/queries';

export default function AuthorCard({ author }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="aspect-w-3 aspect-h-4 bg-gray-200">
        {author.coverImage ? (
          <img
            src={author.coverImage}
            alt={author.title}
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
          {author.name}
        </h3>
        <p className="text-sm text-gray-500 mb-3 line-clamp-2">
          {author.biography}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">{author.birthdate}</span>
        </div>
    
        <div className="mt-4 flex space-x-2">
          <Link
            href={`/authors/${author.id}`}
            className="flex-1 bg-blue-600 text-white text-center py-2 px-3 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            View Details
          </Link>
          <Link
            href={`/authors/${author.id}/edit`}
            className="flex-1 bg-gray-600 text-white text-center py-2 px-3 rounded-md text-sm font-medium hover:bg-gray-700 transition-colors"
          >
            Edit
          </Link>
        </div>
      </div>
    </div>
  );
}
