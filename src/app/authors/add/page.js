"use client";

import Link from 'next/link';
import AuthorForm from '../../components/AuthorForm';
import handleCancel from '../../components/AuthorForm';
import handleSubmit from '../../components/AuthorForm';


export default function AddAuthor() {
  return (
    <div>
      <div className="mb-6">
        <Link
          href="/authors"
          className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700"
        >
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Authors
        </Link>
      </div>

      <div>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Add Author</h1>
          <p className="mt-2 text-gray-600">
            Add new author information
          </p>
        </div>
        <AuthorForm 
          onSubmit={handleSubmit} 
          onCancel={handleCancel} 
        />
      </div>
    </div>
  );
}

