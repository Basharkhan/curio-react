import React, { useEffect, useRef, useState } from "react";
import { tagServive } from "../../../../services/tagService";
import { Delete, Edit, Plus, Search, Trash2 } from "lucide-react";
import { TagFormModal } from "./TagFormModal";
import { toast } from "react-hot-toast";
import ConfirmModal from "../../../../components/common/ConfirmModal";
import Pagination from "../../../../components/common/Pagination";
import { useDebounce } from "../../../../hooks/useDebounce";
import { Button, Col, Container, Form, Row, Spinner, Table } from "react-bootstrap";
import { ConfirmDeleteModal } from "../../../../components/common/ConfirmDeleteModal";

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
  const [selectedTag, setSelectedTag] = useState(null);

  // Fetch tags on mount
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchTags(page, pageSize, searchInput);  
    }, 500);
    
    return () => clearTimeout(delayDebounce);
  }, [page, pageSize, searchInput]);

  const fetchTags = async (page, size = pageSize, search = searchInput) => {
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
  
  const handleEdit = async(category) => {    
    setSelectedTag(category);
    setIsModalOpen(true);
  }

  const handleAdd = async() => {
    setSelectedTag(null);
    setIsModalOpen(true);
  }

  // Delete tag
  const handleDelete = async () => {
      if (!confirmDeleteId) return;      
      try {
        await tagServive.deleteTag(confirmDeleteId);        
        fetchTags();
      } catch (err) {
        console.error(err);        
      } finally {
        setConfirmDeleteId(null); // close modal
      }
  };

  return (
      <Container className="py-4">
        {/* Header Row */}
        <Row className="align-items-center mb-4">
          <Col>
            <Button className="btn-primary-custom" onClick={handleAdd}>
              + Add Tag
            </Button>
          </Col>
          <Col md={4}>
            <Form.Control
              type="text"
              placeholder="Search tags..."
              value={searchInput}
              onChange={(e) => {
                setSearchInput(e.target.value);
                setPage(0);
              }}
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
            ) : tags.length === 0 ? (
              <p>No tags found.</p>
            ) : (
              <Table striped hover responsive>
                <thead>
                  <tr>                  
                    <th>Name</th>                 
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {tags.map((tag, index) => (
                    <tr key={tag.id}>                   
                      <td>{tag.name}</td>                    
                      <td>
                          <div className="d-flex gap-3 align-items-center">
                              <Edit
                                  size={18}
                                  className="text-secondary"
                                  style={{ cursor: "pointer" }}
                                  onClick={() => handleEdit(tag)}
                              />
                              <Trash2
                                  size={18}
                                  className="text-danger"
                                  style={{ cursor: "pointer" }}
                                  onClick={() => setConfirmDeleteId(tag.id)}
                              />
                          </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}

            {/* Pagination */}
            <div className="mt-4 flex justify-center">
              <Pagination
                page={page}
                totalPages={totalPages}
                onPageChange={setPage}
              />
            </div>          
          </Col>
        </Row>

       {/* Modal */}
      <TagFormModal
        show={isModalOpen}
        onHide={() => setIsModalOpen(false)}
        onSuccess={() => fetchTags()}
        selectedTag={selectedTag}
      />    


      <ConfirmDeleteModal
        show={!!confirmDeleteId}
        onHide={() => setConfirmDeleteId(null)}
        itemName="category"
        onConfirm={handleDelete}
      />
      </Container>    
    );
};
