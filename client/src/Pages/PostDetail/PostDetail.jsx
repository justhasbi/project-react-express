import Sidebar from '../../Components/Sidebar/Sidebar'
import './postdetail.css'
// import headerImage from '../../img/heroimg.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useLocation } from 'react-router'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { Context } from '../../Context/Context'

function PostDetail() {
  // Get ID from url
  const location = useLocation();
  const id = location.pathname.split('/')[2];
  const { user } = useContext(Context)
  const profilePicture = "http://localhost:5000/public/images/"
  const [post, setPost] = useState([])
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [updateMode, setUpdateMode] = useState(false)


  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get(`/posts/${id}`);
      setPost(res.data);
      setTitle(res.data.title)
      setContent(res.data.content)
    };
    getPost();
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`/posts/${post._id}`, { data: { username: user.username }})
      window.location.replace('/')
    } catch (error) {
      console.log(error)
    }
  }

  const handleUpdate = async () => {
    try {
      await axios.put(`/posts/${post._id}`, {
        username: user.username,
        title,
        content
      })
      setUpdateMode(false)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="post-detail">
      <div className="container">
        <div className="post-detail-container">
          <div className="post-detail-content">
            <div className="post-detail-header">
              { post.coverPhoto && (
                <img
                  src={profilePicture + post.coverPhoto}
                  alt=""
                  className="singlePostImg"
                />
              )}

            </div>
            <div className="post-detail-body">
              <div className="post-detail-info">
            {
              updateMode ? (
                <input type="text" value={title} className="post-title-input" onChange={(e) => setTitle(e.target.value)}/>
              ) : (
                <span className="post-title">{title}</span>
              )
            }
                <div className="post-info">
                  <span className="post-detail-author">Author:
                    <Link to={`/?user=${post.username}`}>
                      <b>{post.username}</b>
                    </Link>
                  </span>
                  <span className="post-detail-date">{new Date(post.createdAt).toDateString()}</span>
                </div>

                {post.username === user.username &&
                <div className="editOpt">
                  <FontAwesomeIcon className="edit-opt" icon="edit" onClick={(e) => setUpdateMode(!updateMode)}/>
                  <FontAwesomeIcon className="edit-opt" icon="trash" onClick={handleDelete}/>
                </div>
                }
              </div>
              {
                updateMode ? (
                  <textarea type="text" value={content} className="post-content-input" onChange={(e) => setContent(e.target.value)}/>
                ) : (
                  <p className="post-content">{content}</p>
                )
              }
              <button className="update-post" onClick={handleUpdate}>Update</button>
            </div>
          </div>
          <Sidebar />
        </div>
      </div>
    </div>
  )
}

export default PostDetail
