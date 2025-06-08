"use client";

import { useQuery } from '@apollo/client';
import { useParams } from "next/navigation";
import Link from 'next/link';
import { GET_BOOK } from '../../../../../lib/apollo/queries';
import LoadingSpinner from '../../../components/LoadingSpinner';
import BookForm from '../../../components/BookForm';
import handleCancel from '../../../components/BookForm';
import handleSubmit from '../../../components/BookForm';

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

      <div>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Edit Book</h1>
          <p className="mt-2 text-gray-600">
            Update book information
          </p>
        </div>
        <BookForm 
          book={data?.getBook} 
          isEditing={true} 
          onSubmit={handleSubmit} 
          onCancel={handleCancel} 
        />
      </div>
    </div>
  );
}

