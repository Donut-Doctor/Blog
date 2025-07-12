import React, { useState } from "react";
import axios from "../services/axios";
import { useNavigate } from "react-router-dom";
import "./PostForm.css";

function CreatePost() {
  const [form, setForm] = useState({ title: "", content: "", category: "", image: null });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm({ ...form, [name]: files ? files[0] : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const formData = new FormData();
    for (const key in form) {
      formData.append(key, form[key]);
    }

    try {
      await axios.post("/posts", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
        },
      });
      navigate("/");
    } catch (err) {
      alert("Post creation failed");
    }
  };

  return (
    <div className="post-form-container">
      <h2>Create New Blog Post</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="title" placeholder="Title" required onChange={handleChange} />
        <textarea name="content" placeholder="Content" required onChange={handleChange} />
        <input type="text" name="category" placeholder="Category (e.g., Nature)" required onChange={handleChange} />
        <input type="file" name="image" accept="image/*" required onChange={handleChange} />
        <button type="submit">Publish</button>
      </form>
    </div>
  );
}

export default CreatePost;
