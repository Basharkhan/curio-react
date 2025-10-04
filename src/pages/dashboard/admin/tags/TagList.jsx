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
    <div className="p-10 m-10 shadow-lg space-y-6">
      {/* Header: New Tag + Search */}
      <div className="flex justify-between items-center mb-6">
        <button
          className="btn bg-primary text-white flex items-center gap-2 px-3 py-1 rounded hover:bg-secondary uppercase"
          onClick={openNewTagModal}
        >
          <Plus className="w-4 h-4" /> New Tag
        </button>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search tags..."
            className="input input-bordered w-full max-w-xs pl-10 pr-4 py-1 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary"
            value={searchInput}
            onChange={(e) => {
              setSearchInput(e.target.value);              
            }}            
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
                    onClick={() => setConfirmDeleteId(tag.id)}
                  >
                    <Delete className="w-5 h-5 text-red-500" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
         <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
      </div>     

      {/* Tag Modal */}
      <TagFormModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSave={handleSave}
        initialData={editTag}
      />

      {/* Confirm Modal */}
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
