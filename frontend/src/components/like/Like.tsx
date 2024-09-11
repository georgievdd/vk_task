import React, { useEffect, useState } from 'react';
import './like-style.css';

const Like = ({
  onClick,
  isLiked,
}: {
  onClick: () => void,
  isLiked: boolean,
}) => {
  const [className, setClassname] = useState('like-svg');

  useEffect(() => {
    if (isLiked)  setClassname('liked-svg');
    else setClassname('like-svg');
  }, [isLiked]);

  return (
    <div>
      <svg width="30" height="28" viewBox="0 0 30 28" fill="none" className={className} onClick={onClick}>
        <path d="M3.63903 15.4203L12.2433 24.6825C13.7319 26.2848 16.2681 26.2848 17.7567 24.6825L26.361 15.4203C29.2129 12.3503 29.2129 7.37265 26.361 4.30254C23.5089 1.23245 18.8848 1.23245 16.0327 4.30254C15.4752 4.90287 14.5248 4.90287 13.9672 4.30254C11.1151 1.23245 6.49107 1.23245 3.63903 4.30254C0.78699 7.37264 0.78699 12.3503 3.63903 15.4203Z" fill="var(--first-color)" stroke="var(--first-color)" strokeWidth="3"/>
      </svg>
    </div>
  );
}

export default Like;