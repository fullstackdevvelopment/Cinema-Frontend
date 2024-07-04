import React from 'react';
import CommentsBlock from './CommentsBlock';

function Comments() {
  return (
    <div className="comments">
      <div className="container">
        <h1 className="comments__header">What People Say</h1>
        <div className="comments__block">
          <CommentsBlock />
          <CommentsBlock />
          <CommentsBlock />
        </div>
      </div>
    </div>
  );
}

export default Comments;
