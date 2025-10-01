import React, { useEffect, useState } from 'react'
import { tagServive } from '../../../../services/tagService';
import { Delete, Edit, Plus, Search } from 'lucide-react';

export const TagList = () => {
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTags();
  }, []);

  const fetchTags = async () => {
    try {
      setLoading(true);
      const response = await tagServive.getAllTags();
      console.log('Tags API Response:', response.data);
      setTags(response.data.data);
    } catch (err) {
      console.error('Error fetching tags:', err);
      setError('Failed to fetch tags');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex justify-center items-center h-32">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="alert alert-error">
          <span>{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-10 m-10 shadow-lg">
        {/* button & search */}
        <div className="flex justify-between items-center mb-6">
          {/* Button with Plus icon */}
          <button className="btn bg-primary px-3 py-1 rounded uppercase flex items-center gap-2 text-white">
            <Plus className="w-4 h-4" />
            New Tag
          </button>

          {/* Search input with icon */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search tags..."
              className="input input-bordered w-full max-w-xs pl-10 pr-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
      </div>

      {/* table */}
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500">
          {/* Table Head */}
          <thead className="text-xs text-gray-700 uppercase bg-gray-100">
            <tr>
              <th scope="col" className="px-6 py-3">ID</th>
              <th scope="col" className="px-6 py-3">Name</th>
              <th scope="col" className="px-6 py-3 text-right">#</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {tags.map((tag, index) => (
              <tr 
                key={tag.id} 
                className={`border-b hover:bg-gray-50 ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
              >
                <td className="px-6 py-4 font-mono">{tag.id}</td>
                <td className="px-6 py-4">{tag.name}</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-4">
                    <button className="btn btn-sm btn-outline btn-primary"><Edit className="w-5 h-5"/></button>
                    <button className="btn btn-sm btn-error text-white"><Delete className="text-red-500 w-5 h-5"/></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
