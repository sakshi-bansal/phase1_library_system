"use client";

import { useQuery } from '@apollo/client';
import { useParams } from "next/navigation";
import Link from 'next/link';
import { GET_BOOK } from '../../../../lib/apollo/queries';
import LoadingSpinner from '../../components/LoadingSpinner';

export default function BookDetail() {
  const params = useParams();
  const { id } = params;
  const { loading, data } = useQuery(GET_BOOK, { variables: { id: id }});

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <div className="mb-6">
        <Link
          href="/books"
          className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700"
        >
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Books
        </Link>
      </div>

      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <div className="lg:flex">
          <div className="lg:w-1/3 xl:w-1/4">
            <div className="aspect-w-3 aspect-h-4">
              {data?.getBook.coverImage ? (
                <img
                  src={data?.getBook.coverImage}
                  alt={data?.getBook.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                  <span className="text-6xl">📖</span>
                </div>
              )}
            </div>
          </div>
          
          <div className="lg:w-2/3 xl:w-3/4 p-6 lg:p-8">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{data?.getBook.title}</h1>
              {data?.getBook.authors.map((author, index) => (
                <span key={index} className="text-xs text-gray-500"> {author.name} </span>
              ))}              
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                  {data?.getBook.published_date}
                </span>
              </div>
            </div>
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Description</h2>
              <p className="text-gray-700 leading-relaxed">{data?.getBook.description}</p>
            </div>
            <div className="flex space-x-3">
              <Link
                href={`/books/${data?.getBook.id}/edit`}
                className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                Edit Book
              </Link>
              <Link
                href="/books"
                className="bg-gray-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-700 transition-colors"
              >
                Back to Collection
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
