"use client";
import Link from 'next/link';
import Image from "next/image";
import { useQuery } from '@apollo/client';
import { GET_AUTHORS } from '../../../lib/queries';
import AuthorCard from '../components/AuthorCard';
import { useState } from 'react';


export default function Home() {
  const [page, setPage] = useState(0);
  const PAGE_SIZE = 10
  const { loading, error, data } = useQuery(GET_AUTHORS, { variables: { limit: PAGE_SIZE, offset: PAGE_SIZE * page }});

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 py-12 text-center">Authors Collection</h1>
      </div>

      <div className="items-center justify-items-center sm:p-5 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-[1px] row-start-2 items-center sm:items-start">
          <div className="flex gap-4 items-center flex-col sm:flex-row">
            <Link
              href={`/authors/add`}
              className="flex-1 bg-blue-600 text-white text-center py-2 px-3 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              Add Authors
            </Link>
          </div>
        </main>

        <div className="mt-6 flex gap-4 items-center flex-col sm:flex-row mb-6">
          <button 
            onClick={() => setPage((prev) => Math.max(0, prev - 1))}
            disabled={page === 0}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <span className="text-sm text-gray-600">Page {page + 1}</span>
          <button 
            onClick={() => setPage((prev) => prev + 1)}
            disabled={!data?.authors || data.authors.length < PAGE_SIZE}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>

      {data?.authors?.length === 0 ? (
        <div className="text-center py-12">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No authors</h3>
          <p className="mt-1 text-sm text-gray-500">Get started by adding a new author to your collection.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {data?.authors?.map((author) => (
            <AuthorCard key={author.id} author={author} />
          ))}
        </div>
      )}
    </div>
  );
}
