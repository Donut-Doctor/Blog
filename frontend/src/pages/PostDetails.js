import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function PostDetails() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`/api/posts/${id}`);
        setPost(res.data);
      } catch (err) {
        console.error('Error fetching post:', err);
      }
    };
    fetchPost();
  }, [id]);

  if (!post) return <p>Loading...</p>;

  return (
    <div style={{ padding: '20px', background: '#fff', borderRadius: '8px' }}>
      <h2>{post.title}</h2>
      <p><b>Category:</b> {post.category}</p>
      <p><b>Author:</b> {post.author?.username || 'Unknown'}</p>
      <hr />
      <p>{post.content}</p>
    </div>
  );
}

export default PostDetails;
