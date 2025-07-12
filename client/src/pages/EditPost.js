import React, { useEffect, useState } from "react";
import axios from "../services/axios";
import { useNavigate, useParams } from "react-router-dom";
import "./PostForm.css";

function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: "", content: "", category: "" });
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    axios.get(`/posts/${id}`).then((res) => {
      setForm({
        title: res.data.title,
        content: res.data.content,
        category: res.data.category,
      });
    });
  }, [id]);

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

      await axios.put(`/posts/${id}`, formData, {
        headers: { Authorization: token },
      });

      navigate(`/post/${id}`);
    } catch (err) {
      setError(err.response?.data?.msg || "Update failed");
    }
  };

  return (
    <div className="post-form-container">
      <h2>Edit Post</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input type="text" name="title" value={form.title} onChange={handleChange} required />
        <textarea name="content" value={form.content} rows="6" onChange={handleChange} required />
        <select name="category" value={form.category} onChange={handleChange} required>
          <option value="Nature">Nature</option>
          <option value="Travel">Travel</option>
          <option value="Urban">Urban</option>
        </select>
        <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
        <button type="submit">Update</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
}

export default EditPost;
