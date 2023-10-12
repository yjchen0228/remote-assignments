import React, { useState } from 'react';

function NextLikeButton() {
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
      <h1 className="text-2xl font-bold mb-4">Appworks Next.js Assignment</h1>
      <p className="mb-4">Click "Like" or Click one more time to withdraw.</p>
      <button 
        className={`px-4 py-2 rounded ${isLiked ? 'bg-red-500' : 'bg-gray-500'} text-white`}
        onClick={handleLikeToggle}
      >
        Like ({likeCount})
      </button>
    </div>
  );
}

export default NextLikeButton;
