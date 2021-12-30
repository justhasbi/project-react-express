import './settings.css'
import userImg from '../../img/1.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function Settings() {
  return (
    <div className="settings">
      <div className="container">
        <div className="settings-container">
          <div className="settings-title">
            <span className="settings-btn settings-update-title">Update account</span>
            <span className="settings-btn settings-delete-title">
              Delete account
            </span>
          </div>
          <form className="settings-form">
            <label>Profile Picture</label>
            <div className="setting-pp">
              <img src={userImg} alt="" />
              <label htmlFor="file-input" className="labels">
                <FontAwesomeIcon icon="user-circle" className="pp-image-icon" />
              </label>
              <input type="file" id="file-input" style={{ display: 'none' }}/>
            </div>
            <label htmlFor="username">Username</label>
            <input type="text" placeholder="Username"/>
            <label htmlFor="email">Email</label>
            <input type="email" placeholder="example@email.com"/>
            <label htmlFor="birth-date">Birth date</label>
            <input type="date" id="birth-date" />
            <label htmlFor="password">Password</label>
            <input type="password" id="Password" />
            <button className="settings-submit">Update</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Settings
