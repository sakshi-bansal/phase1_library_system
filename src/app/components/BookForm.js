import { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/navigation';
import { ADD_BOOK, UPDATE_BOOK, GET_BOOKS, GET_AUTHORS } from '../../../lib/queries';

export default function BookForm({ book = null, isEditing = false }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: book?.title || '',
    description: book?.description || '',
    published_date: book?.published_date || '',
    author_id: book?.authors[0].id || '',
  });

  const [addBook, { loading: addLoading }] = useMutation(ADD_BOOK, {
    refetchQueries: [{ query: GET_BOOKS }],
  });

  const [updateBook, { loading: updateLoading }] = useMutation(UPDATE_BOOK, {
    refetchQueries: [{ query: GET_BOOKS }],
  });

  const { loading: authorsLoading, error, data: authorsData } = useQuery(GET_AUTHORS);

  const loading = addLoading || updateLoading || authorsLoading;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (isEditing) {
        await updateBook({
          variables: {
            id: book.id,
            title: formData.title,
            description: formData.description,
            published_date: formData.published_date,
            author_id: formData.author_id,
          }
        });
      } else {
        await addBook({
          variables: {
            title: formData.title,
            description: formData.description,
            published_date: formData.published_date,
            author_id: formData.author_id,
          }
        });
      }
      
      router.push('/books');
    } catch (error) {
      console.error('Error saving book:', error);
      alert('Error saving book. Please try again.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white shadow-sm rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-6">
            {isEditing ? 'Edit Book' : 'Add New Book'}
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Title *
              </label>
              <input
                type="text"
                name="title"
                id="title"
                required
                value={formData.title}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                name="description"
                id="description"
                rows={4}
                value={formData.description}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="published_date" className="block text-sm font-medium text-gray-700">
                Published Date
              </label>
              <input type="date"
                dateFormat="yyyy-MM-dd"
                name="published_date"
                id="published_date"
                rows={4}
                value={formData.published_date}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="author_id" className="block text-sm font-medium text-gray-700">
                Author
              </label>
              <select value={formData.author_id} onChange={handleChange} id="author_id" name="author_id">
                <option value="">Select</option>
                {authorsData?.authors?.map((option, index) => (
                  <option key={index} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => router.push('/books')}
                className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {loading ? 'Saving...' : (isEditing ? 'Update Book' : 'Add Book')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

