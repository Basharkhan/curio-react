import React, { useEffect, useState } from 'react'
import { postService } from '../../../../services/postService';
import toast from 'react-hot-toast';
import { Col, Container, Row, Spinner, Table } from 'react-bootstrap';
import { Edit, Trash2 } from 'lucide-react';
import Pagination from '../../../../components/common/Pagination';

export const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [searchInput, setSearchInput] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState(null);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchPosts(page, pageSize, searchInput);  
    }, 500);
    
    return () => clearTimeout(delayDebounce);
  }, [page, pageSize, searchInput]);
  

  const fetchPosts = async (page, size = pageSize, search = searchInput) => {
    try {
      setLoading(true);
      const response = await postService.getAllposts(page, size, search);
      console.log(response);
      
      setPosts(response.data.data.content);
      setPage(response.data.data.number);
      setTotalPages(response.data.data.totalPages);
    } catch (error) {
      setError("Failed to fetch posts");
      toast.error("Failed to fetch posts");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-4">
      {/* Category Table */}
      <Row>
        <Col>
          {loading ? (
            <div className="text-center py-5">
              <Spinner animation="border" role="status" />
            </div>
          ) : error ? (
            <p className="text-danger">{error}</p>
          ) : posts.length === 0 ? (
            <p>No posts found.</p>
          ) : (
            <Table striped hover responsive>
              <thead>
                <tr>                  
                  <th>Title</th>                 
                  <th>Content</th>                 
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post, index) => (
                  <tr key={post.id}>                   
                    <td>{post.title}</td>                    
                    <td>{post.content.substring(0, 40)}</td>                    
                    <td>
                        <div className="d-flex gap-3 align-items-center">
                            <Edit
                                size={18}
                                className="text-secondary"
                                style={{ cursor: "pointer" }}
                                // onClick={() => handleEdit(post)}
                            />
                            <Trash2
                                size={18}
                                className="text-danger"
                                style={{ cursor: "pointer" }}
                                // onClick={() => setConfirmDeleteId(post.id)}
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
    </Container>
  )
}
