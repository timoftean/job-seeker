import React from 'react';

const Comment = ({ content, author }) => (
  <div className="message">
    <h3>{content}</h3>
    <p>By {author}</p>
  </div>
);

export default Comment;
