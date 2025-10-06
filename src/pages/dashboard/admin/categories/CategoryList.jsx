import React, { useEffect, useRef, useState } from "react";
import { Button, Container, Table, Row, Col, Form, Spinner } from "react-bootstrap";
import { categoryService } from "../../../../services/categoryService";
import toast from "react-hot-toast";
import { Edit, Edit3, Trash, Trash2 } from "lucide-react";
import { CategoryFormModal } from "./CategoryFormModal";

export const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const searchInputRef = useRef(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    fetchCategories(page, pageSize, searchInput);
  }, [page, pageSize, searchInput]);

  const fetchCategories = async (page, size = pageSize, search = searchInput) => {
    try {
      setLoading(true);
      const response = await categoryService.getAllCategories(page, size, search);
      setCategories(response.data.data.content);
      setPage(response.data.data.number);
      setTotalPages(response.data.data.totalPages);
    } catch (error) {
      setError("Failed to fetch categories");
      toast.error("Failed to fetch categories");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async(category) => {    
    setSelectedCategory(category);
    setIsModalOpen(true);
  }

  const handleAdd = async() => {
    setSelectedCategory(null);
    setIsModalOpen(true);
  }

  return (
    <Container className="py-4">
      {/* Header Row */}
      <Row className="align-items-center mb-4">
        <Col>
          <Button variant="primary" onClick={handleAdd}>
            + Add Category
          </Button>
        </Col>
        <Col md={4}>
          <Form.Control
            type="text"
            placeholder="Search categories..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            ref={searchInputRef}
          />
        </Col>
      </Row>      

      {/* Category Table */}
      <Row>
        <Col>
          {loading ? (
            <div className="text-center py-5">
              <Spinner animation="border" role="status" />
            </div>
          ) : error ? (
            <p className="text-danger">{error}</p>
          ) : categories.length === 0 ? (
            <p>No categories found.</p>
          ) : (
            <Table striped hover responsive>
              <thead>
                <tr>                  
                  <th>Name</th>                 
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category, index) => (
                  <tr key={category.id}>                   
                    <td>{category.name}</td>                    
                    <td>
                        <div className="d-flex gap-3 align-items-center">
                            <Edit
                                size={18}
                                className="text-secondary"
                                style={{ cursor: "pointer" }}
                                onClick={() => handleEdit(category)}
                            />
                            <Trash2
                                size={18}
                                className="text-danger"
                                style={{ cursor: "pointer" }}
                                onClick={() => setConfirmDeleteId(category.id)}
                            />
                        </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Col>
      </Row>

       {/* Modal */}
      <CategoryFormModal
        show={isModalOpen}
        onHide={() => setIsModalOpen(false)}
        onSuccess={() => fetchCategories()}
        selectedCategory={selectedCategory}
      />    
    </Container>
  );
};
