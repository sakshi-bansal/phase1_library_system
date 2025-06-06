import { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/navigation';
import { ADD_AUTHOR, UPDATE_AUTHOR, GET_AUTHORS, GET_BOOKS } from '../../../lib/queries';

export default function AuthorForm({ author = null, isEditing = false }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: author?.name || '',
    biography: author?.biography || '',
    birthdate: author?.birthdate || '',
    book_id: author?.books[0]?.id || null,
  });

  const [addAuthor, { loading: addLoading }] = useMutation(ADD_AUTHOR, {
    refetchQueries: [{ query: GET_AUTHORS }],
  });

  const [updateAuthor, { loading: updateLoading }] = useMutation(UPDATE_AUTHOR, {
    refetchQueries: [{ query: GET_AUTHORS }],
  });

  const { loading: booksLoading, error, data: booksData } = useQuery(GET_BOOKS);

  const loading = addLoading || updateLoading || booksLoading;

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
        console.log(formData)
        await updateAuthor({
          variables: {
            id: author.id,
            name: formData.name,
            biography: formData.biography,
            birthdate: formData.birthdate,
            book_id: formData.book_id,
          }
        });
      } else {
        await addAuthor({
          variables: {
            name: formData.name,
            biography: formData.biography,
            birthdate: formData.birthdate,
            book_id: formData.book_id,
          }
        });
      }
      
      router.push('/authors');
    } catch (error) {
      console.error('Error saving author:', error);
      alert('Error saving author. Please try again.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white shadow-sm rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-6">
            {isEditing ? 'Edit Author' : 'Add New Author'}
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="biography" className="block text-sm font-medium text-gray-700">
                Biography
              </label>
              <textarea
                name="biography"
                id="biography"
                rows={4}
                value={formData.biography}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="birthdate" className="block text-sm font-medium text-gray-700">
                BirthDate
              </label>
              <input type="date"
                dateFormat="yyyy-MM-dd"
                name="birthdate"
                id="birthdate"
                rows={4}
                value={formData.birthdate}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="book_id" className="block text-sm font-medium text-gray-700">
                Books
              </label>
              <select value={formData.book_id} onChange={handleChange} id="book_id" name="book_id">
                <option value="">Select</option>
                {booksData?.books?.map((option, index) => (
                  <option key={index} value={option.id}>
                    {option.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => router.push('/authors')}
                className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {loading ? 'Saving...' : (isEditing ? 'Update Author' : 'Add Author')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
