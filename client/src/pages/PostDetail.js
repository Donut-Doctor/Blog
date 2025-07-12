import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "../services/axios";
import "./PostDetail.css";

function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);

  useEffect(() => {
    axios.get(`/posts/${id}`).then((res) => setPost(res.data));
  }, [id]);

  const handleDelete = async () => {
    const token = localStorage.getItem("token");
    if (window.confirm("Are you sure you want to delete this post?")) {
      await axios.delete(`/posts/${id}`, {
        headers: { Authorization: token },
      });
      navigate("/");
    }
  };

  if (!post) return <p>Loading...</p>;

  return (
    <div className="post-detail container">
      <img src={`http://localhost:5000/uploads/${post.image}`} alt={post.title} />
      <h2>{post.title}</h2>
      <p className="meta">By {post.author?.username} | {new Date(post.createdAt).toLocaleDateString()}</p>
      <p className="content">{post.content}</p>

      {post.author?._id === JSON.parse(atob(localStorage.getItem("token").split(".")[1])).id && (
        <div className="actions">
          <Link to={`/edit/${post._id}`}>Edit</Link>
          <button onClick={handleDelete}>Delete</button>
        </div>
      )}
    </div>
  );
}

export default PostDetail;
