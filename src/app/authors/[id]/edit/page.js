"use client";

import Image from "next/image";
import { useQuery } from '@apollo/client';
import { useParams } from "next/navigation";
import Link from 'next/link';
import { GET_AUTHOR } from '../../../../../lib/apollo/queries';
import LoadingSpinner from '../../../components/LoadingSpinner';
import AuthorForm from '../../../components/AuthorForm';
import handleCancel from '../../../components/AuthorForm';
import handleSubmit from '../../../components/AuthorForm';

export default function AuthorDetail() {
  const params = useParams();
  const { id } = params;
  const { loading, error, data } = useQuery(GET_AUTHOR, { variables: { id: id }});

  if (loading) return <LoadingSpinner />;

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
          <h1 className="text-3xl font-bold text-gray-900">Edit Author</h1>
          <p className="mt-2 text-gray-600">
            Update author information
          </p>
        </div>
        <AuthorForm 
          author={data?.getAuthor} 
          isEditing={true} 
          onSubmit={handleSubmit} 
          onCancel={handleCancel} 
        />
      </div>
    </div>
  );
}
