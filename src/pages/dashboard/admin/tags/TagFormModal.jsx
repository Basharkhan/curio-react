import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { X } from "lucide-react";

export const TagFormModal = ({ isOpen, onClose, onSave, initialData }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: { name: "" },
  });

  // Handle mount/unmount and visibility states
  useEffect(() => {
    if (isOpen) {
      setIsMounted(true);
      // Small delay to trigger CSS transition
      setTimeout(() => setIsVisible(true), 10);
    } else {
      setIsVisible(false);
      // Wait for transition to complete before unmounting
      const timer = setTimeout(() => setIsMounted(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Reset form whenever initialData changes or modal opens
  useEffect(() => {
    if (isOpen) {
      reset(initialData || { name: "" });
    }
  }, [initialData, reset, isOpen]);

  const submitHandler = (data) => {
    onSave({ ...initialData, ...data });
    onClose();
  };

  if (!isMounted) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-32"> {/* Changed to items-start and added pt-16 */}
      {/* Backdrop with transition */}
      <div
        className={`absolute inset-0 bg-black backdrop-blur-sm transition-all duration-300 ${
          isVisible ? "bg-opacity-40" : "bg-opacity-0"
        }`}
        onClick={onClose}
      ></div>

      {/* Modal box with transition - slides down from top */}
      <div
        className={`relative bg-white rounded-2xl shadow-xl w-full max-w-md p-6 z-10 transition-all duration-300 transform ${
          isVisible
            ? "scale-100 opacity-100 translate-y-0"      // Final position
            : "scale-95 opacity-0 -translate-y-8"        // Starts above (-translate-y-8)
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800 uppercase">
            {initialData ? "Update Tag" : "New Tag"}
          </h2>
          <button
            className="btn btn-sm btn-circle btn-ghost transition-transform hover:scale-110"
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
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                errors.name
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-primary"
              }`}
              {...register("name", { required: "Tag name is required" })}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1 transition-all duration-200">
                {errors.name.message}
              </p>
            )}
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="submit"
              className="btn btn-primary w-full py-2 px-3 bg-primary text-white text-sm rounded-lg hover:bg-secondary transition-all duration-200 uppercase transform hover:scale-105 active:scale-95"
            >
              {initialData ? "Update" : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};