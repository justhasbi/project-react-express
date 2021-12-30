import { Link } from "react-router-dom"

const SidebarPostLinkComponent = ({ post, num }) => {
  return (
    <div className="post">
      <div className="post-body">
        <div className="post-title">
          <h2 className="post-number">{num + 1}</h2>
          <Link to={`/posts/${post._id}`}>
            <h3 className="heading">{post.title}</h3>
          </Link>
        </div>
        <div className="post-tag">
          <p className="date-small">{new Date(post.createdAt).toDateString()}</p>
        </div>
      </div>
    </div>
  )
}

export default SidebarPostLinkComponent