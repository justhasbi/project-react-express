import './settings.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useContext } from 'react'
import { Context } from '../../Context/Context'
import { useState } from 'react'
import axios from 'axios'

function Settings() {
  const [ profilePicture, setProfilePicture ] = useState(null)
  const [ username, setUsername ] = useState("")
  const [ email, setEmail ] = useState("")
  const [ password, setPassword ] = useState("")
  const [ birthDate, setBirthDate] = useState("")

  const { user, dispatch } = useContext(Context)

  const handleSubmit = async (e) => {
    e.preventDefault()
    dispatch({ type: "UPDATE_START" })
    const updateUser = {
      userId: user._id,
      username,
      email,
      password,
      birthDate
    }
    if(profilePicture) {
      const data = new FormData()
      const filename = Date.now() + profilePicture.name
      data.append("name", filename)
      data.append("file", profilePicture)
      updateUser.coverPhoto = filename
      console.log(filename)
      try {
        await axios.post("/upload", data)
          .then(res => console.log(res))
        } catch (error) {
          console.log(error)
        }
      }
    try {
      const res = await axios.put("/users/" + user._id, updateUser).then(res => window.alert("update success"))
      dispatch({ type: "UPDATE_SUCCESS", payload: res.data })
    } catch (error) {
      console.log(error)
      window.alert("update failed")
      dispatch({ type: "UPDATE_FAILURE" })
    }
  }

  return (
    <div className="settings">
      <div className="container">
        <div className="settings-container">
          <div className="settings-title">
            {/* <span className="settings-btn settings-update-title">Update account</span> */}
            <span className="settings-btn settings-delete-title">
              Delete account
            </span>
          </div>
          <form className="settings-form" onSubmit={handleSubmit}>
            <label>Profile Picture</label>
            <div className="setting-pp">
              <img src={profilePicture ? URL.createObjectURL(profilePicture) : user.profilePicture} alt="" />
              <label htmlFor="file-input" className="labels">
                <FontAwesomeIcon icon="user-circle" className="pp-image-icon" />
              </label>
              <input
                type="file"
                id="file-input"
                style={{ display: 'none' }}
                onChange={(e) => setProfilePicture(e.target.files[0])}/>
            </div>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              placeholder={user.username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder={user.email}
              onChange={(e) => setEmail(e.target.value)}
              />
            <label htmlFor="birth-date">Birth date</label>
            <input
              type="date"
              id="birth-date"
              placeholder={user.birthdate}
              onChange={(e) => setBirthDate(e.target.value)}
              />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="Password"
              onChange={(e) => setPassword(e.target.value)}
              />
            <button className="settings-submit" type="submit">Update</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Settings
