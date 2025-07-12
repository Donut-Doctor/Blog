import React from "react";
import "./Sidebar.css";
import thumb1 from "../assets/images/thumb1.jpg";
import thumb2 from "../assets/images/thumb2.jpg";
import thumb3 from "../assets/images/thumb3.jpg";

const posts = [
  {
    id: 1,
    title: "Wandering the Fjords",
    excerpt: "Exploring the majestic landscapes of Norway...",
    date: "July 8, 2025",
    comments: 3,
    image: thumb1,
  },
  {
    id: 2,
    title: "Street Tales of Marrakech",
    excerpt: "Colors, chaos, and culture in the souks...",
    date: "July 5, 2025",
    comments: 5,
    image: thumb2,
  },
  {
    id: 3,
    title: "Mist Trails in Munnar",
    excerpt: "A peaceful escape into Kerala’s tea valleys...",
    date: "July 2, 2025",
    comments: 2,
    image: thumb3,
  },
];

function Sidebar() {
  return (
    <div className="sidebar">
      <h3>Recent Posts</h3>
      {posts.map((post) => (
        <div key={post.id} className="recent-post">
          <img src={post.image} alt={post.title} />
          <div>
            <h4>{post.title}</h4>
            <p>{post.excerpt}</p>
            <span>{post.date} | 💬 {post.comments}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Sidebar;
