import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { X } from "lucide-react";

export const TagFormModal = ({ isOpen, onClose, onSave, initialData }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: { name: "" },
  });

  // Reset form whenever initialData changes or modal opens
  useEffect(() => {
    reset(initialData || { name: "" });
  }, [initialData, reset]);

  if (!isOpen) return null;

  const submitHandler = (data) => {
    onSave({ ...initialData, ...data }); // include id if editing
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Blur background */}
      <div
        className="absolute inset-0 bg-black bg-opacity-40 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal box */}
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md p-6 z-10">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">
            {initialData ? "Update Tag" : "New Tag"}
          </h2>
          <button
            className="btn btn-sm btn-circle btn-ghost"
            onClick={onClose}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Tag name"
               className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.name ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-primary'
              }`}
              {...register("name", { required: "Tag name is required" })}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div className="flex justify-end gap-2">            
            <button type="submit" className="btn btn-primaryw-full py-2 px-4 bg-primary text-base-100 font-semibold rounded-lg hover:bg-secondary transition-colors">
              {initialData ? "Update" : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
