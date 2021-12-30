// import cardImage from '../../../img/heroimg.jpg';
import { Link } from 'react-router-dom';

function Card({ post }) {
  const profilePicture = "http://localhost:5000/public/images/"

  return (
    <div className="card">
      <div className="card-header">
        {post.coverPhoto && <img src={profilePicture + post.coverPhoto} alt="" />}
      </div>
      <div className="card-body">
        <div className="tag-container">
          {post.category.map(cat => (
            <span className="tag" key={cat}>{cat}</span>
          ))}
        </div>
        <h4 className="card-title heading">{post.title}</h4>
        <p className="card-summary"><b>{post.username}</b></p>
        <p className="card-summary">{post.content}</p>
      </div>
      <div className="card-footer">
        <Link to={`/posts/${post._id}`}>
          <button className="btn-card">Read More</button>
        </Link>
        <p className="post-time">{new Date(post.createdAt).toDateString()}</p>
      </div>
    </div>
  )
}

export default Card
