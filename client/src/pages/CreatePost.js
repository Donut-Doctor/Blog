import React, { useState } from "react";
import axios from "../services/axios";
import { useNavigate } from "react-router-dom";
import "./PostForm.css";

function CreatePost() {
  const [form, setForm] = useState({ title: "", content: "", category: "" });
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("content", form.content);
      formData.append("category", form.category);
      if (image) formData.append("image", image);

      await axios.post("/posts", formData, {
        headers: { Authorization: token },
      });

      navigate("/");
    } catch (err) {
      setError(err.response?.data?.msg || "Failed to create post");
    }
  };

  return (
    <div className="post-form-container">
      <h2>Create New Post</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input type="text" name="title" placeholder="Title" onChange={handleChange} required />
        <textarea name="content" placeholder="Content..." rows="6" onChange={handleChange} required />
        <select name="category" onChange={handleChange} required>
          <option value="">Select Category</option>
          <option value="Nature">Nature</option>
          <option value="Travel">Travel</option>
          <option value="Urban">Urban</option>
        </select>
        <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
        <button type="submit">Post</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
}

export default CreatePost;
