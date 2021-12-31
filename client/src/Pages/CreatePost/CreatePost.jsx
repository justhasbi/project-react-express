import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './createpost.css'

import { useState } from 'react'
import axios from 'axios'
import { useContext } from 'react'
import { Context } from '../../Context/Context'

function CreatePost() {
  const [ title, setTitle ] = useState("")
  const [ content, setContent ] = useState("")
  const [ coverPhoto, setCoverPhoto ] = useState(null)
  const { user } = useContext(Context)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newPost = {
      title,
      content,
      username: user.username,
      category: [],
    }
    if(coverPhoto) {
      const data = new FormData()
      const filename = Date.now() + coverPhoto.name
      data.append("name", filename)
      data.append("file", coverPhoto)
      newPost.coverPhoto = filename
      console.log(filename)
      try {
        await axios.post("/upload", data)
          .then(res => console.log(res))
      } catch (error) {
        console.log(error)
      }
    }
    try {
      const res = await axios.post("/posts/", newPost)
      window.location.replace("/posts/" + res.data._id)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="create-post-container">
      <div className="container">
        <div className="create-post">
          {
            coverPhoto && (
              <img className="create-post-image" src={URL.createObjectURL(coverPhoto)} alt="" />
            )
          }
          <form className="create-post-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="file-input" className="labels">
                <FontAwesomeIcon icon="plus" className="create-post-icon"/>
              </label>
              <input
                type="file"
                id="file-input"
                style={{display: "none"}}
                onChange={(e) => setCoverPhoto(e.target.files[0])}/>
              <input
                type="text"
                placeholder="Title"
                className="create-post-title"
                autoFocus={true}
                onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <div className="form-group">
              <textarea
                id="create-post-content"
                className="create-post-content"
                placeholder="Write your story"
                rows="15"
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
            <div className="form-group">
              <button className="create-post-submit" type="submit">Publish</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreatePost
