import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './footer.css'

function Footer() {
  return (
    <div className="footer">
      <p className="cpr">©2021 Hasbi Shuhada</p>
      <div className="social">
        {/* SOCIAL ICON -> LINK */}
        <FontAwesomeIcon className="social-icon" icon={['fab', 'github-square']} />
        <FontAwesomeIcon className="social-icon" icon={['fab', 'instagram-square']} />
        <FontAwesomeIcon className="social-icon" icon={['fab', 'twitter-square']} />
        <FontAwesomeIcon className="social-icon" icon={['fab', 'facebook-square']} />
      </div>
    </div>
  )
}

export default Footer
