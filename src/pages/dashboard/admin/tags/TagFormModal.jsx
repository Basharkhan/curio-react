import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { Button, Form, FormGroup, Modal } from 'react-bootstrap'
import { tagServive } from '../../../../services/tagService'

export const TagFormModal = ({ show, onHide, onSuccess, selectedTag }) => {
    const { 
        register, 
        handleSubmit, 
        reset, 
        formState: { errors } 
    } = useForm({mode: "onblur"})
    
    useEffect(() => {
        if(selectedTag) {
            reset({ name: selectedTag.name })
        } else {
            reset({ name: "" })
        }
    }, [selectedTag, reset]);

    const onSubmit = async(data) => {
        try {
            if(selectedTag) {
                await tagServive.updateTag(selectedTag.id, data);
                toast.success("Tag updated successfully!");
            } else {
                await tagServive.createTag(data);
                toast.success("Tag added successfully!");
            }
            onSuccess();
            onHide();
            reset();
        } catch (error) {
            console.log("Got an error: " + JSON.stringify(error));
            toast.error("Failed to add tag");
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
                    <Modal.Title>{selectedTag ? "Update Tag" : "Add Tag"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormGroup controlId="tagName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter tag name"
                            {...register("name", { required: "Name is required" })}
                            isInvalid={!!errors.name}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.name?.message}
                        </Form.Control.Feedback>
                        <div className="text-end">
                            <Button type="submit" variant="primary" className="mt-3">
                                {selectedTag ? "Update" : "Save"}
                            </Button>
                        </div>
                    </FormGroup>
                </Modal.Body>
            </Form>
        </Modal>
    )
}
