import React from 'react';
import PostCard from './PostCard';
import './Feed.css';

function Feed({ posts, updatePost, deletePost, likePost, addComment, theme, searchTerm, currentUser }) {
  return (
    <div className={`feed ${theme}`}>
      <div className="feed-container">
        {posts.length === 0 ? (
          <div className="empty-feed">
            {searchTerm ? (
              <>
                <h2>No posts found</h2>
                <p>No posts match your search for "{searchTerm}". Try a different search term.</p>
              </>
            ) : (
              <>
                <h2>No posts yet</h2>
                <p>Be the first to share your skills or create a post!</p>
              </>
            )}
          </div>
        ) : (
          <>
            {searchTerm && (
              <div className="search-results-info">
                <p>Found {posts.length} post{posts.length !== 1 ? 's' : ''} matching "{searchTerm}"</p>
              </div>
            )}
            <div className="posts-list">
              {posts.map(post => (
                <PostCard
                  key={post.id}
                  post={post}
                  updatePost={updatePost}
                  deletePost={deletePost}
                  likePost={likePost}
                  addComment={addComment}
                  theme={theme}
                  searchTerm={searchTerm}
                  currentUser={currentUser}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Feed;
