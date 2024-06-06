import React from 'react';

const Post = ({ post , username}) => {
  return (
    <div key={post.id} className='post'>
      <h2>{username}:</h2>
      <h3>{post.content}</h3>
      <p style={{margin: '2% 0 0 0'}}>Created: {post.created_at}</p>
    </div>
  );
};

export default Post;
