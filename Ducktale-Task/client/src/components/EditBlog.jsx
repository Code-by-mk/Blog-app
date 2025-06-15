import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../axiosInstance';
import './CreateBlog.css'; 

function EditBlog() {
  const { id } = useParams(); 
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
   
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`/post/get/${id}`);
        console.log(response);
        setTitle(response.data.title);
        setContent(response.data.content);
      } catch (error) {
        console.error('Error fetching blog:', error);
        setMessage('Failed to load blog data.');
      }
    };

    fetchBlog();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const response = await axios.put(`/post/update/${id}`, { title, content });
      console.log('Update response:', response.data);
      setMessage('Blog updated successfully!');
      navigate('/BlogList'); 
    } catch (error) {
      console.error('Update failed:', error.response?.data || error.message);
      setMessage('Failed to update blog.');
    }
  };

  return (
    <div className="page-center">
      <form className="form-container" onSubmit={handleUpdate}>
        <h2>Edit Blog</h2>
        {message && <p className="server-message">{message}</p>}

        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />

        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default EditBlog;
