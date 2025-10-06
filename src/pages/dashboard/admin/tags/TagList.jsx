import React, { useEffect, useRef, useState } from "react";
import { tagServive } from "../../../../services/tagService";
import { Delete, Edit, Plus, Search } from "lucide-react";
import { TagFormModal } from "./TagFormModal";
import { toast } from "react-hot-toast";
import ConfirmModal from "../../../../components/common/ConfirmModal";
import Pagination from "../../../../components/common/Pagination";
import { useDebounce } from "../../../../hooks/useDebounce";

export const TagList = () => {
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editTag, setEditTag] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [pageSize, setPageSize] = useState(10); // page size state
  const searchInputRef = useRef(null);

  // Debounce the search input with 300ms delay
  const debouncedSearch = useDebounce(searchInput, 300);

  // Fetch tags on mount
  useEffect(() => {
    fetchTags(page, pageSize, searchInput);
  }, [page, pageSize]);

  // useEffect(() => {
  //   const timeout = setTimeout(() => {
  //     fetchTags(0, pageSize, searchInput); // reset to page 0 on new search
  //   }, 200); // adjust debounce time if needed

  //   return () => clearTimeout(timeout);
  // }, [searchInput]);

  const fetchTags = async (page=0, size=pageSize, searchInput="") => {
    try {
      setLoading(true);
      const response = await tagServive.getAllTags(page, size, searchInput);      
      
      setTags(response.data.data.content);
      setPage(response.data.data.number);
      setTotalPages(response.data.data.totalPages);
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
        await tagServive.updateTag(editTag.id, { name: data.name });
        toast.success("Tag updated successfully!");
      } else {
        await tagServive.createTag(data);
        toast.success("Tag created successfully!");
      }
      fetchTags(page);
      closeModal();
    } catch (err) {
      console.error(err);
      toast.error("Failed to save tag");
    }
  };

  // Delete tag
  const handleDelete = async () => {
      if (!confirmDeleteId) return;
      const toastId = toast.loading("Deleting tag...");
      try {
        await tagServive.deleteTag(confirmDeleteId);
        toast.success("Tag deleted successfully!", { id: toastId });
        fetchTags();
      } catch (err) {
        console.error(err);
        toast.error("Failed to delete tag", { id: toastId });
      } finally {
        setConfirmDeleteId(null); // close modal
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
      <div className="p-10 m-10 shadow-lg bg-white rounded-lg space-y-6">
        {/* Header: New Tag + Search */}
        <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
          <button
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg shadow hover:bg-secondary transition-colors"
            onClick={openNewTagModal}
          >
            <Plus className="w-4 h-4" /> New Tag
          </button>

          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search tags..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </div>
        </div>

        {/* Tags Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left border border-gray-200 rounded-lg">
            <thead className="bg-gray-100 text-gray-700 text-xs uppercase">
              <tr>
                <th className="px-6 py-3 w-20">ID</th>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3 text-end w-40">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tags.length > 0 ? (
                tags.map((tag, index) => (
                  <tr
                    key={tag.id}
                    className={`border-t hover:bg-gray-50 ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    }`}
                  >
                    <td className="px-6 py-4 font-mono">{tag.id}</td>
                    <td className="px-6 py-4 capitalize">{tag.name}</td>
                    <td className="px-6 py-4 text-end">
                      <div className="flex justify-end gap-2">
                        <button
                          className="btn btn-sm btn-outline btn-primary flex items-center gap-1"
                          onClick={() => openEditTagModal(tag)}
                        >
                          <Edit className="w-4 h-4" /> Edit
                        </button>
                        <button
                          className="btn btn-sm btn-outline btn-error flex items-center gap-1"
                          onClick={() => setConfirmDeleteId(tag.id)}
                        >
                          <Delete className="w-4 h-4" /> Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="3"
                    className="text-center py-6 text-gray-500 italic bg-gray-50"
                  >
                    No tags found
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="mt-4 flex justify-center">
            <Pagination
              page={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          </div>
        </div>

        {/* Modals */}
        <TagFormModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onSave={handleSave}
          initialData={editTag}
        />

        <ConfirmModal
          isOpen={!!confirmDeleteId}
          title="Delete Tag"
          message="Are you sure you want to delete this tag?"
          onConfirm={handleDelete}
          onClose={() => setConfirmDeleteId(null)}
        />
      </div>
    );
};
