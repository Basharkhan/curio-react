import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Container, Form, Spinner } from "react-bootstrap";
import toast from "react-hot-toast";
import { categoryService } from "../../../../services/categoryService";
import { postService } from "../../../../services/postService"; // we'll create next

export const PostForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;

  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  // Load categories
  useEffect(() => {
    (async () => {
      try {
        const response = await categoryService.getAllCategories(0, 100);
        setCategories(response.data.data.content || []);
      } catch (error) {
        toast.error("Failed to load categories");
      }
    })();
  }, []);

  // Load post data in edit mode
  useEffect(() => {
    if (isEditMode) {
      (async () => {
        setLoading(true);
        try {
          const response = await postService.getPostById(id);
          console.log(response);
          
          const post = response.data.data;
          reset({
            title: post.title,
            content: post.content,
            categoryId: post.categoryId || ""
          });
        } catch (error) {
          toast.error("Failed to load post data");
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [id, isEditMode, reset]);

  // Submit handler
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      if (isEditMode) {
        await postService.updatePost(id, data);
        toast.success("Post updated successfully!");
      } else {
        await postService.createPost(data);
        toast.success("Post created successfully!");
      }
      navigate("/admin/posts");
    } catch (error) {
      toast.error("Failed to save post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-4">
      <h3 className="mb-4">{isEditMode ? "Edit Post" : "Add New Post"}</h3>

      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" role="status" />
        </div>
      ) : (
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3" controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter post title"
              {...register("title", { required: "Title is required" })}
              isInvalid={!!errors.title}
            />
            <Form.Control.Feedback type="invalid">
              {errors.title?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="content">
            <Form.Label>Content</Form.Label>
            <Form.Control
              as="textarea"
              rows={6}
              placeholder="Enter post content"
              {...register("content", { required: "Content is required" })}
              isInvalid={!!errors.content}
            />
            <Form.Control.Feedback type="invalid">
              {errors.content?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-4" controlId="categoryId">
            <Form.Label>Category</Form.Label>
            <Form.Select
              {...register("categoryId", { required: "Category is required" })}
              isInvalid={!!errors.categoryId}
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {errors.categoryId?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <div className="text-end">
            <Button
              type="button"
              variant="secondary"
              className="me-2"
              onClick={() => navigate("/admin/posts")}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary" disabled={loading}>
              {loading ? "Saving..." : isEditMode ? "Update" : "Save"}
            </Button>
          </div>
        </Form>
      )}
    </Container>
  );
};
