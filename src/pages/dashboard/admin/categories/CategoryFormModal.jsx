import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { categoryService } from '../../../../services/categoryService'
import toast from 'react-hot-toast'
import { Button, Form, FormGroup, Modal } from 'react-bootstrap'

export const CategoryFormModal = ({ show, onHide, onSuccess, selectedCategory }) => {
    const { 
        register, 
        handleSubmit, 
        reset, 
        formState: { errors } 
    } = useForm({mode: "onblur"})
    
    useEffect(() => {
        if(selectedCategory) {
            reset({ name: selectedCategory.name })
        } else {
            reset({ name: "" })
        }
    }, [selectedCategory, reset]);

    const onSubmit = async(data) => {
        try {
            if(selectedCategory) {
                await categoryService.updateCategory(selectedCategory.id, data);
                toast.success("Category updated successfully!");
            } else {
                await categoryService.createCategory(data);
                toast.success("Category added successfully!");
            }
            onSuccess();
            onHide();
            reset();
        } catch (error) {
            console.log("Got an error: " + JSON.stringify(error));
            toast.error("Failed to add category");
        }
    }

    const handleClose = () => {
        reset();
        onHide();        
    }

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Modal.Header closeButton>
                    <Modal.Title>{selectedCategory ? "Update Category" : "Add Category"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormGroup controlId="categoryName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter category name"
                            {...register("name", { required: "Name is required" })}
                            isInvalid={!!errors.name}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.name?.message}
                        </Form.Control.Feedback>
                        <div className="text-end">
                            <Button type="submit" variant="primary" className="mt-3">
                                {selectedCategory ? "Update" : "Save"}
                            </Button>
                        </div>
                    </FormGroup>
                </Modal.Body>
            </Form>
        </Modal>
    )
}
