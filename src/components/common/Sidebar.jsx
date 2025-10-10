import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FileText,
  Grid,
  LayoutDashboard,
  LogOut,
  PlusCircle,
  Tags,
} from "lucide-react";
import { Nav, Button, Card } from "react-bootstrap";

const Sidebar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/");
  };

  const linkClasses = (path) =>
    `d-flex align-items-center gap-2 p-2 rounded ${
      location.pathname === path
        ? "bg-primary text-white"
        : "text-dark hover-bg-light"
    }`;

  return (
    <Card
      className="d-flex flex-column border-end vh-100 shadow-sm"
      style={{ width: "260px" }}
    >
      {/* Sidebar Header */}
      <Card.Header className="bg-white border-bottom">
        <h4 className="fw-bold text-primary mb-0">Curio Admin</h4>
        <div className="mt-2">
          <p className="fw-semibold mb-0">{user?.fullName}</p>
          <small className="text-muted text-capitalize">
            {user?.role?.toLowerCase()}
          </small>
        </div>
      </Card.Header>

      {/* Navigation */}
      <Card.Body className="flex-grow-1 d-flex flex-column p-3">
        <Nav className="flex-column gap-2">
          <Nav.Item>
            <Link to="/admin" className={linkClasses("/admin")}>
              <LayoutDashboard size={18} /> Dashboard
            </Link>
          </Nav.Item>

          {user?.role === "ADMIN" && (
            <>
              <Nav.Item>
                <Link to="/admin/posts" className={linkClasses("/admin/posts")}>
                  <FileText size={18} /> Posts
                </Link>
              </Nav.Item>
              
              <Nav.Item>
                <Link
                  to="/admin/categories"
                  className={linkClasses("/admin/categories")}
                >
                  <Grid size={18} /> Categories
                </Link>
              </Nav.Item>

              <Nav.Item>
                <Link to="/admin/tags" className={linkClasses("/admin/tags")}>
                  <Tags size={18} /> Tags
                </Link>
              </Nav.Item>
            </>
          )}

          {user?.role === "AUTHOR" && (
            <>
              <Nav.Item>
                <Link to="/author/posts" className={linkClasses("/author/posts")}>
                  <FileText size={18} /> My Posts
                </Link>
              </Nav.Item>
              <Nav.Item>
                <Link
                  to="/author/posts/new"
                  className={linkClasses("/author/posts/new")}
                >
                  <PlusCircle size={18} /> Create Post
                </Link>
              </Nav.Item>
            </>
          )}
        </Nav>
      </Card.Body>

      {/* Logout */}
      <Card.Footer className="border-top bg-white p-3">
        <Button
          variant="outline-danger"
          className="d-flex align-items-center gap-2 w-100"
          onClick={handleLogout}
        >
          <LogOut size={18} /> Logout
        </Button>
      </Card.Footer>
    </Card>
  );
};

export default Sidebar;
