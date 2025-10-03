import { X } from "lucide-react";
import { useEffect, useState } from "react";

export default function ConfirmModal({ 
  isOpen, 
  title = "Confirm Action", 
  message = "Are you sure?", 
  onConfirm, 
  onClose 
}) {
    const [isVisible, setIsVisible] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

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

    if (!isMounted) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
        {/* Blur background */}
        <div
            className={`absolute inset-0 bg-black backdrop-blur-sm transition-all duration-300 
                ${isVisible ? "bg-opacity-40" : "bg-opacity-0"}`}
            onClick={onClose}
        ></div>

        {/* Modal box */}
        <div className={`relative bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 z-10 
            ${isVisible 
            ? "scale-100 opacity-100" 
            : "scale-95 opacity-0"}`}>
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
                <button className="btn btn-sm btn-circle btn-ghost" onClick={onClose}>
                    <X className="w-5 h-5" />
                </button>
                </div>

                {/* Body */}
                <p className="text-gray-600 mb-6">{message}</p>

                {/* Footer */}
                <div className="flex justify-end gap-3">
                    <button className="btn" onClick={onClose}>
                        Cancel
                    </button>
                    <button className="btn btn-error text-red-500" onClick={onConfirm}>
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
}
