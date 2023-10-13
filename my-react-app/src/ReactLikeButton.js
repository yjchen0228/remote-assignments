import React, { useState } from 'react';
import styled from 'styled-components';

const LikeButton = styled.button`
  background-color: ${(props) => (props.isLiked ? 'red' : 'gray')};
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
`;

function ReactLikeButton() {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

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
      <h1>React.js Sample</h1>
      <p>Please click "Like" (withdraw "Like" by simply click it one more time).</p>
      <LikeButton onClick={handleLikeToggle}>
        Like ({likeCount})
      </LikeButton>
    </div>
  );
  
}

export default ReactLikeButton;
