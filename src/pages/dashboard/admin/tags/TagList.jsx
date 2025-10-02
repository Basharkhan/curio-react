import React, { useEffect, useState } from "react";
import { tagServive } from "../../../../services/tagService";
import { Delete, Edit, Plus, Search } from "lucide-react";
import { TagFormModal } from "./TagFormModal";
import { toast } from "react-hot-toast";

export const TagList = () => {
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editTag, setEditTag] = useState(null);

  // Fetch tags on mount
  useEffect(() => {
    fetchTags();
  }, []);

  const fetchTags = async () => {
    try {
      setLoading(true);
      const response = await tagServive.getAllTags();
      setTags(response.data.data);
    } catch (err) {
      setError("Failed to fetch tags");
      toast.error("Failed to fetch tags");
    } finally {
      setLoading(false);
    }
  };

  // Open modal for new tag
  const openNewTagModal = () => {
    setEditTag(null);
    setIsModalOpen(true);
  };

  // Open modal for editing existing tag
  const openEditTagModal = (tag) => {
    setEditTag(tag);
    setIsModalOpen(true);
  };

  // Save or update tag
  const handleSave = async (data) => {
    try {
      if (editTag) {
        console.log(data);
        
        await tagServive.updateTag(editTag.id, { name: data.name });
        toast.success("Tag updated successfully!");
      } else {
        await tagServive.createTag(data);
        toast.success("Tag created successfully!");
      }
      fetchTags();
      closeModal();
    } catch (err) {
      console.error(err);
      toast.error("Failed to save tag");
    }
  };

  // Delete tag
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this tag?")) return;
    try {
      await tagServive.deleteTag(id);
      toast.success("Tag deleted successfully!");
      fetchTags();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete tag");
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditTag(null);
  };

  if (loading) {
    return (
      <div className="p-6 flex justify-center items-center h-32">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 alert alert-error">
        <span>{error}</span>
      </div>
    );
  }

  return (
    <div className="p-10 m-10 shadow-lg space-y-6">
      {/* Header: New Tag + Search */}
      <div className="flex justify-between items-center mb-6">
        <button
          className="btn bg-primary text-white flex items-center gap-2 px-2 py-1 rounded hover:bg-secondary"
          onClick={openNewTagModal}
        >
          <Plus className="w-4 h-4" /> New Tag
        </button>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search tags..."
            className="input input-bordered w-full max-w-xs pl-10 pr-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      {/* Tags Table */}
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100">
            <tr>
              <th className="px-6 py-3">ID</th>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tags.map((tag, index) => (
              <tr
                key={tag.id}
                className={`border-b hover:bg-gray-50 ${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                }`}
              >
                <td className="px-6 py-4 font-mono">{tag.id}</td>
                <td className="px-6 py-4">{tag.name}</td>
                <td className="px-6 py-4 text-right flex justify-end gap-2">
                  <button
                    className="btn btn-sm btn-outline btn-primary"
                    onClick={() => openEditTagModal(tag)}
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                  <button
                    className="btn btn-sm btn-error text-white"
                    onClick={() => handleDelete(tag.id)}
                  >
                    <Delete className="w-5 h-5 text-red-500" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Tag Modal */}
      <TagFormModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSave={handleSave}
        initialData={editTag}
      />
    </div>
  );
};
