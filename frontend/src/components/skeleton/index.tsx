import './styles.css'
import React from 'react';

type SkeletonProps = {
  width?: string;
  height?: string;
  style?: React.CSSProperties;
};

const Skeleton: React.FC<SkeletonProps> = ({ style }) => {
  return (
    <div
      className="skeleton"
      style={{ ...style }}
    />
  );
};

export default Skeleton;