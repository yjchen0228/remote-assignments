import React, { useState } from 'react';
import styled from 'styled-components';
import { postData } from './getPostData';

const LikeButton = styled.button`
  background-color: gray;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
`;

function ReactLikeButton() {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(postData.initialLikes);  // Initializing likes with mock data

  function handleLikeToggle() {
    if (isLiked) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
    }
    setIsLiked(!isLiked);
  }
  

  return (
    <div>
     <h1>{postData.title}</h1>
      <p>{postData.content}</p>
      <LikeButton isLiked={isLiked} onClick={handleLikeToggle}>
        {isLiked ? 'Like' : 'Like'} ({likeCount})
      </LikeButton>
    </div>
  );
  
}

export default ReactLikeButton;
