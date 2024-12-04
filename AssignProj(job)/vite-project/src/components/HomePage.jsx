import React, { useState, useEffect } from 'react';
import './HomePage.css';

function HomePage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('http://localhost:5000/api/posts');
      const data = await response.json();
      setPosts(data);
    };
    fetchPosts();
  }, []);

  return (
    <div className='homepage'>
      <h1>Latest Posts</h1>
      {posts.map(post => (
        <div key={post.id} className='post'>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
}

export default HomePage;