import React from 'react'
import Card from './Card'

function BlogPostContent({ posts }) {
  return (
    <div className="blog-post-content">
      <div className="card-container">
        {posts.map(post => {
          return (
            <Card
              key={post._id}
              post={post} />
          )
        })}
      </div>
    </div>
  )
}

export default BlogPostContent
