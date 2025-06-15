import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from '../src/components/Signup'; 
import Login from '../src/components/Login'; 
import CreatBlog from '../src/components/CreateBlog';
import CreateBlog from '../src/components/CreateBlog';
import BlogList from '../src/components/BlogList';
import EditBlog from '../src/components/EditBlog';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
         <Route path="/Login" element={<Login />} />
          <Route path="/CreateBlog" element={<CreateBlog />} />
          <Route path="/BlogList" element={<BlogList />} />
          <Route path="/update/:id" element={<EditBlog />} /> 
      </Routes>
    </Router>
  );

}

export default App;
