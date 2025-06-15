import React, { useEffect, useState } from 'react';
import axios from '../axiosInstance';
import './BlogList.css';
import { useNavigate } from 'react-router-dom';

function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchBlogs = async () => {
    try {
      const response = await axios.get('/post/');
      setBlogs(response.data.blogs || response.data);
    } catch (err) {
      console.error('Error fetching blogs:', err.response?.data || err.message);
      setError('Failed to load blogs.');
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this blog?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`/post/delete/${id}`);
      setBlogs(blogs.filter(blog => blog._id !== id));
    } catch (err) {
      console.error('Delete error:', err.response?.data || err.message);
      alert('Failed to delete the blog.');
    }
  };

  const handleEdit = (id) => {
    navigate(`/update/${id}`); 
  };

  return (
    <div className="blog-list-container">
      <h2>All Blogs</h2>
      {error && <p className="error">{error}</p>}

      <div className="blog-grid">
        {blogs.length === 0 ? (
          <p>No blogs found.</p>
        ) : (
          blogs.map((blog) => (
            <div className="blog-card" key={blog._id}>
              <h3>{blog.title}</h3>
              <p>{blog.content.slice(0, 100)}...</p>
              <div className="card-buttons">
                <button className="edit-btn" onClick={() => handleEdit(blog._id)}>Edit</button>
                <button className="delete-btn" onClick={() => handleDelete(blog._id)}>Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default BlogList;
