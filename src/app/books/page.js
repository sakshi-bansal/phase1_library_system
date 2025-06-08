"use client";

import Link from 'next/link';
import { useQuery } from '@apollo/client';
import { GET_BOOKS } from '../../../lib/apollo/queries';
import BookCard from '../components/BookCard';
import { useState, useMemo } from 'react';

export default function Home() {
  const [page, setPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const PAGE_SIZE = 10;
  
  // Fetch ALL books instead of paginated subset
  const { loading, error, data } = useQuery(GET_BOOKS, { 
    variables: { limit: null, offset: 0 } // or remove pagination entirely if your query supports it
  });

  // Filter books based on search term (across ALL books)
  const filteredBooks = useMemo(() => {
    if (!data?.books || !searchTerm.trim()) {
      return data?.books || [];
    }
    
    return data.books.filter(book => {
      const searchLower = searchTerm.toLowerCase();
      const titleMatch = book.title?.toLowerCase().includes(searchLower);
      const authorMatch = book.authors?.filter(author => { 
        return author.name.toLowerCase().includes(searchLower) 
      });
      return titleMatch || authorMatch.length > 0;
    });
  }, [data?.books, searchTerm]);

  // Paginate the filtered results client-side
  const paginatedBooks = useMemo(() => {
    const startIndex = page * PAGE_SIZE;
    const endIndex = startIndex + PAGE_SIZE;
    return filteredBooks.slice(startIndex, endIndex);
  }, [filteredBooks, page, PAGE_SIZE]);

  // Calculate total pages for filtered results
  const totalPages = Math.ceil(filteredBooks.length / PAGE_SIZE);
  const hasNextPage = page < totalPages - 1;
  const hasPrevPage = page > 0;

  // Reset to first page when search term changes
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setPage(0);
  };

  // Clear search filter
  const clearSearch = () => {
    setSearchTerm('');
    setPage(0);
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 py-12 text-center">Book Collection</h1>
      </div>
      
      <div className="items-center justify-items-center sm:p-5 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-[1px] row-start-2 items-center sm:items-start">
          <div className="flex gap-4 items-center flex-col sm:flex-row mb-6">
            <Link
              href={`/books/add`}
              className="flex-1 bg-blue-600 text-white text-center py-2 px-3 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              Add Books
            </Link>
          </div>
          
          {/* Search/Filter Section */}
          <div className="w-full max-w-md mb-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search by book title or author..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              {searchTerm && (
                <button
                  onClick={clearSearch}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  <svg className="h-5 w-5 text-gray-400 hover:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
            {searchTerm && (
              <p className="mt-2 text-sm text-gray-600">
                {filteredBooks.length} books found
                {filteredBooks.length > PAGE_SIZE && ` (showing ${Math.min(PAGE_SIZE, filteredBooks.length - page * PAGE_SIZE)} per page)`}
              </p>
            )}
          </div>
        </main>
        
        {/* Pagination Controls - Show for both search and non-search results */}
        {filteredBooks.length > PAGE_SIZE && (
          <div className="flex gap-4 items-center flex-col sm:flex-row mb-6">
            <button 
              onClick={() => setPage((prev) => Math.max(0, prev - 1))}
              disabled={!hasPrevPage}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <span className="text-sm text-gray-600">
              Page {page + 1} of {totalPages}
              {searchTerm && ` (${filteredBooks.length} total matches)`}
            </span>
            <button 
              onClick={() => setPage((prev) => prev + 1)}
              disabled={!hasNextPage}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        )}
      </div>
      
      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="mt-2 text-sm text-gray-600">Loading books...</p>
        </div>
      ) : error ? (
        <div className="text-center py-12">
          <p className="text-red-600">Error loading books: {error.message}</p>
        </div>
      ) : filteredBooks?.length === 0 ? (
        <div className="text-center py-12">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            {searchTerm ? `No books found for "${searchTerm}"` : 'No books'}
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchTerm 
              ? 'Try adjusting your search terms or browse all books.' 
              : 'Get started by adding a new book to your collection.'
            }
          </p>
          {searchTerm && (
            <button
              onClick={clearSearch}
              className="mt-3 text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              Clear search and view all books
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {paginatedBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}
    </div>
  );
}