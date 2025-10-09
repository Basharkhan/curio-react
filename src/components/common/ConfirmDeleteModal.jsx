import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import toast from 'react-hot-toast';

export const ConfirmDeleteModal = ({ show, onHide, itemName="item", onConfirm }) => {
    const handleConfirm = async () => {
        try {
            await onConfirm(); // perform actual delete
            toast.success(`${itemName} deleted successfully!`);
            onHide();
        } catch (error) {
            console.error("Delete error:", error);
            toast.error(`Failed to delete ${itemName}`);
        }
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Confirm Delete</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Are you sure you want to delete this {itemName}?
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                Cancel
                </Button>
                <Button variant="danger" onClick={handleConfirm}>
                Delete
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
