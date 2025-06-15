import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../axiosInstance'; 
import './CreateBlog.css';

function CreateBlog() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const response = await axios.post('/post/create', { title, content }); 
      console.log('Blog submitted:', response.data);
      setMessage('Blog created successfully!');

      setTimeout(() => {
        navigate('/BlogList'); 
      }, 1000);

    } catch (error) {
      console.error('Blog creation error:', error.response?.data || error.message);
      setMessage('Failed to create blog. Please try again.');
    }
  };

  return (
    <div className="page-center">
      <form className="form-container" onSubmit={handleSubmit}>
        <h2>Create Blog</h2>

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
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default CreateBlog;
