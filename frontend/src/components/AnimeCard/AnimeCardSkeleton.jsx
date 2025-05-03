import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const AnimeCardSkeleton = () => {
  return (
    <SkeletonTheme baseColor="#ddd" highlightColor="#ccc">
      <div className="anime-card">
        <div className="skeleton-image">
          <Skeleton height={150} />
        </div>
        <div className="anime-body" style={{ padding: "15px" }}>
          <h3 className="anime-title">
            <Skeleton width="60%" height={20} />
          </h3>
          <p className="anime-description">
            <Skeleton count={2} height={12} style={{ marginBottom: 6 }} />
          </p>
          <div className="anime-genres" style={{ display: "flex", gap: "5px" }}>
            <Skeleton width={40} height={20} borderRadius={10} />
            <Skeleton width={50} height={20} borderRadius={10} />
            <Skeleton width={30} height={20} borderRadius={10} />
          </div>
          <div className="anime-rating">
            <Skeleton width={50} height={16} />
          </div>
        </div>
      </div>
    </SkeletonTheme>
  );
};

export default AnimeCardSkeleton;
